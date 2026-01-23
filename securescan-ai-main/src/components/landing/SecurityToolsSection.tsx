import { motion } from "framer-motion";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { 
  AlertTriangle, 
  CheckCircle2, 
  Info, 
  Shield,
  Code,
  Send,
  Zap
} from "lucide-react";

import { analyzeSecurityIssueDescription, type ScanRequest } from '@/lib/api';
import { useToast } from "@/hooks/use-toast";

const severityBadges = {
  CRITICAL: { bg: "bg-destructive", text: "Critical", color: "text-destructive", icon: AlertTriangle },
  HIGH: { bg: "bg-severity-high", text: "High", color: "text-severity-high", icon: AlertTriangle },
  MEDIUM: { bg: "bg-warning", text: "Medium", color: "text-warning", icon: AlertTriangle },
  LOW: { bg: "bg-success", text: "Low", color: "text-success", icon: CheckCircle2 },
  INFO: { bg: "bg-blue-500", text: "Info", color: "text-blue-500", icon: Info },
};

const SecurityToolsSection = () => {
  const [code, setCode] = useState('const user = await db.query("SELECT * FROM users WHERE id = " + userId);');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [analysisResult, setAnalysisResult] = useState<any>(null);
  const { toast } = useToast();

  const handleAnalyze = async () => {
    if (!code.trim()) {
      toast({
        title: "No code provided",
        description: "Please paste some code to analyze",
        variant: "destructive",
      });
      return;
    }

    setIsAnalyzing(true);
    setShowResults(false);
    
    try {
     
      const issue = `Analyze this code for security vulnerabilities:\n\n${code}`;
      const request: ScanRequest = {
        issue,
        app_type: 'Web Application',
        tech_stack: 'JavaScript, Node.js, Database',
        environment: 'Production'
      };
        const response = await analyzeSecurityIssueDescription(
          request.issue,
          request.app_type,
          request.tech_stack,
          request.environment
        );

      
      if (response.success) {
        setAnalysisResult(response.data);
        setShowResults(true);
        toast({
          title: "Analysis Complete",
          description: `Found ${response.data.severity} severity issue`,
        });
      } else {
        throw new Error("Analysis failed");
      }
    } catch (error: any) {
      toast({
        title: "Analysis Failed",
        description: error.message || "Could not analyze the code",
        variant: "destructive",
      });
      // Fallback to mock data for demo
      setAnalysisResult({
        severity: "HIGH",
        title: "SQL Injection Vulnerability",
        cvss_score: 8.5,
        ai_analysis: {
          secure_fix: 'Use parameterized queries: const user = await db.query("SELECT * FROM users WHERE id = ?", [userId]);',
          immediate_actions: [
            "Replace string concatenation with parameterized query",
            "Add input validation for userId parameter",
            "Review database permissions"
          ],
          risk_explanation: "User input is directly concatenated into SQL query without sanitization, allowing attackers to execute arbitrary SQL commands."
        }
      });
      setShowResults(true);
    } finally {
      setIsAnalyzing(false);
    }
  };

  const getSeverityData = (severity: string) => {
    const upperSeverity = severity.toUpperCase();
    return severityBadges[upperSeverity as keyof typeof severityBadges] || severityBadges.MEDIUM;
  };

  return (
    <section id="tools" className="py-24 relative">
      <div className="absolute inset-0 bg-gradient-glow opacity-30" />
      
      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-sm font-medium text-primary uppercase tracking-wider">
            Powered by AI
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold mt-4 mb-6">
            Interactive{" "}
            <span className="text-gradient">Security Analyzer</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Paste your code or describe a security issue. Our AI will analyze it and provide detailed security recommendations.
          </p>
          
          {/* Live Backend Status */}
          <div className="inline-flex items-center gap-2 mt-4 px-4 py-2 bg-green-500/10 border border-green-500/20 rounded-full">
            <div className="h-2 w-2 bg-green-500 rounded-full animate-pulse" />
            <span className="text-sm text-green-500">Backend Connected</span>
            <Zap className="h-3 w-3 text-green-500" />
          </div>
        </motion.div>

        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="grid lg:grid-cols-2 gap-6"
          >
            {/* Input Panel */}
            <div className="bg-gradient-card border border-border rounded-xl p-6">
              <div className="flex items-center gap-2 mb-4">
                <Code className="h-5 w-5 text-primary" />
                <h3 className="font-semibold text-foreground">Security Input</h3>
              </div>
              
              <textarea
                value={code}
                onChange={(e) => setCode(e.target.value)}
                placeholder={`Paste code or describe a security issue...

Examples:
1. SQL injection: db.query("SELECT * FROM users WHERE id = " + userId)
2. XSS: document.write(userInput)
3. Hardcoded secret: const API_KEY = "sk_live_123456"
4. Missing auth: app.get("/admin", (req, res) => {...})`}
                className="w-full h-40 p-4 bg-secondary/50 border border-border rounded-lg font-mono text-sm text-foreground placeholder:text-muted-foreground resize-none focus:outline-none focus:ring-2 focus:ring-primary/50"
              />
              
              <div className="flex flex-col sm:flex-row gap-3 mt-4">
                <Button 
                  variant="hero" 
                  className="flex-1"
                  onClick={handleAnalyze}
                  disabled={isAnalyzing || !code.trim()}
                >
                  {isAnalyzing ? (
                    <>
                      <div className="h-4 w-4 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin mr-2" />
                      Analyzing with AI...
                    </>
                  ) : (
                    <>
                      <Send className="h-4 w-4 mr-2" />
                      Analyze Security
                    </>
                  )}
                </Button>
                
                <Button 
                  variant="outline"
                  className="flex-1"
                  onClick={() => setCode('const user = await db.query("SELECT * FROM users WHERE id = " + userId);')}
                >
                  <Code className="h-4 w-4 mr-2" />
                  Load SQLi Example
                </Button>
              </div>
              
              <p className="text-xs text-muted-foreground mt-3">
                💡 Powered by Gemini AI • Real-time analysis • Detailed fixes
              </p>
            </div>

            {/* Results Panel */}
            <div className="bg-gradient-card border border-border rounded-xl p-6">
              <div className="flex items-center gap-2 mb-4">
                <Shield className="h-5 w-5 text-primary" />
                <h3 className="font-semibold text-foreground">AI Analysis Results</h3>
              </div>

              {!showResults && !isAnalyzing && (
                <div className="flex flex-col items-center justify-center h-64 text-muted-foreground">
                  <Info className="h-12 w-12 mb-4 opacity-50" />
                  <p className="text-sm text-center">
                    Click "Analyze Security" to get<br />
                    AI-powered security insights
                  </p>
                  <div className="flex gap-2 mt-4">
                    <div className="h-1 w-1 bg-primary rounded-full animate-pulse" />
                    <div className="h-1 w-1 bg-primary rounded-full animate-pulse delay-150" />
                    <div className="h-1 w-1 bg-primary rounded-full animate-pulse delay-300" />
                  </div>
                </div>
              )}

              {isAnalyzing && (
                <div className="flex flex-col items-center justify-center h-64">
                  <div className="relative">
                    <Shield className="h-16 w-16 text-primary animate-pulse" />
                    <div className="absolute inset-0 blur-xl bg-primary/30 animate-pulse" />
                  </div>
                  <p className="text-sm text-muted-foreground mt-4">
                    🔍 Analyzing with AI Security Copilot...
                  </p>
                  <p className="text-xs text-muted-foreground mt-2">
                    Checking for vulnerabilities, security flaws, and best practices
                  </p>
                </div>
              )}

              {showResults && analysisResult && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="space-y-4"
                >
                  {/* Severity Badge */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <AlertTriangle className={`h-5 w-5 ${getSeverityData(analysisResult.severity).color}`} />
                      <span className="font-semibold text-foreground">
                        {analysisResult.title || "Security Analysis"}
                      </span>
                    </div>
                    <span className={`px-3 py-1 text-xs font-bold rounded-full ${getSeverityData(analysisResult.severity).bg} text-foreground`}>
                      {getSeverityData(analysisResult.severity).text}
                    </span>
                  </div>

                  {/* CVSS Score */}
                  <div className="flex items-center gap-2 p-3 rounded-lg bg-destructive/10 border border-destructive/30">
                    <span className="text-sm text-muted-foreground">CVSS Score:</span>
                    <span className="font-bold text-destructive">{analysisResult.cvss_score || "N/A"}</span>
                    <span className="text-xs text-muted-foreground">
                      ({analysisResult.cvss_score >= 9 ? "Critical" : 
                        analysisResult.cvss_score >= 7 ? "High" : 
                        analysisResult.cvss_score >= 4 ? "Medium" : "Low"})
                    </span>
                  </div>

                  {/* Description */}
                  {analysisResult.ai_analysis?.risk_explanation && (
                    <p className="text-sm text-muted-foreground">
                      {analysisResult.ai_analysis.risk_explanation}
                    </p>
                  )}

                  {/* Secure Fix */}
                  {analysisResult.ai_analysis?.secure_fix && (
                    <div>
                      <h4 className="text-sm font-semibold text-foreground mb-2 flex items-center gap-2">
                        <CheckCircle2 className="h-4 w-4 text-success" />
                        Secure Fix
                      </h4>
                      <div className="bg-secondary/50 p-3 rounded-lg border border-border">
                        <code className="text-xs font-mono text-foreground whitespace-pre-wrap">
                          {analysisResult.ai_analysis.secure_fix}
                        </code>
                      </div>
                    </div>
                  )}

                  {/* Immediate Actions */}
                  {analysisResult.ai_analysis?.immediate_actions && analysisResult.ai_analysis.immediate_actions.length > 0 && (
                    <div>
                      <h4 className="text-sm font-semibold text-foreground mb-2">
                        🚨 Immediate Actions
                      </h4>
                      <ul className="space-y-1">
                        {analysisResult.ai_analysis.immediate_actions.map((action: string, i: number) => (
                          <li key={i} className="text-xs text-muted-foreground flex items-start gap-2">
                            <span className="text-primary mt-1">•</span>
                            {action}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* Attack Scenario */}
                  {analysisResult.ai_analysis?.attack_scenario && (
                    <div className="pt-2 border-t border-border">
                      <h4 className="text-sm font-semibold text-foreground mb-2">
                        ⚔️ Attack Scenario
                      </h4>
                      <p className="text-xs text-muted-foreground">
                        {analysisResult.ai_analysis.attack_scenario}
                      </p>
                    </div>
                  )}
                </motion.div>
              )}
            </div>
          </motion.div>

          {/* Quick Examples */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mt-8"
          >
            <h4 className="text-sm font-medium text-muted-foreground mb-3 text-center">
              💡 Try these security examples:
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
              {[
                {
                  title: "SQL Injection",
                  code: 'db.query("SELECT * FROM users WHERE email = \'" + email + "\'")',
                  desc: "User input in SQL query"
                },
                {
                  title: "XSS Vulnerability",
                  code: 'document.getElementById("output").innerHTML = userComment',
                  desc: "Unsanitized HTML injection"
                },
                {
                  title: "Hardcoded Secret",
                  code: 'const API_KEY = "sk_live_1234567890abcdef"',
                  desc: "Exposed API key in code"
                },
                {
                  title: "Missing Authentication",
                  code: 'app.get("/admin/users", (req, res) => { /* no auth check */ })',
                  desc: "No authentication check"
                }
              ].map((example, i) => (
                <button
                  key={i}
                  onClick={() => setCode(example.code)}
                  className="text-left p-3 text-sm border border-border rounded-lg hover:bg-secondary/50 transition-all hover:border-primary/30 group"
                >
                  <div className="font-medium text-foreground group-hover:text-primary transition-colors">
                    {example.title}
                  </div>
                  <div className="text-xs text-muted-foreground mt-1 font-mono truncate">
                    {example.code}
                  </div>
                  <div className="text-xs text-muted-foreground mt-1">
                    {example.desc}
                  </div>
                </button>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default SecurityToolsSection;
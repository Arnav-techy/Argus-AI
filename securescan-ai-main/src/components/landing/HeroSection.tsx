import { motion } from "framer-motion";
import { Shield, Scan, AlertTriangle, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

const HeroSection = () => {
  return (
    <section className="relative min-h-screen pt-32 pb-20 overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-hero" />
      <div className="absolute inset-0 grid-pattern opacity-30" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-glow" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center lg:text-left"
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-primary/30 bg-primary/5 mb-6"
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-primary" />
              </span>
              <span className="text-sm font-medium text-primary">AI-Powered Security Analysis</span>
            </motion.div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight mb-6">
              Your Intelligent{" "}
              <span className="text-gradient">Security Copilot</span>
            </h1>

            <p className="text-lg text-muted-foreground mb-8 max-w-lg mx-auto lg:mx-0">
              Detect vulnerabilities, analyze threats, and get instant remediation
              recommendations powered by advanced AI. Protect your code before attackers find it.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Button variant="hero" size="xl">
                <Scan className="h-5 w-5" />
                Start Free Scan
              </Button>
              <Button variant="heroOutline" size="xl">
                Watch Demo
              </Button>
            </div>

            {/* Stats */}
            <div className="flex flex-wrap gap-8 mt-12 justify-center lg:justify-start">
              {[
                { value: "10K+", label: "Scans Performed" },
                { value: "99.2%", label: "Detection Rate" },
                { value: "<2s", label: "Analysis Time" },
              ].map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 + index * 0.1 }}
                  className="text-center"
                >
                  <div className="text-2xl font-bold text-primary">{stat.value}</div>
                  <div className="text-sm text-muted-foreground">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Right Content - Animated Security Panel */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="relative"
          >
            <div className="relative bg-gradient-card border border-border rounded-2xl p-6 backdrop-blur-sm float">
              {/* Glow Effect */}
              <div className="absolute -inset-1 bg-primary/20 blur-xl rounded-2xl" />
              
              <div className="relative z-10">
                {/* Header */}
                <div className="flex items-center gap-3 mb-6">
                  <div className="relative">
                    <Shield className="h-10 w-10 text-primary" />
                    <div className="absolute inset-0 blur-md bg-primary/40" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground">Security Analysis</h3>
                    <p className="text-sm text-muted-foreground">Real-time vulnerability detection</p>
                  </div>
                </div>

                {/* Scanning Animation */}
                <div className="relative h-32 bg-secondary/30 rounded-lg mb-6 overflow-hidden">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <code className="text-xs text-muted-foreground/60 font-mono">
                      {'const user = await db.query("SELECT * FROM users WHERE id = " + userId);'}
                    </code>
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-b from-primary/20 via-primary/10 to-transparent scanning-line" />
                </div>

                {/* Results */}
                <div className="space-y-3">
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 1 }}
                    className="flex items-center gap-3 p-3 rounded-lg bg-destructive/10 border border-destructive/30"
                  >
                    <AlertTriangle className="h-5 w-5 text-destructive" />
                    <div className="flex-1">
                      <div className="text-sm font-medium text-foreground">SQL Injection Detected</div>
                      <div className="text-xs text-muted-foreground">CVSS Score: 9.8 (Critical)</div>
                    </div>
                    <span className="px-2 py-1 text-xs font-medium rounded bg-destructive text-destructive-foreground">
                      Critical
                    </span>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 1.3 }}
                    className="flex items-center gap-3 p-3 rounded-lg bg-success/10 border border-success/30"
                  >
                    <CheckCircle className="h-5 w-5 text-success" />
                    <div className="flex-1">
                      <div className="text-sm font-medium text-foreground">Fix Available</div>
                      <div className="text-xs text-muted-foreground">Use parameterized queries</div>
                    </div>
                    <Button size="sm" className="h-7 text-xs">
                      Apply Fix
                    </Button>
                  </motion.div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;

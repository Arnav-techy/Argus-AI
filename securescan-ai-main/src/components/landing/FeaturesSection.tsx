import { motion } from "framer-motion";
import { 
  Shield, 
  Zap, 
  Eye, 
  Lock, 
  FileCode, 
  BarChart3 
} from "lucide-react";

const features = [
  {
    icon: Shield,
    title: "AI-Powered Detection",
    description: "Advanced machine learning models identify vulnerabilities that traditional scanners miss.",
  },
  {
    icon: Zap,
    title: "Instant Analysis",
    description: "Get comprehensive security reports in under 2 seconds with real-time threat assessment.",
  },
  {
    icon: Eye,
    title: "Deep Code Inspection",
    description: "Line-by-line analysis of your codebase to find hidden security flaws and anti-patterns.",
  },
  {
    icon: Lock,
    title: "CVSS Scoring",
    description: "Industry-standard vulnerability scoring with severity levels from Critical to Low.",
  },
  {
    icon: FileCode,
    title: "Auto-Fix Suggestions",
    description: "One-click remediation with AI-generated code patches and best practice recommendations.",
  },
  {
    icon: BarChart3,
    title: "Security Metrics",
    description: "Track your security posture over time with detailed analytics and trend reports.",
  },
];

const FeaturesSection = () => {
  return (
    <section id="features" className="py-24 relative">
      <div className="absolute inset-0 bg-gradient-glow opacity-50" />
      
      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-sm font-medium text-primary uppercase tracking-wider">
            Features
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold mt-4 mb-6">
            Enterprise-Grade Security,{" "}
            <span className="text-gradient">Developer-Friendly</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Comprehensive security analysis tools designed to integrate seamlessly
            into your development workflow.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group relative p-6 rounded-xl border border-border bg-card/50 backdrop-blur-sm hover:border-primary/50 transition-all duration-300"
            >
              {/* Hover Glow */}
              <div className="absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 rounded-xl transition-opacity" />
              
              <div className="relative z-10">
                <div className="inline-flex p-3 rounded-lg bg-primary/10 mb-4">
                  <feature.icon className="h-6 w-6 text-primary" />
                </div>
                
                <h3 className="text-lg font-semibold text-foreground mb-2">
                  {feature.title}
                </h3>
                
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {feature.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;

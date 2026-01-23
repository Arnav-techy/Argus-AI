import { motion } from "framer-motion";
import { Upload, Cpu, FileCheck, ShieldCheck } from "lucide-react";

const steps = [
  {
    icon: Upload,
    step: "01",
    title: "Upload Your Code",
    description: "Paste code snippets, upload files, or connect your repository for comprehensive analysis.",
  },
  {
    icon: Cpu,
    step: "02",
    title: "AI Analysis",
    description: "Our advanced AI engine scans for vulnerabilities, misconfigurations, and security anti-patterns.",
  },
  {
    icon: FileCheck,
    step: "03",
    title: "Get Detailed Report",
    description: "Receive severity ratings, CVSS scores, and prioritized vulnerability findings.",
  },
  {
    icon: ShieldCheck,
    step: "04",
    title: "Apply Fixes",
    description: "Implement AI-suggested remediation with one-click patches and best practice guidance.",
  },
];

const HowItWorksSection = () => {
  return (
    <section id="how-it-works" className="py-24 relative bg-secondary/20">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-sm font-medium text-primary uppercase tracking-wider">
            How It Works
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold mt-4 mb-6">
            From Code to{" "}
            <span className="text-gradient">Secure</span> in Seconds
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            A streamlined workflow that integrates security into your development process
            without slowing you down.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <motion.div
              key={step.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.15 }}
              className="relative text-center"
            >
              {/* Connector Line */}
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-16 left-1/2 w-full h-px bg-gradient-to-r from-primary/50 to-transparent" />
              )}

              <div className="relative z-10">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-card border border-border mb-6 pulse-glow">
                  <step.icon className="h-8 w-8 text-primary" />
                </div>

                <div className="text-xs font-bold text-primary mb-2">{step.step}</div>
                
                <h3 className="text-lg font-semibold text-foreground mb-3">
                  {step.title}
                </h3>
                
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {step.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;

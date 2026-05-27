import { motion, AnimatePresence } from "framer-motion";
import { X, Database, BarChart3, Code2, ArrowRight, CheckCircle2 } from "lucide-react";
import { Project } from "@/lib/index";
import { useState } from "react";
import { Badge } from "@/components/ui/badge";

interface ProjectModalProps {
  project: Project | null;
  isOpen: boolean;
  onClose: () => void;
}

const tagColorMap: Record<string, string> = {
  blue: "bg-blue-100 text-blue-800 border-blue-200",
  teal: "bg-teal-100 text-teal-800 border-teal-200",
  gray: "bg-gray-100 text-gray-700 border-gray-200",
  purple: "bg-purple-100 text-purple-800 border-purple-200",
};

export function ProjectModal({ project, isOpen, onClose }: ProjectModalProps) {
  const [codeOpen, setCodeOpen] = useState(false);

  if (!project?.caseStudy) return null;
  const cs = project.caseStudy;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto py-8 px-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <div className="absolute inset-0 bg-background/80 backdrop-blur-sm" />

          <motion.div
            className="relative z-10 w-full max-w-3xl bg-card border border-border rounded-2xl shadow-2xl overflow-hidden"
            initial={{ opacity: 0, y: 40, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.98 }}
            transition={{ type: "spring", stiffness: 280, damping: 32 }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="relative p-8 pb-6 border-b border-border">
              <button
                onClick={onClose}
                className="absolute top-6 right-6 p-2 rounded-lg hover:bg-secondary transition-colors"
                aria-label="Close modal"
              >
                <X className="w-5 h-5 text-muted-foreground" />
              </button>

              <div className="flex items-center gap-2 mb-3">
                <Badge variant="secondary" className="text-xs font-medium text-primary border-primary/20 bg-primary/10">
                  <Database className="w-3 h-3 mr-1" />
                  {project.category}
                </Badge>
              </div>

              <h2 className="text-2xl font-bold text-foreground pr-12">{project.title}</h2>

              {/* Tech stack tags */}
              <div className="flex flex-wrap gap-2 mt-4">
                {cs.techStack.map((tool) => (
                  <span
                    key={tool.name}
                    className={`px-2.5 py-1 text-xs font-semibold rounded-md border ${tagColorMap[tool.color] ?? tagColorMap.gray}`}
                  >
                    {tool.name}
                  </span>
                ))}
              </div>
            </div>

            {/* Body */}
            <div className="p-8 space-y-8">

              {/* Problem */}
              <div>
                <h3 className="text-sm font-bold uppercase tracking-widest text-muted-foreground mb-3">
                  The Problem
                </h3>
                <p className="text-foreground leading-relaxed">{cs.problem}</p>
              </div>

              {/* Solution */}
              <div>
                <h3 className="text-sm font-bold uppercase tracking-widest text-muted-foreground mb-3">
                  Engineering Solution
                </h3>
                <p className="text-foreground leading-relaxed">{cs.solution}</p>
              </div>

              {/* Pipeline diagram */}
              {cs.pipelineImage && (
                <div>
                  <h3 className="text-sm font-bold uppercase tracking-widest text-muted-foreground mb-3 flex items-center gap-2">
                    <ArrowRight className="w-4 h-4" /> Data Pipeline
                  </h3>
                  <div className="rounded-xl overflow-hidden border border-border bg-secondary/30">
                    <img
                      src={cs.pipelineImage}
                      alt="Data pipeline architecture"
                      className="w-full h-auto object-contain"
                    />
                  </div>
                </div>
              )}

              {/* Code snippet */}
              {cs.codeSnippet && (
                <div>
                  <button
                    onClick={() => setCodeOpen(!codeOpen)}
                    className="flex items-center gap-2 text-sm font-bold uppercase tracking-widest text-muted-foreground hover:text-primary transition-colors"
                  >
                    <Code2 className="w-4 h-4" />
                    Pipeline Code Example
                    <span className="text-xs font-normal normal-case tracking-normal ml-1">
                      {codeOpen ? "— hide" : "— show"}
                    </span>
                  </button>
                  <AnimatePresence>
                    {codeOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.25 }}
                        className="overflow-hidden"
                      >
                        <pre className="mt-3 p-4 bg-secondary rounded-xl text-xs leading-relaxed overflow-x-auto text-foreground border border-border">
                          <code>{cs.codeSnippet}</code>
                        </pre>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              )}

              {/* Dashboard image */}
              {cs.dashboardImage && (
                <div>
                  <h3 className="text-sm font-bold uppercase tracking-widest text-muted-foreground mb-3 flex items-center gap-2">
                    <BarChart3 className="w-4 h-4" /> Analytics Output
                  </h3>
                  <div className="rounded-xl overflow-hidden border border-border">
                    <img
                      src={cs.dashboardImage}
                      alt="Analytics dashboard"
                      className="w-full h-auto object-cover"
                    />
                  </div>
                </div>
              )}

              {/* Metrics */}
              <div>
                <h3 className="text-sm font-bold uppercase tracking-widest text-muted-foreground mb-4">
                  Key Metrics
                </h3>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {cs.metrics.map((m) => (
                    <div key={m.label} className="p-4 bg-secondary/50 rounded-xl border border-border text-center">
                      <div className="text-2xl font-bold text-primary mb-1">{m.value}</div>
                      <div className="text-xs text-muted-foreground leading-snug">{m.label}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Data destination */}
              <div className="flex gap-3 p-5 bg-primary/5 border border-primary/20 rounded-xl">
                <CheckCircle2 className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm font-semibold text-foreground mb-1">Where the data goes</p>
                  <p className="text-sm text-muted-foreground leading-relaxed">{cs.dataDestination}</p>
                </div>
              </div>

            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

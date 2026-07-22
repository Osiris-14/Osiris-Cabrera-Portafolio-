import { useParams, Link, Navigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  ArrowRight,
  Database,
  BarChart3,
  CheckCircle2,
  Github,
  ExternalLink,
} from "lucide-react";
import { projects, projectDetailPath, ROUTE_PATHS } from "@/lib/index";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

const tagColorMap: Record<string, string> = {
  blue: "bg-blue-100 text-blue-800 border-blue-200",
  teal: "bg-teal-100 text-teal-800 border-teal-200",
  gray: "bg-gray-100 text-gray-700 border-gray-200",
  purple: "bg-purple-100 text-purple-800 border-purple-200",
};

const fadeInUp = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { type: "spring", stiffness: 300, damping: 35 },
};

/** Full case-study page for a single project (/projects/:id). */
export default function ProjectDetail() {
  const { id } = useParams<{ id: string }>();
  const project = projects.find((p) => p.id === id);

  // Unknown id or project without a case study → back to the gallery
  if (!project || !project.caseStudy) {
    return <Navigate to={ROUTE_PATHS.PROJECTS} replace />;
  }

  const cs = project.caseStudy;

  // Prev / next navigation across visible case studies
  const caseStudies = projects.filter((p) => p.visible !== false && p.caseStudy);
  const index = caseStudies.findIndex((p) => p.id === project.id);
  const prev = caseStudies[index - 1];
  const next = caseStudies[index + 1];

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-16 max-w-4xl">
        {/* Back link */}
        <motion.div {...fadeInUp}>
          <Link
            to={ROUTE_PATHS.PROJECTS}
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors mb-10"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Projects
          </Link>
        </motion.div>

        {/* Header */}
        <motion.header {...fadeInUp} className="mb-12">
          <Badge
            variant="secondary"
            className="text-xs font-medium text-primary border-primary/20 bg-primary/10 mb-4"
          >
            <Database className="w-3 h-3 mr-1" />
            {project.category}
          </Badge>
          <h1 className="text-3xl md:text-5xl font-bold tracking-tight mb-4">
            {project.title}
          </h1>
          <p className="text-lg text-muted-foreground leading-relaxed mb-6">
            {project.description}
          </p>

          <div className="flex flex-wrap gap-2 mb-8">
            {cs.techStack.map((tool) => (
              <span
                key={tool.name}
                className={`px-2.5 py-1 text-xs font-semibold rounded-md border ${
                  tagColorMap[tool.color] ?? tagColorMap.gray
                }`}
              >
                {tool.name}
              </span>
            ))}
          </div>

          <div className="flex flex-wrap gap-3">
            {project.githubUrl && (
              <Button variant="outline" size="sm" asChild className="gap-2">
                <a href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                  <Github className="w-4 h-4" />
                  Source Code
                </a>
              </Button>
            )}
            {project.demoUrl && (
              <Button variant="default" size="sm" asChild className="gap-2">
                <a href={project.demoUrl} target="_blank" rel="noopener noreferrer">
                  <ExternalLink className="w-4 h-4" />
                  View Full Report
                </a>
              </Button>
            )}
          </div>
        </motion.header>

        {/* Metrics */}
        <motion.section {...fadeInUp} className="mb-12">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {cs.metrics.map((m) => (
              <div
                key={m.label}
                className="p-5 bg-card rounded-2xl border border-border text-center shadow-sm"
              >
                <div className="text-2xl md:text-3xl font-bold text-primary mb-1">
                  {m.value}
                </div>
                <div className="text-xs text-muted-foreground leading-snug">{m.label}</div>
              </div>
            ))}
          </div>
        </motion.section>

        {/* Problem */}
        <motion.section {...fadeInUp} className="mb-12">
          <h2 className="text-sm font-bold uppercase tracking-widest text-muted-foreground mb-3">
            The Problem
          </h2>
          <p className="text-foreground leading-relaxed text-lg">{cs.problem}</p>
        </motion.section>

        {/* Solution */}
        <motion.section {...fadeInUp} className="mb-12">
          <h2 className="text-sm font-bold uppercase tracking-widest text-muted-foreground mb-3">
            Engineering Solution
          </h2>
          <p className="text-foreground leading-relaxed text-lg">{cs.solution}</p>
        </motion.section>

        {/* Pipeline diagram */}
        {cs.pipelineImage && (
          <motion.section {...fadeInUp} className="mb-12">
            <h2 className="text-sm font-bold uppercase tracking-widest text-muted-foreground mb-3 flex items-center gap-2">
              <ArrowRight className="w-4 h-4" /> Data Pipeline
            </h2>
            <div className="rounded-2xl overflow-hidden border border-border bg-secondary/30">
              <img
                src={cs.pipelineImage}
                alt="Data pipeline architecture"
                className="w-full h-auto object-contain"
              />
            </div>
          </motion.section>
        )}

        {/* Code snippet */}
        {cs.codeSnippet && (
          <motion.section {...fadeInUp} className="mb-12">
            <h2 className="text-sm font-bold uppercase tracking-widest text-muted-foreground mb-3">
              Pipeline Code Example
            </h2>
            <pre className="p-5 bg-[#0d1117] rounded-2xl text-xs md:text-sm leading-relaxed overflow-x-auto text-white/90 border border-border">
              <code>{cs.codeSnippet}</code>
            </pre>
          </motion.section>
        )}

        {/* Dashboard output */}
        {cs.dashboardImage && (
          <motion.section {...fadeInUp} className="mb-12">
            <h2 className="text-sm font-bold uppercase tracking-widest text-muted-foreground mb-3 flex items-center gap-2">
              <BarChart3 className="w-4 h-4" /> Analytics Output
            </h2>
            <div className="rounded-2xl overflow-hidden border border-border shadow-lg">
              <img
                src={cs.dashboardImage}
                alt="Analytics dashboard"
                className="w-full h-auto object-cover"
              />
            </div>
          </motion.section>
        )}

        {/* Data destination */}
        <motion.section {...fadeInUp} className="mb-16">
          <div className="flex gap-3 p-6 bg-primary/5 border border-primary/20 rounded-2xl">
            <CheckCircle2 className="w-5 h-5 text-primary shrink-0 mt-0.5" />
            <div>
              <p className="text-sm font-semibold text-foreground mb-1">Where the data goes</p>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {cs.dataDestination}
              </p>
            </div>
          </div>
        </motion.section>

        {/* Prev / Next case studies */}
        <nav className="flex items-center justify-between gap-4 border-t border-border pt-8">
          {prev ? (
            <Link
              to={projectDetailPath(prev.id)}
              className="group flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
            >
              <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
              <span className="max-w-[12rem] truncate">{prev.title}</span>
            </Link>
          ) : (
            <span />
          )}
          {next ? (
            <Link
              to={projectDetailPath(next.id)}
              className="group flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-primary transition-colors text-right"
            >
              <span className="max-w-[12rem] truncate">{next.title}</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          ) : (
            <span />
          )}
        </nav>
      </div>
    </div>
  );
}

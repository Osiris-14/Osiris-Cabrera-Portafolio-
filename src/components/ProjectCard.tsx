import { motion } from "framer-motion";
import { Github, ExternalLink, Database, BarChart3, Cpu, Brain } from "lucide-react";
import { Project } from "@/lib/index";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

interface ProjectCardProps {
  project: Project;
}

export function ProjectCard({ project }: ProjectCardProps) {
  const categoryIcon = {
    Análisis: <Database className="w-4 h-4" />,
    "Machine Learning": <Cpu className="w-4 h-4" />,
    Visualización: <BarChart3 className="w-4 h-4" />,
    "IA Engineering": <Brain className="w-4 h-4" />,
    "Data Engineering": <Brain className="w-4 h-4" />,
    "BI & Analytics": <BarChart3 className="w-4 h-4" />,
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{
        type: "spring",
        stiffness: 300,
        damping: 30,
      }}
      whileHover={{ y: -8 }}
      className="group relative flex flex-col h-full overflow-hidden rounded-xl border border-border bg-card transition-all hover:shadow-xl hover:shadow-primary/5"
    >
      {/* Project Image */}
      <div className="relative aspect-video overflow-hidden">
        <img
          src={project.image}
          alt={project.title}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        
        {/* Category Badge */}
        <div className="absolute top-3 left-3">
          <Badge 
            variant="secondary" 
            className="flex items-center gap-1.5 backdrop-blur-md bg-background/60 border-none px-3 py-1 text-xs font-medium"
          >
            {categoryIcon[project.category]}
            {project.category}
          </Badge>
        </div>
      </div>

      {/* Content */}
      <div className="flex flex-col flex-grow p-6">
        <h3 className="text-xl font-bold text-foreground mb-2 group-hover:text-primary transition-colors">
          {project.title}
        </h3>
        
        <p className="text-muted-foreground text-sm line-clamp-3 mb-4 flex-grow">
          {project.description}
        </p>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-6">
          {project.tags.map((tag) => (
            <span 
              key={tag} 
              className="px-2 py-1 text-[10px] uppercase tracking-wider font-bold bg-muted text-muted-foreground rounded-md border border-border"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Actions */}
        <div className="flex items-center gap-3 mt-auto pt-4 border-t border-border/50">
          {project.githubUrl && (
            <Button 
              variant="outline" 
              size="sm" 
              asChild 
              className="h-9 px-3 gap-2 flex-1 border-border/50 hover:bg-secondary hover:text-secondary-foreground"
            >
              <a 
                href={project.githubUrl} 
                target="_blank" 
                rel="noopener noreferrer"
              >
                <Github className="w-4 h-4" />
                Código
              </a>
            </Button>
          )}
          {project.demoUrl && (
            <Button 
              variant="default" 
              size="sm" 
              asChild 
              className="h-9 px-3 gap-2 flex-1 bg-primary text-primary-foreground hover:bg-primary/90"
            >
              <a 
                href={project.demoUrl} 
                target="_blank" 
                rel="noopener noreferrer"
              >
                <ExternalLink className="w-4 h-4" />
                Demo
              </a>
            </Button>
          )}
        </div>
      </div>
    </motion.div>
  );
}

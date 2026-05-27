import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Filter, Database, BarChart3, Search, ArrowRight } from 'lucide-react';
import { projects, Project, ROUTE_PATHS } from '@/lib/index';
import { ProjectCard } from '@/components/ProjectCard';
import { IMAGES } from '@/assets/images';
import { Link } from 'react-router-dom';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: 'spring',
      stiffness: 300,
      damping: 30
    }
  }
};

type ProjectCategory = Project['category'] | 'All';

const CATEGORIES: ProjectCategory[] = ['All', 'Data Engineering', 'Data Engineering + Analytics'];

const categoryIcons: Record<string, React.ReactNode> = {
  'All': <Filter className="w-4 h-4" />,
  'Data Engineering': <Database className="w-4 h-4" />,
  'Data Engineering + Analytics': <BarChart3 className="w-4 h-4" />,
};

export default function Projects() {
  const [activeCategory, setActiveCategory] = useState<ProjectCategory>('All');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredProjects = useMemo(() => {
    return projects.filter((project) => {
      const matchesVisible = project.visible !== false;
      const matchesCategory = activeCategory === 'All' || project.category === activeCategory;
      const matchesSearch = project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           project.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           project.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
      return matchesVisible && matchesCategory && matchesSearch;
    });
  }, [activeCategory, searchQuery]);

  return (
    <div className="min-h-screen bg-background">
      {/* Page Header Section */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        {/* Decorative Background */}
        <div className="absolute inset-0 z-0 opacity-20">
          <img
            src={IMAGES.DATA_DASHBOARD_2}
            alt="Data engineering background"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-background via-transparent to-background" />
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-4xl"
          >
            <span className="inline-block px-4 py-1.5 mb-6 text-sm font-semibold tracking-wider text-primary uppercase bg-primary/10 rounded-full">
              My Work
            </span>
            <h1 className="text-5xl md:text-7xl font-bold mb-8 tracking-tight">
              Data Engineering & <span className="text-primary">Analytics Solutions</span>
            </h1>
            <p className="text-xl text-muted-foreground leading-relaxed max-w-2xl">
              End-to-end data projects — from pipeline architecture and data modeling to analytics dashboards powered by clean, well-structured data.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Filters & Search Toolbar */}
      <section className="sticky top-0 z-40 bg-background/80 backdrop-blur-xl border-b border-border">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8">
            {/* Category Tabs */}
            <div className="flex flex-wrap items-center gap-3">
              {CATEGORIES.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`
                    group flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 border
                    ${activeCategory === cat
                      ? 'bg-primary text-primary-foreground border-primary shadow-lg shadow-primary/20 scale-105'
                      : 'bg-card text-muted-foreground border-border hover:border-primary/50 hover:text-foreground'}
                  `}
                >
                  <span className={`${activeCategory === cat ? 'text-white' : 'text-primary'}`}>
                    {categoryIcons[cat]}
                  </span>
                  {cat}
                </button>
              ))}
            </div>

            {/* Search Input */}
            <div className="relative w-full lg:w-96">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground group-focus-within:text-primary transition-colors" />
              <input
                type="text"
                placeholder="Search by technology or keyword..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-3 bg-card border border-border rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary text-sm transition-all shadow-sm"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Projects Grid */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <AnimatePresence mode='wait'>
            {filteredProjects.length > 0 ? (
              <motion.div
                key="grid"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10"
              >
                {filteredProjects.map((project) => (
                  <motion.div key={project.id} variants={itemVariants} layout>
                    <ProjectCard project={project} />
                  </motion.div>
                ))}
              </motion.div>
            ) : (
              <motion.div
                key="empty"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="flex flex-col items-center justify-center py-32 text-center"
              >
                <div className="w-24 h-24 mb-8 bg-muted flex items-center justify-center rounded-3xl">
                  <Search className="w-10 h-10 text-muted-foreground/50" />
                </div>
                <h3 className="text-3xl font-bold mb-3">No results found</h3>
                <p className="text-muted-foreground text-lg max-w-md">
                  No projects match your search.
                </p>
                <button
                  onClick={() => { setActiveCategory('All'); setSearchQuery(''); }}
                  className="mt-8 px-8 py-3 bg-secondary text-secondary-foreground font-semibold rounded-xl hover:bg-muted transition-colors"
                >
                  View all projects
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>

      {/* Bottom CTA Section */}
      <section className="py-24 border-t border-border bg-gradient-to-b from-transparent to-primary/5">
        <div className="container mx-auto px-4">
          <div className="bg-card border border-border rounded-[2.5rem] p-12 md:p-20 shadow-2xl relative overflow-hidden">
            {/* Background Accent */}
            <div className="absolute -top-24 -right-24 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />

            <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-12">
              <div className="text-center md:text-left">
                <h2 className="text-3xl md:text-5xl font-bold mb-6">Need to turn your raw data into insights?</h2>
                <p className="text-lg text-muted-foreground max-w-xl">
                  Available for Data Engineer roles, data pipeline projects, ETL/ELT architecture, and analytics infrastructure. Let's talk about your data challenges.
                </p>
              </div>
              <Link
                to={ROUTE_PATHS.CONTACT}
                className="group inline-flex items-center gap-3 px-10 py-5 bg-primary text-primary-foreground font-bold rounded-2xl hover:scale-105 transition-all shadow-xl shadow-primary/20"
              >
                Start a project
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Footer-like small info */}
      <div className="py-12 border-t border-border/50 text-center text-sm text-muted-foreground">
        <p>© 2026 • Osiris Cabrera Portfolio</p>
      </div>
    </div>
  );
}

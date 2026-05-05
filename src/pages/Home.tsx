import React from "react";
import { motion } from "framer-motion";
import { 
  ArrowRight, 
  Database, 
  BarChart3, 
  Code2, 
  BrainCircuit, 
  Mail, 
  Linkedin, 
  Github, 
  ChevronRight,
  Download
} from "lucide-react";
import { Link } from "react-router-dom";
import { 
  ROUTE_PATHS, 
  skills, 
  projects, 
  Project 
} from "@/lib/index";
import { ProjectCard } from "@/components/ProjectCard";
import { IMAGES } from "@/assets/images";
import aboutVideo from "../assets/about.mp4/Video.mp4";

const springTransition = {
  type: "spring",
  stiffness: 300,
  damping: 35
};

const fadeInUp = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: springTransition
};

const staggerContainer = {
  initial: {},
  whileInView: { transition: { staggerChildren: 0.1 } },
  viewport: { once: true }
};

export default function Home() {
  const featuredProjects = projects.slice(0, 3);

  return (
    <div className="flex flex-col w-full">
      {/* Hero Section */}
      <section 
        id="hero" 
        className="relative min-h-[90vh] flex items-center justify-center overflow-hidden py-24"
      >
        <div className="absolute inset-0 z-0">
          <img 
            src={IMAGES.TECH_BACKGROUND_1} 
            alt="Background" 
            className="w-full h-full object-cover opacity-30"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-background/50 via-transparent to-background/70" />
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <motion.div 
            className="max-w-4xl mx-auto text-center"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ ...springTransition, delay: 0.2 }}
          >
            <motion.span 
              className="inline-block px-4 py-1.5 mb-6 text-sm font-medium tracking-wider uppercase bg-accent/20 text-accent-foreground rounded-full border border-accent/30"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.4 }}
            >
              Data Analytics | AI & Machine Learning | Data Engineering
            </motion.span>
            <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-6 text-foreground">
              Transformando Datos en <span className="text-primary">Visiones Estratégicas</span>
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground mb-10 leading-relaxed max-w-2xl mx-auto">
              Especialista en Data Analytics, AI & Machine Learning y Data Engineering, creando soluciones basadas en datos que impulsan inteligencia, automatización y crecimiento en entornos reales.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link 
                to={ROUTE_PATHS.PROJECTS} 
                className="group inline-flex items-center justify-center px-8 py-4 text-lg font-medium text-primary-foreground bg-primary rounded-xl shadow-lg hover:shadow-primary/25 transition-all duration-300 hover:scale-[1.02]"
              >
                Ver Proyectos
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              <a 
                href="#contact"
                className="inline-flex items-center justify-center px-8 py-4 text-lg font-medium text-foreground bg-secondary/80 backdrop-blur border border-border rounded-xl hover:bg-secondary transition-all duration-300"
              >
                Contactar
              </a>
            </div>
          </motion.div>
        </div>

        <motion.div 
          className="absolute bottom-10 left-1/2 -translate-x-1/2"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <div className="w-6 h-10 border-2 border-muted-foreground/30 rounded-full flex justify-center p-1">
            <div className="w-1.5 h-1.5 bg-muted-foreground/50 rounded-full" />
          </div>
        </motion.div>
      </section>

      {/* About Section */}
      <section id="about" className="py-24 bg-secondary/30">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div {...fadeInUp}>
              <h2 className="text-3xl md:text-4xl font-bold mb-6">Sobre Mí</h2>
              <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
              He venido desarrollando experiencia trabajando con datos a lo largo de su ciclo, desde el análisis y la exploración hasta la construcción de soluciones que permiten extraer valor de la información.
            </p>
            <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
               Durante este proceso, he integrado áreas como Data Analytics, Data Science, AI & Machine Learning y Data Engineering, aplicándolas en el desarrollo de análisis, modelos y flujos de datos orientados a resolver problemas y apoyar la toma de decisiones.
              </p>
              <div className="grid grid-cols-2 gap-6 mb-10">
                <div className="p-4 bg-background rounded-2xl border border-border shadow-sm">
                  <div className="text-3xl font-bold text-primary mb-1">+20</div>
                  <div className="text-sm text-muted-foreground uppercase tracking-wider">Proyectos Completados</div>
                </div>
                <div className="p-4 bg-background rounded-2xl border border-border shadow-sm">
                  <div className="text-3xl font-bold text-primary mb-1">+3</div>
                  <div className="text-sm text-muted-foreground uppercase tracking-wider">Años de Experiencia</div>
                </div>
              </div>
              <Link 
                to={ROUTE_PATHS.ABOUT}
                className="inline-flex items-center text-primary font-semibold hover:underline group"
              >
                Leer más sobre mi trayectoria
                <ChevronRight className="ml-1 w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </motion.div>
            
                        <motion.div 
              className="relative aspect-video"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={springTransition}
            >
              <div className="absolute inset-0 bg-primary/10 rounded-3xl -rotate-3" />

              <img
              src="/Osiris.jpg"
              alt="Osiris Cabrera"
              className="relative z-10 w-full h-[800px] object-cover object-[center_45%] rounded-3xl shadow-2xl rotate-3 transition-transform hover:rotate-0 duration-500"
            />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="py-24">
        <div className="container mx-auto px-4">
          <motion.div 
            className="text-center max-w-3xl mx-auto mb-16"
            {...fadeInUp}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Stack Tecnológico</h2>
            <p className="text-lg text-muted-foreground">
              Herramientas y tecnologías que utilizo para transformar datos brutos en inteligencia competitiva.
            </p>
          </motion.div>

          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
            variants={staggerContainer}
            initial="initial"
            whileInView="whileInView"
            viewport={{ once: true }}
          >
            <motion.div variants={fadeInUp} className="p-8 bg-card rounded-3xl border border-border shadow-sm hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-primary/10 rounded-2xl flex items-center justify-center text-primary mb-6">
                <Code2 className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold mb-4">Lenguajes</h3>
              <ul className="space-y-3">
                {skills.filter(s => s.category === "Lenguajes").map(skill => (
                  <li key={skill.name} className="flex items-center justify-between">
                    <span className="text-muted-foreground">{skill.name}</span>
                    <span className="text-xs font-mono bg-secondary px-2 py-0.5 rounded">{skill.level}%</span>
                  </li>
                ))}
              </ul>
            </motion.div>

            <motion.div variants={fadeInUp} className="p-8 bg-card rounded-3xl border border-border shadow-sm hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-accent/10 rounded-2xl flex items-center justify-center text-accent-foreground mb-6">
                <BrainCircuit className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold mb-4">ML & IA</h3>
              <ul className="space-y-3">
                {skills.filter(s => s.category === "ML/IA").map(skill => (
                  <li key={skill.name} className="flex items-center justify-between">
                    <span className="text-muted-foreground">{skill.name}</span>
                    <span className="text-xs font-mono bg-secondary px-2 py-0.5 rounded">{skill.level}%</span>
                  </li>
                ))}
              </ul>
            </motion.div>

            <motion.div variants={fadeInUp} className="p-8 bg-card rounded-3xl border border-border shadow-sm hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-primary/10 rounded-2xl flex items-center justify-center text-primary mb-6">
                <BarChart3 className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold mb-4">Visualización</h3>
              <ul className="space-y-3">
                {skills.filter(s => s.category === "Visualización").map(skill => (
                  <li key={skill.name} className="flex items-center justify-between">
                    <span className="text-muted-foreground">{skill.name}</span>
                    <span className="text-xs font-mono bg-secondary px-2 py-0.5 rounded">{skill.level}%</span>
                  </li>
                ))}
              </ul>
            </motion.div>

            <motion.div variants={fadeInUp} className="p-8 bg-card rounded-3xl border border-border shadow-sm hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-accent/10 rounded-2xl flex items-center justify-center text-accent-foreground mb-6">
                <Database className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold mb-4">Cloud & Data</h3>
              <ul className="space-y-3">
                {skills.filter(s => s.category === "Cloud & Data").map(skill => (
                  <li key={skill.name} className="flex items-center justify-between">
                    <span className="text-muted-foreground">{skill.name}</span>
                    <span className="text-xs font-mono bg-secondary px-2 py-0.5 rounded">{skill.level}%</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-24 bg-secondary/30">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-end justify-between mb-16 gap-6">
            <motion.div className="max-w-2xl" {...fadeInUp}>
              <h2 className="text-3xl md:text-4xl font-bold mb-6">Proyectos Destacados</h2>
              <p className="text-lg text-muted-foreground">
                Una selección de trabajos recientes que demuestran mi capacidad para resolver problemas complejos mediante análisis de datos y modelado predictivo.
              </p>
            </motion.div>
            <motion.div {...fadeInUp}>
              <Link 
                to={ROUTE_PATHS.PROJECTS}
                className="inline-flex items-center px-6 py-3 bg-background border border-border rounded-xl font-medium hover:bg-secondary transition-colors"
              >
                Ver todos los proyectos
                <ArrowRight className="ml-2 w-4 h-4" />
              </Link>
            </motion.div>
          </div>

          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            variants={staggerContainer}
            initial="initial"
            whileInView="whileInView"
            viewport={{ once: true }}
          >
            {featuredProjects.map((project: Project) => (
              <motion.div key={project.id} variants={fadeInUp}>
                <ProjectCard project={project} />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-24 overflow-hidden">
        <div className="container mx-auto px-4">
          <div className="relative p-12 md:p-20 bg-primary rounded-[3rem] shadow-2xl overflow-hidden">
            <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 w-96 h-96 bg-white/10 rounded-full blur-3xl" />
            <div className="absolute bottom-0 left-0 translate-y-1/2 -translate-x-1/2 w-96 h-96 bg-white/5 rounded-full blur-3xl" />
            
            <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <motion.div {...fadeInUp}>
                <h2 className="text-4xl md:text-5xl font-bold text-primary-foreground mb-8">
                  ¿Listo para potenciar tus decisiones con datos?
                </h2>
                <p className="text-xl text-primary-foreground/80 mb-10">
                  Estoy abierto a nuevas oportunidades de colaboración, proyectos freelance o ofertas laborales. Si tienes un desafío de datos o simplemente quieres conectar, no dudes en contactarme.
                </p>
                <div className="flex flex-wrap gap-4">
                  <a 
                    href="mailto:osce1428@gmail.com" 
                    className="flex items-center px-6 py-4 bg-white text-primary rounded-2xl font-bold hover:scale-[1.05] transition-transform"
                  >
                    <Mail className="mr-2 w-5 h-5" />
                    osce1428@gmail.com
                  </a>
                  <div className="flex gap-4">
                    <a 
                      href="#"
                      className="flex items-center justify-center w-14 h-14 bg-white/10 hover:bg-white/20 text-white rounded-2xl transition-colors border border-white/20"
                    >
                      <Linkedin className="w-6 h-6" />
                    </a>
                    <a 
                      href="#"
                      className="flex items-center justify-center w-14 h-14 bg-white/10 hover:bg-white/20 text-white rounded-2xl transition-colors border border-white/20"
                    >
                      <Github className="w-6 h-6" />
                    </a>
                  </div>
                </div>
              </motion.div>

              <motion.div 
                className="bg-white/5 backdrop-blur-md border border-white/10 rounded-[2rem] p-8"
                {...fadeInUp}
              >
                <h3 className="text-2xl font-bold text-white mb-6">Envíame un mensaje</h3>
                <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
                  <div>
                    <input 
                      type="text" 
                      placeholder="Tu Nombre"
                      className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-white/30"
                    />
                  </div>
                  <div>
                    <input 
                      type="email" 
                      placeholder="Tu Email"
                      className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-white/30"
                    />
                  </div>
                  <div>
                    <textarea 
                      placeholder="¿En qué puedo ayudarte?"
                      rows={4}
                      className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-white/30 resize-none"
                    />
                  </div>
                  <button 
                    type="submit"
                    className="w-full py-4 bg-white text-primary font-bold rounded-xl hover:bg-primary-foreground transition-colors"
                  >
                    Enviar Mensaje
                  </button>
                </form>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer Minimalist */}
      <footer className="py-12 border-t border-border">
        <div className="container mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex flex-col items-center md:items-start">
            <div className="text-xl font-bold text-foreground mb-2">
              Osiris Cabrera<span className="text-primary"> Portafolio</span>
            </div>
            <p className="text-sm text-muted-foreground">
              © 2026 Todos los derechos reservados.
            </p>
          </div>
          <div className="flex items-center gap-8">
            <a href="#hero" className="text-sm text-muted-foreground hover:text-primary transition-colors">Inicio</a>
            <a href="#about" className="text-sm text-muted-foreground hover:text-primary transition-colors">Sobre mí</a>
            <Link to={ROUTE_PATHS.PROJECTS} className="text-sm text-muted-foreground hover:text-primary transition-colors">Proyectos</Link>
            <a href="#contact" className="text-sm text-muted-foreground hover:text-primary transition-colors">Contacto</a>
          </div>
        </div>
      </footer>
    </div>
  );
}

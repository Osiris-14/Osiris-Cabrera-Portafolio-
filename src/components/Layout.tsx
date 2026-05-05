import React, { useState, useEffect, useRef } from "react";
import { NavLink, Link, useLocation } from "react-router-dom";
import { Menu, X, Database, BarChart3, Mail, User } from "lucide-react";
import { SiGithub, SiLinkedin} from "react-icons/si";
import { motion, AnimatePresence } from "framer-motion";
import { ROUTE_PATHS } from "@/lib/index";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import logo from "@/assets/Logo.png";

interface LayoutProps {
  children: React.ReactNode;
}

export function Layout({ children }: LayoutProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const headerRef = useRef<HTMLElement>(null);
  const [headerHeight, setHeaderHeight] = useState(0);
  const location = useLocation();

  // Handle header height and scroll state
  useEffect(() => {
    const updateHeaderHeight = () => {
      if (headerRef.current) {
        setHeaderHeight(headerRef.current.offsetHeight);
        document.documentElement.style.setProperty("--header-height", `${headerRef.current.offsetHeight}px`);
      }
    };

    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    updateHeaderHeight();
    window.addEventListener("resize", updateHeaderHeight);
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("resize", updateHeaderHeight);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setIsMenuOpen(false);
  }, [location]);

  const navLinks = [
    { name: "Inicio", path: ROUTE_PATHS.HOME, icon: Database },
    { name: "Proyectos", path: ROUTE_PATHS.PROJECTS, icon: BarChart3 },
    { name: "Sobre Mí", path: ROUTE_PATHS.ABOUT, icon: User },
    { name: "Contacto", path: ROUTE_PATHS.CONTACT, icon: Mail },
  ];

  const socialLinks = [
    { name: "GitHub", icon: SiGithub, url: "https://github.com" },
    { name: "LinkedIn", icon: SiLinkedin, url: "https://www.linkedin.com/in/osiris-yordalis-cabrera-lara-749b6a241/" }
  ];

  return (
    <div className="min-h-screen flex flex-col font-sans">
      {/* Navigation Header */}
      <header
        ref={headerRef}
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b",
          isScrolled
            ? "bg-background/80 backdrop-blur-md border-border py-3 shadow-sm"
            : "bg-transparent border-transparent py-5"
        )}
      >
        <div className="container mx-auto px-6 flex items-center justify-between">
          <Link
            to={ROUTE_PATHS.HOME}
            className="flex items-center gap-2 group transition-colors"
                      >
                                            <img
              src={logo}
              alt="Alyntic Systems"
              className="h-24 md:h-28 w-auto object-contain drop-shadow-md group-hover:scale-105 transition-transform"
            />
            <div className="flex flex-col">
              <span className="font-bold text-lg leading-none tracking-tight">Osiris Cabrera - Portfolio</span>
              <span className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground">
                AI • Data • Engineering
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <NavLink
                key={link.path}
                to={link.path}
                className={({ isActive }) =>
                  cn(
                    "text-sm font-medium transition-colors hover:text-primary relative py-1",
                    isActive
                      ? "text-primary after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-primary"
                      : "text-muted-foreground"
                  )
                }
              >
                {link.name}
              </NavLink>
            ))}
            <Button variant="default" size="sm" asChild className="ml-4">
              <Link to={ROUTE_PATHS.CONTACT}>Trabajemos</Link>
            </Button>
          </nav>

          {/* Mobile Menu Toggle */}
          <button
            className="md:hidden p-2 text-foreground hover:bg-muted rounded-md transition-colors"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed inset-0 z-40 bg-background md:hidden pt-24 px-6 flex flex-col gap-6"
          >
            <div className="flex flex-col gap-4">
              {navLinks.map((link) => (
                <NavLink
                  key={link.path}
                  to={link.path}
                  className={({ isActive }) => 
                    cn(
                      "flex items-center gap-4 text-2xl font-semibold py-3 border-b border-border/50",
                      isActive ? "text-primary" : "text-muted-foreground"
                    )
                  }
                >
                  <link.icon size={24} />
                  {link.name}
                </NavLink>
              ))}
            </div>
            
            <div className="mt-auto mb-12 flex flex-col gap-6">
              <div className="flex gap-6">
                {socialLinks.map((social) => (
                  <a
                    key={social.name}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 bg-muted rounded-full text-foreground hover:bg-primary hover:text-primary-foreground transition-all"
                  >
                    <social.icon size={24} />
                  </a>
                ))}
              </div>
              <Button className="w-full text-lg py-6" asChild>
                <Link to={ROUTE_PATHS.CONTACT}>Contáctame Ahora</Link>
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Content Area */}
      <main 
        className="flex-grow"
        style={{ paddingTop: `${headerHeight}px` }}
      >
        {children}
      </main>

      {/* Footer */}
      <footer className="bg-muted/50 border-t border-border mt-auto">
        <div className="container mx-auto px-6 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
            <div className="md:col-span-2">
              <Link to={ROUTE_PATHS.HOME} className="flex items-center gap-2 mb-4">
                <Database className="text-primary" size={24} />
                <span className="font-bold text-xl tracking-tight">Osiris Cabrera</span>
              </Link>
              <p className="text-muted-foreground text-sm max-w-sm mb-6">
                Transformando datos complejos en decisiones inteligentes. Especializado en análisis estadístico, 
                machine learning y visualización de datos de alto impacto.
              </p>
              <div className="flex gap-4">
                {socialLinks.map((social) => (
                  <a
                    key={social.name}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-muted-foreground hover:text-primary transition-colors"
                    title={social.name}
                  >
                    <social.icon size={20} />
                  </a>
                ))}
              </div>
            </div>

            <div>
              <h4 className="font-semibold mb-4 text-foreground uppercase tracking-wider text-xs">Navegación</h4>
              <ul className="space-y-2">
                {navLinks.map((link) => (
                  <li key={link.path}>
                    <Link
                      to={link.path}
                      className="text-sm text-muted-foreground hover:text-primary transition-colors"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-4 text-foreground uppercase tracking-wider text-xs">Contacto</h4>
              <ul className="space-y-2">
                <li className="text-sm text-muted-foreground">osce1428@gmail.com</li>
                <li className="text-sm text-muted-foreground">Santo Domingo / República Dominicana</li>
                <li className="text-sm text-muted-foreground">
                  <Link to={ROUTE_PATHS.CONTACT} className="text-primary hover:underline">
                    Disponible para proyectos
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-border mt-12 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-xs text-muted-foreground">
              © 2026 Osiris Cabrera Portfolio. Todos los derechos reservados.
            </p>
            <p className="text-xs text-muted-foreground flex items-center gap-1">
              Diseñado con precisión para el mundo de los datos <Database size={12} className="text-primary" />
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

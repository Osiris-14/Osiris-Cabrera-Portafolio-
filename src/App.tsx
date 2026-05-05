import { BrowserRouter, Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { ROUTE_PATHS } from "@/lib/index";
import { Layout } from "@/components/Layout";
import Home from "@/pages/Home";
import Projects from "@/pages/Projects";
import About from "@/pages/About";
import Contact from "@/pages/Contact";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // 5 minutos
      retry: 1,
    },
  },
});

/**
 * Componente raíz de la aplicación.
 * Configura el enrutamiento profesional y los proveedores globales del sistema.
 */
export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider delayDuration={300}>
        <BrowserRouter>
          <Layout>
            <Routes>
              {/* Ruta Principal: Dashboard/Landing de Portfolio */}
              <Route 
                path={ROUTE_PATHS.HOME} 
                element={<Home />} 
              />
              
              {/* Galería Completa de Proyectos de Data Science */}
              <Route 
                path={ROUTE_PATHS.PROJECTS} 
                element={<Projects />} 
              />
              
              {/* Detalle Profesional y Experiencia */}
              <Route 
                path={ROUTE_PATHS.ABOUT} 
                element={<About />} 
              />
              
              {/* Canal de Comunicación y Lead Generation */}
              <Route 
                path={ROUTE_PATHS.CONTACT} 
                element={<Contact />} 
              />

              {/* Manejo de Rutas No Encontradas - Redirección a Home o 404 Custom */}
              <Route 
                path="*" 
                element={<Home />} 
              />
            </Routes>
          </Layout>
        </BrowserRouter>
        
        {/* Notificaciones del Sistema */}
        <Toaster />
        <Sonner position="top-right" expand={false} richColors />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

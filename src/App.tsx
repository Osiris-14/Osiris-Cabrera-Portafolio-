import { BrowserRouter, Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { ROUTE_PATHS } from "@/lib/index";
import { Layout } from "@/components/Layout";
import Home from "@/pages/Home";
import Projects from "@/pages/Projects";
import ProjectDetail from "@/pages/ProjectDetail";
import About from "@/pages/About";
import Contact from "@/pages/Contact";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // 5 minutes
      retry: 1,
    },
  },
});

/**
 * Root application component.
 * Configures routing and global providers.
 */
export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider delayDuration={300}>
        <BrowserRouter>
          <Layout>
            <Routes>
              {/* Main Route: Portfolio Landing */}
              <Route 
                path={ROUTE_PATHS.HOME} 
                element={<Home />} 
              />
              
              {/* Full Data Projects Gallery */}
              <Route 
                path={ROUTE_PATHS.PROJECTS} 
                element={<Projects />} 
              />

              {/* Project Case Study Detail */}
              <Route
                path={ROUTE_PATHS.PROJECT_DETAIL}
                element={<ProjectDetail />}
              />
              
              {/* Professional Background and Experience */}
              <Route 
                path={ROUTE_PATHS.ABOUT} 
                element={<About />} 
              />
              
              {/* Communication Channel and Lead Generation */}
              <Route 
                path={ROUTE_PATHS.CONTACT} 
                element={<Contact />} 
              />

              {/* Fallback: Unknown Routes Redirect to Home */}
              <Route 
                path="*" 
                element={<Home />} 
              />
            </Routes>
          </Layout>
        </BrowserRouter>
        
        {/* System Notifications */}
        <Toaster />
        <Sonner position="top-right" expand={false} richColors />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

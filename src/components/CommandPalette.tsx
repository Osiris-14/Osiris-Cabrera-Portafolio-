import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Home,
  BarChart3,
  User,
  Mail,
  Github,
  Linkedin,
  Database,
  FileText,
} from "lucide-react";
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command";
import { ROUTE_PATHS, SOCIAL_LINKS, projects, projectDetailPath } from "@/lib/index";

/** Custom window event used by UI buttons to open the palette. */
export const OPEN_COMMAND_PALETTE_EVENT = "command-palette:open";

/**
 * Global command palette (Ctrl+K / Cmd+K).
 * Provides quick navigation to pages, project case studies, and social links.
 */
export function CommandPalette() {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setOpen((prev) => !prev);
      }
    };
    const onOpenEvent = () => setOpen(true);
    window.addEventListener("keydown", onKeyDown);
    window.addEventListener(OPEN_COMMAND_PALETTE_EVENT, onOpenEvent);
    return () => {
      window.removeEventListener("keydown", onKeyDown);
      window.removeEventListener(OPEN_COMMAND_PALETTE_EVENT, onOpenEvent);
    };
  }, []);

  const go = useCallback(
    (path: string) => {
      setOpen(false);
      navigate(path);
    },
    [navigate]
  );

  const openExternal = useCallback((url: string) => {
    setOpen(false);
    window.open(url, "_blank", "noopener,noreferrer");
  }, []);

  const caseStudies = projects.filter((p) => p.visible !== false && p.caseStudy);

  return (
    <CommandDialog open={open} onOpenChange={setOpen}>
      <CommandInput placeholder="Type a command or search..." />
      <CommandList>
        <CommandEmpty>No results found.</CommandEmpty>

        <CommandGroup heading="Navigation">
          <CommandItem onSelect={() => go(ROUTE_PATHS.HOME)}>
            <Home className="mr-2 h-4 w-4" />
            Home
          </CommandItem>
          <CommandItem onSelect={() => go(ROUTE_PATHS.PROJECTS)}>
            <BarChart3 className="mr-2 h-4 w-4" />
            Projects
          </CommandItem>
          <CommandItem onSelect={() => go(ROUTE_PATHS.ABOUT)}>
            <User className="mr-2 h-4 w-4" />
            About
          </CommandItem>
          <CommandItem onSelect={() => go(ROUTE_PATHS.CONTACT)}>
            <Mail className="mr-2 h-4 w-4" />
            Contact
          </CommandItem>
        </CommandGroup>

        <CommandSeparator />

        <CommandGroup heading="Case Studies">
          {caseStudies.map((project) => (
            <CommandItem
              key={project.id}
              onSelect={() => go(projectDetailPath(project.id))}
            >
              <FileText className="mr-2 h-4 w-4" />
              {project.title}
            </CommandItem>
          ))}
        </CommandGroup>

        <CommandSeparator />

        <CommandGroup heading="Connect">
          <CommandItem onSelect={() => openExternal(SOCIAL_LINKS.github)}>
            <Github className="mr-2 h-4 w-4" />
            GitHub
          </CommandItem>
          <CommandItem onSelect={() => openExternal(SOCIAL_LINKS.linkedin)}>
            <Linkedin className="mr-2 h-4 w-4" />
            LinkedIn
          </CommandItem>
          <CommandItem onSelect={() => openExternal(`mailto:${SOCIAL_LINKS.email}`)}>
            <Database className="mr-2 h-4 w-4" />
            {SOCIAL_LINKS.email}
          </CommandItem>
        </CommandGroup>
      </CommandList>
    </CommandDialog>
  );
}

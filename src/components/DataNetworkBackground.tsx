import { useEffect, useRef } from "react";

interface Node {
  x: number;
  y: number;
  vx: number;
  vy: number;
  r: number;
}

interface Packet {
  from: number;
  to: number;
  t: number; // 0..1 progress along the edge
  speed: number;
}

const LINK_DISTANCE = 140;
const MOUSE_DISTANCE = 170;
const PACKET_COUNT = 5;

/**
 * Animated "data network" canvas background.
 * Nodes drift like data points, edges link nearby nodes,
 * and small packets travel along the edges (data flowing through pipelines).
 */
export function DataNetworkBackground({ className = "" }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let width = 0;
    let height = 0;
    let rafId = 0;
    let nodes: Node[] = [];
    let packets: Packet[] = [];
    const mouse = { x: -9999, y: -9999 };

    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    const initNodes = () => {
      const count = Math.min(90, Math.floor((width * height) / 16000));
      nodes = Array.from({ length: count }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.35,
        vy: (Math.random() - 0.5) * 0.35,
        r: 1.4 + Math.random() * 1.8,
      }));
      packets = Array.from({ length: PACKET_COUNT }, () => ({
        from: 0,
        to: 0,
        t: 1, // start "finished" so they respawn on first frame
        speed: 0.008 + Math.random() * 0.012,
      }));
    };

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      width = rect.width;
      height = rect.height;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      initNodes();
      if (reducedMotion) drawFrame(); // static render, no animation loop
    };

    const drawFrame = () => {
      ctx.clearRect(0, 0, width, height);

      // Edges between nearby nodes
      for (let i = 0; i < nodes.length; i++) {
        const a = nodes[i];
        for (let j = i + 1; j < nodes.length; j++) {
          const b = nodes[j];
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const dist = Math.hypot(dx, dy);
          if (dist < LINK_DISTANCE) {
            const alpha = (1 - dist / LINK_DISTANCE) * 0.35;
            ctx.strokeStyle = `hsla(245, 60%, 45%, ${alpha})`;
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.stroke();
          }
        }
      }

      // Edges to mouse cursor
      for (const n of nodes) {
        const dist = Math.hypot(n.x - mouse.x, n.y - mouse.y);
        if (dist < MOUSE_DISTANCE) {
          const alpha = (1 - dist / MOUSE_DISTANCE) * 0.5;
          ctx.strokeStyle = `hsla(155, 55%, 38%, ${alpha})`;
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.moveTo(n.x, n.y);
          ctx.lineTo(mouse.x, mouse.y);
          ctx.stroke();
        }
      }

      // Nodes
      for (const n of nodes) {
        const nearMouse = Math.hypot(n.x - mouse.x, n.y - mouse.y) < MOUSE_DISTANCE;
        ctx.fillStyle = nearMouse
          ? "hsla(155, 55%, 38%, 0.9)"
          : "hsla(245, 60%, 45%, 0.65)";
        ctx.beginPath();
        ctx.arc(n.x, n.y, n.r, 0, Math.PI * 2);
        ctx.fill();
      }

      // Data packets traveling along edges
      for (const p of packets) {
        if (p.t >= 1) {
          // Respawn on a random valid edge
          const from = Math.floor(Math.random() * nodes.length);
          const a = nodes[from];
          let best = -1;
          let bestDist = Infinity;
          for (let j = 0; j < nodes.length; j++) {
            if (j === from) continue;
            const d = Math.hypot(a.x - nodes[j].x, a.y - nodes[j].y);
            if (d < LINK_DISTANCE && d < bestDist) {
              best = j;
              bestDist = d;
            }
          }
          if (best === -1) continue;
          p.from = from;
          p.to = best;
          p.t = 0;
        }
        const a = nodes[p.from];
        const b = nodes[p.to];
        // Invalidate if the edge broke
        if (Math.hypot(a.x - b.x, a.y - b.y) >= LINK_DISTANCE) {
          p.t = 1;
          continue;
        }
        const x = a.x + (b.x - a.x) * p.t;
        const y = a.y + (b.y - a.y) * p.t;
        ctx.fillStyle = "hsla(155, 65%, 35%, 0.95)";
        ctx.beginPath();
        ctx.arc(x, y, 2.2, 0, Math.PI * 2);
        ctx.fill();
        p.t += p.speed;
      }
    };

    const tick = () => {
      for (const n of nodes) {
        n.x += n.vx;
        n.y += n.vy;
        if (n.x < 0 || n.x > width) n.vx *= -1;
        if (n.y < 0 || n.y > height) n.vy *= -1;
      }
      drawFrame();
      rafId = requestAnimationFrame(tick);
    };

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
    };
    const handleMouseLeave = () => {
      mouse.x = -9999;
      mouse.y = -9999;
    };

    resize();
    window.addEventListener("resize", resize);
    if (!reducedMotion) {
      const parent = canvas.parentElement;
      parent?.addEventListener("mousemove", handleMouseMove);
      parent?.addEventListener("mouseleave", handleMouseLeave);
      rafId = requestAnimationFrame(tick);
      return () => {
        cancelAnimationFrame(rafId);
        window.removeEventListener("resize", resize);
        parent?.removeEventListener("mousemove", handleMouseMove);
        parent?.removeEventListener("mouseleave", handleMouseLeave);
      };
    }
    return () => window.removeEventListener("resize", resize);
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className={`absolute inset-0 w-full h-full ${className}`}
      aria-hidden="true"
    />
  );
}

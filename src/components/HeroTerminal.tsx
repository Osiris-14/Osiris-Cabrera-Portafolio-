import { useEffect, useState } from "react";

interface ScriptLine {
  cmd: string;
  out: string;
}

const SCRIPT: ScriptLine[] = [
  { cmd: "airflow dags trigger sales_health_pipeline", out: "✓ DAG triggered · 37 clients · 521K rows scanned" },
  { cmd: "dbt run --models marts", out: "✓ 12 models built successfully in 42s" },
  { cmd: "python ingest.py --source mitraffic_api", out: "✓ 1.1M records loaded → BigQuery" },
  { cmd: "pytest tests/pipelines -q", out: "✓ 24 passed · data quality checks 100%" },
];

const TYPE_SPEED = 45;
const OUTPUT_DELAY = 350;
const NEXT_LINE_DELAY = 1400;
const RESTART_DELAY = 4000;

interface RenderedLine {
  cmd: string;
  out: string | null;
}

/**
 * Fake terminal that types data-engineering commands in a loop.
 * Simulates a live pipeline session in the hero section.
 */
export function HeroTerminal() {
  const [lines, setLines] = useState<RenderedLine[]>([]);
  const [currentCmd, setCurrentCmd] = useState("");
  const [showCursor, setShowCursor] = useState(true);

  useEffect(() => {
    let cancelled = false;
    const timers: ReturnType<typeof setTimeout>[] = [];
    const later = (fn: () => void, ms: number) => {
      const id = setTimeout(() => {
        if (!cancelled) fn();
      }, ms);
      timers.push(id);
    };

    const typeCommand = (lineIdx: number, charIdx: number) => {
      const { cmd, out } = SCRIPT[lineIdx];
      if (charIdx <= cmd.length) {
        setCurrentCmd(cmd.slice(0, charIdx));
        later(() => typeCommand(lineIdx, charIdx + 1), TYPE_SPEED);
        return;
      }
      // Command finished → print output, commit line, move on
      later(() => {
        setLines((prev) => [...prev.slice(-5), { cmd, out }]);
        setCurrentCmd("");
        if (lineIdx + 1 < SCRIPT.length) {
          later(() => typeCommand(lineIdx + 1, 0), NEXT_LINE_DELAY);
        } else {
          later(() => {
            setLines([]);
            typeCommand(0, 0);
          }, RESTART_DELAY);
        }
      }, OUTPUT_DELAY);
    };

    typeCommand(0, 0);
    return () => {
      cancelled = true;
      timers.forEach(clearTimeout);
    };
  }, []);

  // Blinking cursor
  useEffect(() => {
    const id = setInterval(() => setShowCursor((v) => !v), 530);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="w-full max-w-xl mx-auto lg:mx-0 rounded-2xl border border-border bg-[#0d1117] shadow-2xl overflow-hidden text-left">
      {/* Title bar */}
      <div className="flex items-center gap-2 px-4 py-3 bg-white/5 border-b border-white/10">
        <span className="w-3 h-3 rounded-full bg-red-500/80" />
        <span className="w-3 h-3 rounded-full bg-yellow-500/80" />
        <span className="w-3 h-3 rounded-full bg-green-500/80" />
        <span className="ml-3 text-xs font-mono text-white/50">osiris@data: ~/pipelines</span>
      </div>

      {/* Terminal body */}
      <div className="p-5 font-mono text-sm leading-relaxed min-h-[240px]">
        {lines.map((line, i) => (
          <div key={i} className="mb-3">
            <div className="text-white/90 break-all">
              <span className="text-emerald-400 mr-2">$</span>
              {line.cmd}
            </div>
            {line.out && <div className="text-emerald-400/90 mt-1">{line.out}</div>}
          </div>
        ))}
        <div className="text-white/90 break-all">
          <span className="text-emerald-400 mr-2">$</span>
          {currentCmd}
          <span
            className={`inline-block w-2 h-4 ml-0.5 align-middle bg-emerald-400 ${
              showCursor ? "opacity-100" : "opacity-0"
            }`}
          />
        </div>
      </div>
    </div>
  );
}

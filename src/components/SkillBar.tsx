import { motion } from "framer-motion";
import { Skill } from "@/lib/index";

interface SkillBarProps {
  skill: Skill;
  index?: number;
}

/** Animated proficiency bar that fills when it enters the viewport. */
export function SkillBar({ skill, index = 0 }: SkillBarProps) {
  return (
    <li className="space-y-1.5">
      <div className="flex items-center justify-between">
        <span className="text-sm text-muted-foreground">{skill.name}</span>
        <span className="text-xs font-mono text-primary font-semibold">{skill.level}%</span>
      </div>
      <div className="h-1.5 w-full bg-secondary rounded-full overflow-hidden">
        <motion.div
          className="h-full rounded-full bg-gradient-to-r from-primary/70 to-primary"
          initial={{ width: 0 }}
          whileInView={{ width: `${skill.level}%` }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.9, delay: index * 0.08, ease: "easeOut" }}
        />
      </div>
    </li>
  );
}

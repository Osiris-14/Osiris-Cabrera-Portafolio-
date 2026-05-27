import React from "react";
import { motion } from "framer-motion";
import {
  Briefcase,
  GraduationCap,
  Award,
  Lightbulb,
  TrendingUp,
  Target,
  Database,
  BarChart3,
  BrainCircuit
} from "lucide-react";
import { IMAGES } from "@/assets/images";
import { experiences } from "@/lib/index.ts";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

const springPresets = {
  gentle: { stiffness: 300, damping: 35 },
  smooth: { stiffness: 200, damping: 40 },
};

const fadeInUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0 },
};

const philosophyItems = [
  {
    icon: <Database className="w-6 h-6 text-primary" />,
    title: "Data Reliability",
    description: "Clean, validated pipelines are the foundation of every good data product. I build with data quality and observability in mind from day one.",
  },
  {
    icon: <BrainCircuit className="w-6 h-6 text-primary" />,
    title: "Scalable Architecture",
    description: "I design modular, layered data systems (Bronze/Silver/Gold) that scale with business needs and remain maintainable over time.",
  },
  {
    icon: <BarChart3 className="w-6 h-6 text-primary" />,
    title: "Business Context",
    description: "I understand where data ends up and why it matters. That full-stack visibility — from source to dashboard — makes my pipelines better engineered.",
  },
];

const About: React.FC = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative py-24 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src={IMAGES.TECH_BACKGROUND_2}
            alt="Tech Background"
            className="w-full h-full object-cover opacity-20"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-background/50 via-background to-background" />
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeInUp}
            transition={springPresets.smooth}
            className="max-w-3xl"
          >
            <Badge variant="outline" className="mb-4 border-primary/50 text-primary">
              About Me
            </Badge>
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Turning Complex Data Challenges into <span className="text-primary">Scalable Engineering Solutions</span>
            </h1>
            <p className="text-xl text-muted-foreground leading-relaxed">
              Data Engineer with 3+ years of experience working across the full data lifecycle — from raw ingestion and pipeline architecture to analytics-ready data layers. I specialize in building systems that make data reliable, accessible, and useful.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Philosophy Section */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {philosophyItems.map((item, index) => (
              <motion.div
                key={index}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeInUp}
                transition={{ ...springPresets.gentle, delay: index * 0.1 }}
              >
                <Card className="h-full border-none shadow-sm bg-card/50 backdrop-blur-sm">
                  <CardContent className="pt-6">
                    <div className="mb-4 p-3 rounded-2xl bg-primary/10 w-fit">
                      {item.icon}
                    </div>
                    <h3 className="text-xl font-semibold mb-3">{item.title}</h3>
                    <p className="text-muted-foreground">{item.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Experience Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="flex items-center gap-3 mb-12">
            <div className="p-2 rounded-lg bg-primary">
              <Briefcase className="w-6 h-6 text-primary-foreground" />
            </div>
            <h2 className="text-3xl font-bold">Professional Experience</h2>
          </div>

          <div className="space-y-12 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-border before:to-transparent">
            {experiences.map((exp, index) => (
              <motion.div
                key={exp.id}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeInUp}
                transition={{ ...springPresets.gentle, delay: index * 0.1 }}
                className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group"
              >
                {/* Dot indicator */}
                <div className="flex items-center justify-center w-10 h-10 rounded-full border border-border bg-background shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10">
                  <div className="w-3 h-3 rounded-full bg-primary animate-pulse" />
                </div>

                {/* Card */}
                <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] p-4 rounded-xl border border-border bg-card shadow-sm hover:shadow-md transition-shadow">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4">
                    <div>
                      <h3 className="font-bold text-lg">{exp.role}</h3>
                      <p className="text-primary font-medium">{exp.company}</p>
                    </div>
                    <time className="text-sm font-mono text-muted-foreground bg-muted px-2 py-1 rounded">
                      {exp.period}
                    </time>
                  </div>
                 <div className="space-y-2">
  {exp.description.map((item, i) => {
    const isTitle = item.startsWith("__TITLE__");
    const isBullet = item.startsWith("__BULLET__");

    if (exp.id === "exp0") {
      if (isTitle) {
        return (
          <p key={i} className="font-semibold mt-3 text-sm">
            {item.replace("__TITLE__", "")}
          </p>
        );
      }

      if (isBullet) {
        return (
          <div key={i} className="flex gap-2 ml-4 text-sm text-muted-foreground">
            <span className="text-primary">•</span>
            {item.replace("__BULLET__", "")}
          </div>
        );
      }

      return (
        <p key={i} className="text-sm text-muted-foreground">
          {item}
        </p>
      );
    }

    // other experiences (normal)
    return (
      <div key={i} className="flex gap-2 text-sm text-muted-foreground">
        <span className="text-primary">•</span>
        {item}
      </div>
    );
  })}
</div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Education & Certs */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Education */}
            <div>
              <div className="flex items-center gap-3 mb-8">
                <GraduationCap className="w-6 h-6 text-primary" />
                <h2 className="text-2xl font-bold">Education</h2>
              </div>
              <div className="space-y-6">
                <div className="p-6 rounded-2xl bg-card border border-border">
                  <h4 className="font-bold">Data Engineering & Organizational Intelligence</h4>
                  <p className="text-muted-foreground">Universidad del Caribe (UNICARIBE) | IN PROGRESS</p>
                  <p className="text-sm mt-2">Specialization in data preparation and modeling</p>
                </div>
                <div className="p-6 rounded-2xl bg-card border border-border">
                  <h4 className="font-bold">Technical Degree in Artificial Intelligence and Machine Learning</h4>
                  <p className="text-muted-foreground">Talendig & Universidad Católica de Santo Domingo (UCSD) | IN PROGRESS</p>
                  <p className="text-sm mt-2">Skills and technical competencies to design, develop, and implement AI and Machine Learning (ML) solutions.</p>
                </div>
              </div>
            </div>

            {/* Certifications */}
            <div>
              <div className="flex items-center gap-3 mb-8">
                <Award className="w-6 h-6 text-primary" />
                <h2 className="text-2xl font-bold">Certifications & Achievements</h2>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[
                  "Google Data Analytics Professional",
                  "IBM Data Science Professional Certificate",
                  "DeepLearning.AI TensorFlow Developer",
                  "Power BI and Business Advanced — ADN LEAN ACADEMY",
                  "Python for Data Science — Udemy",
                  "Advanced DAX for Power BI — Udemy",
                  "Transact-SQL — Udemy",
                  "SQL Server Advanced — Udemy",
                  "Power Query, Power Pivot and Advanced Excel — Udemy",
                  "Google Looker Studio — Udemy",
                  "Introduction to Databases — ITLA",
                ].map((cert, idx) => (
                  <div key={idx} className="flex items-center gap-3 p-4 rounded-xl border border-border bg-card/50">
                    <div className="shrink-0 w-2 h-2 rounded-full bg-accent" />
                    <span className="text-sm font-medium">{cert}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values & Philosophy */}
      <section className="py-24 border-t border-border">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={springPresets.gentle}
            className="max-w-2xl mx-auto"
          >
            <h2 className="text-3xl font-bold mb-6">My Engineering Approach</h2>
            <p className="text-muted-foreground mb-10">
              I don't just move data — I design systems that make data trustworthy and actionable. I believe in continuous learning, clean code, and building things that last.
            </p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              <div className="flex flex-col items-center gap-2">
                <div className="p-4 rounded-full bg-secondary">
                  <TrendingUp className="w-6 h-6 text-secondary-foreground" />
                </div>
                <span className="text-sm font-semibold">Impact</span>
              </div>
              <div className="flex flex-col items-center gap-2">
                <div className="p-4 rounded-full bg-secondary">
                  <Target className="w-6 h-6 text-secondary-foreground" />
                </div>
                <span className="text-sm font-semibold">Precision</span>
              </div>
              <div className="flex flex-col items-center gap-2">
                <div className="p-4 rounded-full bg-secondary">
                  <Lightbulb className="w-6 h-6 text-secondary-foreground" />
                </div>
                <span className="text-sm font-semibold">Innovation</span>
              </div>
              <div className="flex flex-col items-center gap-2">
                <div className="p-4 rounded-full bg-secondary">
                  <BrainCircuit className="w-6 h-6 text-secondary-foreground" />
                </div>
                <span className="text-sm font-semibold">Agility</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Final Footer Spacer */}
      <div className="py-10" />
    </div>
  );
};

export default About;

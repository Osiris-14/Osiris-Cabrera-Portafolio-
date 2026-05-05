import { IMAGES } from "@/assets/images";

export const ROUTE_PATHS = {
  HOME: "/",
  PROJECTS: "/proyectos",
  ABOUT: "/sobre-mi",
  CONTACT: "/contacto",
};

export interface Skill {
  name: string;
  category: "Lenguajes" | "Visualización" | "Cloud & Data" | "ML/IA";
  level: number; // 0-100
}

export interface Project {
  id: string;
  title: string;
  description: string;
  image: string;
  tags: string[];
  githubUrl?: string;
  demoUrl?: string;
  category: "IA Engineering" | "Data Engineering" | "BI & Analytics";
}

export interface Experience {
  id: string;
  role: string;
  company: string;
  period: string;
  description: string[];
}

export const skills: Skill[] = [
  { name: "Python", category: "Lenguajes", level: 90 },
  { name: "SQL", category: "Lenguajes", level: 88 },
  { name: "JavaScript", category: "Lenguajes", level: 70 },

  { name: "Pandas & NumPy", category: "ML/IA", level: 90 },
  { name: "Scikit-Learn", category: "ML/IA", level: 85 },
  { name: "PyTorch", category: "ML/IA", level: 65 },

  { name: "Power BI", category: "Visualización", level: 90 },
  { name: "Tableau", category: "Visualización", level: 85 },
  { name: "Looker Studio", category: "Visualización", level: 80 },
  { name: "Matplotlib & Seaborn", category: "Visualización", level: 80 },

  { name: "APIs & Data Integration", category: "Cloud & Data", level: 85 },
  { name: "SQL Databases (PostgreSQL / SQL Server)", category: "Cloud & Data", level: 88 },
  { name: "AWS (S3)", category: "Cloud & Data", level: 70 },
  { name: "Google BigQuery", category: "Cloud & Data", level: 80 },
  { name: "Databricks", category: "Cloud & Data", level: 70 },
  { name: "Docker", category: "Cloud & Data", level: 65 },
];

export const projects: Project[] = [
  { 
    id: "1",
    title: "Geospatial Footfall & Territory Analysis Dashboard",
    description: "Solución analítica geoespacial integrando datos desde APIs con Python y Power BI para analizar penetración territorial, comportamiento de visitantes y distribución geográfica, permitiendo la toma de decisiones estratégicas basadas en datos.",
    image: "/Geoespacial.jpeg",
    tags: ["Python", "Power BI", "FastAPI"],
    demoUrl: "/projects/Dynamics Trend Es.pdf",
    category: "BI & Analytics",
  },
  { 
    id: "2",
    title: "Sales Health & Performance Dashboard",
    description: "End-to-end BI solution transforming ERP data (Tango) into actionable insights for commercial performance analysis and 2026 strategic planning.",
    image: "/Portada.jpeg",
    tags: ["Python", "SQL", "POWER BI"],
    demoUrl: "/projects/CERAS_Dashboard_Analisis.pdf",
    category: "BI & Analytics",
  },
  { 
    id: "3",
    title: "Credit Card Analytics Dashboard",
    description:  "Dashboard de análisis de tarjetas de crédito en Power BI con segmentación por categoría (Blue/Silver/Gold/Platinum), tipo de gasto y perfil de cliente. KPIs clave: Revenue 55M, Transacciones 656M y CSS 3.19 sobre una cartera de 2023.",
    image: "/Creditcard.jpeg",
    tags: ["Excel", "Power Querry", "Power BI"],
    demoUrl: "public/projects/CreditCard_Dashboard_Analisis.pdf",
    category: "BI & Analytics",
  },
  { 
    id: "4",
    title: "Cybersecurity Training Compliance & Risk Analytics Dashboard",
    description: "Dashboard en Power BI que analiza el cumplimiento de capacitaciones en ciberseguridad y el nivel de riesgo de empleados en una empresa multinacional. Incluye clasificación de riesgo con DAX y generación de insights accionables para reducir la vulnerabilidad ante ataques de phishing.",
    image: "/Capacitaciones.jpeg",
    tags: ["Power BI", "API", " DAX"],
    demoUrl:  "/projects/Infracommerce_Capacitaciones_Analisis.pdf",
    category: "BI & Analytics",
  },
  {
  id: "5",
  title: "Modelo de Predicción de Ventas (Time Series Forecasting)",
  description: "Desarrollo de un modelo de predicción de ventas utilizando series temporales para estimar la demanda futura de café. Incluye análisis exploratorio, limpieza de datos y modelado predictivo en Python.",
  image: "/coffee-forecast.jpeg",
  tags: ["Python", "Time Series", "Machine Learning", "Forecasting"],
  githubUrl: "https://github.com/Osiris-14/coffee-sales-forecast/tree/main/coffee-sales-forecast",
  demoUrl: "/projects/report_es.pdf",
  category: "IA Engineering",
},
{
  id: "6",
  title: "AI Product Performance Predictor",
  description: "Sistema de predicción de desempeño de productos utilizando Machine Learning para estimar ventas y comportamiento en e-commerce. Incluye procesamiento de datos, entrenamiento de modelos y generación de predicciones para optimizar decisiones comerciales.",
  image: "/prediccion_amazon.jpg",
  tags: ["Python", "Machine Learning", "AI", "Prediction"],
  githubUrl: "https://github.com/Osiris-14/Amazon-Product-Performance-Predictor/tree/main/amazon-product-performance",
  demoUrl: "/projects/reporte_es_amazon.pdf",
  category: "IA Engineering"
},
];

export const experiences: Experience[] = [
  {
    id: "exp0",
    role: "Freelance Data Analyst & CRM Analyst",
    company: "Workana & Proyectos Independientes",
    period: "2024 - Presente",
  description: [
  "Analista de Datos Freelance y Analista CRM especializado en análisis de datos comerciales, automatización de procesos y soluciones de inteligencia de negocio.",

  "Experiencia trabajando con Python, SQL, Excel, Power BI, Tableau y Databricks, así como plataformas CRM como HubSpot, Zoho Analytics, GoHighLevel y Alegra para generar insights accionables para el negocio.",

  "Diseño y desarrollo de pipelines de datos end-to-end, sistemas de reportes automatizados y dashboards ejecutivos para apoyar la toma de decisiones basada en datos y la optimización del rendimiento comercial.",

  "__TITLE__Proyectos destacados",
  "__BULLET__Dashboard de ventas con KPIs automatizados para empresa retail utilizando Power BI.",
  "__BULLET__Segmentación de clientes y análisis de comportamiento utilizando SQL y Python.",
  "__BULLET__Automatización de reportes financieros y operativos con Excel y Power Query.",
  "__BULLET__Integración de datos desde CRM (HubSpot, Zoho) para análisis de leads y conversión.",
  "__BULLET__Extracción e integración de datos desde APIs REST para análisis centralizado.",
  "__BULLET__Análisis y modelado de datos geoespaciales para insights basados en ubicación.",

  "__TITLE__Proyectos en curso",
  "__BULLET__Modelo de predicción de trafico para modelo data geoespacial usando power Bi + Python",
  "__BULLET__Sistema de scoring de leads para optimización de procesos comerciales. power By + Fabric & excel",
  "__BULLET__Pipeline de datos automatizado para centralización de métricas de negocio para empresa logistica AS400 + SQL SERVER + POWER BI"
]
  },
  {
    id: "exp1",
    role: "Sales Process Analyst",
    company: "Cerveceria Nacional Dominicana (CND)",
    period: "2026 - Presente",
    description: [
      "Como Sales Process Analyst, me especializo en analizar flujos de trabajo y optimizar tareas operativas, con un fuerte enfoque en la automatización de reportes y dashboards de desempeño.",
      "Utilizando Databricks, SQL Server, Power BI, Excel y Python, diseño soluciones de datos escalables que optimizan los procesos de reporte y mejoran la toma de decisiones.",
      "Además, contribuyo al desarrollo y entrenamiento de modelos de IA, integrando analítica avanzada en procesos de ventas para mejorar la precisión de pronósticos y la asignación de recursos, conectando la parte técnica con la estrategia de negocio para generar impacto medible."
    ]
  },
  {
    id: "exp2",
    role: "Data Analyst - Tech Sales Analyst",
    company: "Cerveceria Nacional Dominicana (CND)",
    period: "2025 - 2026",
    description: [
      "Responsable de recolectar, limpiar y analizar grandes volúmenes de datos para apoyar la toma de decisiones estratégicas, así como diseñar y automatizar dashboards y reportes en Power BI, Excel y SQL.",
      "Desarrollo de KPIs y modelos de datos para monitorear el desempeño del negocio a través de diferentes canales y regiones, colaborando con equipos de ventas, marketing y planificación para transformar datos en estrategias accionables.",
      "Logros clave incluyen la optimización de consultas SQL complejas reduciendo el tiempo de procesamiento en un 40%, la creación de pipelines de datos automatizados desde múltiples APIs y CRMs, y la presentación de insights trimestrales a la alta dirección para guiar decisiones estratégicas."
    ]
  },
  {
    id: "exp3",
    role: "Commercial Support Specialist",
    company: "MIO BANRESERVAS",
    period: "2024 - 2025",
    description: [
      "Soporte de datos para procesos comerciales mediante Excel y Zoho Analytics, incluyendo seguimiento de generación de leads, integración con CRM, monitoreo del cumplimiento de metas de ventas y elaboración de reportes de apoyo para clientes."
    ]
  }
];
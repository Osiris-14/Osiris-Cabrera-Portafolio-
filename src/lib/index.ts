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

export interface CaseStudy {
  problem: string;
  solution: string;
  techStack: { name: string; color: string }[];
  pipelineImage?: string;
  dashboardImage?: string;
  codeSnippet?: string;
  metrics: { value: string; label: string }[];
  dataDestination: string;
}

export interface Project {
  id: string;
  title: string;
  description: string;
  image: string;
  tags: string[];
  githubUrl?: string;
  demoUrl?: string;
  category: "Data Engineering" | "Data Engineering + Analytics";
  visible?: boolean;
  caseStudy?: CaseStudy;
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
  { name: "Bash / Shell", category: "Lenguajes", level: 70 },

  { name: "Apache Airflow", category: "ML/IA", level: 78 },
  { name: "dbt (data build tool)", category: "ML/IA", level: 75 },
  { name: "Apache Spark", category: "ML/IA", level: 70 },
  { name: "Pandas / NumPy", category: "ML/IA", level: 90 },

  { name: "Power BI", category: "Visualización", level: 90 },
  { name: "Looker Studio", category: "Visualización", level: 80 },
  { name: "Tableau", category: "Visualización", level: 75 },

  { name: "Supabase (PostgreSQL)", category: "Cloud & Data", level: 85 },
  { name: "Google BigQuery", category: "Cloud & Data", level: 80 },
  { name: "AWS S3 / Lambda", category: "Cloud & Data", level: 72 },
  { name: "Docker", category: "Cloud & Data", level: 70 },
  { name: "REST APIs & Webhooks", category: "Cloud & Data", level: 88 },
  { name: "Git / GitHub", category: "Cloud & Data", level: 85 },
];

export const projects: Project[] = [
  {
    id: "1",
    title: "Geospatial Footfall & Territory Analysis Dashboard",
    description: "Geospatial analytics solution integrating data from APIs using Python and Power BI to analyze territorial penetration, visitor behavior, and geographic distribution — enabling data-driven strategic decision-making.",
    image: "/Geoespacial.jpeg",
    tags: ["Python", "Power BI", "FastAPI"],
    demoUrl: "/projects/Dynamics Trend Es.pdf",
    category: "Data Engineering + Analytics",
    caseStudy: {
      problem: "A retail real estate company needed to understand visitor behavior and geographic penetration for a shopping centre in Belgium, with no centralized data infrastructure to support strategic decisions.",
      solution: "Built an automated Python pipeline that ingests geospatial footfall data from the MiTraffic REST API across multiple endpoints, cleans and models it into a star schema (fact table + dimension tables), stores structured CSV output in GitHub, and connects directly to Power BI for live territory intelligence reporting.",
      techStack: [
        { name: "Python", color: "blue" },
        { name: "Requests", color: "blue" },
        { name: "Pandas", color: "blue" },
        { name: "REST API", color: "teal" },
        { name: "Star Schema", color: "teal" },
        { name: "GitHub", color: "gray" },
        { name: "CSV Pipeline", color: "gray" },
        { name: "Power BI", color: "purple" },
      ],
      pipelineImage: "/pipeline-geospatial.png",
      dashboardImage: "/Geoespacial.jpeg",
      metrics: [
        { value: "1.1M+", label: "Visitor records / quarter" },
        { value: "84.9", label: "Resilience score (out of 100)" },
        { value: "16", label: "Cities analyzed" },
        { value: "120", label: "Territory sectors mapped" },
      ],
      dataDestination: "Power BI dashboard connected directly to the GitHub CSV output. Each pipeline run auto-refreshes the report — delivering territory penetration rates, visit quality scores, and strategic expansion recommendations to the client.",
      codeSnippet: `# Geospatial Footfall Pipeline
# MiTraffic API → Pandas → CSV → GitHub → Power BI

def fetch_endpoint(endpoint, params, filename):
    """Call MiTraffic API and save raw response to CSV."""
    url = f"{API_BASE}/{ASSET_TYPE}{endpoint}"
    response = requests.get(url, headers=HEADERS, params=params)
    if response.status_code == 200:
        data = response.json()
        with open(f"raw/{filename}", "w") as f:
            writer = csv.DictWriter(f, fieldnames=data[0].keys())
            writer.writeheader()
            writer.writerows(data)

def build_fact_table():
    """Merge isochrone files into a unified fact table."""
    frames = []
    for filename, mode, duration in ISOCHRONE_FILES:
        df = pd.read_csv(f"raw/{filename}")
        df["transportMode"] = mode
        df["transportDuration"] = duration
        frames.append(df)
    return pd.concat(frames, ignore_index=True)

def run_transformation():
    """Build star schema and export clean CSV for Power BI."""
    fact = build_fact_table()
    fact_clean = fact.drop(columns=["ageGroups", "revenue.repartitionByQuintiles"], errors="ignore")
    fact_clean.to_csv("clean/fact_isochrone.csv", index=False)
    build_age_dimension(fact).to_csv("clean/dim_age_groups.csv", index=False)
    build_income_dimension(fact).to_csv("clean/dim_income_distribution.csv", index=False)`,
    },
  },
  {
    id: "2",
    title: "Sales Health & Performance Dashboard",
    description: "End-to-end BI solution transforming ERP data (Tango) into actionable insights for commercial performance analysis and 2026 strategic planning.",
    image: "/Portada.jpeg",
    tags: ["Python", "SQL", "POWER BI"],
    demoUrl: "/projects/CERAS_Dashboard_Analisis.pdf",
    category: "Data Engineering + Analytics",
    caseStudy: {
      problem: "A minerals manufacturing company (CERAS) needed full visibility into their commercial performance across sales, clients, and products — but their data was locked inside Tango ERP with no analytics layer, making strategic decisions slow and reactive.",
      solution: "Built a complete ETL pipeline connecting directly to Tango ERP via Python (SQLAlchemy + pyodbc), extracting raw transactional data, calculating KPIs (YoY variations, moving averages, client health segmentation, retention rates), loading structured datasets into Azure, and delivering a 5-view interactive Power BI dashboard covering sales overview, client health, product analysis, annual targets, and 9-year historical trends.",
      techStack: [
        { name: "Python", color: "blue" },
        { name: "SQLAlchemy", color: "blue" },
        { name: "pyodbc", color: "blue" },
        { name: "Pandas", color: "blue" },
        { name: "Tango ERP", color: "gray" },
        { name: "SQL Server", color: "gray" },
        { name: "Azure", color: "teal" },
        { name: "Power BI", color: "purple" },
        { name: "DAX", color: "purple" },
      ],
      pipelineImage: "/pipeline-ceras.png",
      dashboardImage: "/Portada.jpeg",
      metrics: [
        { value: "USD 521K", label: "Revenue analyzed (2025)" },
        { value: "90.08%", label: "Annual target compliance" },
        { value: "37", label: "Active clients tracked" },
        { value: "9 yrs", label: "Historical trend (2017–2026)" },
      ],
      dataDestination: "Structured datasets loaded into Azure and connected to Power BI. The dashboard delivers 5 specialized views — sales overview, client commercial health, product portfolio, annual targets vs actuals, and 9-year historical evolution — giving the commercial team real-time visibility and proactive alerts.",
      codeSnippet: `# Sales Health Pipeline — Tango ERP → Azure → Power BI

def extract_sales(engine):
    """Extract raw transactions from Tango ERP (SQL Server)."""
    query = """
        SELECT invoice_id, client_id, category,
               invoice_date, tons, amount_ars, amount_usd
        FROM sales_transactions
        WHERE YEAR(invoice_date) BETWEEN :start AND :end
    """
    return pd.read_sql(query, engine, params={"start": 2017, "end": 2025})

def segment_client_health(df):
    """Classify clients: Active / At Risk / Inactive / Lost."""
    summary = df.groupby("client_id").agg(
        last_purchase=("invoice_date", "max"),
        purchase_count=("invoice_id", "nunique")
    ).reset_index()
    summary["months_inactive"] = (
        (df["invoice_date"].max() - summary["last_purchase"])
        / np.timedelta64(1, "M")
    ).astype(int)
    summary["health"] = summary["months_inactive"].apply(
        lambda m: "Active" if m == 0
        else "At Risk" if m <= 2
        else "Inactive" if m <= 6
        else "Lost"
    )
    return summary

def calculate_retention(df):
    """Monthly retention: clients recurring from previous month."""
    monthly = df.groupby("month")["client_id"].apply(set)
    return [
        {"month": str(monthly.index[i]),
         "retention_rate": len(monthly.iloc[i] & monthly.iloc[i-1])
                           / len(monthly.iloc[i-1]) * 100}
        for i in range(1, len(monthly))
    ]`,
    },
  },
  {
    id: "3",
    title: "Credit Card Analytics Dashboard",
    description: "Power BI credit card analytics dashboard with segmentation by card tier (Blue/Silver/Gold/Platinum), spending type, and customer profile. Key KPIs: Revenue $55M, Transactions $656M, and CSS 3.19 across a 2023 portfolio.",
    image: "/Creditcard.jpeg",
    tags: ["Excel", "Power Query", "Power BI"],
    demoUrl: "public/projects/CreditCard_Dashboard_Analisis.pdf",
    category: "Data Engineering + Analytics",
    visible: false,
  },
  {
    id: "4",
    title: "Cybersecurity Training Compliance & Risk Analytics Dashboard",
    description: "Power BI dashboard analyzing cybersecurity training compliance and employee risk levels at a multinational company. Includes DAX-based risk classification and actionable insights to reduce phishing vulnerability.",
    image: "/Capacitaciones.jpeg",
    tags: ["Power BI", "API", "DAX"],
    demoUrl: "/projects/Infracommerce_Capacitaciones_Analisis.pdf",
    category: "Data Engineering + Analytics",
    caseStudy: {
      problem: "Infracommerce, a multinational e-commerce company operating across 9 Latin American countries, needed real-time visibility into employee compliance with mandatory anti-phishing training — with no centralized way to track 1,821 employees across regions, areas, and roles.",
      solution: "Built a Python pipeline that pulls training and HR data directly from the Infracommerce API, cleans and transforms it in the same script (normalizing employee records, calculating compliance rates, and applying a 3-tier risk classification: Low / Medium / High), then loads the structured dataset into Power BI for a 4-view interactive dashboard covering global overview, area analysis, individual employee tracking, and cybersecurity risk management.",
      techStack: [
        { name: "Python", color: "blue" },
        { name: "Requests", color: "blue" },
        { name: "Pandas", color: "blue" },
        { name: "REST API", color: "teal" },
        { name: "Power BI", color: "purple" },
        { name: "DAX", color: "purple" },
        { name: "Risk Scoring", color: "gray" },
      ],
      pipelineImage: "/pipeline-cybersecurity.png",
      dashboardImage: "/Capacitaciones.jpeg",
      metrics: [
        { value: "1,821", label: "Employees monitored" },
        { value: "9", label: "Countries covered" },
        { value: "6", label: "Training modules tracked" },
        { value: "3-tier", label: "Risk classification model" },
      ],
      dataDestination: "Structured dataset loaded directly into Power BI with 4 specialized views — global program overview, area-level compliance breakdown, individual employee tracking with visual completion icons, and a cybersecurity risk module that classifies each employee as Low / Medium / High risk based on training completion rates.",
      codeSnippet: `# Cybersecurity Training Compliance Pipeline
# Infracommerce API -> Python (ingest + clean) -> Power BI

def fetch_training_data(endpoint, params={}):
    """Pull training records from Infracommerce LMS API."""
    response = requests.get(
        f"{API_BASE}{endpoint}",
        headers={"Authorization": f"Bearer {API_TOKEN}"},
        params=params
    )
    return response.json() if response.status_code == 200 else []

def calculate_compliance(df):
    """Calculate compliance rate per employee per training."""
    df["completion_rate"] = (
        df["completed"] / df["assigned"] * 100
    ).round(2).fillna(0)
    df["gap_vs_target"] = (df["completion_rate"] - df["target_rate"]).round(2)
    return df

def classify_risk(row):
    """3-tier risk model based on completion and recency."""
    if row["completion_rate"] >= 80:
        return "Low Risk"
    elif row["completion_rate"] >= 40:
        return "Medium Risk"
    else:
        return "High Risk"

def run_pipeline():
    employees  = pd.DataFrame(fetch_training_data("/employees"))
    trainings  = pd.DataFrame(fetch_training_data("/trainings"))
    enrollments = pd.DataFrame(fetch_training_data("/enrollments"))

    merged = enrollments.merge(employees, on="employee_id")
    merged = calculate_compliance(merged)
    merged["risk_level"] = merged.apply(classify_risk, axis=1)
    merged.to_csv("output/training_compliance.csv", index=False)`,
    },
  },
  {
    id: "5",
    title: "Sales Prediction Model (Time Series Forecasting)",
    description: "Time series sales prediction model built to forecast coffee demand. Includes exploratory analysis, data cleaning, and predictive modeling in Python.",
    image: "/coffee-forecast.jpeg",
    tags: ["Python", "Time Series", "Machine Learning", "Forecasting"],
    githubUrl: "https://github.com/Osiris-14/coffee-sales-forecast/tree/main/coffee-sales-forecast",
    demoUrl: "/projects/report_es.pdf",
    category: "Data Engineering",
    visible: false,
  },
  {
    id: "6",
    title: "AI Product Performance Predictor",
    description: "Product performance prediction system using Machine Learning to estimate sales and e-commerce behavior. Includes data processing, model training, and forecast generation to optimize commercial decisions.",
    image: "/prediccion_amazon.jpg",
    tags: ["Python", "Machine Learning", "AI", "Prediction"],
    githubUrl: "https://github.com/Osiris-14/Amazon-Product-Performance-Predictor/tree/main/amazon-product-performance",
    demoUrl: "/projects/reporte_es_amazon.pdf",
    category: "Data Engineering",
    visible: false,
  },
];

export const experiences: Experience[] = [
  {
    id: "exp0",
    role: "Freelance Data Analyst & CRM Analyst",
    company: "Workana & Proyectos Independientes",
    period: "2024 - Presente",
    description: [
      "Freelance Data Analyst and CRM Analyst specialized in commercial data analysis, process automation, and business intelligence solutions.",

      "Experienced with Python, SQL, Excel, Power BI, Tableau, and Databricks, as well as CRM platforms such as HubSpot, Zoho Analytics, GoHighLevel, and Alegra to generate actionable business insights.",

      "Design and development of end-to-end data pipelines, automated reporting systems, and executive dashboards to support data-driven decision-making and commercial performance optimization.",

      "__TITLE__Featured Projects",
      "__BULLET__Automated sales KPI dashboard for a retail company using Power BI.",
      "__BULLET__Customer segmentation and behavior analysis using SQL and Python.",
      "__BULLET__Automated financial and operational reports using Excel and Power Query.",
      "__BULLET__Data integration from CRM platforms (HubSpot, Zoho) for lead and conversion analysis.",
      "__BULLET__Data extraction and integration from REST APIs for centralized analytics.",
      "__BULLET__Geospatial data analysis and modeling for location-based insights.",

      "__TITLE__Ongoing Projects",
      "__BULLET__Traffic prediction model for geospatial data using Power BI + Python.",
      "__BULLET__Lead scoring system for commercial process optimization — Power BI + Fabric & Excel.",
      "__BULLET__Automated data pipeline for centralizing business metrics at a logistics company — AS400 + SQL Server + Power BI.",
    ]
  },
  {
    id: "exp1",
    role: "Sales Process Analyst",
    company: "Cerveceria Nacional Dominicana (CND)",
    period: "2026 - Presente",
    description: [
      "As a Sales Process Analyst, I specialize in analyzing workflows and optimizing operational tasks, with a strong focus on automating reports and performance dashboards.",
      "Using Databricks, SQL Server, Power BI, Excel, and Python, I design scalable data solutions that streamline reporting processes and improve decision-making.",
      "I also contribute to the development and training of AI models, integrating advanced analytics into sales processes to improve forecast accuracy and resource allocation — bridging technical work with business strategy for measurable impact."
    ]
  },
  {
    id: "exp2",
    role: "Data Analyst - Tech Sales Analyst",
    company: "Cerveceria Nacional Dominicana (CND)",
    period: "2025 - 2026",
    description: [
      "Responsible for collecting, cleaning, and analyzing large volumes of data to support strategic decision-making, as well as designing and automating dashboards and reports in Power BI, Excel, and SQL.",
      "Developed KPIs and data models to monitor business performance across channels and regions, collaborating with sales, marketing, and planning teams to turn data into actionable strategies.",
      "Key achievements include optimizing complex SQL queries to reduce processing time by 40%, building automated data pipelines from multiple APIs and CRMs, and presenting quarterly insights to senior leadership to guide strategic decisions."
    ]
  },
  {
    id: "exp3",
    role: "Commercial Support Specialist",
    company: "MIO BANRESERVAS",
    period: "2024 - 2025",
    description: [
      "Provided data support for commercial processes using Excel and Zoho Analytics, including lead generation tracking, CRM integration, sales goal compliance monitoring, and client support reporting."
    ]
  }
];

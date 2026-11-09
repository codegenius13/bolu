import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  AreaChart,
  Area,
  BarChart,
  Bar,
} from "recharts";
import "./Analytics.css";

/*
  EDIT THIS DATA ANYTIME.

  You can manually update values here whenever you want.
  Keep the month labels in order.
*/
const analyticsData = [
  {
    month: "Jan",
    coursesCompleted: 0,
    researchExercises: 0,
    bioinformaticsTasks: 0,
    researchProjects: 0,
    toolsExplored: 0,
    githubCommits: 8,
    portfolioVisits: 0,
    linkedinGrowth: 5,
  },
  {
    month: "Feb",
    coursesCompleted: 0,
    researchExercises: 0,
    bioinformaticsTasks: 0,
    researchProjects: 0,
    toolsExplored: 0,
    githubCommits: 3,
    portfolioVisits: 2,
    linkedinGrowth: 2,
  },
  {
    month: "Mar",
    coursesCompleted: 0,
    researchExercises: 0,
    bioinformaticsTasks: 0,
    researchProjects: 0,
    toolsExplored: 1,
    githubCommits: 26,
    portfolioVisits: 5,
    linkedinGrowth: 20,
  },
  {
    month: "Apr",
    coursesCompleted: 0,
    researchExercises: 0,
    bioinformaticsTasks: 0,
    researchProjects: 0,
    toolsExplored: 0,
    githubCommits: 35,
    portfolioVisits: 9,
    linkedinGrowth: 15,
  },
  {
    month: "May",
    coursesCompleted: 0,
    researchExercises: 0,
    bioinformaticsTasks: 0,
    researchProjects: 0,
    toolsExplored: 0,
    githubCommits: 9,
    portfolioVisits: 10,
    linkedinGrowth: 7,
  },
  {
    month: "Jun",
    coursesCompleted: 1,
    researchExercises: 0,
    bioinformaticsTasks: 0,
    researchProjects: 0,
    toolsExplored: 0,
    githubCommits: 10,
    portfolioVisits: 1,
    linkedinGrowth: 7,
  },
  {
    month: "Jul",
    coursesCompleted: 8,
    researchExercises: 0,
    bioinformaticsTasks: 5,
    researchProjects: 1,
    toolsExplored: 5,
    githubCommits: 0,
    portfolioVisits: 1,
    linkedinGrowth: 9,
  },
  {
    month: "Aug",
    coursesCompleted: 1,
    researchExercises: 0,
    bioinformaticsTasks: 2,
    researchProjects: 0,
    toolsExplored: 2,
    githubCommits: 3,
    portfolioVisits: 4,
    linkedinGrowth: 5,
  },
  {
    month: "Sep",
    coursesCompleted: 0,
    researchExercises: 0,
    bioinformaticsTasks: 0,
    researchProjects: 0,
    toolsExplored: 0,
    githubCommits: 10,
    portfolioVisits: 3,
    linkedinGrowth: 100,
  },
  {
    month: "Oct",
    coursesCompleted: 0,
    researchExercises: 0,
    bioinformaticsTasks: 0,
    researchProjects: 1,
    toolsExplored: 3,
    githubCommits: 15,
    portfolioVisits: 20,
    linkedinGrowth: 100,
  },
  {
    month: "Nov",
    coursesCompleted: 1,
    researchExercises: 1,
    bioinformaticsTasks: 1,
    researchProjects: 1,
    toolsExplored: 2,
    githubCommits: 4,
    portfolioVisits: 3,
    linkedinGrowth: 20,
  },
  {
    month: "Dec",
    coursesCompleted: 0,
    researchExercises: 0,
    bioinformaticsTasks: 0,
    researchProjects: 0,
    toolsExplored: 0,
    githubCommits: 0,
    portfolioVisits: 0,
    linkedinGrowth: 0,
  },
];

const CURRENT_YEAR = 2026;

// If using live date later:
// const CURRENT_YEAR = new Date().getFullYear();

const currentDate = new Date();
const currentMonthIndex = currentDate.getMonth();
// Jan = 0, Apr = 3, Dec = 11

const rangeOptions = [
  { label: "6M", value: 6 },
  { label: "12M", value: 12 },
];

const viewOptions = [
  { label: "All", value: "all" },
  { label: "Learning Progress", value: "learning" },
  { label: "Growth Signals", value: "growth" },
];

const motionWrap = {
  hidden: { opacity: 0, y: 18 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" },
  },
};

const MotionCard = motion.div;

function sumField(data, key) {
  return data.reduce((total, item) => total + Number(item[key] || 0), 0);
}

function maxField(data, key) {
  return Math.max(...data.map((item) => Number(item[key] || 0)));
}

function addTrend(data, key) {
  return data.map((item, index) => {
    if (index === 0) {
      return { ...item, trend: "•" };
    }

    const prev = data[index - 1][key];
    const current = item[key];

    let trend = "•";

    if (current > prev) trend = "↑";
    else if (current < prev) trend = "↓";

    return { ...item, trend };
  });
}

function Analytics() {
  const [activeView, setActiveView] = useState("all");
  const [activeRange, setActiveRange] = useState(12);

  const filteredData = useMemo(() => {
    // Only months already reached this year
    const availableMonths = analyticsData.slice(0, currentMonthIndex + 1);

    if (activeRange === 6) {
      // Jan-Jun
      if (currentMonthIndex <= 5) {
        return availableMonths;
      }

      // Jul-Dec
      return analyticsData.slice(6, currentMonthIndex + 1);
    }

    // 12 months = Jan till current month
    return availableMonths;
  }, [activeRange]);

  const trendData = useMemo(() => {
    return addTrend(filteredData, "portfolioVisits");
  }, [filteredData]);

  const learningStats = useMemo(() => {
    const courses = sumField(filteredData, "coursesCompleted");
    const exercises = sumField(filteredData, "researchExercises");
    const bioinformatics = sumField(filteredData, "bioinformaticsTasks");
    const projects = sumField(filteredData, "researchProjects");
    const tools = sumField(filteredData, "toolsExplored");

    return {
      courses,
      exercises,
      bioinformatics,
      projects,
      tools,
      bestMonth:
        filteredData.reduce((best, item) => {
          const bestScore =
            best.coursesCompleted +
            best.researchExercises +
            best.bioinformaticsTasks +
            best.researchProjects +
            best.toolsExplored;

          const itemScore =
            item.coursesCompleted +
            item.researchExercises +
            item.bioinformaticsTasks +
            item.researchProjects +
            item.toolsExplored;

          return itemScore > bestScore ? item : best;
        }, filteredData[0])?.month || "-",
    };
  }, [filteredData]);

  const growthStats = useMemo(() => {
    const commits = sumField(filteredData, "githubCommits");
    const visits = sumField(filteredData, "portfolioVisits");
    const linkedIn = sumField(filteredData, "linkedinGrowth");
    const tools = sumField(filteredData, "toolsExplored");

    return {
      commits,
      visits,
      linkedIn,
      tools,
      peakCommits: maxField(filteredData, "githubCommits"),
      avgVisits:
        visits > 0
          ? Math.round(visits / filteredData.length)
          : 0,
    };
  }, [filteredData]);

  const showLearning =
    activeView === "all" || activeView === "learning";

  const showGrowth =
    activeView === "all" || activeView === "growth";

  const TooltipContent = ({ active, payload, label }) => {
    if (!active || !payload?.length) return null;

    return (
      <div className="analytics-tooltip">
        <p className="tooltip-title">{label}</p>
        {payload.map((entry) => (
          <div key={entry.dataKey} className="tooltip-row">
            <span
              className="tooltip-dot"
              style={{ backgroundColor: entry.color }}
            />
            <span className="tooltip-name">{entry.name}</span>
            <span className="tooltip-value">{entry.value}</span>
          </div>
        ))}
      </div>
    );
  };

  return (
    <section className="analytics-section" id="analytics">
      <motion.div
        className="analytics-shell"
        variants={motionWrap}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.2 }}
      >
        <div className="analytics-header">
          <div>
            <span className="section-kicker">Learning & Research Progress</span>

            <h2>
              {CURRENT_YEAR} Progress Analytics • Learning, Research & Development
            </h2>

            <p>
              A record of my learning, research practice, technical development, and progress throughout the year.
            </p>

            <p
              style={{
                fontWeight: "bold",
                marginTop: "6px",
                color: "var(--text-secondary)",
              }}
            >
              Updated • November {CURRENT_YEAR}
            </p>
          </div>

          <div className="analytics-filter-group">
            {rangeOptions.map((option) => (
              <button
                key={option.value}
                type="button"
                className={`filter-chip ${activeRange === option.value ? "active" : ""}`}
                onClick={() => setActiveRange(option.value)}
              >
                {option.label}
              </button>
            ))}
          </div>
        </div>

        <div className="analytics-view-switcher">
          {viewOptions.map((option) => (
            <button
              key={option.value}
              type="button"
              className={`view-chip ${activeView === option.value ? "active" : ""}`}
              onClick={() => setActiveView(option.value)}
            >
              {option.label}
            </button>
          ))}
        </div>

        <div className="analytics-grid">
          <AnimatePresence mode="wait">
            {showLearning && (
              <MotionCard
                key="learning-card"
                className="analytics-card analytics-card--jobs"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                transition={{ duration: 0.35 }}
              >
                <div className="card-top">
                  <div>
                    <span className="card-kicker">Section 01</span>

                    <h3>Learning & Research Progress</h3>

                    <p>
                      Track my learning, research practice, bioinformatics work,
                      and technical development throughout the year.
                    </p>
                  </div>

                  <div className="mini-badge">
                    {filteredData.length} months
                  </div>
                </div>

                <div className="metric-grid">
                  <div className="metric-card">
                    <span>Courses Completed</span>
                    <strong>{learningStats.courses}</strong>
                  </div>

                  <div className="metric-card">
                    <span>Research Exercises</span>
                    <strong>{learningStats.exercises}</strong>
                  </div>

                  <div className="metric-card">
                    <span>Bioinformatics Tasks</span>
                    <strong>{learningStats.bioinformatics}</strong>
                  </div>

                  <div className="metric-card">
                    <span>Research Projects</span>
                    <strong>{learningStats.projects}</strong>
                  </div>
                </div>

                <div className="chart-box">
                  <ResponsiveContainer width="100%" height={340}>
                    <LineChart data={filteredData}>
                      <CartesianGrid strokeDasharray="4 4" />

                      <XAxis dataKey="month" />

                      <YAxis />

                      <Tooltip content={<TooltipContent />} />

                      <Legend />

                      <Line
                        type="monotone"
                        dataKey="coursesCompleted"
                        name="Courses Completed"
                        stroke="var(--primary-color)"
                        strokeWidth={3}
                        dot={{ r: 3 }}
                        activeDot={{ r: 6 }}
                      />

                      <Line
                        type="monotone"
                        dataKey="researchExercises"
                        name="Research Exercises"
                        stroke="var(--accent-color)"
                        strokeWidth={3}
                        dot={{ r: 3 }}
                        activeDot={{ r: 6 }}
                      />

                      <Line
                        type="monotone"
                        dataKey="bioinformaticsTasks"
                        name="Bioinformatics Tasks"
                        stroke="var(--secondary-color)"
                        strokeWidth={3}
                        dot={{ r: 3 }}
                        activeDot={{ r: 6 }}
                      />

                      <Line
                        type="monotone"
                        dataKey="researchProjects"
                        name="Research Projects"
                        stroke="var(--success-color)"
                        strokeWidth={3}
                        dot={{ r: 3 }}
                        activeDot={{ r: 6 }}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>

                <div className="card-footer">
                  <div>
                    <span>Tools Explored</span>
                    <strong>{learningStats.tools}</strong>
                  </div>

                  <div>
                    <span>Courses Completed</span>
                    <strong>{learningStats.courses}</strong>
                  </div>

                  <div>
                    <span>Research Exercises</span>
                    <strong>{learningStats.exercises}</strong>
                  </div>

                  <div>
                    <span>Most Active Month</span>
                    <strong>{learningStats.bestMonth}</strong>
                  </div>
                </div>
              </MotionCard>
            )}
          </AnimatePresence>

          <AnimatePresence mode="wait">
            {showGrowth && (
              <MotionCard
                key="growth-card"
                className="analytics-card analytics-card--growth"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                transition={{ duration: 0.35 }}
              >
                <div className="card-top">
                  <div>
                    <span className="card-kicker">Section 02</span>
                    <h3>Technical & Professional Growth</h3>

                    <p>
                      Track my GitHub activity, portfolio visits, LinkedIn growth,
                      and use of research and bioinformatics tools.
                    </p>
                  </div>

                  <div className="mini-badge">
                    {filteredData.length} points
                  </div>
                </div>

                <div className="metric-grid">
                  <div className="metric-card">
                    <span>GitHub Commits</span>
                    <strong>{growthStats.commits}</strong>
                  </div>
                  <div className="metric-card">
                    <span>Portfolio Visits</span>
                    <strong>{growthStats.visits}</strong>
                  </div>
                  <div className="metric-card">
                    <span>LinkedIn Growth</span>
                    <strong>{growthStats.linkedIn}</strong>
                  </div>
                  <div className="metric-card">
                    <span>Tools Explored</span>
                    <strong>{growthStats.tools}</strong>
                  </div>
                </div>

                <div className="chart-box chart-box--stacked">
                  <ResponsiveContainer width="100%" height={340}>
                    <AreaChart data={trendData}>
                      <defs>
                        <linearGradient id="growthA" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="var(--accent-color)" stopOpacity={0.35} />
                          <stop offset="95%" stopColor="var(--accent-color)" stopOpacity={0} />
                        </linearGradient>
                        <linearGradient id="growthB" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="var(--secondary-color)" stopOpacity={0.35} />
                          <stop offset="95%" stopColor="var(--secondary-color)" stopOpacity={0} />
                        </linearGradient>
                        <linearGradient id="growthC" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="var(--primary-color)" stopOpacity={0.35} />
                          <stop offset="95%" stopColor="var(--primary-color)" stopOpacity={0} />
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="4 4" />
                      <XAxis dataKey="month" />
                      <YAxis />
                      <Tooltip content={<TooltipContent />} />
                      <Legend />
                      <Area
                        type="monotone"
                        dataKey="githubCommits"
                        name="GitHub Commits"
                        stroke="var(--primary-color)"
                        fill="url(#growthC)"
                        strokeWidth={3}
                      />
                      <Area
                        type="monotone"
                        dataKey="portfolioVisits"
                        name="Portfolio Visits"
                        stroke="var(--accent-color)"
                        fill="url(#growthA)"
                        strokeWidth={3}
                      />
                      <Area
                        type="monotone"
                        dataKey="linkedinGrowth"
                        name="LinkedIn Growth"
                        stroke="var(--secondary-color)"
                        fill="url(#growthB)"
                        strokeWidth={3}
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>

                <div className="growth-bars">
                  <div className="growth-bars__header">
                    <h4>Research & Bioinformatics Tools</h4>
                    <span>{filteredData.length} points</span>
                  </div>

                  <ResponsiveContainer width="100%" height={180}>
                    <BarChart data={filteredData}>
                      <CartesianGrid strokeDasharray="4 4" />
                      <XAxis dataKey="month" />
                      <YAxis />
                      <Tooltip content={<TooltipContent />} />
                      <Legend />
                      <Bar
                        dataKey="toolsExplored"
                        name="Tools Explored"
                        fill="var(--warning-color)"
                        radius={[5, 5, 0, 0]}
                      />
                    </BarChart>
                  </ResponsiveContainer>
                </div>

                <div className="card-footer">
                  <div>
                    <span>Average visits / month</span>
                    <strong>{growthStats.avgVisits}</strong>
                  </div>

                  <div>
                    <span>Peak commits in a month</span>
                    <strong>{growthStats.peakCommits}</strong>
                  </div>

                  <div>
                    <span>LinkedIn Growth</span>
                    <strong>{growthStats.linkedIn}</strong>
                  </div>

                  <div>
                    <span>Tools Explored</span>
                    <strong>{growthStats.tools}</strong>
                  </div>
                </div>
              </MotionCard>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </section>
  );
}

export default Analytics;
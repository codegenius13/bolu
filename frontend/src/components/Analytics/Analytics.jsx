import React, { useMemo, useState } from "react";
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
    inquiries: 0,
    qualifiedLeads: 0,
    callsBooked: 0,
    projectsWon: 0,
    githubCommits: 8,
    portfolioVisits: 0,
    linkedinGrowth: 5,
    toolUsage: 1,
  },
  {
    month: "Feb",
    inquiries: 1,
    qualifiedLeads: 1,
    callsBooked: 1,
    projectsWon: 0,
    githubCommits: 3,
    portfolioVisits: 2,
    linkedinGrowth: 2,
    toolUsage: 7,
  },
  {
    month: "Mar",
    inquiries: 1,
    qualifiedLeads: 1,
    callsBooked: 1,
    projectsWon: 0,
    githubCommits: 26,
    portfolioVisits: 5,
    linkedinGrowth: 20,
    toolUsage: 4,
  },
  {
    month: "Apr",
    inquiries: 2,
    qualifiedLeads: 2,
    callsBooked: 1,
    projectsWon: 0,
    githubCommits: 25,
    portfolioVisits: 7,
    linkedinGrowth: 15,
    toolUsage: 3,
  },
  {
    month: "May",
    inquiries: 0,
    qualifiedLeads: 0,
    callsBooked: 0,
    projectsWon: 0,
    githubCommits: 0,
    portfolioVisits: 0,
    linkedinGrowth: 0,
    toolUsage: 0,
  },
  {
    month: "Jun",
    inquiries: 0,
    qualifiedLeads: 0,
    callsBooked: 0,
    projectsWon: 0,
    githubCommits: 0,
    portfolioVisits: 0,
    linkedinGrowth: 0,
    toolUsage: 0,
  },
  {
    month: "Jul",
    inquiries: 0,
    qualifiedLeads: 0,
    callsBooked: 0,
    projectsWon: 0,
    githubCommits: 0,
    portfolioVisits: 0,
    linkedinGrowth: 0,
    toolUsage: 0,
  },
  {
    month: "Aug",
    inquiries: 0,
    qualifiedLeads: 0,
    callsBooked: 0,
    projectsWon: 0,
    githubCommits: 0,
    portfolioVisits: 0,
    linkedinGrowth: 0,
    toolUsage: 0,
  },
  {
    month: "Sep",
    inquiries: 0,
    qualifiedLeads: 0,
    callsBooked: 0,
    projectsWon: 0,
    githubCommits: 0,
    portfolioVisits: 0,
    linkedinGrowth: 0,
    toolUsage: 0,
  },
  {
    month: "Oct",
    inquiries: 0,
    qualifiedLeads: 0,
    callsBooked: 0,
    projectsWon: 0,
    githubCommits: 0,
    portfolioVisits: 0,
    linkedinGrowth: 0,
    toolUsage: 0,
  },
  {
    month: "Nov",
    inquiries: 0,
    qualifiedLeads: 0,
    callsBooked: 0,
    projectsWon: 0,
    githubCommits: 0,
    portfolioVisits: 0,
    linkedinGrowth: 0,
    toolUsage: 0,
  },
  {
    month: "Dec",
    inquiries: 0,
    qualifiedLeads: 0,
    callsBooked: 0,
    projectsWon: 0,
    githubCommits: 0,
    portfolioVisits: 0,
    linkedinGrowth: 0,
    toolUsage: 0,
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
  { label: "Job Influx", value: "jobs" },
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

  const jobStats = useMemo(() => {
    const totalInquiries = sumField(filteredData, "inquiries");
    const totalQualified = sumField(filteredData, "qualifiedLeads");
    const totalCalls = sumField(filteredData, "callsBooked");
    const totalWins = sumField(filteredData, "projectsWon");
    const bestMonth = filteredData.reduce((best, item) =>
      item.projectsWon > best.projectsWon ? item : best
    , filteredData[0]);

    return {
      totalInquiries,
      totalQualified,
      totalCalls,
      totalWins,
      bestMonth: bestMonth?.month || "-",
      conversionRate:
        totalInquiries > 0
          ? ((totalWins / totalInquiries) * 100).toFixed(1)
          : "0.0",
    };
  }, [filteredData]);

  const growthStats = useMemo(() => {
    const commits = sumField(filteredData, "githubCommits");
    const visits = sumField(filteredData, "portfolioVisits");
    const linkedIn = sumField(filteredData, "linkedinGrowth");
    const toolUse = sumField(filteredData, "toolUsage");

    return {
      commits,
      visits,
      linkedIn,
      toolUse,
      peakCommits: maxField(filteredData, "githubCommits"),
      avgVisits:
        filteredData.length > 0
          ? Math.round(visits / filteredData.length)
          : 0,
    };
  }, [filteredData]);

  const showJobs = activeView === "all" || activeView === "jobs";
  const showGrowth = activeView === "all" || activeView === "growth";

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
    <section className="analytics-section" id="work-analytics">
      <motion.div
        className="analytics-shell"
        variants={motionWrap}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.2 }}
      >
        <div className="analytics-header">
          <div>
            <span className="section-kicker">Work Analytics</span>
            <h2>{CURRENT_YEAR} Growth Analytics • Progress, Traction & Performance</h2>
            <p>
              A snapshot of my work journey through key metrics and trends.
            </p>
            <p style={{ fontWeight: "bold", marginTop: "6px", color: "var(--text-secondary)" }}>
              Live Updated • April {CURRENT_YEAR}
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
            {showJobs && (
              <MotionCard
                key="jobs-card"
                className="analytics-card analytics-card--jobs"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                transition={{ duration: 0.35 }}
              >
                <div className="card-top">
                  <div>
                    <span className="card-kicker">Section 01</span>
                    <h3>Job Influx Rate</h3>
                    <p>
                      Track requests, calls booked, and conversion rates over time.
                    </p>
                  </div>

                  <div className="mini-badge">
                    {filteredData.length} points
                  </div>
                </div>

                <div className="metric-grid">
                  <div className="metric-card">
                    <span>Total Requests</span>
                    <strong>{jobStats.totalInquiries}</strong>
                  </div>
                  <div className="metric-card">
                    <span>Qualified Leads</span>
                    <strong>{jobStats.totalQualified}</strong>
                  </div>
                  <div className="metric-card">
                    <span>Calls Booked</span>
                    <strong>{jobStats.totalCalls}</strong>
                  </div>
                  <div className="metric-card">
                    <span>Conversion Rate</span>
                    <strong>{jobStats.conversionRate}%</strong>
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
                        dataKey="inquiries"
                        name="Requests"
                        stroke="var(--primary-color)"
                        strokeWidth={3}
                        dot={{ r: 3 }}
                        activeDot={{ r: 6 }}
                      />
                      <Line
                        type="monotone"
                        dataKey="qualifiedLeads"
                        name="Qualified Leads"
                        stroke="var(--accent-color)"
                        strokeWidth={3}
                        dot={{ r: 3 }}
                        activeDot={{ r: 6 }}
                      />
                      <Line
                        type="monotone"
                        dataKey="callsBooked"
                        name="Calls Booked"
                        stroke="var(--secondary-color)"
                        strokeWidth={3}
                        dot={{ r: 3 }}
                        activeDot={{ r: 6 }}
                      />
                      <Line
                        type="monotone"
                        dataKey="projectsWon"
                        name="Conversions"
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
                    <span>Best month</span>
                    <strong>{jobStats.bestMonth}</strong>
                  </div>
                  <div>
                    <span>Total Conversions</span>
                    <strong>{jobStats.totalWins}</strong>
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
                    <h3>Work Growth Signals</h3>
                    <p>
                      Visualize my GitHub activity, portfolio traffic, LinkedIn
                      growth, and tool usage.
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
                    <span>Tool Usage</span>
                    <strong>{growthStats.toolUse}</strong>
                  </div>
                </div>

                <div className="chart-box chart-box--stacked">
                  <ResponsiveContainer width="100%" height={340}>
                    <AreaChart data={filteredData}>
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
                    <h4>Tool usage snapshot</h4>
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
                        dataKey="toolUsage"
                        name="Tool Usage"
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
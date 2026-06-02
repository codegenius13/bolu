import React, { useEffect, useState } from "react";
import "./Portfolio.css";
import port01 from "../../assets/img/blessedLogo.jpg";
import port02 from "../../assets/img/busyhandsLogo.jpg";
import port03 from "../../assets/img/wichita.png";
import port04 from "../../assets/img/christiLogo.png";
import port05 from "../../assets/img/ghLogo.jpg";



const FALLBACK_DATA = [
  // 3 Web projects
  {
    id: "web-1",
    title: "Senior System Engineer",
    company: "TheBlessed Fields Dispatch and Trucking",
    type: "web",
    year: 2024,
    short: "Logistics application forms submission  for drivers, owner operators, and customers request. Monitoring for the business admin.",
    long:
      "Case study: Built a logistics system for drivers, owner operators, and customers request. Used React, Node.js, and Mapbox APIs.",
    image: port01,
    tags: ["Logistics Application", "Request", "Career"],
    liveUrl: "https://www.theblessedfields.com",
  },
  {
    id: "web-2",
    title: "System Architect",
    company: "BusyHands Global LLC",
    type: "web",
    year: 2025,
    short: "Freight backend data analysis and logistics brokerage services for the admin of the business.",
    long:
      "Case study: Freight brokerage UI with driver/carrier details, tracking, and secure load posting. Built re-usable components and a design system.",
    image: port02,
    tags: ["Quoting", "Maps", "Payment"],
    liveUrl: "https://busyhandsglobal.com",
  },
  {
    id: "web-3",
    title: "Web Developer",
    company: "Chriti Nursing Network",
    type: "web",
    year: 2024,
    short: "Developed a web application for booking nursing appointments.",
    long:
      "Case study: Built a responsive web application for booking nursing appointments with real-time availability updates. Used React for the frontend and Node.js for the backend, integrating with a calendar API for scheduling.",
    image: port04,
    tags: ["Book Appointment", "Health", "NEMT"],
    liveUrl: "https://cnnnurse.com/",
  },
  {
    id: "web-4",
    title: "Research Assistant to a Graduate and Teaching Assistant",
    company: "Wichita State University",
    type: "research",
    year: 2023,
    short: "Generated, analyzed, and presented data from survey ",
    long:
      "Case study: Providing Digital and Calculated Solutions to Logistics in Industrial Engineering",
    image: port03,
    tags: ["Research", "Data Analysis", "Technical Writing", "Survey", "Presentation"],
  },
  {
    id: "web-5",
    title: "SIWES Training Student",
    company: "General Hospital Ikorodu, Lagos State.",
    type: "internship",
    year: 2024,
    short: "Gained experience in a healthcare settings.",
    long:
      "Case study: Gained experience in a healthcare settings. I was able to rotate through different departments and learn about the various roles and responsibilities of healthcare professionals. I also had the opportunity to work with patients and provide care under the supervision of experienced laboratory scientists.",
    image: port05,
    tags: ["Health", "Phlebotomy", "Chemical Pathology", "Hematology", "Microbiology"],
  },
];

export default function Portfolio() {
  const [works, setWorks] = useState([]);
  const [filter, setFilter] = useState("all"); // all | web | research
  const [query, setQuery] = useState("");
  const [active, setActive] = useState(null); // active work for modal
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;

    async function load() {
      try {
        const res = await fetch("/api/works");
        if (!res.ok) throw new Error("no api");
        const data = await res.json();
        if (mounted) {
          setWorks(data);
          setLoading(false);
        }
      } catch (e) {
        // fallback to dummy data
        setWorks(FALLBACK_DATA);
        setLoading(false);
      }
    }

    load();

    return () => {
      mounted = false;
    };
  }, []);

  const filtered = works.filter((w) => {
    const byType = filter === "all" ? true : w.type === filter;
    const q = query.trim().toLowerCase();
    const byQuery =
      q === "" ||
      w.title.toLowerCase().includes(q) ||
      w.short.toLowerCase().includes(q) ||
      (w.tags && w.tags.join(" ").toLowerCase().includes(q));
    return byType && byQuery;
  });

  return (
    <section id="work" className="portfolio" aria-labelledby="portfolio-title">
      <div className="portfolio-inner">
        <div className="portfolio-head">
          <h2 id="portfolio-title">Portfolio</h2>
          <p className="muted">Professional projects and research.</p>
        </div>

        <div className="controls">
            <div className="filters" role="tablist" aria-label="Filter works">
              <button className={`filter ${filter==="all"?"active":""}`} onClick={() => setFilter("all")}>All</button>
              <button className={`filter ${filter==="web"?"active":""}`} onClick={() => setFilter("web")}>Web</button>
              <button className={`filter ${filter==="research"?"active":""}`} onClick={() => setFilter("research")}>Research</button>
              <button className={`filter ${filter==="internship"?"active":""}`} onClick={() => setFilter("internship")}>Internship</button>
            </div>

            <div className="search">
              <input
                type="search"
                placeholder="Search projects or tags"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                aria-label="Search works"
              />
            </div>
          </div>

        <div className="grid">
          {loading ? (
            <div className="loader">Loading works…</div>
          ) : filtered.length === 0 ? (
            <div className="empty">No projects found.</div>
          ) : (
            filtered.map((w) => (
              <article
                key={w.id}
                className="card"
                tabIndex={0}
                role="button"
                onClick={() => setActive(w)}
                onKeyDown={(e) => (e.key === "Enter" ? setActive(w) : null)}
                aria-label={`Open ${w.title}`}
              >
                <div className="card-media" role="img" aria-label={w.title} style={{backgroundImage: `url(${w.image})`}} />
                <div className="card-body">
                  <div className="card-meta">
                    <span className="type">{w.type === "web" ? "Website" : w.type === "research" ? "Research" : "Internship"}</span>
                    <span className="year">{w.year}</span>
                  </div>

                  <h3 className="card-title">{w.title}</h3>
                  <h5 className="card-company">{w.company}</h5>
                  <p className="card-short">{w.short}</p>

                  <div className="card-tags">
                    {(w.tags || []).map((t) => (
                      <span className="tag" key={t}>{t}</span>
                    ))}
                  </div>
                </div>
              </article>
            ))
          )}
        </div>

        {/* modal / detail */}
        {active && (
          <div
            className="modal-overlay"
            role="dialog"
            aria-modal="true"
            aria-label={`${active.title} details`}
            onClick={() => setActive(null)}
          >
            <div className="modal" onClick={(e) => e.stopPropagation()}>
              <button className="modal-close" onClick={() => setActive(null)} aria-label="Close">✕</button>

              <div className="modal-grid">
                <div className="modal-media" style={{backgroundImage:`url(${active.image})`}} />
                <div className="modal-body">
                  <h3>{active.title}</h3>
                  <h5 className="modal-company">{active.company}</h5>
                  <div className="modal-meta">
                    <span>{active.type === "web" ? "Website" : active.type === "research" ? "Research Paper" : "Internship"}</span>
                    <span> • {active.year}</span>
                  </div>

                  <p className="modal-desc">{active.long}</p>

                  <div className="modal-tags">
                    {(active.tags || []).map((t) => (<span key={t} className="tag">{t}</span>))}
                  </div>

                  <div className="modal-actions">
                    {active.liveUrl && (
                      <a className="btn" href={active.liveUrl} target="_blank" rel="noreferrer">View Live</a>
                    )}

                    {active.fileUrl && (
                      <a className="btn-secondary" href={active.fileUrl} target="_blank" rel="noreferrer">View Paper</a>
                    )}

                    <button className="btn" onClick={() => { document.getElementById("contact")?.scrollIntoView({behavior:"smooth"}); setActive(null); }}>
                      Hire / Contact
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

      </div>
    </section>
  );
}

import React, { useEffect, useState } from "react";
import "./Portfolio.css";

/**
 * Portfolio.jsx
 * - Fetches /api/works (expects array of works). If fetch fails, uses fallback dummy data.
 * - Each work object shape:
 *   {
 *     id: string|number,
 *     title: string,
 *     type: "web" | "research",
 *     year: 2024,
 *     short: string,
 *     long: string,
 *     image: string,   // url
 *     tags: ["MERN","React"],
 *     liveUrl: "https://...",
 *     fileUrl: "https://..." // for papers
 *   }
 */

const FALLBACK_DATA = [
  // 3 Web projects
  {
    id: "web-1",
    title: "The Blessed Fields LLC",
    type: "web",
    year: 2024,
    short: "Responsive company site for an agricultural business — marketing pages, contact & CMS-ready.",
    long:
      "Case study: Built a responsive, SEO-minded marketing site with CMS integration and contact workflows. Implemented image optimization, accessibility improvements, and light-weight animations.",
    image: "https://images.unsplash.com/photo-1518779578993-ec3579fee39f?w=1400&q=60",
    tags: ["MERN", "SEO", "Responsive"],
    liveUrl: "https://theblessedfields.example",
  },
  {
    id: "web-2",
    title: "Christi Nursing Network",
    type: "web",
    year: 2023,
    short: "Healthcare landing site with services and appointment requests.",
    long:
      "Case study: Medical landing site with service descriptions, appointment form (server-ready) and simple accessibility-first layout. Implemented form validation and progressive enhancement.",
    image: "https://images.unsplash.com/photo-1582719478250-ec6f3ef6b33e?w=1400&q=60",
    tags: ["MERN", "Forms", "Accessibility"],
    liveUrl: "https://christinursing.example",
  },
  {
    id: "web-3",
    title: "BusyHands Global LLC",
    type: "web",
    year: 2024,
    short: "Freight & logistics brokerage web UI, dashboards and admin controls.",
    long:
      "Case study: Freight brokerage UI with driver/carrier details, tracking, and secure load posting. Built re-usable components and a mobile-first design system.",
    image: "https://images.unsplash.com/photo-1504215680853-026ed2a45def?w=1400&q=60",
    tags: ["React", "Realtime", "Maps"],
    liveUrl: "https://busyhands.example",
  },

  // 3 Research papers (dummy content)
  {
    id: "res-1",
    title: "PhD Project Paper (Draft)",
    type: "research",
    year: 2022,
    short: "PhD-level experimental report focusing on biochemical assays and data analysis (draft).",
    long:
      "This is a placeholder summary for the PhD project paper. The final paper contains methodology, dataset analysis, and complete results. (Replace with real content later.)",
    image: "https://images.unsplash.com/photo-1581091870621-3d2ee6a0a0a0?w=1400&q=60",
    tags: ["Biochemistry", "Assays", "Data"],
    fileUrl: "/papers/phd-project.pdf",
  },
  {
    id: "res-2",
    title: "Automated Farming Advancement (Dorcas Training)",
    type: "research",
    year: 2023,
    short: "Applied work on automated farming systems and adoption studies.",
    long:
      "Summary placeholder for collaborative research with Dorcas Training Services on automated farming systems and implementation strategies. (Replace with content later.)",
    image: "https://images.unsplash.com/photo-1508163227098-7b7b3b9f0c8a?w=1400&q=60",
    tags: ["Agriculture", "Automation", "Field Study"],
    fileUrl: "/papers/dorcas-farming.pdf",
  },
  {
    id: "res-3",
    title: "Review Paper (Literature Review)",
    type: "research",
    year: 2021,
    short: "A review of current trends in X (placeholder).",
    long:
      "Review placeholder — summarizes current works, gaps, and suggested directions. (Replace with final review text later.)",
    image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=1400&q=60",
    tags: ["Review", "Meta-analysis"],
    fileUrl: "/papers/review-paper.pdf",
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
          <p className="muted">Professional projects and research — web and scientific.</p>
        </div>

        <div className="controls">
            <div className="filters" role="tablist" aria-label="Filter works">
              <button className={`filter ${filter==="all"?"active":""}`} onClick={() => setFilter("all")}>All</button>
              <button className={`filter ${filter==="web"?"active":""}`} onClick={() => setFilter("web")}>Web</button>
              <button className={`filter ${filter==="research"?"active":""}`} onClick={() => setFilter("research")}>Research</button>
            </div>

            <div className="search">
              <input
                type="search"
                placeholder="Search projects or tags (e.g. MERN, Biochemistry)"
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
                    <span className="type">{w.type === "web" ? "Website" : "Research"}</span>
                    <span className="year">{w.year}</span>
                  </div>

                  <h3 className="card-title">{w.title}</h3>
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
                  <div className="modal-meta">
                    <span>{active.type === "web" ? "Website" : "Research Paper"}</span>
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
                      <a className="btn btn-secondary" href={active.fileUrl} target="_blank" rel="noreferrer">Download Paper</a>
                    )}

                    <button className="btn btn-primary" onClick={() => { document.getElementById("contact")?.scrollIntoView({behavior:"smooth"}); setActive(null); }}>
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

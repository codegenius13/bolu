import React, { useEffect, useState } from "react";
import "./Portfolio.css";
import port01 from "../../assets/img/blessed.png";
import port02 from "../../assets/img/christi.png";
import port03 from "../../assets/img/busyhands.png";
import port04 from "../../assets/img/esther.png";
import port05 from "../../assets/img/grace.png"


const FALLBACK_DATA = [
  // 3 Web projects
  {
    id: "web-1",
    title: "The Blessed Fields LLC",
    type: "web",
    year: 2024,
    short: "Responsive small business website for an agricultural business —  contact forms.",
    long:
      "Case study: Built a responsive, SEO-minded and contact workflow website. Implemented image optimization, accessibility improvements, and light-weight animations.",
    image: port01,
    tags: ["SEO", "Responsive"],
    liveUrl: "https://www.theblessedfields.com",
  },
  {
    id: "web-2",
    title: "Christi Nursing Network",
    type: "web",
    year: 2025,
    short: "Healthcare landing site with services and appointment requests.",
    long:
      "Case study: Medical landing site with service descriptions, appointment form (server-ready) and simple accessibility-first layout. Implemented form validation and progressive enhancement.",
    image: port02,
    tags: ["MERN", "Forms", "Accessibility"],
    liveUrl: "https://cnnnurse.com",
  },
  {
    id: "web-3",
    title: "BusyHands Global LLC",
    type: "web",
    year: 2026,
    short: "Freight & logistics brokerage web UI, dashboards and admin controls.",
    long:
      "Case study: Freight brokerage UI with driver/carrier details, tracking, and secure load posting. Built re-usable components and a mobile-first design system.",
    image: port03,
    tags: ["React", "Realtime", "Maps"],
    liveUrl: "https://busyhandsglobal.com",
  },

  // 3 Research papers (dummy content)
  {
    id: "res-1",
    title: "Optimizing The Agricultural Value Chain Through Smart Logistics, Urban Farming, And Inclusive Agricultural Onboarding: A Multi-Economic Perspective",
    type: "research",
    year: 2023,
    short: "PhD Project Paper on agricultural value chains and logistics.",
    long:
      "Post-harvest losses account for 30 - 40% of food waste globally, with some developing economies bearing the brunt due to fragile infrastructure, inefficient logistics, and poor planning in agriculture. This research offers a comprehensive, systems-level approach to reimagining agricultural productivity through optimized farm production planning, logistics, urban farming, and educational reform to revolutionize youth participation. Employing mixed methods, modeling, field studies, expert interviews, and secondary data generated from software, this study juxtaposes case studies from Nigeria and the United States to identify scalable solutions. This research proposes an integrated logistics optimization model featuring multi-nodal routing, shared transport, and tracking to minimize backhauling and reduce logistics costs by an estimated 20%. A sustainable homesteading and community gardening blueprint designed to convert underutilized urban spaces into vibrant food production zones is suggested, one that utilizes proactive production planning simplified to help users attain maximum yield with seasonality and market needs. Information gathered through interviews, comparative studies and research culminated into the development of a suggested online and paper-based curriculum update to agricultural educational planning for middle to high schoolers, embedded in practical agri-preneurship and modern farming techniques into school systems. A phased 12-month training program and farmer-to-farmer mentorship network are introduced to support new agricultural entrants. Tech-driven interventions include a digital farmer marketplace app, and smart logistics booking for produce delivery were designed with future plans for this research. In addition, an infrastructure proposal tailored for a 3rd world country like Nigeria was strategically developed with sub-processing hubs designed in a network from the multi-nodal route model to optimize to and fro transportation of logistics partners, that also incorporate cold storage powered by a renewable power system, backed by a 10-year $100M phased investment plan to increase manufacturing capabilities in this region. An expected outcome is projected to include a 35–50% reduction in post-harvest losses, a 30–40% increase in farmer incomes, and the creation of over 250,000 direct jobs in Nigeria alone asides the possibilities of road network expansion and adjunct business opportunities as a result of this initiative. This model provides a realistic roadmap for climate-resilient, youth-inclusive and technology driven agriculture in stages that could potentially trigger economic sustainability and empowerment that aligns food security with a manufacturing and logistic transformation.",
    image: port04,
    tags: ["Agriculture", "Logistics", "Urban Farming", "Education"],
    fileUrl: "",
  },
  {
    id: "res-2",
    title: "Nutrition",
    type: "research",
    year: 2024,
    short: "Study on nutritional content of various food crops. And the Negative Advancent of GMO foods",
    long: "To show that nutrition is paramount to healthy living and well-being the Merck Manual started the first few chapters of the book with nutrition. This was very interesting to me and got me excited because I am a student of natural health, and I believe in natural medicine, therapy, or treatment before conventional medicine. Nutrition is the science of food and its relationship to health. Nutrients are chemicals in foods that are used by the body for growth, maintenance, and energy. Nutrients that cannot be synthesized by the body must be derived from diet. They are considered essential (vitamins, minerals, some amino acids, and fatty acids). Nutrients that the body can synthesize and can be derived from diet are considered nonessential. Lack of nutrients can result in deficiency syndromes (e.g. kwashiorkor, pellagra), while excess intake of nutrients leads to obesity. Macronutrients are a large amount of nutrients that the body needs, while micronutrients are a minute amount that the body needs. Macronutrients comprise carbohydrates, protein, and fats, the three groups of foods. Carbohydrates increase blood sugar and supply energy. Carbohydrates, proteins, and fats are interchangeable as sources of energy. There are two groups of carbohydrates (simple and complex) carbohydrates. Glucose and sucrose are simple carbohydrates while starches and fiber are complex carbohydrates. Simple and complex carbohydrates affect blood sugar level. Simple carbohydrates increase blood glucose level rapidly, while complex carbohydrates increase blood glucose slowly. Therefore, be advised to reduce your intake of simple carbohydrates if you have pre-diabetes, diabetic, obese, or cardiovascular disease and increase complex carbohydrates. Dietary proteins are broken down into peptides and amino acids, and are required for tissue repairs, maintenance, replacement, function, and growth. More proteins may be used do you rain catabolic state for instance starvation, infections, and burns. There are 20 amino acids of which nine are essential amino acid EAAs and these cannot be synthesized and must be obtained from diet. Both adults and infants require 8 EA As. The body can also use protein for energy where there is scarcity of fat. Fats are broken down into fatty acids glycerol. Fats are required for tissue growth and hormone production. Fats have two groups saturated and unsaturated fats). Saturated fatty acids are common in animal fats and can be solid at room temperature. Palm and coconut oils are plant-based oils that can be liquid at room temperature. Trans fatty acids may elevate LDL cholesterol and Lola HDL and may increase the risk of coronary artery disease. Micronutrients are minerals required for the body in minute traces. Water soluble vitamins are vitamin C (ascorbic acid) and 8 members of vitamin B complex. Water soluble vitamins are A, D, E and K. Another important nutritional requirement is to balance energy or caloric intake to get a desirable body weight. However, energy spending depends on age, sex, weight, and metabolic and physical activity. Let your caloric intake be balanced with your energy expenditure. Nutrition is important in clinical setting and multidisciplinary nutritional support to prevent, diagnose, and treat occult nutritional deficiencies are available. Nutritional deficiency can often worsen health outcomes, and some can cause nutritional deficiencies. Overnutrition on the other hand, may contribute to chronic disorders such as cancer, hypertension, obesity, diabetes mellitus, and coronary artery disease. Therefore, good nutrition with good nutrients is what the body needs to function at an optimum level. Macronutrients are essential to the body, however, do not overindulge in them, and undernutrition will cause other health diseases and nutritional deficiencies.",
    image: port05,
    tags: ["Nutrition", "Health", "GMO"],
    fileUrl: "",
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

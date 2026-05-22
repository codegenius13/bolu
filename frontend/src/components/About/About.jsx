import React, { useEffect, useRef, useState } from "react";
import "./About.css";
import { FaEnvelope, FaGithub, FaLink, FaLinkedin  } from "react-icons/fa";
import { FaSquareUpwork } from "react-icons/fa6";
import infralytix from "../../assets/img/infralytix.png";

export default function About() {
  const [inView, setInView] = useState(false);
  const [counts, setCounts] = useState({ projects: 0, clients: 0, years: 0 });
  const sectionRef = useRef(null);

  const skills = [
    { name: "JavaScript / React", pct: 92 },
    { name: "Node.js / Express / Database (MongoDb)", pct: 88 },
    { name: "Data Analysis", pct: 83 },
    { name: "Laboratory Research", pct: 75 },
    { name: "Technical Writing", pct: 81 },
  ];

  // IntersectionObserver to trigger animations when section enters view
  useEffect(() => {
    const node = sectionRef.current;
    if (!node) return;

    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setInView(true);
            obs.disconnect();
          }
        });
      },
      { threshold: 0.25 }
    );

    obs.observe(node);
    return () => obs.disconnect();
  }, []);

  // simple counter animation when in view
  useEffect(() => {
    if (!inView) return;
    let raf;
    const start = performance.now();
    const duration = 900; // ms

    const animate = (ts) => {
      const progress = Math.min((ts - start) / duration, 1);
      setCounts({
        projects: Math.floor(progress * 3), // example final values
        clients: Math.floor(progress * 2),
        years: Math.floor(progress * 3 + 1),
      });
      if (progress < 1) raf = requestAnimationFrame(animate);
    };

    raf = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(raf);
  }, [inView]);

  return (
    <section className="about" id="about" ref={sectionRef} aria-labelledby="about-title">
      <div className="about-inner">
        {/* LEFT: Bio + experience */}
        <div className={`about-left ${inView ? "enter" : ""}`}>
          <h2 id="about-title">About Me</h2>

          <p className="about-leading">
            I'm Bolu Ikuerowo — <span className="cv-highlight"> I have interest in building digital tools and making data analysis, presentation and research more flexible. I'm very much a continous learner and generally easy to work with. I love to think I can be a good addition to any team, and I take pride in my work for others and myself.</span>
          </p>

          <div className="about-text">
            <p>
              I take remote and contract work via LinkedIn and also
              work directly with small businesses within my connection.
            </p>

            <div className="project-highlight">
              <div className="project-image">
                <img
                  src={infralytix}
                  alt="research data analysis and generator interface"
                />
              </div>

              <div className="project-info">
                <h4>Infralytix</h4>
                <p>
                  I am currently developing <strong>Infralytix</strong> — a web-based tool that simplifies research, data analysis and report generation. It can perform simulated visualizations on the basis of proven research. The idea is to help researchers, students, and professionals quickly generate insights and visualizations from data without needing complex software.
                </p>
                <a href="https://bolu.onrender.com" target="_blank">View Site <FaLink /></a>
              </div>
            </div>
            <div className="about-cta">
              <button className="btn" onClick={() => document.getElementById("work")?.scrollIntoView({ behavior: "smooth" })}>
                View Works
              </button>

              <button className="btn btn-secondary" onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}>
                Contact Me
              </button>
            </div>
          </div>
        </div>

        {/* RIGHT: Skills & stats */}
        <aside className={`about-right ${inView ? "enter" : ""}`} aria-hidden={!inView}>
          <div className="stats">
            <div className="stat">
              <div className="stat-number">{counts.projects}+</div>
              <div className="stat-label">Projects</div>
            </div>
            <div className="stat">
              <div className="stat-number">{counts.clients}+</div>
              <div className="stat-label">Clients</div>
            </div>
            <div className="stat">
              <div className="stat-number">{counts.years}</div>
              <div className="stat-label">Years</div>
            </div>
          </div>

          <div className="skills">
            <h4>Key Skills</h4>

            <div className="skill-list">
              {skills.map((s) => (
                <div className="skill-row" key={s.name}>
                  <div className="skill-meta">
                    <div className="skill-name">{s.name}</div>
                    <div className="skill-pct">{s.pct}%</div>
                  </div>

                  <div className="skill-bar" role="progressbar" aria-valuemin="0" aria-valuemax="100" aria-valuenow={inView ? s.pct : 0}>
                    <div
                      className="skill-fill"
                      style={{ width: inView ? `${s.pct}%` : "0%" }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="sources">
            <h5>Where I get work</h5>
            <p className="small">
              Most requests come from LinkedIn, plus direct referrals
              within my connection. I keep portfolio and profiles up to date.
            </p>
            <div className="source-links">
              <a href="https://www.linkedin.com/in/boluwatife-ikuerowo-80490226b?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=ios_app" target="_blank" rel="noopener noreferrer">
                <FaLinkedin size={20} style={{ verticalAlign: 'middle', marginRight: '6px' }} />
                LinkedIn
              </a>
              <a href="mailto:ikuerowob@gmail.com" target="_blank" rel="noopener noreferrer">
                <FaEnvelope size={20} style={{ verticalAlign: 'middle', marginRight: '6px' }} />
                Email Referral
              </a>
              <a href="https://github.com/codegenius13" target="_blank" rel="noopener noreferrer">
                <FaGithub size={20} style={{ verticalAlign: 'middle', marginRight: '6px' }} />
                GitHub
              </a>
            </div>
          </div>
        </aside>
      </div>
    </section>
  );
}

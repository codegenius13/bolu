import React, { useEffect, useMemo, useRef, useState } from "react";
import { motion } from "framer-motion";
import html2canvas from "html2canvas";
import { jsPDF } from "jspdf";
import "./Resume.css";

const fallbackResume = {
  name: "Ikuerowo Boluwatife",
  role: "Researcher • Data Analyst • Digital Strategist",
  email: "ikuerowob@gmail.com",
  phone: "+234 814 558 4399",
  whatsapp: "+234 814 558 4399",
  linkedin: "www.linkedin.com/in/boluwatife-ikuerowo-80490226b",
  website: "https://bolu.onrender.com",
  location: "Lagos, Nigeria",
  photoSrc: "",
  education: [
    {
      school:
        "Olusegun Agagu University of Science and Technology",
      course: "BSc. Biochemistry",
      grade: "Second Class Upper Division (4.44)",
      year: "2025",
    },
  ],
  summary:
    "I have interest in building digital tools that make analysis, presentation and research more flexible. I'm very much a continous learner and generally easy to work with. I love to think I can be a good addition to any team, and I take pride in my work for others and myself.",
  skills: [
    "Research & Analysis",
    "Fullstack Development",
    "Data Generation",
    "Data Presentation",
    "Laboratory Skills"
  ],
  highlights: [
    "Research synthesis and insight generation",
    "Data decision support",
    "Analytics tracking and monitoring",
    "System design for digital operations",
  ],
  certifications: [
    "Jobberman Soft Skill Training",
    "Introduction to Programming Using JavaScript",
    "ICSAE-XII Conference Certificate"
  ],
  experience: [
    {
      title: "Selected Portfolio Work",
      company: "Bolu Portfolio",
      description:
        "Projects and website sections that show research thinking, design sense, and digital problem solving.",
      tech: ["MERN", "Node.js", "Express", "MongoDB"],
    },
  ],
  publications: [
    {
      title:
        "AI Driven and Cloud-Based Integration of Agricultural Supply Chains for the Innovative Development of Sustainable Models and Educational Tools",
      type: "Conference Paper",
      status: "Presented",
      venue:
        "12th ICSAE-XII Conference, Udayana University, Bali, Indonesia",
      year: "2025",
      certificateLink:
        "https://drive.google.com/file/d/1FP9AqSYnUJcRmv-KrwphBrerjDL5SyM3/view?usp=drive_link",
    },

    {
      title:
        "In vitro polyphenol content and antioxidant properties of Corchorus olitorius stored at 4 °C for 3, 6, and 9 days",
      type: "Journal Article",
      status: "Under Review",
      venue:
        "Journal of Bioscience and Biotechnology",
      year: "2026",
    },
  ],
};

const sectionVariants = {
  hidden: { opacity: 0, y: 24 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: "easeOut" },
  },
};

function cleanText(value) {
  return String(value || "").replace(/\s+/g, " ").trim();
}

function getRoot(selectors = []) {
  for (const selector of selectors) {
    const el = document.querySelector(selector);
    if (el) return el;
  }
  return document;
}

function firstText(selectors = [], root = document) {
  for (const selector of selectors) {
    const el = root.querySelector?.(selector);
    if (el) {
      const txt = cleanText(el.innerText || el.textContent);
      if (txt) return txt;
    }
  }
  return "";
}

function findFirstLink(hrefPattern, root = document) {
  const links = Array.from(root.querySelectorAll("a"));
  const link = links.find((a) => hrefPattern.test(a.href || ""));
  return link ? link.href : "";
}

function findProfilePhoto() {
  const images = Array.from(document.images || []);
  const match = images.find((img) => {
    const alt = (img.alt || "").toLowerCase();
    const src = (img.src || "").toLowerCase();
    return (
      alt.includes("profile") ||
      alt.includes("avatar") ||
      alt.includes("me") ||
      src.includes("profile") ||
      src.includes("avatar")
    );
  });

  return match?.src || "";
}

function collectSocials(root = document) {
  const linkedin =
    findFirstLink(/linkedin\.com/i, root) ||
    findFirstLink(/linkedin\.com/i, document);
  const whatsapp =
    findFirstLink(/wa\.me/i, root) ||
    findFirstLink(/api\.whatsapp\.com/i, root) ||
    findFirstLink(/wa\.me/i, document) ||
    findFirstLink(/api\.whatsapp\.com/i, document);
  const website =
    findFirstLink(/^https?:\/\/(?!.*(linkedin|wa\.me|whatsapp|mailto|tel))/i, root) ||
    "";

  return { linkedin, whatsapp, website };
}

function collectContact(root = document) {
  const email =
    findFirstLink(/^mailto:/i, root) ||
    findFirstLink(/^mailto:/i, document) ||
    "";
  const phone =
    findFirstLink(/^tel:/i, root) ||
    findFirstLink(/^tel:/i, document) ||
    "";

  const phoneFromText = phone
    ? phone.replace(/^tel:/i, "")
    : "";

  return {
    email: email.replace(/^mailto:/i, ""),
    phone: phoneFromText,
  };
}

function collectExperience() {
  const portfolioRoot = getRoot([
    "#portfolio",
    ".portfolio-section",
    "[data-section='portfolio']",
  ]);

  const selectors = [
    "[data-portfolio-item]",
    "[data-experience-item]",
    ".portfolio-card",
    ".project-card",
    ".portfolio-item",
    "article",
  ].join(",");

  const cards = Array.from(portfolioRoot.querySelectorAll(selectors));
  const seen = new Set();
  const items = [];

  cards.forEach((card) => {
    const titleEl = card.querySelector("h3, h4, h5, .card-title, .title");
    const companyEl = card.querySelector("h5, .card-company, .company");
    const descEl = card.querySelector("p, .description, .card-description");
    const techEls = Array.from(card.querySelectorAll("li, .tag, .chip, span"));

    const title = cleanText(titleEl?.innerText || titleEl?.textContent);
    const company = cleanText(companyEl?.innerText || companyEl?.textContent);
    const description = cleanText(descEl?.innerText || descEl?.textContent);
    const tech = [...new Set(techEls.map((el) => cleanText(el.innerText || el.textContent)).filter(Boolean))]
      .filter((value) => value.length < 24)
      .slice(0, 5);

    if (!title || seen.has(title.toLowerCase())) return;
    seen.add(title.toLowerCase());

    items.push({
      title,
      company,
      description,
      tech,
    });
  });

  return items.slice(0, 3);
}

function collectSkills() {
  const pageText =
    document.body?.innerText?.toLowerCase?.() || "";

  const buckets = [
    {
      label: "Research & Analysis",
      keywords: [
        "research",
        "analysis",
        "analytics",
        "data",
        "report",
        "insight",
      ],
    },
    {
      label: "Fullstack Development",
      keywords: [
        "infrastructure",
        "deployment",
        "server",
        "database",
        "api",
        "cloud",
        "mern",
        "mongodb",
        "react",
        "node",
        "express",
      ],
    },
    {
      label: "Data Generation",
      keywords: [
        "data generation",
        "experimental",
        "sampling",
        "analysis",
      ],
    },
    {
      label: "Data Presentation",
      keywords: [
        "presentation",
        "visualization",
        "dashboard",
        "reporting",
        "charts",
        "graphs",
      ],
    },
    {
      label: "Laboratory Skills",
      keywords: [
        "spectrophotometry",
        "pcr",
        "centrifugation",
        "laboratory",
        "microbiology",
        "biochemistry",
        "phlebotomy",
        "chemical pathology",
      ],
    },
  ];

  const detectedSkills = buckets
    .filter((bucket) =>
      bucket.keywords.some((keyword) =>
        pageText.includes(keyword)
      )
    )
    .map((bucket) => bucket.label);

  // Merge fallback + detected skills and remove duplicates
  return [
    ...new Set([
      ...fallbackResume.skills,
      ...detectedSkills,
    ]),
  ];
}

function collectSummary() {
  const heroRoot = getRoot(["#about", ".about-section", "[data-section='about']"]);
  const aboutRoot = getRoot(["#about", ".about-section", "[data-section='about']"]);

  const summary =
    firstText(
      [
        "[data-resume-summary]",
        ".cv-highlight",
      ],
      heroRoot
    ) ||
    firstText(
      [
        "[data-resume-summary]",
        ".cv-highlight",
      ],
      aboutRoot
    );

  return summary || fallbackResume.summary;
}

function collectNameAndRole() {
  const heroRoot = getRoot(["#hero", ".hero-section", "[data-section='hero']"]);

  const name =
    firstText(["[data-resume-name]", "hero-name"], heroRoot) ||
    firstText(["[data-resume-name]", "hero-name"], document) ||
    fallbackResume.name;

  const role =
    firstText(["[data-resume-role]", ".lead-badge"], heroRoot) ||
    firstText(["[data-resume-role]", ".lead-badge"], document) ||
    fallbackResume.role;

  return { name, role };
}

function buildResumeData() {
  const { name, role } = collectNameAndRole();
  const contact = collectContact();
  const socials = collectSocials();
  const experience = collectExperience();
  const skills = collectSkills();
  const photoSrc = findProfilePhoto();
  const summary = collectSummary();

  return {
    ...fallbackResume,
    name,
    role,
    email: contact.email || fallbackResume.email,
    phone: contact.phone || fallbackResume.phone,
    whatsapp:
      socials.whatsapp ||
      contact.phone ||
      fallbackResume.whatsapp,
    linkedin:
      socials.linkedin || fallbackResume.linkedin,
    website:
      socials.website || fallbackResume.website,
    photoSrc:
      photoSrc || fallbackResume.photoSrc,
    summary,
    skills,
    education:
      fallbackResume.education,
    experience:
      experience.length > 0
        ? experience
        : fallbackResume.experience,
    certifications:
      fallbackResume.certifications,
    publications:
      fallbackResume.publications,

  };
}

function Resume() {
  const templateRef = useRef(null);
  const [resumeData, setResumeData] = useState(fallbackResume);
  const [isExporting, setIsExporting] = useState(false);
  const [status, setStatus] = useState("Ready to generate resume PDF.");

  useEffect(() => {
    const exportPdf = async () => {
      if (!isExporting || !templateRef.current) return;

      try {
        setStatus("Building your resume PDF...");

        await new Promise((resolve) => setTimeout(resolve, 250));

        const canvas = await html2canvas(templateRef.current, {
          scale: 2,
          useCORS: true,
          backgroundColor: "#ffffff",
          logging: false,
          scrollY: 0,
          scrollX: 0,
        });

        const imgData = canvas.toDataURL("image/png");
        const pdf = new jsPDF("p", "mm", "a4");
        const pageWidth = pdf.internal.pageSize.getWidth();
        const pageHeight = pdf.internal.pageSize.getHeight();

        pdf.addImage(imgData, "PNG", 0, 0, pageWidth, pageHeight);
        pdf.save(`${cleanText(resumeData.name || "resume").replace(/\s+/g, "-").toLowerCase() || "resume"}.pdf`);

        setStatus("Resume downloaded successfully.");
      } catch (error) {
        console.error("Resume export failed:", error);
        setStatus("Resume download failed. Please try again.");
      } finally {
        setIsExporting(false);
      }
    };

    exportPdf();
  }, [isExporting, resumeData]);

  const previewStats = useMemo(() => {
    return [
      {
        label: "Personal fields",
        value: 5,
      },
      {
        label: "Skills detected",
        value: resumeData.skills.length,
      },
      {
        label: "Experience blocks",
        value: resumeData.experience.length,
      },
    ];
  }, [resumeData]);

  const handleDownload = () => {
    if (isExporting) return;
    const extracted = buildResumeData();
    setResumeData(extracted);
    setIsExporting(true);
  };

  return (
    <section className="resume-section" id="resume">
      <motion.div
        className="resume-shell"
        variants={sectionVariants}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.2 }}
      >
        <div className="resume-header">
          <div>
            <span className="section-kicker">Resume Download</span>
            <h2>Generate a clean one-page resume from my live portfolio</h2>
            <p>
              You can click the button to export my key info, skills, and experiences on my portfolio page.
            </p>
          </div>

          <button
            type="button"
            className="btn resume-download-btn"
            onClick={handleDownload}
            disabled={isExporting}
          >
            {isExporting ? "Generating..." : "Download Resume"}
          </button>
        </div>

        <div className="resume-layout">
          <motion.div
            className="resume-info-card"
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45 }}
            viewport={{ once: true }}
          >
            <div className="resume-info-card__top">
              <div className="resume-avatar">
                {resumeData.photoSrc ? (
                  <img src={resumeData.photoSrc} alt={`${resumeData.name} profile`} />
                ) : (
                  <span>{(resumeData.name || "I").charAt(0)}</span>
                )}
              </div>

              <div className="resume-name-block">
                <h3>{resumeData.name}</h3>
                <p>{resumeData.role}</p>
              </div>
            </div>

            <div className="resume-preview-grid">
              {previewStats.map((item) => (
                <div key={item.label} className="resume-preview-stat">
                  <span>{item.label}</span>
                  <strong>{item.value}</strong>
                </div>
              ))}
            </div>

            <div className="resume-output-list">
              <h4>What the PDF picks up</h4>
              <ul>
                <li>Personal info such as email, phone, WhatsApp, LinkedIn, and website</li>
                <li>Experience from my portfolio cards and project sections</li>
                <li>Skills inferred from the content already on the page</li>
              </ul>
            </div>

            <div className="resume-status">{status}</div>
          </motion.div>

          <motion.div
            className="resume-side-card"
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.05 }}
            viewport={{ once: true }}
          >
            <div className="resume-side-card__header">
              <span className="card-kicker">Quick & Flexible</span>
              <h3>Download All Information</h3>
            </div>

            <div className="resume-side-card__content">
              <p>
                Download a comprehensive PDF that includes all my information, skills, and experience.
              </p>

              <div className="resume-pills">
                {resumeData.skills.slice(0, 6).map((skill) => (
                  <span key={skill} className="resume-pill">
                    {skill}
                  </span>
                ))}
              </div>

              <div className="resume-highlight-box">
                <h4>Highlights included</h4>
                <ul>
                  {resumeData.highlights.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
            </div>
          </motion.div>
        </div>
      </motion.div>

      {/* Hidden PDF template */}
      <div className="resume-template-wrap" aria-hidden="true">
        <div ref={templateRef} className="resume-template">
          <header className="resume-paper__header">
            <div className="resume-paper__identity">
              <p className="resume-paper__eyebrow">Professional Resume</p>
              <h3>{resumeData.name}</h3>
              <h5>{resumeData.role}</h5>
              <p className="resume-paper__summary">{resumeData.summary}</p>
            </div>

            <div className="resume-paper__photo">
              {resumeData.photoSrc ? (
                <img src={resumeData.photoSrc} alt={`${resumeData.name} profile`} crossOrigin="anonymous" />
              ) : (
                <div className="photo-fallback">{(resumeData.name || "U").charAt(0)}</div>
              )}
            </div>
          </header>

          <div className="resume-paper__body">
            <aside className="resume-paper__left">
              <section className="paper-block">
                <h3>Contact</h3>
                <ul className="paper-list">
                  <li>
                    <strong>Email:</strong> {resumeData.email}
                  </li>
                  <li>
                    <strong>Phone:</strong> {resumeData.phone}
                  </li>
                  <li>
                    <strong>WhatsApp:</strong> {resumeData.whatsapp}
                  </li>
                  <li>
                    <strong>LinkedIn:</strong> {resumeData.linkedin}
                  </li>
                  <li>
                    <strong>Portfolio:</strong> {resumeData.website}
                  </li>
                </ul>
              </section>

              <section className="paper-block">
                <h3>Core Skills</h3>
                <div className="paper-tags">
                  {resumeData.skills.map((skill) => (
                    <span key={skill}>{skill}</span>
                  ))}
                </div>
              </section>

              <section className="paper-block">
                <h3>Education</h3>

                <div className="paper-education-list">
                  {resumeData.education?.map(
                    (edu, index) => (
                      <article
                        key={`${edu.school}-${index}`}
                        className="paper-education"
                      >
                        <h4>{edu.school}</h4>
                        <p>{edu.course}</p>

                        <div className="paper-grade">
                          <strong>
                            <small>{edu.grade}</small>
                          </strong>

                          <small>{edu.year}</small>
                        </div>
                      </article>
                    )
                  )}
                </div>
              </section>
              <section className="paper-block paper-block--summary">
                <h3>Certifications</h3>

                <ul className="paper-certification-list">
                  {resumeData.certifications?.map(
                    (cert, index) => (
                      <li key={`${cert}-${index}`}>
                        {cert}
                      </li>
                    )
                  )}
                </ul>
              </section>
            </aside>

            <main className="resume-paper__right">
              <section className="paper-block">
                <h3>Experience / Portfolio</h3>
                <div className="paper-experience-list">
                  {resumeData.experience.map((item, index) => (
                    <article key={`${item.title}-${index}`} className="paper-experience">
                      <div className="paper-experience__top">
                        <h4>{item.title}</h4>
                      </div>
                      <h5>{item.company}</h5>
                      <p>{item.description}</p>
                      {item.tech?.length > 0 && (
                        <div className="paper-tech">
                          {item.tech.map((tech) => (
                            <span key={tech}>{tech}</span>
                          ))}
                        </div>
                      )}
                    </article>
                  ))}
                </div>
              </section>

              <section className="paper-block">
                <h3>Publications</h3>
                <div className="paper-publication-list">
                  {resumeData.publications?.map(
                    (pub, index) => (
                      <article
                        key={`${pub.title}-${index}`}
                        className="paper-publication"
                      >
                        <h5>{pub.title}</h5>

                        <p className="publication-meta">
                          <strong>{pub.type}</strong>
                          {" • "}
                          {pub.status}
                        </p>

                        <small className="publication-venue">
                          {pub.venue}
                        </small>

                        <div className="publication-footer">
                          <small>{pub.year}</small>

                          {pub.certificateLink && (
                            <a
                              href={pub.certificateLink}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="publication-link"
                            >
                              View Certificate
                            </a>
                          )}
                        </div>
                      </article>
                    )
                  )}
                </div>
              </section>
            </main>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Resume;
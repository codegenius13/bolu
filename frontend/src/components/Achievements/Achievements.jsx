import React, { useEffect, useState } from "react";
import "./Achievements.css";

// Replace these with your real files
// PDF is best for certificates because it downloads and previews well
import icsaeCertificate from "../../assets/document/ICSAE-XII Manuscript M-92.pdf";
import jobbermanCertificate from "../../assets/document/Jobbermann Certificate.pdf";

const ACHIEVEMENTS = [
  {
    id: "ach-1",
    title: "ICSAE-XII Conference Certificate",
    issuer: "12th ICSAE-XII Conference",
    date: "October 2025",
    type: "Certificate",
    description:
      "Certificate of participation and presentation at the 12th ICSAE-XII Conference, Udayana University, Bali, Indonesia.",
    fileUrl: icsaeCertificate,
    previewUrl: icsaeCertificate,
    fileType: "pdf",
  },
  {
    id: "ach-2",
    title: "Jobberman Soft Skills Training",
    issuer: "Jobberman",
    date: "2025",
    type: "Certificate",
    description:
      "Certificate for completing Jobberman Soft Skills Training.",
    fileUrl: jobbermanCertificate,
    previewUrl: jobbermanCertificate,
    fileType: "pdf",
  },
];

export default function Achievements() {
  const [activeAchievement, setActiveAchievement] = useState(null);

  useEffect(() => {
    const onKeyDown = (e) => {
      if (e.key === "Escape") setActiveAchievement(null);
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  const closeModal = () => setActiveAchievement(null);

  return (
    <section id="achievements" className="achievements-section" aria-labelledby="achievements-title">
      <div className="achievements-inner">
        <div className="achievements-head">
          <p className="section-kicker">Recognition</p>
          <h2 id="achievements-title">Achievements</h2>
          <p className="achievements-subtitle">
            Certificates and training that reflect my academic and professional growth.
          </p>
        </div>

        <div className="achievements-grid">
          {ACHIEVEMENTS.map((item) => (
            <article key={item.id} className="achievement-card">
              <div className="achievement-badge">{item.type}</div>

              <div className="achievement-content">
                <h3>{item.title}</h3>
                <p className="achievement-issuer">{item.issuer}</p>
                <p className="achievement-date">{item.date}</p>
                <p className="achievement-description">{item.description}</p>
              </div>

              <div className="achievement-actions">
                <button
                  type="button"
                  className="btn achievement-btn"
                  onClick={() => setActiveAchievement(item)}
                >
                  View Certificate
                </button>

                <a
                  className="btn-secondary achievement-btn"
                  href={item.fileUrl}
                  download
                  target="_blank"
                  rel="noreferrer"
                >
                  Download
                </a>
              </div>
            </article>
          ))}
        </div>
      </div>

      {activeAchievement && (
        <div className="achievement-modal-overlay" onClick={closeModal} role="dialog" aria-modal="true">
          <div className="achievement-modal" onClick={(e) => e.stopPropagation()}>
            <button className="achievement-modal-close" onClick={closeModal} aria-label="Close certificate preview">
              ✕
            </button>

            <div className="achievement-modal-header">
              <div>
                <p className="section-kicker">Certificate Preview</p>
                <h3>{activeAchievement.title}</h3>
                <p className="achievement-modal-meta">
                  {activeAchievement.issuer} • {activeAchievement.date}
                </p>
              </div>

              <a
                className="btn-secondary achievement-download-link"
                href={activeAchievement.fileUrl}
                download
                target="_blank"
                rel="noreferrer"
              >
                Download Certificate
              </a>
            </div>

            <div className="achievement-preview">
              {activeAchievement.fileType === "pdf" ? (
                <iframe
                  src={activeAchievement.previewUrl}
                  title={activeAchievement.title}
                  className="achievement-iframe"
                />
              ) : (
                <img
                  src={activeAchievement.previewUrl}
                  alt={activeAchievement.title}
                  className="achievement-image"
                />
              )}
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
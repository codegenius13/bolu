import React, { useEffect, useState } from "react";
import "./Achievements.css";

// Replace these with your real files
// PDF is best for certificates because it downloads and previews well
import advancedReact from "../../assets/document/Advanced React.pdf";
import algorithms from "../../assets/document/Algorithms for DNA Sequencing.pdf";
import bioinformaticsI from "../../assets/document/Bioinformatic Methods I.pdf";
import bioinformaticsII from "../../assets/document/Bioinformatics Methods II.pdf";
import genetic from "../../assets/document/DNA Genome and Genetic Disorders.pdf";
import systemsBiology from "../../assets/document/Experimental Methods in Systems Biology.pdf";
import hidingMessages from "../../assets/document/Finding Hiding Messages in DNA Bioinformatics I.pdf";
import genomic from "../../assets/document/Introduction to Genomics Technologies.pdf";
import introSystems from "../../assets/document/Introduction to Systems Biology.pdf";
import python from "../../assets/document/Python for Genomic Data Science.pdf";
import icsaeCertificate from "../../assets/document/ICSAE-XII Manuscript M-92.pdf";
import jobbermanCertificate from "../../assets/document/Jobbermann Certificate.pdf";

const ACHIEVEMENTS = [
  {
    id: "ach-1",
    title: "Bioinformatics Methods II",
    issuer: "Coursera",
    date: "August 2026",
    type: "Certificate",
    description:
      "Certificate for completing the Bioinformatic Methods II course on Coursera.",
    fileUrl: bioinformaticsII,
    previewUrl: bioinformaticsII,
    fileType: "pdf",
  },{
    id: "ach-2",
    title: "Bioinformatics Methods I",
    issuer: "Coursera",
    date: "July 2026",
    type: "Certificate",
    description:
      "Certificate for completing the Bioinformatic Methods I course on Coursera.",
    fileUrl: bioinformaticsI,
    previewUrl: bioinformaticsI,
    fileType: "pdf",
  },{
    id: "ach-3",
    title: "Finding Hidden Messages in DNA (Bioinformatics Intro)",
    issuer: "Coursera",
    date: "July 2026",
    type: "Certificate",
    description:
      "Certificate for completing the Finding Hidden Messages in DNA course on Coursera.",
    fileUrl: hidingMessages,
    previewUrl: hidingMessages,
    fileType: "pdf",
  },{
    id: "ach-4",
    title: "Experimental Methods in Systems Biology",
    issuer: "Coursera",
    date: "July 2026",
    type: "Certificate",
    description:
      "Certificate for completing the Experimental Methods in Systems Biology course on Coursera.",
    fileUrl: systemsBiology,
    previewUrl: systemsBiology,
    fileType: "pdf",
  },{
    id: "ach-5",
    title: "Introduction to Systems Biology",
    issuer: "Coursera",
    date: "July 2026",
    type: "Certificate",
    description:
      "Certificate for completing the Introduction to Systems Biology course on Coursera.",
    fileUrl: introSystems,
    previewUrl: introSystems,
    fileType: "pdf",
  },{
    id: "ach-6",
    title: "Algorithms for DNA Sequencing",
    issuer: "Coursera",
    date: "July 2026",
    type: "Certificate",
    description:
      "Certificate for completing the Algorithms for DNA Sequencing course on Coursera.",
    fileUrl: algorithms,
    previewUrl: algorithms,
    fileType: "pdf",
  },{
    id: "ach-7",
    title: "Python for Genomic Data Science",
    issuer: "Coursera",
    date: "July 2026",
    type: "Certificate",
    description:
      "Certificate for completing the Python for Genomic Data Science course on Coursera.",
    fileUrl: python,
    previewUrl: python,
    fileType: "pdf",
  },{
    id: "ach-8",
    title: "Introduction to Genomic Technologies",
    issuer: "Coursera",
    date: "July 2026",
    type: "Certificate",
    description:
      "Certificate for completing the Introduction to Genomic Technologies course on Coursera.",
    fileUrl: genomic,
    previewUrl: genomic,
    fileType: "pdf",
  },{
    id: "ach-9",
    title: "DNA, Genome and Genetic Disorders",
    issuer: "Coursera",
    date: "July 2026",
    type: "Certificate",
    description:
      "Certificate for completing the DNA, Genome and Genetic Disorders course on Coursera.",
    fileUrl: genetic,
    previewUrl: genetic,
    fileType: "pdf",
  },
  {
    id: "ach-10",
    title: "ICSAE-XII Conference Certificate",
    issuer: "Agroecotechnology Student Association, Faculty of Agriculture, Udayana University",
    date: "October 2025",
    type: "Certificate",
    description:
      "Certificate of participation and presentation at the 12th ICSAE-XII Conference, Udayana University, Bali, Indonesia.",
    fileUrl: icsaeCertificate,
    previewUrl: icsaeCertificate,
    fileType: "pdf",
  },
  {
    id: "ach-11",
    title: "Meta Advanced React",
    issuer: "Coursera",
    date: "June 2026",
    type: "Certificate",
    description:
      "Certificate for completing the Meta Advanced React course on Coursera.",
    fileUrl: advancedReact,
    previewUrl: advancedReact,
    fileType: "pdf",
  },
  {
    id: "ach-12",
    title: "Jobberman Soft Skills Training",
    issuer: "Jobberman",
    date: "2023",
    type: "Certificate",
    description:
      "Certificate for completing Jobberman Soft Skills Training.",
    fileUrl: jobbermanCertificate,
    previewUrl: jobbermanCertificate,
    fileType: "pdf",
  },
  {
    id: "ach-13",
    title: "Introduction to Programming Using JavaScript",
    issuer: "Side Hustle",
    date: "2022",
    type: "Certificate",
    description:
      "Certificate for completing Introduction to Programming Using JavaScript.",
  },
];

export default function Achievements() {
  const [activeAchievement, setActiveAchievement] = useState(null);

  useEffect(() => {
    const onKeyDown = (e) => {
      if (e.key === "Escape") {
        setActiveAchievement(null);
      }
    };

    window.addEventListener("keydown", onKeyDown);

    return () => {
      window.removeEventListener("keydown", onKeyDown);
    };
  }, []);

  const closeModal = () => {
    setActiveAchievement(null);
  };

  return (
    <section className="achievements-section" id="achievements">
      <div className="achievements-inner">

        {/* Section Heading */}
        <div className="achievements-head">
          <p className="section-kicker">Recognition</p>

          <h2>Achievements</h2>

          <p className="achievements-subtitle">
            Certificates and training that reflect my academic and professional growth.
          </p>
        </div>

        {/* Achievement List */}
        <div className="achievements-list">

          {/* Table Header */}
          <div className="achievement-table-header">
            <span>Achievement</span>
            <span>Issuer</span>
            <span>Date</span>
            <span>Type</span>
            <span></span>
          </div>

          {/* Achievement Rows */}
          {ACHIEVEMENTS.map((item) => (
            <article
              key={item.id}
              className="achievement-row"
            >
              <div className="achievement-title">
                <h3>{item.title}</h3>
              </div>

              <div className="achievement-issuer">
                {item.issuer}
              </div>

              <div className="achievement-date">
                {item.date}
              </div>

              <div className="achievement-type">
                {item.type}
              </div>

              <div className="achievement-action">
                <button
                  type="button"
                  onClick={() => setActiveAchievement(item)}
                  className="achievement-link"
                >
                  View and Download
                  <span aria-hidden="true">↗</span>
                </button>
              </div>
            </article>
          ))}

        </div>
      </div>

      {/* Certificate Preview Modal */}
      {activeAchievement && (
        <div
          className="achievement-modal-overlay"
          onClick={closeModal}
          role="dialog"
          aria-modal="true"
          aria-label={`${activeAchievement.title} certificate`}
        >
          <div
            className="achievement-modal"
            onClick={(e) => e.stopPropagation()}
          >

            <button
              className="achievement-modal-close"
              onClick={closeModal}
              aria-label="Close certificate preview"
            >
              ✕
            </button>

            <div className="achievement-modal-header">
              <div>
                <p className="section-kicker">
                  Certificate Preview
                </p>

                <h3>{activeAchievement.title}</h3>

                <p className="achievement-modal-meta">
                  {activeAchievement.issuer} · {activeAchievement.date}
                </p>
              </div>

              <a
                className="achievement-download-link"
                href={activeAchievement.fileUrl}
                download
                target="_blank"
                rel="noreferrer"
              >
                Download
                <span aria-hidden="true">↓</span>
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
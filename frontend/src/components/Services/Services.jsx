import React from "react";
import "./Services.css";
import { FaBrain, FaLaptopCode } from "react-icons/fa";
import { PiTestTubeFill } from "react-icons/pi";
import { GiArchiveResearch } from "react-icons/gi";

export default function Services() {
  const services = [
    {
      icon: <FaBrain />,
      title: "Research & Data",
      desc: "Research paper analysis, data processing and presentation."
    },
    {
      icon: <FaLaptopCode />,
      title: "Digital Solutions",
      desc: "MERN applications, APIs, dashboards, and scalable backend systems."
    },
    {
      icon: <PiTestTubeFill />,
      title: "Laboratory & Research",
      desc: "Result analysis, documentation and QC workflows."
    },
    {
      icon: <GiArchiveResearch />,
      title: "Writing & Tech",
      desc: "Writing with digital tools (Zotero, Grammarly etc.) and technical documentation."
    }
  ];

  return (
    <section className="services" id="services">
      <div className="services-inner">
        <h2 className="services-title">What I Do</h2>
        <p className="services-subtitle">
          I combine science, technology, and clear thinking to deliver results.
        </p>

        <div className="services-grid">
          {services.map((s, i) => (
            <div
              className="service-card"
              key={s.title}
              style={{ animationDelay: `${i * 0.15}s` }}
            >
              <div className="service-icon">{s.icon}</div>
              <h4>{s.title}</h4>
              <p>{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

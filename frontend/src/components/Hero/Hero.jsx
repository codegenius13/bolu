import React, { useEffect, useRef, useState } from "react";
import "./Hero.css";
import bgImage from "../../assets/img/workstation.jpg"; 
import profile from "../../assets/img/profile.jpg";

export default function Hero() {
  const phrases = [
    "Researcher",
    "Web Developer",
    "Biochemistry Enthusiast",
    "Problem Solver",
  ];

  const [typed, setTyped] = useState("");
  const [showSpeech, setShowSpeech] = useState(true);

  const phraseIndex = useRef(0);
  const charIndex = useRef(0);
  const typingTimeout = useRef(null);

  useEffect(() => {
    const handleTyping = () => {
      const currentPhrase = phrases[phraseIndex.current];

      if (charIndex.current < currentPhrase.length) {
        // Type next character
        setTyped(currentPhrase.slice(0, charIndex.current + 1));
        charIndex.current += 1;
        typingTimeout.current = setTimeout(handleTyping, 120);
      } else {
        // Wait, then erase
        typingTimeout.current = setTimeout(handleErasing, 1000);
      }
    };

    const handleErasing = () => {
      if (charIndex.current > 0) {
        setTyped(phrases[phraseIndex.current].slice(0, charIndex.current - 1));
        charIndex.current -= 1;
        typingTimeout.current = setTimeout(handleErasing, 60);
      } else {
        // Move to next phrase
        phraseIndex.current = (phraseIndex.current + 1) % phrases.length;
        typingTimeout.current = setTimeout(handleTyping, 300);
      }
    };

    handleTyping();

    // Hide speech bubble after 5s
    const speechTimer = setTimeout(() => setShowSpeech(false), 5000);

    return () => {
      clearTimeout(typingTimeout.current);
      clearTimeout(speechTimer);
    };
  }, []);

  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="hero" id="hero">
      {/* Background overlay */}
      <div
        className="hero-bg"
        style={{ backgroundImage: `url(${bgImage})` }}
      />

      <div className="hero-inner">
        {/* LEFT */}
        <div className="hero-left">
          <span className="lead-badge">Research & Web Development</span>

          <h1 className="hero-title">
            Hi, I’m <span className="hero-name">Bolu Ikuerowo</span>
            <br />
            <span className="typing">{typed}</span>
            <span className="cursor">|</span>
          </h1>

          <p className="hero-desc">
            I work on research projects and develop web applications, applying it to my everyday career development.
          </p>

          <div className="hero-actions">
            <button
              className="btn"
              onClick={() => scrollTo("requests")}
            >
              Request a Job
            </button>

            <button
              className="btn-primary"
              onClick={() => scrollTo("work")}
            >
              View Works
            </button>
          </div>
        </div>

        {/* RIGHT */}
        <div className="hero-right">
          <div
            className="profile-card"
            onMouseEnter={() => setShowSpeech(true)}
            onMouseLeave={() => setShowSpeech(false)}
          >
            <div className="avatar">
              <img src={profile} alt="Profile" />
            </div>

            <div className={`speech ${showSpeech ? "show" : ""}`}>
              <strong>Send job request</strong>
              <span>or contact me</span>
            </div>

            <div className="profile-tags">
              <span>Research</span>
              <span>Full-Stack</span>
              <span>Biochemistry</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

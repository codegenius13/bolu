import React, { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import "./Hero.css";
import bgImage from "../../assets/img/workstation.jpg";
import profile from "../../assets/img/profile2.jpg";

export default function Hero() {
  const prefersReducedMotion = useReducedMotion();

  const phrases = [
    "Digital Infrastructure Specialist",
    "Research Data Analyst",
    "Full-Stack Developer",
  ];

  const [typed, setTyped] = useState("");
  const [showSpeech, setShowSpeech] = useState(true);

  const phraseIndex = useRef(0);
  const charIndex = useRef(0);
  const typingTimeout = useRef(null);

  useEffect(() => {
    const typeNext = () => {
      const currentPhrase = phrases[phraseIndex.current];

      if (charIndex.current < currentPhrase.length) {
        charIndex.current += 1;
        setTyped(currentPhrase.slice(0, charIndex.current));
        typingTimeout.current = setTimeout(typeNext, 90);
      } else {
        typingTimeout.current = setTimeout(eraseNext, 1200);
      }
    };

    const eraseNext = () => {
      if (charIndex.current > 0) {
        charIndex.current -= 1;
        const currentPhrase = phrases[phraseIndex.current];
        setTyped(currentPhrase.slice(0, charIndex.current));
        typingTimeout.current = setTimeout(eraseNext, 45);
      } else {
        phraseIndex.current = (phraseIndex.current + 1) % phrases.length;
        typingTimeout.current = setTimeout(typeNext, 250);
      }
    };

    typeNext();

    const speechTimer = setTimeout(() => setShowSpeech(false), 7000);

    return () => {
      clearTimeout(typingTimeout.current);
      clearTimeout(speechTimer);
    };
  }, []);

  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: prefersReducedMotion ? 0 : 0.12,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 24 },
    show: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.7, ease: "easeOut" },
    },
  };

  const imageVariants = {
    hidden: { opacity: 0, scale: 0.92, x: 60 },
    show: {
      opacity: 1,
      scale: 1,
      x: 0,
      transition: { duration: 0.9, ease: "easeOut" },
    },
  };

  return (
    <section className="hero" id="hero">
      <div className="hero-bg" style={{ backgroundImage: `url(${bgImage})` }} />
      <div className="hero-overlay" />

      <motion.div
        className="hero-inner"
        variants={containerVariants}
        initial="hidden"
        animate="show"
      >
        <motion.div className="hero-left" variants={itemVariants}>
          <span className="lead-badge">
            Digital Infrastructure • Research • Data • Web
          </span>

          <h1 className="hero-title">
            Hi, I’m <span className="hero-name">Bolu Ikuerowo</span>
            <br />
            <span className="typing-wrap">
              <span className="typing">{typed}</span>
              <span className="cursor">|</span>
            </span>
          </h1>

          <p className="hero-desc">
            Welcome to my portfolio!
            <br />
            I've been developing myself for a while and I'm very much a continous learner in my field of focus, something that is visible on my portfolio and LinkedIn. I'm passionate and generally easy to work with. I'd love for you to check out my portfolio and see some of the work I've done.
          </p>

          <div className="hero-actions">
            <button className="btn hero-btn-dark" onClick={() => scrollTo("requests")}>
              Request a Job
            </button>
            <button className="btn-primary hero-btn-light" onClick={() => scrollTo("work")}>
              View Works
            </button>
          </div>

          <div className="hero-proof">
            <div className="proof-card">
              <strong>Research</strong>
              <span>Data analysis, reports, and structured insights</span>
            </div>
            <div className="proof-card">
              <strong>Development</strong>
              <span>Modern websites and dashboards</span>
            </div>
            <div className="proof-card">
              <strong>Infrastructure</strong>
              <span>Digital workflows and dependable solutions</span>
            </div>
          </div>
        </motion.div>

        <motion.div className="hero-right" variants={imageVariants}>
          <div className="portrait-stage">
            <motion.div
              className="portrait-glow portrait-glow-one"
              animate={{ y: [0, -16, 0], x: [0, 8, 0] }}
              transition={{
                duration: 6,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
            <motion.div
              className="portrait-glow portrait-glow-two"
              animate={{ y: [0, 14, 0], x: [0, -10, 0] }}
              transition={{
                duration: 7,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />

            <div className="portrait-frame">
              <div className="portrait-top-ribbon">Portfolio Portrait</div>

              <div className="portrait-window">
                <img src={profile} alt="Bolu Ikuerowo portrait" />
              </div>

              <motion.div
                className={`portrait-speech ${showSpeech ? "show" : ""}`}
                initial={{ opacity: 0, y: 18, scale: 0.95 }}
                animate={{
                  opacity: showSpeech ? 1 : 0.82,
                  y: showSpeech ? 0 : 8,
                  scale: 1,
                }}
                transition={{ duration: 0.35 }}
              >
                <span className="speech-label">Speaking</span>
                <strong>If you like what you see</strong>
                <span> I'm very much available for further discussions.</span>
                <span className="speech-emoji">Thank you!</span>
                <i className="speech-tail" />
              </motion.div>

              <div className="portrait-bottom">
                <div className="portrait-base" />
                <div className="portrait-shadow" />
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}
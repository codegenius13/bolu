import React, { useState } from "react";
import "./Contact.css";

/**
 * Backend ready
 * Later:
 * POST /api/contact
 */

export default function Contact() {
  const [sent, setSent] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSent(true);

    // later: send to backend
    setTimeout(() => setSent(false), 4000);
  };

  return (
    <section className="contact" id="contact">
      <div className="contact-inner">
        {/* LEFT */}
        <div className="contact-info">
          <h2>Let’s Work Together</h2>
          <p>
            Have a project, research collaboration, or job request?
            <br />
            Send a message and I’ll respond promptly.
          </p>

          <div className="contact-details">
            <div>
              <span>Email:</span>
              <strong>ikuerowob@gmail.com</strong>
            </div>

            <div>
              <span>Availability:</span>
              <strong>Open for projects & research</strong>
            </div>
          </div>
        </div>

        {/* RIGHT */}
        <form className="contact-form" onSubmit={handleSubmit}>
          <h3>Send a Message</h3>

          <input type="text" placeholder="Your name" required />
          <input type="email" placeholder="Your email" required />
          <input type="text" placeholder="Subject" required />

          <textarea
            rows="4"
            placeholder="Describe your project or request"
            required
          />

          <button className="btn btn-primary" type="submit">
            Send Message
          </button>

          {sent && (
            <p className="contact-success">
              Message sent successfully ✔
            </p>
          )}
        </form>
      </div>
    </section>
  );
}

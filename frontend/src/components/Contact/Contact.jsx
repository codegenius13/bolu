import React, { useState } from "react";
import "./Contact.css";
import { useNotification } from "../../context/NotificationContext/NotificationContext";

/**
 * Backend ready
 * POST /api/contact
 */

export default function Contact() {
  const { showNotification } = useNotification();

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    subject: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  /* ==========================
     HANDLE INPUT CHANGES
  ========================== */
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  /* ==========================
     SUBMIT CONTACT FORM
  ========================== */
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await fetch("https://bolu-backend.onrender.com/api/general/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok) {
        const retry = await showNotification({
          type: "error",
          title: "Message Failed",
          message: data.msg || "Failed to send message. Retry?",
        });

        if (retry) handleSubmit(e);
        return;
      }

      await showNotification({
        type: "success",
        title: "Message Sent",
        message: data.msg || "Your message has been sent successfully!",
      });

      // Reset form
      setFormData({
        fullName: "",
        email: "",
        subject: "",
        message: "",
      });
    } catch (err) {
      const retry = await showNotification({
        type: "error",
        title: "Network Error",
        message: err.message || "Something went wrong. Retry?",
      });

      if (retry) handleSubmit(e);
    } finally {
      setLoading(false);
    }
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

          {error && <p className="error-text">{error}</p>}

          <input
            type="text"
            name="fullName"
            placeholder="Your name"
            value={formData.fullName}
            onChange={handleChange}
            required
          />

          <input
            type="email"
            name="email"
            placeholder="Your email"
            value={formData.email}
            onChange={handleChange}
            required
          />

          <input
            type="text"
            name="subject"
            placeholder="Subject"
            value={formData.subject}
            onChange={handleChange}
            required
          />

          <textarea
            rows="4"
            name="message"
            placeholder="Describe your project or request"
            value={formData.message}
            onChange={handleChange}
            required
          />

          <button
            className="btn btn-primary"
            type="submit"
            disabled={loading || formData.message.length < 5}
          >
            {loading ? "Sending..." : "Send Message"}
          </button>

          <small className="muted">
            Please provide clear details so I can respond effectively.
          </small>
        </form>
      </div>
    </section>
  );
}

import React, { useEffect, useState } from "react";
import "./Request.css";

/**
 * Backend-ready
 * Later replace dummyRequests with API:
 * GET /api/requests?page=1
 * POST /api/requests
 */

const dummyRequests = [
  {
    id: 1,
    name: "John Daniels",
    email: "john@example.com",
    title: "Company Website Development",
    description: "Need a responsive company website with contact form.",
  },
  {
    id: 2,
    name: "Sarah Williams",
    email: "sarah@researchlab.com",
    title: "Research Data Analysis",
    description: "Help analyzing experimental data and visualization.",
  },
  {
    id: 3,
    name: "Michael Ade",
    email: "michael@startup.io",
    title: "MERN App Build",
    description: "Full-stack MERN app with authentication and admin panel.",
  },
  {
    id: 4,
    name: "Dorcas Training",
    email: "info@dorcas.org",
    title: "Agricultural Automation Research",
    description: "Research collaboration on automated farming systems.",
  },
];

const PER_PAGE = 2;

export default function Request() {
  const [requests, setRequests] = useState([]);
  const [page, setPage] = useState(1);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setRequests(dummyRequests);
  }, []);

  const totalPages = Math.ceil(requests.length / PER_PAGE);
  const start = (page - 1) * PER_PAGE;
  const visibleRequests = requests.slice(start, start + PER_PAGE);

  return (
    <section className="request" id="requests">
      <div className="request-inner">
        {/* Header */}
        <div className="request-head">
          <h2>Job Requests</h2>
          <p className="muted">
            Verified job requests and collaboration inquiries.
          </p>

          <button className="btn btn-secondary" onClick={() => setOpen(true)}>
            Create Request
          </button>
        </div>

        {/* List */}
        <div className="request-list">
          {visibleRequests.map((req) => (
            <article className="request-card" key={req.id}>
              <h4>{req.title}</h4>
              <span className="request-email">{req.email}</span>
              <p className="request-desc">{req.description}</p>

              <div className="request-footer">
                <span className="request-name">{req.name}</span>
                <span className="request-status">New</span>
              </div>
            </article>
          ))}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="pagination">
            {Array.from({ length: totalPages }).map((_, i) => (
              <button
                key={i}
                className={`page-btn ${page === i + 1 ? "active" : ""}`}
                onClick={() => setPage(i + 1)}
              >
                {i + 1}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Modal */}
      {open && (
        <div className="request-modal-overlay" onClick={() => setOpen(false)}>
          <div className="request-modal" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={() => setOpen(false)}>
              ✕
            </button>

            <h3>Create Job Request</h3>

            <form
              className="request-form"
              onSubmit={(e) => {
                e.preventDefault();
                alert("Backend will handle submission later");
                setOpen(false);
              }}
            >
              <input type="text" placeholder="Your name" required />
              <input type="email" placeholder="Your email" required />
              <input type="text" placeholder="Job title" required />
              <textarea rows="4" placeholder="Job description" required />

              <button className="btn btn-secondary" type="submit">
                Submit Request
              </button>
            </form>
          </div>
        </div>
      )}
    </section>
  );
}

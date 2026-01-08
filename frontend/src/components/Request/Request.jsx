import React, { useEffect, useState } from "react";
import "./Request.css";
import { useNotification } from "../../context/NotificationContext/NotificationContext";

const PER_PAGE = 2;

export default function Request() {
  const { showNotification } = useNotification();

  const [requests, setRequests] = useState([]);
  const [page, setPage] = useState(1);
  const [pages, setPages] = useState(1);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    jobTitle: "",
    description: "",
    attachments: [],
  });

  /* ==========================
     HANDLE FORM CHANGES
  ========================== */
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    setFormData((prev) => ({
      ...prev,
      attachments: [...prev.attachments, ...files],
    }));
    e.target.value = null; // allow re-selecting same file
  };

  /* ==========================
     SUBMIT REQUEST
  ========================== */
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const payload = new FormData();
      payload.append("name", formData.name);
      payload.append("email", formData.email);
      payload.append("jobTitle", formData.jobTitle);
      payload.append("description", formData.description);

      for (let i = 0; i < formData.attachments.length; i++) {
        payload.append("attachments", formData.attachments[i]);
      }

      const res = await fetch("http://localhost:5000/api/general/requests", {
        method: "POST",
        body: payload,
      });

      const data = await res.json();

      if (!res.ok) {
        const retry = await showNotification({
          type: "error",
          title: "Submission Failed",
          message: data.message || "An error occurred. Retry?",
        });

        if (retry) handleSubmit(e);
        return;
      }

      await showNotification({
        type: "success",
        title: "Request Submitted",
        message: data.message || "Your job request was submitted successfully!",
      });

      setOpen(false);
      setFormData({
        name: "",
        email: "",
        jobTitle: "",
        description: "",
        attachments: [],
      });

      fetchRequests(); // refresh the list
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

  /* ==========================
     FETCH REQUESTS (GET)
  ========================== */
  const fetchRequests = async (pageNumber = page) => {
    try {
      setLoading(true);
      const res = await fetch(
        `http://localhost:5000/api/general/requests?page=${pageNumber}&limit=${PER_PAGE}`
      );
      const data = await res.json();

      if (!res.ok) {
        await showNotification({
          type: "error",
          title: "Failed to Fetch",
          message: data.message || "Could not fetch requests",
        });
        return;
      }

      setRequests(data.data);
      setPages(data.meta.pages);
      setPage(data.meta.page);
    } catch (err) {
      await showNotification({
        type: "error",
        title: "Network Error",
        message: err.message || "Failed to fetch requests",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  /* ==========================
     PAGINATION HANDLER
  ========================== */
  const goToPage = (num) => {
    if (num >= 1 && num <= pages) {
      fetchRequests(num);
    }
  };

  return (
    <section className="request" id="requests">
      <div className="request-inner">
        {/* Header */}
        <div className="request-head">
          <h2>Job Requests</h2>
          <p className="muted">Verified job requests and collaboration inquiries.</p>
          <button className="btn btn-secondary" onClick={() => setOpen(true)}>
            Create Request
          </button>
        </div>

        {/* Requests list */}
        <div className="request-list">
          {loading ? (
            <p className="muted">Loading...</p>
          ) : requests.length === 0 ? (
            <p className="muted">No requests yet.</p>
          ) : (
            requests.map((req) => (
              <div className="request-card" key={req._id}>
                <h4 className="request-name">{req.name}</h4>
                <p className="request-email">{req.email}</p>
                <strong className="request-jobTitle"><h3>{req.jobTitle}</h3></strong>
                <p className="request-desc">{req.description}</p>
                <div
                  className={`request-status ${req.status === "new"
                      ? "status-new"
                      : req.status === "reviewed"
                        ? "status-reviewed"
                        : req.status === "in-progress"
                          ? "status-in-progress"
                          : req.status === "completed"
                            ? "status-completed"
                            : ""
                    }`}
                >
                  {req.status.charAt(0).toUpperCase() + req.status.slice(1)}
                </div>
              </div>
            ))
          )}
        </div>

        {/* Pagination */}
        {pages > 1 && (
          <div className="pagination">
            <button className="page-btn" onClick={() => goToPage(page - 1)} disabled={page === 1}>
              Prev
            </button>

            {[...Array(pages)].map((_, i) => (
              <button
                key={i}
                className={`page-btn ${page === i + 1 ? "active" : ""}`}
                onClick={() => goToPage(i + 1)}
              >
                {i + 1}
              </button>
            ))}

            <button className="page-btn" onClick={() => goToPage(page + 1)} disabled={page === pages}>
              Next
            </button>
          </div>
        )}
      </div>

      {/* ================= MODAL ================= */}
      {open && (
        <div className="request-modal-overlay" onClick={() => setOpen(false)}>
          <div className="request-modal" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={() => setOpen(false)}>
              ✕
            </button>

            <h3>Create Job Request</h3>

            {error && <p className="error-text">{error}</p>}

            <form className="request-form" onSubmit={handleSubmit}>
              <input
                type="text"
                name="name"
                placeholder="Your name"
                value={formData.name}
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
                name="jobTitle"
                placeholder="Job title"
                value={formData.jobTitle}
                onChange={handleChange}
                required
              />
              <textarea
                rows="4"
                name="description"
                placeholder="Job description"
                value={formData.description}
                onChange={handleChange}
                required
              />
              <div
                style={{
                  fontSize: "0.85rem",
                  color: formData.description.length >= 10 ? "green" : "red",
                  marginTop: "4px",
                }}
              >
                {formData.description.length}/10 characters
              </div>

              <input
                type="file"
                name="attachments"
                multiple
                onChange={handleFileChange}
                accept=".pdf,.doc,.docx,.png,.jpg,.jpeg"
              />

              {formData.attachments.length > 0 && (
                <ul className="file-list">
                  {formData.attachments.map((file, index) => (
                    <li key={index}>
                      {file.name}
                      <button
                        type="button"
                        onClick={() =>
                          setFormData((prev) => ({
                            ...prev,
                            attachments: prev.attachments.filter((_, i) => i !== index),
                          }))
                        }
                      >
                        ✕
                      </button>
                    </li>
                  ))}
                </ul>
              )}

              <small className="muted">Max total size: 25MB · Up to 10 files</small>
              <small className="muted">
                Hold Ctrl (Windows) or Cmd (Mac) to select multiple files at once.
              </small>

              <button
                className="btn btn-secondary"
                type="submit"
                disabled={loading || formData.description.length < 10}
              >
                {loading ? "Submitting..." : "Submit Request"}
              </button>
            </form>
          </div>
        </div>
      )}
    </section>
  );
}

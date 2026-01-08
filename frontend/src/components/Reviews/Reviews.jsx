import React, { useState, useEffect, useCallback } from "react";
import "./Reviews.css";
import { useNotification } from "../../context/NotificationContext/NotificationContext";

const REVIEWS_PER_PAGE = 2;
const API_BASE = "http://localhost:5000/api/general";

export default function Reviews() {
  const { showNotification } = useNotification();

  /* =========================
     STATE
  ========================= */
  const [reviews, setReviews] = useState([]);
  const [page, setPage] = useState(1);
  const [pages, setPages] = useState(1);
  const [loadingReviews, setLoadingReviews] = useState(false);

  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const [jobSuggestions, setJobSuggestions] = useState([]);
  const [filteredJobs, setFilteredJobs] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    jobTitleInput: "",
    rating: "",
    comment: "",
    dateOption: "recent",
    customDate: "",
  });

  /* =========================
     FETCH JOB TITLES
  ========================= */
  useEffect(() => {
    const fetchJobTitles = async () => {
      try {
        const res = await fetch(`${API_BASE}/requests?limit=1000`);
        const data = await res.json();

        if (!res.ok) throw new Error(data.message);

        const titles = [...new Set(data.data.map((r) => r.jobTitle))];
        setJobSuggestions(titles);
      } catch (err) {
        console.error(err);
      }
    };

    fetchJobTitles();
  }, []);

  /* =========================
     FETCH REVIEWS
  ========================= */
  const fetchReviews = useCallback(
    async (pageNumber = page) => {
      try {
        setLoadingReviews(true);

        const res = await fetch(
          `${API_BASE}/reviews?page=${pageNumber}&limit=${REVIEWS_PER_PAGE}`
        );
        const data = await res.json();

        if (!res.ok) throw new Error(data.message);

        setReviews(data.data);
        setPages(data.meta.pages);
        setPage(data.meta.page);
      } catch (err) {
        showNotification({
          type: "error",
          title: "Failed to Fetch Reviews",
          message: err.message || "Could not load reviews",
        });
      } finally {
        setLoadingReviews(false);
      }
    },
    [page, showNotification]
  );

  useEffect(() => {
    fetchReviews();
  }, [fetchReviews]);

  /* =========================
     FORM HANDLERS
  ========================= */
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleJobSearch = (e) => {
    const value = e.target.value;

    setFormData((prev) => ({ ...prev, jobTitleInput: value }));

    if (!value) {
      setShowSuggestions(false);
      return;
    }

    const matches = jobSuggestions.filter((job) =>
      job.toLowerCase().includes(value.toLowerCase())
    );

    setFilteredJobs(matches);
    setShowSuggestions(true);
  };

  const selectJob = (job) => {
    setFormData((prev) => ({ ...prev, jobTitleInput: job }));
    setShowSuggestions(false);
  };

  /* =========================
     VALIDATION
  ========================= */
  const isNameValid =
    formData.name.length >= 2 && formData.name.length <= 80;

  const isCommentValid =
    formData.comment.length >= 5 && formData.comment.length <= 2000;

  const isRatingValid = Boolean(formData.rating);

  const isJobValid = jobSuggestions.includes(formData.jobTitleInput);

  const isFormValid =
    isNameValid && isCommentValid && isRatingValid && isJobValid;

  /* =========================
     SUBMIT REVIEW
  ========================= */
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isFormValid) return;

    try {
      setLoading(true);

      const res = await fetch(`${API_BASE}/reviews`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.message);

      showNotification({
        type: "success",
        title: "Review Submitted",
        message: data.message || "Thank you for your feedback!",
      });

      setOpen(false);
      setFormData({
        name: "",
        jobTitleInput: "",
        rating: "",
        comment: "",
        dateOption: "recent",
        customDate: "",
      });

      fetchReviews(1);
    } catch (err) {
      showNotification({
        type: "error",
        title: "Submission Failed",
        message: err.message || "Failed to submit review",
      });
    } finally {
      setLoading(false);
    }
  };

  /* =========================
     RENDER
  ========================= */
  return (
    <section className="reviews" id="reviews">
      <div className="reviews-inner">
        <div className="reviews-head">
          <h2>Client Reviews</h2>
          <p className="muted">
            Feedback from clients and collaborators on completed jobs.
          </p>
          <button className="btn btn-secondary" onClick={() => setOpen(true)}>
            Send Review
          </button>
        </div>

        <div className="reviews-slider">
          {loadingReviews ? (
            <p className="muted">Loading reviews...</p>
          ) : reviews.length === 0 ? (
            <p className="muted">No reviews yet.</p>
          ) : (
            reviews.map((r) => (
              <article className="review-card" key={r._id}>
                <div className="review-top">
                  <h4>{r.jobTitle}</h4>
                  <span className="review-date">
                    {new Date(r.reviewDate).toLocaleDateString()}
                  </span>
                </div>

                <div className="review-stars">
                  {[1, 2, 3, 4, 5].map((n) => (
                    <span
                      key={n}
                      className={`star ${n <= r.rating ? "filled" : ""}`}
                    >
                      ★
                    </span>
                  ))}
                </div>

                <p className="review-comment">{r.comment}</p>
                <div className="review-author">— {r.name}</div>
              </article>
            ))
          )}
        </div>

        {pages > 1 && (
          <div className="review-pagination">
            <button disabled={page === 1} onClick={() => fetchReviews(page - 1)}>
              ‹
            </button>
            <span>
              Page {page} of {pages}
            </span>
            <button
              disabled={page === pages}
              onClick={() => fetchReviews(page + 1)}
            >
              ›
            </button>
          </div>
        )}
      </div>

      {/* ================= MODAL ================= */}
      {open && (
        <div className="review-modal-overlay" onClick={() => setOpen(false)}>
          <div className="review-modal" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={() => setOpen(false)}>
              ✕
            </button>

            <h3>Submit Review</h3>

            <form className="review-form" onSubmit={handleSubmit}>
              {/* Job autocomplete */}
              <div className="job-autocomplete">
                <input
                  type="text"
                  placeholder="Search job title"
                  value={formData.jobTitleInput}
                  onChange={handleJobSearch}
                  className={
                    formData.jobTitleInput
                      ? isJobValid
                        ? "valid"
                        : "invalid"
                      : ""
                  }
                  required
                />

                {showSuggestions && (
                  <ul className="job-suggestions">
                    {filteredJobs.length > 0 ? (
                      filteredJobs.map((job, i) => (
                        <li key={i} onClick={() => selectJob(job)}>
                          {job}
                        </li>
                      ))
                    ) : (
                      <li className="no-job">No job found</li>
                    )}
                  </ul>
                )}
              </div>

              <input
                type="text"
                name="name"
                placeholder="Your name"
                value={formData.name}
                onChange={handleChange}
                className={formData.name ? (isNameValid ? "valid" : "invalid") : ""}
                required
              />

              <select
                name="rating"
                value={formData.rating}
                onChange={handleChange}
                className={isRatingValid ? "valid" : "invalid"}
                required
              >
                <option value="">Rating</option>
                <option value="5">★★★★★ (5)</option>
                <option value="4">★★★★☆ (4)</option>
                <option value="3">★★★☆☆ (3)</option>
                <option value="2">★★☆☆☆ (2)</option>
                <option value="1">★☆☆☆☆ (1)</option>
              </select>

              <textarea
                name="comment"
                rows="4"
                placeholder="Write your review"
                value={formData.comment}
                onChange={handleChange}
                className={
                  formData.comment
                    ? isCommentValid
                      ? "valid"
                      : "invalid"
                    : ""
                }
                required
              />

              <select
                name="dateOption"
                value={formData.dateOption}
                onChange={handleChange}
              >
                <option value="recent">Recent job</option>
                <option value="old">Old job</option>
              </select>

              {formData.dateOption === "old" && (
                <input
                  type="date"
                  name="customDate"
                  value={formData.customDate}
                  onChange={handleChange}
                  required
                />
              )}

              <button
                className="btn btn-secondary"
                type="submit"
                disabled={!isFormValid || loading}
              >
                {loading ? "Submitting..." : "Submit Review"}
              </button>
            </form>
          </div>
        </div>
      )}
    </section>
  );
}

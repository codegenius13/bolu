import React, { useState } from "react";
import "./Reviews.css";

/**
 * Dummy data (later from backend)
 * GET /api/reviews
 * POST /api/reviews
 */

const jobTitles = [
  "Company Website Development",
  "Research Data Analysis",
  "MERN App Build",
  "Agricultural Automation Research",
];

const dummyReviews = [
  {
    id: 1,
    name: "John Daniels",
    jobTitle: "Company Website Development",
    rating: 5,
    comment:
      "Very professional delivery. Clean code, clear communication, and timely completion.",
    date: "2024-06-12",
  },
  {
    id: 2,
    name: "Sarah Williams",
    jobTitle: "Research Data Analysis",
    rating: 4,
    comment:
      "Strong analytical skills and good interpretation of results. Would work again.",
    date: "2024-03-28",
  },
  {
    id: 3,
    name: "Dorcas Training Services",
    jobTitle: "Agricultural Automation Research",
    rating: 5,
    comment:
      "Excellent research contribution. The automation insights were very useful.",
    date: "2023-11-04",
  },
];

const REVIEWS_PER_PAGE = 2;

export default function Reviews() {
  const [reviews] = useState(dummyReviews);
  const [page, setPage] = useState(1);
  const [open, setOpen] = useState(false);

  const totalPages = Math.ceil(reviews.length / REVIEWS_PER_PAGE);
  const start = (page - 1) * REVIEWS_PER_PAGE;
  const currentReviews = reviews.slice(start, start + REVIEWS_PER_PAGE);

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

        {/* Review cards */}
        <div className="reviews-slider">
          {currentReviews.map((r) => (
            <article className="review-card" key={r.id}>
              <div className="review-top">
                <h4>{r.jobTitle}</h4>
                <span className="review-date">
                  {new Date(r.date).toDateString()}
                </span>
              </div>

              <div className="review-stars">
                {[...Array(5)].map((_, i) => (
                  <span key={i} className={i < r.rating ? "star filled" : "star"}>
                    ★
                  </span>
                ))}
              </div>

              <p className="review-comment">{r.comment}</p>

              <div className="review-author">— {r.name}</div>
            </article>
          ))}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="review-pagination">
            <button
              disabled={page === 1}
              onClick={() => setPage((p) => p - 1)}
            >
              ‹
            </button>

            <span>
              Page {page} of {totalPages}
            </span>

            <button
              disabled={page === totalPages}
              onClick={() => setPage((p) => p + 1)}
            >
              ›
            </button>
          </div>
        )}
      </div>

      {/* Review Modal */}
      {open && (
        <div className="review-modal-overlay" onClick={() => setOpen(false)}>
          <div
            className="review-modal"
            onClick={(e) => e.stopPropagation()}
          >
            <button className="modal-close" onClick={() => setOpen(false)}>
              ✕
            </button>

            <h3>Submit Review</h3>

            <form
              className="review-form"
              onSubmit={(e) => {
                e.preventDefault();
                alert("Review will be saved via backend later");
                setOpen(false);
              }}
            >
              {/* Job title search */}
              <select required>
                <option value="">Select job title</option>
                {jobTitles.map((job) => (
                  <option key={job} value={job}>
                    {job}
                  </option>
                ))}
              </select>

              <input type="text" placeholder="Your name" required />

              {/* Rating */}
              <select required>
                <option value="">Rating</option>
                <option value="5">★★★★★ (5)</option>
                <option value="4">★★★★☆ (4)</option>
                <option value="3">★★★☆☆ (3)</option>
                <option value="2">★★☆☆☆ (2)</option>
                <option value="1">★☆☆☆☆ (1)</option>
              </select>

              <textarea
                rows="4"
                placeholder="Write your review"
                required
              />

              {/* Date logic */}
              <select>
                <option value="recent">Recent job</option>
                <option value="old">Old job (select date)</option>
              </select>

              <input type="date" />

              <button className="btn btn-secondary" type="submit">
                Submit Review
              </button>
            </form>
          </div>
        </div>
      )}
    </section>
  );
}

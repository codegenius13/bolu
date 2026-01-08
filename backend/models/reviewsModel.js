import mongoose from "mongoose";
import Request from "./requestModel.js"; // import the Request model

const reviewSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Reviewer name is required"],
      trim: true,
      minlength: 2,
      maxlength: 80,
    },

    jobRequest: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Request",
      required: true,
    },

    jobTitle: {
      type: String,
      required: true, // will copy from Request.jobTitle
      trim: true,
      maxlength: 120,
    },

    rating: {
      type: Number,
      required: true,
      min: 1,
      max: 5,
    },

    comment: {
      type: String,
      required: [true, "Review comment is required"],
      trim: true,
      minlength: 5,
      maxlength: 2000,
    },

    reviewDate: {
      type: Date,
      required: true, // either request createdAt or custom date
    },
  },
  { timestamps: true }
);

// Middleware to ensure jobTitle matches the Request if not manually set
reviewSchema.pre("validate", async function (next) {
  if (!this.jobTitle && this.jobRequest) {
    const request = await Request.findById(this.jobRequest);
    if (request) this.jobTitle = request.jobTitle;
    else this.jobTitle = "No job found";
  }
  next();
});

const Review = mongoose.model("Review", reviewSchema);

export default Review;

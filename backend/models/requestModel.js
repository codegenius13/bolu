import mongoose from "mongoose";

const attachmentSchema = new mongoose.Schema(
  {
    filename: {
      type: String,
      required: true,
      trim: true,
    },
    originalName: {
      type: String,
      required: true,
    },
    mimeType: {
      type: String,
      required: true,
    },
    size: {
      type: Number, // in bytes
      required: true,
    },
    url: {
      type: String, // Cloudinary / S3 / local path
      required: true,
    },
  },
  { _id: false }
);

const requestSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
      trim: true,
      minlength: 2,
      maxlength: 80,
    },

    email: {
      type: String,
      required: [true, "Email is required"],
      trim: true,
      lowercase: true,
      match: [
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
        "Please provide a valid email address",
      ],
    },

    jobTitle: {
      type: String,
      required: [true, "Job title is required"],
      trim: true,
      maxlength: 120,
    },

    description: {
      type: String,
      required: [true, "Job description is required"],
      trim: true,
      minlength: 10,
      maxlength: 3000,
    },

    attachments: {
      type: [attachmentSchema],
      validate: {
        validator: function (files) {
          if (!files || files.length === 0) return true;

          // max 25MB total
          const totalSize = files.reduce(
            (sum, file) => sum + file.size,
            0
          );

          return totalSize <= 25 * 1024 * 1024;
        },
        message: "Total attachment size must not exceed 25MB",
      },
      default: [],
    },

    status: {
      type: String,
      enum: ["new", "reviewed", "in-progress", "completed"],
      default: "new",
    },
  },
  {
    timestamps: true,
  }
);

const Request = mongoose.model("Request", requestSchema);

export default Request;

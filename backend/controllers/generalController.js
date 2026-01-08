import Request from "../models/requestModel.js";
import { v2 as cloudinary } from "cloudinary";
import { Resend } from 'resend';
import Review from "../models/reviewsModel.js";


const resend = new Resend("re_BebvJUUo_B1t7o7XGURj22g1FYW38SkxM");

const sendEmail = async ({ from, to, subject, html }) => {
  try {
    const response = await resend.emails.send({
      from,
      to,
      subject,
      html,
    });

    return response;
  } catch (error) {
    console.error("Resend Email Error:", error);
    throw new Error("Failed to send email");
  }
};

const adminEmailTemplate = (data) => `
  <h2>New Job Request Received</h2>

  <p><strong>Name:</strong> ${data.name}</p>
  <p><strong>Email:</strong> ${data.email}</p>
  <p><strong>Job Title:</strong> ${data.jobTitle}</p>

  <p><strong>Description:</strong></p>
  <p>${data.description}</p>

  <p><strong>Attachments:</strong></p>
  ${data.attachments.length === 0
    ? "<p>No attachments</p>"
    : `<ul>
          ${data.attachments
      .map(
        (file) => `
              <li>
                <a href="${file.url}" target="_blank" rel="noopener noreferrer">
                  ${file.originalName}
                </a>
                (${(file.size / 1024 / 1024).toFixed(2)} MB)
              </li>
            `
      )
      .join("")}
        </ul>`
  }
`;


const clientEmailTemplate = (data) => `
  <h2>Your Job Request Has Been Received</h2>
  <p>Hello ${data.name},</p>

  <p>Thank you for reaching out. Your job request has been successfully received.</p>

  <p><strong>Job Title:</strong> ${data.jobTitle}</p>
  <p><strong>Description:</strong></p>
  <p>${data.description}</p>

  <p>I’ll review your request and get back to you shortly.</p>

  <p>— Bolu Ikuerowo</p>
`;


const ADMIN_EMAIL = "ikuerowob@gmail.com";
const FROM_EMAIL = "onboarding@resend.dev";





export const createRequest = async (req, res) => {
  try {
    const { name, email, jobTitle, description } = req.body;

    // Basic validation
    if (!name || !email || !jobTitle || !description) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    let uploadedFiles = [];

    if (req.files && req.files.length > 0) {
      // total size validation (25MB)
      const totalSize = req.files.reduce(
        (sum, file) => sum + file.size,
        0
      );

      if (totalSize > 25 * 1024 * 1024) {
        return res.status(400).json({
          success: false,
          message: "Total attachment size must not exceed 25MB",
        });
      }

      // upload each file to cloudinary
      for (const file of req.files) {
        const result = await cloudinary.uploader.upload(file.path, {
          resource_type: "auto", // handles images, pdf, docx, etc
          folder: "job_requests",
        });

        uploadedFiles.push({
          filename: result.public_id,
          originalName: file.originalname,
          mimeType: file.mimetype,
          size: file.size,
          url: result.secure_url,
        });
      }
    }

    // Save request
    const newRequest = await Request.create({
      name,
      email,
      jobTitle,
      description,
      attachments: uploadedFiles,
    });

    /* =======================
       SEND EMAILS
    ======================= */

    // 1️⃣ Notify you (admin)
    await sendEmail({
      from: FROM_EMAIL,
      to: ADMIN_EMAIL,
      subject: `New Job Request: ${jobTitle}`,
      html: adminEmailTemplate({
        name,
        email,
        jobTitle,
        description,
        attachments: uploadedFiles,
      }),
    });

    // 2️⃣ Confirmation to client
    await sendEmail({
      from: FROM_EMAIL,
      to: email,
      subject: "Your Job Request Has Been Received",
      html: clientEmailTemplate({
        name,
        jobTitle,
        description,
      }),
    });

    res.status(201).json({
      success: true,
      message: "Job request submitted successfully. A confirmation email has been sent.",
      data: newRequest,
    });

  } catch (error) {
    console.error("Create Request Error:", error);

    if (error.name === "ValidationError") {
      // Extract first error message
      const messages = Object.values(error.errors).map(err => err.message);
      return res.status(400).json({
        success: false,
        message: messages.join(", "),
      });
    }

    res.status(500).json({
      success: false,
      message: "Server error while creating request",
    });
  }

};


export const getRequests = async (req, res) => {
  try {
    // query params
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    // optional filters (future-ready)
    const status = req.query.status;

    const query = {};
    if (status) query.status = status;

    // fetch requests
    const requests = await Request.find(query)
      .sort({ createdAt: -1 }) // newest first
      .skip(skip)
      .limit(limit);

    // total count
    const total = await Request.countDocuments(query);

    res.status(200).json({
      success: true,
      message: "Job requests fetched successfully",
      meta: {
        total,
        page,
        pages: Math.ceil(total / limit),
        limit,
      },
      data: requests,
    });
  } catch (error) {
    console.error("Get Requests Error:", error);

    res.status(500).json({
      success: false,
      message: "Server error while fetching requests",
    });
  }
};

export const createReview = async (req, res) => {
  try {
    const { name, jobTitleInput, rating, comment, dateOption, customDate } = req.body;

    // Basic validation
    if (!name || !jobTitleInput || !rating || !comment) {
      return res.status(400).json({
        success: false,
        message: "All fields except custom date are required",
      });
    }

    // Find the job request by jobTitle (case-insensitive)
    const request = await Request.findOne({
      jobTitle: { $regex: new RegExp(`^${jobTitleInput}$`, "i") },
    });

    // Determine reviewDate
    let reviewDate;
    if (dateOption === "recent" && request) {
      reviewDate = request.createdAt;
    } else if (dateOption === "old" && customDate) {
      reviewDate = new Date(customDate);
    } else {
      reviewDate = new Date(); // fallback to current date
    }

    // Create review
    const newReview = await Review.create({
      name,
      jobRequest: request ? request._id : null,
      jobTitle: request ? request.jobTitle : "No job found",
      rating,
      comment,
      reviewDate,
    });

    res.status(201).json({
      success: true,
      message: "Review submitted successfully",
      data: newReview,
    });
  } catch (error) {
    console.error("Create Review Error:", error);

    res.status(500).json({
      success: false,
      message: "Server error while creating review",
    });
  }
};

export const getReviews = async (req, res) => {
  try {
    const page = parseInt(req.query.page, 10) || 1;
    const limit = parseInt(req.query.limit, 10) || 10;
    const skip = (page - 1) * limit;

    const total = await Review.countDocuments();

    const reviews = await Review.find()
      .populate({
        path: "jobRequest",
        select: "jobTitle status createdAt",
      })
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    res.status(200).json({
      success: true,
      message: "Reviews fetched successfully",
      meta: {
        total,
        page,
        pages: Math.ceil(total / limit),
        limit,
      },
      data: reviews,
    });
  } catch (error) {
    console.error("Get Reviews Error:", error);

    res.status(500).json({
      success: false,
      message: "Server error while fetching reviews",
    });
  }
};

export const sendContact = async (req, res) => {
  try {
    const { fullName, email, subject, message } = req.body;

    if (!fullName || !email || !subject || !message) {
      return res.status(400).json({ success: false, msg: "All fields are required" });
    }

    await sendEmail({
      from: FROM_EMAIL,
      to: ADMIN_EMAIL,
      subject: `New Message from ${fullName}`,
      html: `
	    <h3>Boluwatife Contact From</h3>
        <p><strong>Name:</strong> ${fullName}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Message:</strong></p>
        <p>${message}</p>
  `,
    });
    return res.status(200).json({ success: true, msg: "Message sent successfully" });
  } catch (error) {
    console.error("ContactSupport Error:", error);
    return res.status(500).json({ success: false, msg: "Failed to send message", error });
  }
};

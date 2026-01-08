import express from "express";
import upload from "../middleware/multer.js";
import { createRequest, createReview, getRequests, getReviews, sendContact } from "../controllers/generalController.js";

const router = express.Router();


router.post("/requests", upload.array("attachments", 10), createRequest);
router.get("/requests", getRequests); 
router.post("/reviews", createReview);
router.get("/reviews", getReviews);
router.post("/contact", sendContact);

export default router;

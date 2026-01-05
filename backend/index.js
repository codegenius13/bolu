import dotenv from "dotenv"
import express from "express";
import cors from "cors"
import connectDB from "./config/mongodb.js";
import connectCloudinary from "./config/cloudinary.js";

dotenv.config()
const app = express();
const port = process.env.PORT || 5000;
connectDB()
connectCloudinary()  



// middleware
app.use(express.json());
app.use(cors({
    origin: true,
}))


// API routes
   


// api endpoints
app.get("/", (req, res) => {
  res.send("Hello World!");
});


app.listen(port, () => {
  console.log(`Server running on port ${port}`);
}); 
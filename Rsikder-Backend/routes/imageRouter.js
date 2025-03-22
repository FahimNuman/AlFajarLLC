import express from "express";
import multer from "multer";
import {
  getImageById,
  listImages,
  uploadImage,
  uploadMultipleImages,
  updateImage, // Import updateImage
  deleteImage, // Import deleteImage
} from "../controllers/imageController.js";

const imageRouter = express.Router();

// Use multer for file handling
const storage = multer.diskStorage({});
const upload = multer({ storage });

// Routes
imageRouter.post("/", upload.single("image"), uploadImage); // Upload single image
imageRouter.post("/multiple", upload.array("images", 10), uploadMultipleImages); // Upload multiple images
imageRouter.get("/:id", getImageById); // Get image by ID
imageRouter.get("/", listImages); // List all images

// New routes
imageRouter.put("/:id", updateImage); // Update image metadata
imageRouter.delete("/:id", deleteImage); // Delete image

export default imageRouter;

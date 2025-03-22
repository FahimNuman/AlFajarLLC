import express from "express";
import {
  createCategory,
  listCategories,
  getCategoryById,
  updateCategory,
  deleteCategory,
  addSubCategory,
  updateSubCategory,
} from "../controllers/categoryController.js";

const categoryRouter = express.Router();

categoryRouter.post("/add", createCategory);
categoryRouter.get("/list", listCategories);
categoryRouter.get("/:id", getCategoryById);
categoryRouter.put("/:id", updateCategory);
categoryRouter.delete("/:id", deleteCategory);
categoryRouter.post("/:id/subcategory", addSubCategory);
categoryRouter.put("/:id/subcategory/:subCategoryId", updateSubCategory);

export default categoryRouter;

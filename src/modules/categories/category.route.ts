// src/modules/categories/category.route.ts
import { Router } from "express";
import * as categoryController from "./category.controller";

const router = Router();

// =======================
// Category Routes
// =======================

// Create a new category
router.post("/", categoryController.createCategory);

// Get all categories
router.get("/", categoryController.getAllCategories);

// Get a category by ID
router.get("/:id", categoryController.getCategoryById);

// Update a category
router.put("/:id", categoryController.updateCategory);

// Delete a category
router.delete("/:id", categoryController.deleteCategory);

export default router;

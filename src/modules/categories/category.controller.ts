
import { Request, Response } from "express";
import * as categoryService from "./category.service";
import { validate, createCategorySchema, updateCategorySchema, categoryIdSchema } from "./category.validation";


export const createCategory = [
  validate(createCategorySchema),
  async (req: Request, res: Response) => {
    try {
      const { name } = req.body;
      const category = await categoryService.createCategory(name);
      res.status(201).json(category);
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  }
];


export const getAllCategories = async (req: Request, res: Response) => {
  try {
    const categories = await categoryService.getAllCategories();
    res.json(categories);
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};


export const getCategoryById = [
  validate(categoryIdSchema),
  async (req: Request, res: Response) => {
    try {
      const id = String(req.params.id);
      const category = await categoryService.getCategoryById(id);
      res.json(category);
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  }
];


export const updateCategory = [
  validate(updateCategorySchema),
  async (req: Request, res: Response) => {
    try {
      const id = String(req.params.id);
      const { name } = req.body;
      const category = await categoryService.updateCategory(id, name);
      res.json(category);
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  }
];


export const deleteCategory = [
  validate(categoryIdSchema),
  async (req: Request, res: Response) => {
    try {
      const id = String(req.params.id);
      await categoryService.deleteCategory(id);
      res.status(204).send();
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  }
];

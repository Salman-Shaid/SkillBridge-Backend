// src/modules/categories/category.service.ts
import prisma from "../../lib/prisma"; // ✅ default import

// Create a category
export const createCategory = async (name: string) => {
  return prisma.category.create({
    data: { name },
  });
};

// Get all categories
export const getAllCategories = async () => {
  return prisma.category.findMany({
    orderBy: { createdAt: "asc" },
  });
};

// Get category by ID
export const getCategoryById = async (id: string) => {
  return prisma.category.findUnique({
    where: { id },
  });
};

// Update category
export const updateCategory = async (id: string, name: string) => {
  return prisma.category.update({
    where: { id },
    data: { name },
  });
};

// Delete category
export const deleteCategory = async (id: string) => {
  return prisma.category.delete({
    where: { id },
  });
};

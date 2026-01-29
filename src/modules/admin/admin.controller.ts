// src/modules/admin/admin.controller.ts
import { Request, Response } from "express";
import * as adminService from "./admin.service";
import prisma from "../../lib/prisma";
// ===========================
// Users
// ===========================
export const getAllUsers = async (_req: Request, res: Response) => {
  try {
    const users = await adminService.getAllUsers();
    res.json(users);
  } catch (err: any) {
    res.status(400).json({ message: err.message });
  }
};



export const getUserById = async (req: Request, res: Response) => {
  try {
    const id = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;
    const user = await adminService.getUserById(id);
    res.json(user);
  } catch (err: any) {
    res.status(400).json({ message: err.message });
  }
};
// Update user status (isActive)
// Update user status
// src/modules/admin/admin.controller.ts
export const updateUserStatus = async (req: Request, res: Response) => {
  try {
    const id = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;
    const { isBanned } = req.body;  
    const user = await adminService.updateUserStatus(id, isBanned);
    res.json({ success: true, user });
  } catch (error: any) {
    res.status(400).json({ success: false, message: error.message });
  }
};



export const deleteUser = async (req: Request, res: Response) => {
  try {
    const id = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;
    await adminService.deleteUser(id);
    res.status(204).send();
  } catch (err: any) {
    res.status(400).json({ message: err.message });
  }
};

// ===========================
// Tutors
// ===========================
export const getAllTutors = async (_req: Request, res: Response) => {
  try {
    const tutors = await adminService.getAllTutors();
    res.json(tutors);
  } catch (err: any) {
    res.status(400).json({ message: err.message });
  }
};

export const getTutorById = async (req: Request, res: Response) => {
  try {
    const id = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;
    const tutor = await adminService.getTutorById(id);
    res.json(tutor);
  } catch (err: any) {
    res.status(400).json({ message: err.message });
  }
};

export const deleteTutor = async (req: Request, res: Response) => {
  try {
    const id = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;
    await adminService.deleteTutor(id);
    res.status(204).send();
  } catch (err: any) {
    res.status(400).json({ message: err.message });
  }
};

// ===========================
// Bookings
// ===========================
export const getAllBookings = async (_req: Request, res: Response) => {
  try {
    const bookings = await adminService.getAllBookings();
    res.json(bookings);
  } catch (err: any) {
    res.status(400).json({ message: err.message });
  }
};

export const getBookingById = async (req: Request, res: Response) => {
  try {
    const id = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;
    const booking = await adminService.getBookingById(id);
    res.json(booking);
  } catch (err: any) {
    res.status(400).json({ message: err.message });
  }
};

export const deleteBooking = async (req: Request, res: Response) => {
  try {
    const id = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;
    await adminService.deleteBooking(id);
    res.status(204).send();
  } catch (err: any) {
    res.status(400).json({ message: err.message });
  }
};

// ===========================
// Reviews
// ===========================
export const getAllReviews = async (_req: Request, res: Response) => {
  try {
    const reviews = await adminService.getAllReviews();
    res.json(reviews);
  } catch (err: any) {
    res.status(400).json({ message: err.message });
  }
};

export const getReviewById = async (req: Request, res: Response) => {
  try {
    const id = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;
    const review = await adminService.getReviewById(id);
    res.json(review);
  } catch (err: any) {
    res.status(400).json({ message: err.message });
  }
};

export const deleteReview = async (req: Request, res: Response) => {
  try {
    const id = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;
    await adminService.deleteReview(id);
    res.status(204).send();
  } catch (err: any) {
    res.status(400).json({ message: err.message });
  }
};

// ===========================
// Categories
// ===========================
export const getAllCategories = async (_req: Request, res: Response) => {
  try {
    const categories = await adminService.getAllCategories();
    res.json(categories);
  } catch (err: any) {
    res.status(400).json({ message: err.message });
  }
};

export const getCategoryById = async (req: Request, res: Response) => {
  try {
    const id = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;
    const category = await adminService.getCategoryById(id);
    res.json(category);
  } catch (err: any) {
    res.status(400).json({ message: err.message });
  }
};

export const deleteCategory = async (req: Request, res: Response) => {
  try {
    const id = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;
    await adminService.deleteCategory(id);
    res.status(204).send();
  } catch (err: any) {
    res.status(400).json({ message: err.message });
  }
};

// ===============================
// Admin Dashboard
// ===============================
export const getAdminDashboard = async (req: Request, res: Response) => {
  try {
    // Total counts
    const totalUsers = await prisma.user.count();
    const totalStudents = await prisma.user.count({ where: { role: "STUDENT" } });
    const totalTutors = await prisma.user.count({ where: { role: "TUTOR" } });
    const totalBookings = await prisma.booking.count();
    const totalReviews = await prisma.review.count();
    const totalCategories = await prisma.category.count();

    // Recent users (last 5)
    const recentUsers = await prisma.user.findMany({
      orderBy: { createdAt: "desc" },
      take: 5,
      select: { id: true, name: true, email: true, role: true },
    });

    // Recent bookings (last 5)
    const recentBookings = await prisma.booking.findMany({
      orderBy: { createdAt: "desc" },
      take: 5,
      include: {
        student: { select: { id: true, name: true } },
        tutor: { select: { id: true, user: { select: { name: true } } } },
      },
    });

    // Format tutor name directly for convenience
    const formattedBookings = recentBookings.map(b => ({
      id: b.id,
      status: b.status,
      createdAt: b.createdAt,
      student: b.student,
      tutor: { id: b.tutor.id, name: b.tutor.user.name },
    }));

    res.json({
      success: true,
      data: {
        totalUsers,
        totalStudents,
        totalTutors,
        totalBookings,
        totalReviews,
        totalCategories,
        recentUsers,
        recentBookings: formattedBookings,
      },
    });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

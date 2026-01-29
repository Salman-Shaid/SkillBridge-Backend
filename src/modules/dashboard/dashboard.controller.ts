import { Response } from "express";
import { AuthRequest } from "../../middlewares/auth.middleware";
import prisma from "../../lib/prisma";

// Student Dashboard
export const studentDashboard = async (req: AuthRequest, res: Response) => {
    if (!req.user || req.user.role !== "STUDENT") {
        return res.status(403).json({ message: "Forbidden" });
    }

    const bookings = await prisma.booking.findMany({
        where: { studentId: req.user.id },
        include: {
            tutor: {
                select: {
                    user: { select: { id: true, name: true, email: true } }
                }
            }
        },
        orderBy: { createdAt: "desc" }
    });

    res.json({ success: true, bookings });
};

// Tutor Dashboard
export const getTutorDashboard = async (req: AuthRequest, res: Response) => {
    try {
        if (!req.user) return res.status(401).json({ message: "Unauthorized" });

        const tutorId = req.user.id;

        const sessions = await prisma.booking.findMany({
            where: { tutorId },
            include: { student: { select: { id: true, name: true, email: true } } },
            orderBy: { createdAt: "desc" }
        });

        const stats = {
            totalSessions: sessions.length,
            confirmedSessions: sessions.filter(s => s.status === "CONFIRMED").length,
            cancelledSessions: sessions.filter(s => s.status === "CANCELLED").length
        };

        res.json({ success: true, data: { stats, sessions } });
    } catch (error: any) {
        res.status(500).json({ success: false, message: error.message });
    }
};


// ===============================
// Admin Dashboard
// ===============================
export const adminDashboard = async (req: any, res: Response) => {
  try {
    const totalUsers = await prisma.user.count();
    const totalTutors = await prisma.user.count({ where: { role: "TUTOR" } });
    const totalBookings = await prisma.booking.count();
    const totalCategories = await prisma.category.count();

    const recentUsers = await prisma.user.findMany({
      orderBy: { createdAt: "desc" },
      take: 5,
      select: { id: true, name: true, email: true }
    });

    const recentBookings = await prisma.booking.findMany({
  orderBy: { createdAt: "desc" },
  take: 5,
  include: {
    student: { select: { id: true, name: true } },
    tutor: { 
      select: { 
        user: { select: { id: true, name: true } } 
      } 
    }
  }
});


    res.json({
      success: true,
      data: {
        totalUsers,
        totalTutors,
        totalBookings,
        totalCategories,
        recentUsers,
        recentBookings
      }
    });
  } catch (err: any) {
    res.status(500).json({ success: false, message: err.message });
  }
};
// src/modules/admin/admin.service.ts
import prisma from "../../lib/prisma";

export const getAllUsers = () => prisma.user.findMany();
export const getUserById = (id: string) => prisma.user.findUnique({ where: { id } });
export const deleteUser = (id: string) => prisma.user.delete({ where: { id } });


// Update user status (isActive)
export const updateUserStatus = async (id: string, isBanned: boolean) => {
  return prisma.user.update({
    where: { id },
    data: { isBanned },  // ✅ isActive নয়, isBanned ব্যবহার করবে
  });
};


export const getAllTutors = () =>
  prisma.tutorProfile.findMany({
    include: { user: true }, 
  });

export const getTutorById = (id: string) =>
  prisma.tutorProfile.findUnique({
    where: { id },
    include: { user: true }, 
  });


export const deleteTutor = async (id: string) => {
  await prisma.tutorProfile.delete({
    where: { id },
  });
};

export const getAllBookings = () => prisma.booking.findMany({ include: { student: true, tutor: true } });
export const getBookingById = (id: string) => prisma.booking.findUnique({ where: { id }, include: { student: true, tutor: true } });
export const deleteBooking = (id: string) => prisma.booking.delete({ where: { id } });

// ===========================
// Reviews
// ===========================
export const getAllReviews = () => prisma.review.findMany({ include: { student: true, tutor: true } });
export const getReviewById = (id: string) => prisma.review.findUnique({ where: { id }, include: { student: true, tutor: true } });
export const deleteReview = (id: string) => prisma.review.delete({ where: { id } });

// ===========================
// Categories
// ===========================
export const getAllCategories = () => prisma.category.findMany();
export const getCategoryById = (id: string) => prisma.category.findUnique({ where: { id } });
export const deleteCategory = (id: string) => prisma.category.delete({ where: { id } });


// stats

export const getAdminDashboardStats = async () => {
  const totalUsers = await prisma.user.count();
  const totalTutors = await prisma.user.count({ where: { role: "TUTOR" } });
  const totalBookings = await prisma.booking.count();
  const totalReviews = await prisma.review.count();

  return { totalUsers, totalTutors, totalBookings, totalReviews };
};


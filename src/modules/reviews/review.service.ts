import prisma from "../../lib/prisma";

// Create review based on booking
export const createReview = async (
  bookingId: string,
  rating: number,
  comment?: string
) => {
  // Booking fetch
  const booking = await prisma.booking.findUnique({
    where: { id: bookingId },
  });

  if (!booking) throw new Error("Booking not found");

  // Review create
  return prisma.review.create({
    data: {
      bookingId: booking.id,
      studentId: booking.studentId, // Booking থেকে automatically assign
      tutorId: booking.tutorId,     // Booking থেকে automatically assign
      rating,
      comment: comment ?? "",
    },
  });
};

// Get reviews by tutor
export const getReviewsByTutor = async (tutorId: string) => {
  return prisma.review.findMany({
    where: { booking: { tutorId } },
    include: {
      booking: {
        select: { studentId: true },
      },
    },
  });
};

// Get reviews by student
export const getReviewsByStudent = async (studentId: string) => {
  return prisma.review.findMany({
    where: { booking: { studentId } },
    include: {
      booking: {
        select: { tutorId: true },
      },
    },
  });
};

// Update review
export const updateReview = async (
  id: string,
  rating?: number,
  comment?: string
) => {
  return prisma.review.update({
    where: { id },
    data: { rating, comment },
  });
};

// Delete review
export const deleteReview = async (id: string) => {
  return prisma.review.delete({
    where: { id },
  });
};

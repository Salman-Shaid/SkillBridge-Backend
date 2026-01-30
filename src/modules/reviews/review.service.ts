import prisma from "../../lib/prisma";


export const createReview = async (
  bookingId: string,
  rating: number,
  comment?: string
) => {

  const booking = await prisma.booking.findUnique({
    where: { id: bookingId },
  });

  if (!booking) throw new Error("Booking not found");

  
  return prisma.review.create({
    data: {
      bookingId: booking.id,
      studentId: booking.studentId, 
      tutorId: booking.tutorId, 
      rating,
      comment: comment ?? "",
    },
  });
};


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


export const deleteReview = async (id: string) => {
  return prisma.review.delete({
    where: { id },
  });
};

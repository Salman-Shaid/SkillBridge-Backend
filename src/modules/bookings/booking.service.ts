
import prisma from "../../lib/prisma";
import { BookingStatus } from "./booking.enum";

export const createBooking = async (
  studentId: string,
  tutorId: string,
  availabilityId: string
) => {

  const slot = await prisma.availability.findUnique({
    where: { id: availabilityId },
  });

  if (!slot) throw new Error("Availability slot not found");
  if (slot.isBooked) throw new Error("This slot is already booked");


  const booking = await prisma.booking.create({
    data: {
      studentId,
      tutorId,
      availabilityId,
      status: "CONFIRMED",
    },
  });


  await prisma.availability.update({
    where: { id: availabilityId },
    data: { isBooked: true },
  });

  return booking;
};


export const getAllBookings = async () => {
  return await prisma.booking.findMany({
    include: {
      student: { select: { id: true, name: true, email: true } },
      tutor: {
        include: { user: { select: { id: true, name: true, email: true } } },
      },
      availability: true,
      review: true,
    },
    orderBy: { createdAt: "asc" },
  });
};

export const getBookingById = async (id: string) => {
  return await prisma.booking.findUnique({
    where: { id },
    include: {
      student: { select: { id: true, name: true, email: true } },
      tutor: {
        include: { user: { select: { id: true, name: true, email: true } } },
      },
      availability: true,
      review: true,
    },
  });
};


export const updateBooking = async (id: string, status: BookingStatus) => {
  return await prisma.booking.update({
    where: { id },
    data: { status },
  });
};


export const deleteBooking = async (id: string) => {
  return await prisma.booking.delete({
    where: { id },
  });
};

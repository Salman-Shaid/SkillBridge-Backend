// src/modules/bookings/booking.service.ts
import prisma from "../../lib/prisma";
import { BookingStatus } from "./booking.enum";

// ===============================
// Create Booking
// ===============================
export const createBooking = async (
  studentId: string,
  tutorId: string,
  availabilityId: string
) => {
  // Availability check
  const slot = await prisma.availability.findUnique({
    where: { id: availabilityId },
  });

  if (!slot) throw new Error("Availability slot not found");
  if (slot.isBooked) throw new Error("This slot is already booked");

  // Create booking
  const booking = await prisma.booking.create({
    data: {
      studentId,
      tutorId,
      availabilityId,
      status: "CONFIRMED",
    },
  });

  // Mark availability as booked
  await prisma.availability.update({
    where: { id: availabilityId },
    data: { isBooked: true },
  });

  return booking;
};


// ===============================
// Get All Bookings
// ===============================
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

// ===============================
// Get Booking By ID
// ===============================
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

// ===============================
// Update Booking Status
// ===============================
export const updateBooking = async (id: string, status: BookingStatus) => {
  return await prisma.booking.update({
    where: { id },
    data: { status },
  });
};

// ===============================
// Delete Booking
// ===============================
export const deleteBooking = async (id: string) => {
  return await prisma.booking.delete({
    where: { id },
  });
};

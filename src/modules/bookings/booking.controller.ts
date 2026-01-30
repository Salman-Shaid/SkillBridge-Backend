
import { Request, Response } from "express";
import * as bookingService from "./booking.service";

export const createBooking = async (req: any, res: Response) => {
  try {
    const studentId = req.user.id;
    const { tutorId, availabilityId } = req.body;

    const booking = await bookingService.createBooking(
      studentId,
      tutorId,
      availabilityId
    );

    res.status(201).json(booking);
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};



export const getAllBookings = async (_req: Request, res: Response) => {
  try {
    const bookings = await bookingService.getAllBookings();
    res.json(bookings);
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};



export const getBookingById = async (req: Request, res: Response) => {
  try {
    let id = req.params.id;
    if (Array.isArray(id)) id = id[0];

    const booking = await bookingService.getBookingById(id);
    res.json(booking);
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};



export const updateBooking = async (req: Request, res: Response) => {
  try {
    let id = req.params.id;
    if (Array.isArray(id)) id = id[0];

    let status = req.body.status;
    if (Array.isArray(status)) status = status[0];

    const booking = await bookingService.updateBooking(id, status);
    res.json(booking);
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};



export const deleteBooking = async (req: Request, res: Response) => {
  try {
    let id = req.params.id;
    if (Array.isArray(id)) id = id[0];

    await bookingService.deleteBooking(id);
    res.status(204).send();
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};

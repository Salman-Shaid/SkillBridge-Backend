import { Request, Response } from "express";
import prisma from "../../lib/prisma";
import {
  createOrUpdateProfile,
  getTutorProfileByUserId,
  getAllTutors,
  addAvailability
} from "./tutor.service";
import { AuthRequest } from "../../middlewares/auth.middleware";
// ===============================
// Create or Update Tutor Profile
// ===============================
export const handleCreateOrUpdateProfile = async (req: Request, res: Response) => {
  try {
    const userId = req.body.userId;
    const bio = req.body.bio;
    const pricePerHour = Number(req.body.pricePerHour);
    const categoryIds = req.body.categoryIds; // array of category IDs

    const profile = await createOrUpdateProfile(userId, bio, pricePerHour, categoryIds);
    res.status(200).json(profile);
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};

// ===============================
// Get tutor profile by userId
// ===============================
export const handleGetTutorProfileByUserId = async (req: Request, res: Response) => {
  try {

    let userId = req.params.userId;
    if (Array.isArray(userId)) userId = userId[0];

    const profile = await getTutorProfileByUserId(userId); // ✅ এখন string
    res.json(profile);
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};


// Add Availability
export const handleAddAvailability = async (req: Request, res: Response) => {
  try {
    const { tutorId, date, startTime, endTime } = req.body;
    const availability = await addAvailability(tutorId, date, startTime, endTime);
    res.status(201).json({ success: true, availability });
  } catch (error: any) {
    res.status(400).json({ success: false, message: error.message });
  }
};
// ===============================
// Get All Tutors
// ===============================
export const handleGetAllTutors = async (_req: Request, res: Response) => {
  try {
    const tutors = await getAllTutors();
    res.json(tutors);
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};

// src/modules/reviews/review.controller.ts
import { Request, Response } from "express";
import * as reviewService from "./review.service";

// Create review
export const createReview = async (req: any, res: any) => {
  try {
    let { bookingId, rating, comment } = req.body;

    if (Array.isArray(bookingId)) bookingId = bookingId[0];
    if (Array.isArray(rating)) rating = Number(rating[0]);
    if (Array.isArray(comment)) comment = comment[0];

    const review = await reviewService.createReview(bookingId, rating, comment);

    res.status(201).json(review);
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};



// Get reviews by tutor
export const getReviewsByTutor = async (req: Request, res: Response) => {
  try {
    let { tutorId } = req.params;
    if (Array.isArray(tutorId)) tutorId = tutorId[0];

    const reviews = await reviewService.getReviewsByTutor(tutorId);
    res.json(reviews);
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};

// Get reviews by student
export const getReviewsByStudent = async (req: Request, res: Response) => {
  try {
    let { studentId } = req.params;
    if (Array.isArray(studentId)) studentId = studentId[0];

    const reviews = await reviewService.getReviewsByStudent(studentId);
    res.json(reviews);
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};

// Update review
export const updateReview = async (req: Request, res: Response) => {
  try {
    let { id } = req.params;
    let { rating, comment } = req.body;

    if (Array.isArray(id)) id = id[0];
    if (Array.isArray(rating)) rating = Number(rating[0]);
    if (Array.isArray(comment)) comment = comment[0];

    const review = await reviewService.updateReview(id, rating, comment);
    res.json(review);
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};

// Delete review
export const deleteReview = async (req: Request, res: Response) => {
  try {
    let { id } = req.params;
    if (Array.isArray(id)) id = id[0];

    await reviewService.deleteReview(id);
    res.status(204).send();
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};

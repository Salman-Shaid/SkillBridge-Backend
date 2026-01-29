// src/modules/reviews/review.route.ts
import { Router } from "express";
import * as reviewController from "./review.controller";

const router = Router();

router.post("/", reviewController.createReview);
router.get("/tutor/:tutorId", reviewController.getReviewsByTutor);
router.get("/student/:studentId", reviewController.getReviewsByStudent);
router.put("/:id", reviewController.updateReview);
router.delete("/:id", reviewController.deleteReview);

export default router;

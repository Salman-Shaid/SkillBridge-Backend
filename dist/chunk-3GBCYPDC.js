// src/lib/prisma.ts
import "dotenv/config";
import { PrismaPg } from "@prisma/adapter-pg";

// src/generated/prisma/client.ts
import * as path from "path";
import { fileURLToPath } from "url";

// src/generated/prisma/internal/class.ts
import * as runtime from "@prisma/client/runtime/client";
var config = {
  "previewFeatures": [],
  "clientVersion": "7.3.0",
  "engineVersion": "9d6ad21cbbceab97458517b147a6a09ff43aa735",
  "activeProvider": "postgresql",
  "inlineSchema": 'generator client {\n  provider = "prisma-client"\n  output   = "../src/generated/prisma"\n}\n\ndatasource db {\n  provider = "postgresql"\n}\n\nmodel User {\n  id        String   @id @default(uuid())\n  name      String\n  email     String   @unique\n  password  String\n  role      Role\n  isBanned  Boolean  @default(false)\n  createdAt DateTime @default(now())\n  updatedAt DateTime @updatedAt\n\n  tutorProfile TutorProfile?\n  bookings     Booking[]     @relation("StudentBookings")\n  reviews      Review[]\n}\n\nmodel TutorProfile {\n  id           String   @id @default(uuid())\n  userId       String   @unique\n  bio          String?\n  pricePerHour Int\n  rating       Float    @default(0)\n  createdAt    DateTime @default(now())\n  updatedAt    DateTime @updatedAt\n\n  user         User           @relation(fields: [userId], references: [id])\n  categories   Category[]\n  availability Availability[]\n  bookings     Booking[]      @relation("TutorBookings")\n  reviews      Review[]\n}\n\nmodel Category {\n  id        String   @id @default(uuid())\n  name      String   @unique\n  createdAt DateTime @default(now())\n\n  tutors TutorProfile[]\n}\n\nmodel Availability {\n  id        String   @id @default(uuid())\n  tutorId   String\n  date      DateTime\n  startTime DateTime\n  endTime   DateTime\n  isBooked  Boolean  @default(false)\n\n  tutor    TutorProfile @relation(fields: [tutorId], references: [id])\n  bookings Booking[]    @relation("AvailabilityBookings") // back-relation for Booking\n\n  @@unique([tutorId, date, startTime])\n}\n\nmodel Booking {\n  id             String        @id @default(uuid())\n  studentId      String\n  tutorId        String\n  availabilityId String\n  status         BookingStatus @default(CONFIRMED)\n  createdAt      DateTime      @default(now())\n  updatedAt      DateTime      @updatedAt\n\n  student      User         @relation("StudentBookings", fields: [studentId], references: [id])\n  tutor        TutorProfile @relation("TutorBookings", fields: [tutorId], references: [id])\n  availability Availability @relation("AvailabilityBookings", fields: [availabilityId], references: [id])\n  review       Review?\n}\n\nmodel Review {\n  id        String   @id @default(uuid())\n  rating    Int\n  comment   String\n  studentId String\n  tutorId   String\n  bookingId String   @unique\n  createdAt DateTime @default(now())\n\n  student User         @relation(fields: [studentId], references: [id])\n  tutor   TutorProfile @relation(fields: [tutorId], references: [id])\n  booking Booking      @relation(fields: [bookingId], references: [id])\n}\n\nenum Role {\n  STUDENT\n  TUTOR\n  ADMIN\n}\n\nenum BookingStatus {\n  CONFIRMED\n  COMPLETED\n  CANCELLED\n}\n',
  "runtimeDataModel": {
    "models": {},
    "enums": {},
    "types": {}
  }
};
config.runtimeDataModel = JSON.parse('{"models":{"User":{"fields":[{"name":"id","kind":"scalar","type":"String"},{"name":"name","kind":"scalar","type":"String"},{"name":"email","kind":"scalar","type":"String"},{"name":"password","kind":"scalar","type":"String"},{"name":"role","kind":"enum","type":"Role"},{"name":"isBanned","kind":"scalar","type":"Boolean"},{"name":"createdAt","kind":"scalar","type":"DateTime"},{"name":"updatedAt","kind":"scalar","type":"DateTime"},{"name":"tutorProfile","kind":"object","type":"TutorProfile","relationName":"TutorProfileToUser"},{"name":"bookings","kind":"object","type":"Booking","relationName":"StudentBookings"},{"name":"reviews","kind":"object","type":"Review","relationName":"ReviewToUser"}],"dbName":null},"TutorProfile":{"fields":[{"name":"id","kind":"scalar","type":"String"},{"name":"userId","kind":"scalar","type":"String"},{"name":"bio","kind":"scalar","type":"String"},{"name":"pricePerHour","kind":"scalar","type":"Int"},{"name":"rating","kind":"scalar","type":"Float"},{"name":"createdAt","kind":"scalar","type":"DateTime"},{"name":"updatedAt","kind":"scalar","type":"DateTime"},{"name":"user","kind":"object","type":"User","relationName":"TutorProfileToUser"},{"name":"categories","kind":"object","type":"Category","relationName":"CategoryToTutorProfile"},{"name":"availability","kind":"object","type":"Availability","relationName":"AvailabilityToTutorProfile"},{"name":"bookings","kind":"object","type":"Booking","relationName":"TutorBookings"},{"name":"reviews","kind":"object","type":"Review","relationName":"ReviewToTutorProfile"}],"dbName":null},"Category":{"fields":[{"name":"id","kind":"scalar","type":"String"},{"name":"name","kind":"scalar","type":"String"},{"name":"createdAt","kind":"scalar","type":"DateTime"},{"name":"tutors","kind":"object","type":"TutorProfile","relationName":"CategoryToTutorProfile"}],"dbName":null},"Availability":{"fields":[{"name":"id","kind":"scalar","type":"String"},{"name":"tutorId","kind":"scalar","type":"String"},{"name":"date","kind":"scalar","type":"DateTime"},{"name":"startTime","kind":"scalar","type":"DateTime"},{"name":"endTime","kind":"scalar","type":"DateTime"},{"name":"isBooked","kind":"scalar","type":"Boolean"},{"name":"tutor","kind":"object","type":"TutorProfile","relationName":"AvailabilityToTutorProfile"},{"name":"bookings","kind":"object","type":"Booking","relationName":"AvailabilityBookings"}],"dbName":null},"Booking":{"fields":[{"name":"id","kind":"scalar","type":"String"},{"name":"studentId","kind":"scalar","type":"String"},{"name":"tutorId","kind":"scalar","type":"String"},{"name":"availabilityId","kind":"scalar","type":"String"},{"name":"status","kind":"enum","type":"BookingStatus"},{"name":"createdAt","kind":"scalar","type":"DateTime"},{"name":"updatedAt","kind":"scalar","type":"DateTime"},{"name":"student","kind":"object","type":"User","relationName":"StudentBookings"},{"name":"tutor","kind":"object","type":"TutorProfile","relationName":"TutorBookings"},{"name":"availability","kind":"object","type":"Availability","relationName":"AvailabilityBookings"},{"name":"review","kind":"object","type":"Review","relationName":"BookingToReview"}],"dbName":null},"Review":{"fields":[{"name":"id","kind":"scalar","type":"String"},{"name":"rating","kind":"scalar","type":"Int"},{"name":"comment","kind":"scalar","type":"String"},{"name":"studentId","kind":"scalar","type":"String"},{"name":"tutorId","kind":"scalar","type":"String"},{"name":"bookingId","kind":"scalar","type":"String"},{"name":"createdAt","kind":"scalar","type":"DateTime"},{"name":"student","kind":"object","type":"User","relationName":"ReviewToUser"},{"name":"tutor","kind":"object","type":"TutorProfile","relationName":"ReviewToTutorProfile"},{"name":"booking","kind":"object","type":"Booking","relationName":"BookingToReview"}],"dbName":null}},"enums":{},"types":{}}');
async function decodeBase64AsWasm(wasmBase64) {
  const { Buffer } = await import("buffer");
  const wasmArray = Buffer.from(wasmBase64, "base64");
  return new WebAssembly.Module(wasmArray);
}
config.compilerWasm = {
  getRuntime: async () => await import("@prisma/client/runtime/query_compiler_fast_bg.postgresql.mjs"),
  getQueryCompilerWasmModule: async () => {
    const { wasm } = await import("@prisma/client/runtime/query_compiler_fast_bg.postgresql.wasm-base64.mjs");
    return await decodeBase64AsWasm(wasm);
  },
  importName: "./query_compiler_fast_bg.js"
};
function getPrismaClientClass() {
  return runtime.getPrismaClient(config);
}

// src/generated/prisma/internal/prismaNamespace.ts
import * as runtime2 from "@prisma/client/runtime/client";
var getExtensionContext = runtime2.Extensions.getExtensionContext;
var NullTypes2 = {
  DbNull: runtime2.NullTypes.DbNull,
  JsonNull: runtime2.NullTypes.JsonNull,
  AnyNull: runtime2.NullTypes.AnyNull
};
var TransactionIsolationLevel = runtime2.makeStrictEnum({
  ReadUncommitted: "ReadUncommitted",
  ReadCommitted: "ReadCommitted",
  RepeatableRead: "RepeatableRead",
  Serializable: "Serializable"
});
var defineExtension = runtime2.Extensions.defineExtension;

// src/generated/prisma/client.ts
globalThis["__dirname"] = path.dirname(fileURLToPath(import.meta.url));
var PrismaClient = getPrismaClientClass();

// src/lib/prisma.ts
var adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL
});
var prisma = new PrismaClient({ adapter });
var prisma_default = prisma;

// src/app.ts
import express2 from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";

// src/routes/index.ts
import { Router as Router8 } from "express";

// src/modules/reviews/review.route.ts
import { Router } from "express";

// src/modules/reviews/review.service.ts
var createReview = async (bookingId, rating, comment) => {
  const booking = await prisma_default.booking.findUnique({
    where: { id: bookingId }
  });
  if (!booking) throw new Error("Booking not found");
  return prisma_default.review.create({
    data: {
      bookingId: booking.id,
      studentId: booking.studentId,
      tutorId: booking.tutorId,
      rating,
      comment: comment ?? ""
    }
  });
};
var getReviewsByTutor = async (tutorId) => {
  return prisma_default.review.findMany({
    where: { booking: { tutorId } },
    include: {
      booking: {
        select: { studentId: true }
      }
    }
  });
};
var getReviewsByStudent = async (studentId) => {
  return prisma_default.review.findMany({
    where: { booking: { studentId } },
    include: {
      booking: {
        select: { tutorId: true }
      }
    }
  });
};
var updateReview = async (id, rating, comment) => {
  return prisma_default.review.update({
    where: { id },
    data: { rating, comment }
  });
};
var deleteReview = async (id) => {
  return prisma_default.review.delete({
    where: { id }
  });
};

// src/modules/reviews/review.controller.ts
var createReview2 = async (req, res) => {
  try {
    let { bookingId, rating, comment } = req.body;
    if (Array.isArray(bookingId)) bookingId = bookingId[0];
    if (Array.isArray(rating)) rating = Number(rating[0]);
    if (Array.isArray(comment)) comment = comment[0];
    const review = await createReview(bookingId, rating, comment);
    res.status(201).json(review);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
var getReviewsByTutor2 = async (req, res) => {
  try {
    let { tutorId } = req.params;
    if (Array.isArray(tutorId)) tutorId = tutorId[0];
    const reviews = await getReviewsByTutor(tutorId);
    res.json(reviews);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
var getReviewsByStudent2 = async (req, res) => {
  try {
    let { studentId } = req.params;
    if (Array.isArray(studentId)) studentId = studentId[0];
    const reviews = await getReviewsByStudent(studentId);
    res.json(reviews);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
var updateReview2 = async (req, res) => {
  try {
    let { id } = req.params;
    let { rating, comment } = req.body;
    if (Array.isArray(id)) id = id[0];
    if (Array.isArray(rating)) rating = Number(rating[0]);
    if (Array.isArray(comment)) comment = comment[0];
    const review = await updateReview(id, rating, comment);
    res.json(review);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
var deleteReview2 = async (req, res) => {
  try {
    let { id } = req.params;
    if (Array.isArray(id)) id = id[0];
    await deleteReview(id);
    res.status(204).send();
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// src/modules/reviews/review.route.ts
var router = Router();
router.post("/", createReview2);
router.get("/tutor/:tutorId", getReviewsByTutor2);
router.get("/student/:studentId", getReviewsByStudent2);
router.put("/:id", updateReview2);
router.delete("/:id", deleteReview2);
var review_route_default = router;

// src/modules/bookings/booking.route.ts
import express from "express";

// src/modules/bookings/booking.service.ts
var createBooking = async (studentId, tutorId, availabilityId) => {
  const slot = await prisma_default.availability.findUnique({
    where: { id: availabilityId }
  });
  if (!slot) throw new Error("Availability slot not found");
  if (slot.isBooked) throw new Error("This slot is already booked");
  const booking = await prisma_default.booking.create({
    data: {
      studentId,
      tutorId,
      availabilityId,
      status: "CONFIRMED"
    }
  });
  await prisma_default.availability.update({
    where: { id: availabilityId },
    data: { isBooked: true }
  });
  return booking;
};
var getAllBookings = async () => {
  return await prisma_default.booking.findMany({
    include: {
      student: { select: { id: true, name: true, email: true } },
      tutor: {
        include: { user: { select: { id: true, name: true, email: true } } }
      },
      availability: true,
      review: true
    },
    orderBy: { createdAt: "asc" }
  });
};
var getBookingById = async (id) => {
  return await prisma_default.booking.findUnique({
    where: { id },
    include: {
      student: { select: { id: true, name: true, email: true } },
      tutor: {
        include: { user: { select: { id: true, name: true, email: true } } }
      },
      availability: true,
      review: true
    }
  });
};
var updateBooking = async (id, status) => {
  return await prisma_default.booking.update({
    where: { id },
    data: { status }
  });
};
var deleteBooking = async (id) => {
  return await prisma_default.booking.delete({
    where: { id }
  });
};

// src/modules/bookings/booking.controller.ts
var createBooking2 = async (req, res) => {
  try {
    const studentId = req.user.id;
    const { tutorId, availabilityId } = req.body;
    const booking = await createBooking(
      studentId,
      tutorId,
      availabilityId
    );
    res.status(201).json(booking);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
var getAllBookings2 = async (_req, res) => {
  try {
    const bookings = await getAllBookings();
    res.json(bookings);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
var getBookingById2 = async (req, res) => {
  try {
    let id = req.params.id;
    if (Array.isArray(id)) id = id[0];
    const booking = await getBookingById(id);
    res.json(booking);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
var updateBooking2 = async (req, res) => {
  try {
    let id = req.params.id;
    if (Array.isArray(id)) id = id[0];
    let status = req.body.status;
    if (Array.isArray(status)) status = status[0];
    const booking = await updateBooking(id, status);
    res.json(booking);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
var deleteBooking2 = async (req, res) => {
  try {
    let id = req.params.id;
    if (Array.isArray(id)) id = id[0];
    await deleteBooking(id);
    res.status(204).send();
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// src/middlewares/auth.middleware.ts
import jwt from "jsonwebtoken";
var authMiddleware = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ message: "No token provided" });
    }
    const token = authHeader.split(" ")[1];
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    const user = await prisma_default.user.findUnique({
      where: { id: payload.id },
      select: { id: true, name: true, email: true, role: true }
    });
    if (!user) {
      return res.status(401).json({ message: "User not found" });
    }
    req.user = user;
    next();
  } catch (error) {
    return res.status(401).json({ message: "Invalid token" });
  }
};

// src/middlewares/role.middleware.ts
var roleMiddleware = (...roles) => (req, res, next) => {
  const user = req.user;
  if (!user || !roles.includes(user.role)) {
    return res.status(403).json({ message: "Forbidden" });
  }
  next();
};

// src/middlewares/validate.middleware.ts
import { ZodError } from "zod";
var validate = (schema) => {
  return (req, res, next) => {
    try {
      const parsed = schema.parse({
        body: req.body,
        params: req.params,
        query: req.query
      });
      if (parsed.body) req.body = parsed.body;
      if (parsed.params) req.params = parsed.params;
      next();
    } catch (err) {
      if (err instanceof ZodError) {
        const formatted = err.flatten();
        return res.status(400).json({ message: formatted });
      }
      res.status(400).json({ message: err.message });
    }
  };
};

// src/modules/bookings/booking.validation.ts
import { z } from "zod";
var createBookingSchema = z.object({
  body: z.object({
    tutorId: z.string().uuid(),
    availabilityId: z.string().uuid()
  })
});
var updateBookingSchema = z.object({
  body: z.object({
    status: z.enum(["CONFIRMED", "COMPLETED", "CANCELLED"])
  }),
  params: z.object({
    id: z.string().uuid()
  })
});
var bookingIdSchema = z.object({
  params: z.object({
    id: z.string().uuid()
  })
});

// src/modules/bookings/booking.route.ts
var router2 = express.Router();
router2.post(
  "/",
  authMiddleware,
  roleMiddleware("STUDENT"),
  validate(createBookingSchema),
  createBooking2
);
router2.get(
  "/",
  authMiddleware,
  roleMiddleware("ADMIN", "TUTOR"),
  getAllBookings2
);
router2.get(
  "/:id",
  authMiddleware,
  roleMiddleware("ADMIN", "STUDENT", "TUTOR"),
  validate(bookingIdSchema),
  getBookingById2
);
router2.put(
  "/:id",
  authMiddleware,
  roleMiddleware("ADMIN", "TUTOR"),
  validate(updateBookingSchema),
  updateBooking2
);
router2.delete(
  "/:id",
  authMiddleware,
  roleMiddleware("ADMIN"),
  validate(bookingIdSchema),
  deleteBooking2
);
var booking_route_default = router2;

// src/modules/categories/category.route.ts
import { Router as Router2 } from "express";

// src/modules/categories/category.service.ts
var createCategory = async (name) => {
  return prisma_default.category.create({
    data: { name }
  });
};
var getAllCategories = async () => {
  return prisma_default.category.findMany({
    orderBy: { createdAt: "asc" }
  });
};
var getCategoryById = async (id) => {
  return prisma_default.category.findUnique({
    where: { id }
  });
};
var updateCategory = async (id, name) => {
  return prisma_default.category.update({
    where: { id },
    data: { name }
  });
};
var deleteCategory = async (id) => {
  return prisma_default.category.delete({
    where: { id }
  });
};

// src/modules/categories/category.validation.ts
import { z as z2 } from "zod";
var createCategorySchema = z2.object({
  name: z2.string().min(1, "Category name is required")
});
var updateCategorySchema = z2.object({
  name: z2.string().min(1, "Category name is required")
});
var categoryIdSchema = z2.object({
  id: z2.string().uuid("Invalid category id")
});
var validate2 = (schema) => (req, res, next) => {
  try {
    const body = req.body;
    const params = req.params;
    schema.parse({ ...body, ...params });
    next();
  } catch (err) {
    return res.status(400).json({ message: err.errors });
  }
};

// src/modules/categories/category.controller.ts
var createCategory2 = [
  validate2(createCategorySchema),
  async (req, res) => {
    try {
      const { name } = req.body;
      const category = await createCategory(name);
      res.status(201).json(category);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }
];
var getAllCategories2 = async (req, res) => {
  try {
    const categories = await getAllCategories();
    res.json(categories);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
var getCategoryById2 = [
  validate2(categoryIdSchema),
  async (req, res) => {
    try {
      const id = String(req.params.id);
      const category = await getCategoryById(id);
      res.json(category);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }
];
var updateCategory2 = [
  validate2(updateCategorySchema),
  async (req, res) => {
    try {
      const id = String(req.params.id);
      const { name } = req.body;
      const category = await updateCategory(id, name);
      res.json(category);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }
];
var deleteCategory2 = [
  validate2(categoryIdSchema),
  async (req, res) => {
    try {
      const id = String(req.params.id);
      await deleteCategory(id);
      res.status(204).send();
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }
];

// src/modules/categories/category.route.ts
var router3 = Router2();
router3.post("/", createCategory2);
router3.get("/", getAllCategories2);
router3.get("/:id", getCategoryById2);
router3.put("/:id", updateCategory2);
router3.delete("/:id", deleteCategory2);
var category_route_default = router3;

// src/modules/admin/admin.route.ts
import { Router as Router3 } from "express";

// src/modules/admin/admin.service.ts
var getAllUsers = () => prisma_default.user.findMany();
var getUserById = (id) => prisma_default.user.findUnique({ where: { id } });
var deleteUser = (id) => prisma_default.user.delete({ where: { id } });
var updateUserStatus = async (id, isBanned) => {
  return prisma_default.user.update({
    where: { id },
    data: { isBanned }
  });
};
var getAllTutors = () => prisma_default.tutorProfile.findMany({
  include: { user: true }
});
var getTutorById = (id) => prisma_default.tutorProfile.findUnique({
  where: { id },
  include: { user: true }
});
var deleteTutor = async (id) => {
  await prisma_default.tutorProfile.delete({
    where: { id }
  });
};
var getAllBookings3 = () => prisma_default.booking.findMany({ include: { student: true, tutor: true } });
var getBookingById3 = (id) => prisma_default.booking.findUnique({ where: { id }, include: { student: true, tutor: true } });
var deleteBooking3 = (id) => prisma_default.booking.delete({ where: { id } });
var getAllReviews = () => prisma_default.review.findMany({ include: { student: true, tutor: true } });
var getReviewById = (id) => prisma_default.review.findUnique({ where: { id }, include: { student: true, tutor: true } });
var deleteReview3 = (id) => prisma_default.review.delete({ where: { id } });
var getAllCategories3 = () => prisma_default.category.findMany();
var getCategoryById3 = (id) => prisma_default.category.findUnique({ where: { id } });
var deleteCategory3 = (id) => prisma_default.category.delete({ where: { id } });

// src/modules/admin/admin.controller.ts
var getAllUsers2 = async (_req, res) => {
  try {
    const users = await getAllUsers();
    res.json(users);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};
var getUserById2 = async (req, res) => {
  try {
    const id = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;
    const user = await getUserById(id);
    res.json(user);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};
var updateUserStatus2 = async (req, res) => {
  try {
    const id = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;
    const { isBanned } = req.body;
    const user = await updateUserStatus(id, isBanned);
    res.json({ success: true, user });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};
var deleteUser2 = async (req, res) => {
  try {
    const id = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;
    await deleteUser(id);
    res.status(204).send();
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};
var getAllTutors2 = async (_req, res) => {
  try {
    const tutors = await getAllTutors();
    res.json(tutors);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};
var getTutorById2 = async (req, res) => {
  try {
    const id = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;
    const tutor = await getTutorById(id);
    res.json(tutor);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};
var deleteTutor2 = async (req, res) => {
  try {
    const id = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;
    await deleteTutor(id);
    res.status(204).send();
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};
var getAllBookings4 = async (_req, res) => {
  try {
    const bookings = await getAllBookings3();
    res.json(bookings);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};
var getBookingById4 = async (req, res) => {
  try {
    const id = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;
    const booking = await getBookingById3(id);
    res.json(booking);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};
var deleteBooking4 = async (req, res) => {
  try {
    const id = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;
    await deleteBooking3(id);
    res.status(204).send();
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};
var getAllReviews2 = async (_req, res) => {
  try {
    const reviews = await getAllReviews();
    res.json(reviews);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};
var getReviewById2 = async (req, res) => {
  try {
    const id = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;
    const review = await getReviewById(id);
    res.json(review);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};
var deleteReview4 = async (req, res) => {
  try {
    const id = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;
    await deleteReview3(id);
    res.status(204).send();
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};
var getAllCategories4 = async (_req, res) => {
  try {
    const categories = await getAllCategories3();
    res.json(categories);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};
var getCategoryById4 = async (req, res) => {
  try {
    const id = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;
    const category = await getCategoryById3(id);
    res.json(category);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};
var deleteCategory4 = async (req, res) => {
  try {
    const id = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;
    await deleteCategory3(id);
    res.status(204).send();
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};
var getAdminDashboard = async (req, res) => {
  try {
    const totalUsers = await prisma_default.user.count();
    const totalStudents = await prisma_default.user.count({ where: { role: "STUDENT" } });
    const totalTutors = await prisma_default.user.count({ where: { role: "TUTOR" } });
    const totalBookings = await prisma_default.booking.count();
    const totalReviews = await prisma_default.review.count();
    const totalCategories = await prisma_default.category.count();
    const recentUsers = await prisma_default.user.findMany({
      orderBy: { createdAt: "desc" },
      take: 5,
      select: { id: true, name: true, email: true, role: true }
    });
    const recentBookings = await prisma_default.booking.findMany({
      orderBy: { createdAt: "desc" },
      take: 5,
      include: {
        student: { select: { id: true, name: true } },
        tutor: { select: { id: true, user: { select: { name: true } } } }
      }
    });
    const formattedBookings = recentBookings.map((b) => ({
      id: b.id,
      status: b.status,
      createdAt: b.createdAt,
      student: b.student,
      tutor: { id: b.tutor.id, name: b.tutor.user.name }
    }));
    res.json({
      success: true,
      data: {
        totalUsers,
        totalStudents,
        totalTutors,
        totalBookings,
        totalReviews,
        totalCategories,
        recentUsers,
        recentBookings: formattedBookings
      }
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// src/modules/admin/admin.route.ts
var router4 = Router3();
router4.get(
  "/dashboard",
  authMiddleware,
  roleMiddleware("ADMIN"),
  getAdminDashboard
);
router4.get("/users", authMiddleware, roleMiddleware("ADMIN"), getAllUsers2);
router4.get("/users/:id", authMiddleware, roleMiddleware("ADMIN"), getUserById2);
router4.delete("/users/:id", authMiddleware, roleMiddleware("ADMIN"), deleteUser2);
router4.patch("/users/:id", authMiddleware, roleMiddleware("ADMIN"), updateUserStatus2);
router4.get("/tutors", authMiddleware, roleMiddleware("ADMIN"), getAllTutors2);
router4.get("/tutors/:id", authMiddleware, roleMiddleware("ADMIN"), getTutorById2);
router4.delete("/tutors/:id", authMiddleware, roleMiddleware("ADMIN"), deleteTutor2);
router4.get("/bookings", authMiddleware, roleMiddleware("ADMIN"), getAllBookings4);
router4.get("/bookings/:id", authMiddleware, roleMiddleware("ADMIN"), getBookingById4);
router4.delete("/bookings/:id", authMiddleware, roleMiddleware("ADMIN"), deleteBooking4);
router4.get("/reviews", authMiddleware, roleMiddleware("ADMIN"), getAllReviews2);
router4.get("/reviews/:id", authMiddleware, roleMiddleware("ADMIN"), getReviewById2);
router4.delete("/reviews/:id", authMiddleware, roleMiddleware("ADMIN"), deleteReview4);
router4.get("/categories", authMiddleware, roleMiddleware("ADMIN"), getAllCategories4);
router4.get("/categories/:id", authMiddleware, roleMiddleware("ADMIN"), getCategoryById4);
router4.delete("/categories/:id", authMiddleware, roleMiddleware("ADMIN"), deleteCategory4);
var admin_route_default = router4;

// src/modules/auth/auth.route.ts
import { Router as Router4 } from "express";

// src/utils/asyncHandler.ts
var asyncHandler = (fn) => (req, res, next) => {
  Promise.resolve(fn(req, res, next)).catch(next);
};

// src/modules/auth/auth.service.ts
import bcrypt from "bcrypt";
import jwt2 from "jsonwebtoken";
var JWT_SECRET = process.env.JWT_SECRET || "supersecret";
var registerUser = async (data) => {
  const existingUser = await prisma_default.user.findUnique({ where: { email: data.email } });
  if (existingUser) throw new Error("Email already registered");
  const hashedPassword = await bcrypt.hash(data.password, 10);
  const user = await prisma_default.user.create({
    data: {
      name: data.name,
      email: data.email,
      password: hashedPassword,
      role: (data.role || "STUDENT").toUpperCase()
    }
  });
  return user;
};
var loginUser = async (email, password) => {
  const user = await prisma_default.user.findUnique({ where: { email } });
  if (!user) throw new Error("User not found");
  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) throw new Error("Invalid password");
  const token = jwt2.sign(
    { id: user.id, email: user.email, role: user.role },
    JWT_SECRET,
    { expiresIn: "1d" }
  );
  return {
    id: user.id,
    name: user.name,
    email: user.email,
    role: user.role,
    token
  };
};

// src/modules/auth/auth.controller.ts
var getMe = (req, res) => {
  if (!req.user) {
    return res.status(401).json({ message: "Unauthorized" });
  }
  res.json({ success: true, user: req.user });
};
var register = asyncHandler(async (req, res) => {
  const user = await registerUser(req.body);
  res.status(201).json({
    success: true,
    message: "User registered successfully",
    data: user
  });
});
var login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ success: false, message: "Email and password are required" });
  }
  const userWithToken = await loginUser(email, password);
  res.json({
    success: true,
    message: "Login successful",
    data: userWithToken
  });
});

// src/modules/auth/auth.route.ts
var router5 = Router4();
router5.post("/register", register);
router5.post("/login", login);
router5.get("/me", authMiddleware, getMe);
var auth_route_default = router5;

// src/modules/tutors/tutor.route.ts
import { Router as Router5 } from "express";

// src/modules/tutors/tutor.service.ts
var createOrUpdateProfile = async (userId, bio, pricePerHour, categoryIds) => {
  const existingProfile = await prisma_default.tutorProfile.findUnique({
    where: { userId }
  });
  if (existingProfile) {
    return prisma_default.tutorProfile.update({
      where: { userId },
      data: {
        bio,
        pricePerHour,
        categories: {
          set: categoryIds.map((id) => ({ id }))
        }
      },
      include: {
        user: true,
        categories: true,
        availability: true,
        bookings: true,
        reviews: true
      }
    });
  }
  return prisma_default.tutorProfile.create({
    data: {
      userId,
      bio,
      pricePerHour,
      categories: {
        connect: categoryIds.map((id) => ({ id }))
      }
    },
    include: {
      user: true,
      categories: true,
      availability: true,
      bookings: true,
      reviews: true
    }
  });
};
var getTutorProfileByUserId = async (userId) => {
  return prisma_default.tutorProfile.findUnique({
    where: { userId },
    include: {
      user: true,
      categories: true,
      availability: true,
      bookings: true,
      reviews: true
    }
  });
};
var addAvailability = async (tutorId, date, startTime, endTime) => {
  return await prisma_default.availability.create({
    data: {
      tutorId,
      date: new Date(date),
      startTime: new Date(startTime),
      endTime: new Date(endTime)
    }
  });
};
var getAllTutors3 = async () => {
  return prisma_default.tutorProfile.findMany({
    include: {
      user: true,
      categories: true,
      availability: true,
      bookings: true,
      reviews: true
    }
  });
};

// src/modules/tutors/tutor.controller.ts
var handleCreateOrUpdateProfile = async (req, res) => {
  try {
    const userId = req.body.userId;
    const bio = req.body.bio;
    const pricePerHour = Number(req.body.pricePerHour);
    const categoryIds = req.body.categoryIds;
    const profile = await createOrUpdateProfile(userId, bio, pricePerHour, categoryIds);
    res.status(200).json(profile);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
var handleGetTutorProfileByUserId = async (req, res) => {
  try {
    let userId = req.params.userId;
    if (Array.isArray(userId)) userId = userId[0];
    const profile = await getTutorProfileByUserId(userId);
    res.json(profile);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
var handleAddAvailability = async (req, res) => {
  try {
    const { tutorId, date, startTime, endTime } = req.body;
    const availability = await addAvailability(tutorId, date, startTime, endTime);
    res.status(201).json({ success: true, availability });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};
var handleGetAllTutors = async (_req, res) => {
  try {
    const tutors = await getAllTutors3();
    res.json(tutors);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// src/modules/dashboard/dashboard.controller.ts
var studentDashboard = async (req, res) => {
  if (!req.user || req.user.role !== "STUDENT") {
    return res.status(403).json({ message: "Forbidden" });
  }
  const bookings = await prisma_default.booking.findMany({
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
var getTutorDashboard = async (req, res) => {
  try {
    if (!req.user) return res.status(401).json({ message: "Unauthorized" });
    const tutorId = req.user.id;
    const sessions = await prisma_default.booking.findMany({
      where: { tutorId },
      include: { student: { select: { id: true, name: true, email: true } } },
      orderBy: { createdAt: "desc" }
    });
    const stats = {
      totalSessions: sessions.length,
      confirmedSessions: sessions.filter((s) => s.status === "CONFIRMED").length,
      cancelledSessions: sessions.filter((s) => s.status === "CANCELLED").length
    };
    res.json({ success: true, data: { stats, sessions } });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
var adminDashboard = async (req, res) => {
  try {
    const totalUsers = await prisma_default.user.count();
    const totalTutors = await prisma_default.user.count({ where: { role: "TUTOR" } });
    const totalBookings = await prisma_default.booking.count();
    const totalCategories = await prisma_default.category.count();
    const recentUsers = await prisma_default.user.findMany({
      orderBy: { createdAt: "desc" },
      take: 5,
      select: { id: true, name: true, email: true }
    });
    const recentBookings = await prisma_default.booking.findMany({
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
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// src/modules/tutors/tutor.route.ts
var router6 = Router5();
router6.post("/profile", handleCreateOrUpdateProfile);
router6.get("/profile/:userId", handleGetTutorProfileByUserId);
router6.post("/availability", handleAddAvailability);
router6.get("/", handleGetAllTutors);
router6.get("/dashboard", authMiddleware, roleMiddleware("TUTOR"), getTutorDashboard);
var tutor_route_default = router6;

// src/modules/users/user.route.ts
import { Router as Router6 } from "express";

// src/utils/hash.ts
import bcrypt2 from "bcrypt";
var hashPassword = (password) => bcrypt2.hash(password, 10);
var comparePassword = (password, hash) => bcrypt2.compare(password, hash);

// src/modules/users/user.service.ts
var createUser = async (name, email, password, role) => {
  const hashedPassword = await hashPassword(password);
  const user = await prisma_default.user.create({
    data: {
      name,
      email,
      password: hashedPassword,
      role
    }
  });
  return user;
};
var findUserByEmail = async (email) => {
  return await prisma_default.user.findUnique({ where: { email } });
};

// src/utils/jwt.ts
import jwt3 from "jsonwebtoken";
var JWT_SECRET2 = process.env.JWT_SECRET;
var signToken = (payload) => jwt3.sign(payload, JWT_SECRET2, { expiresIn: "7d" });

// src/modules/users/user.validation.ts
import { z as z3 } from "zod";
var registerSchema = z3.object({
  name: z3.string().min(2, "Name must be at least 2 characters"),
  email: z3.string().email("Invalid email"),
  password: z3.string().min(6, "Password must be at least 6 characters")
});
var loginSchema = z3.object({
  email: z3.string().email("Invalid email"),
  password: z3.string().min(6, "Password must be at least 6 characters")
});

// src/modules/users/user.controller.ts
var registerUser2 = async (req, res) => {
  try {
    const parsed = registerSchema.parse(req.body);
    const existingUser = await findUserByEmail(parsed.email);
    if (existingUser) return res.status(400).json({ message: "User already exists" });
    const user = await createUser(parsed.name, parsed.email, parsed.password, "STUDENT");
    const token = signToken({ id: user.id, role: user.role });
    res.status(201).json({ user, token });
  } catch (err) {
    res.status(400).json({ message: err.message || "Registration failed" });
  }
};
var loginUser2 = async (req, res) => {
  try {
    const parsed = loginSchema.parse(req.body);
    const user = await findUserByEmail(parsed.email);
    if (!user) return res.status(404).json({ message: "User not found" });
    const isValid = await comparePassword(parsed.password, user.password);
    if (!isValid) return res.status(401).json({ message: "Invalid credentials" });
    const token = signToken({ id: user.id, role: user.role });
    res.json({ user, token });
  } catch (err) {
    res.status(400).json({ message: err.message || "Login failed" });
  }
};
var getMe2 = async (req, res) => {
  const user = req.user;
  res.json({ user });
};
var getStudentDashboard = async (req, res) => {
  try {
    if (!req.user) return res.status(401).json({ message: "Unauthorized" });
    const studentId = req.user.id;
    const bookings = await prisma_default.booking.findMany({
      where: { studentId },
      include: {
        tutor: {
          select: {
            user: {
              select: { id: true, name: true, email: true }
            }
          }
        }
      },
      orderBy: { createdAt: "desc" }
    });
    res.json({ success: true, data: { bookings } });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
var getMyProfile = async (req, res) => {
  try {
    if (!req.user) return res.status(401).json({ message: "Unauthorized" });
    const user = await prisma_default.user.findUnique({
      where: { id: req.user.id },
      select: { id: true, name: true, email: true, role: true }
    });
    res.json({ success: true, data: user });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
var updateProfile = async (req, res) => {
  try {
    if (!req.user) return res.status(401).json({ message: "Unauthorized" });
    const { name, email } = req.body;
    const updatedUser = await prisma_default.user.update({
      where: { id: req.user.id },
      data: { name, email },
      select: { id: true, name: true, email: true, role: true }
    });
    res.json({ success: true, data: updatedUser });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// src/modules/users/user.route.ts
var router7 = Router6();
router7.post("/register", registerUser2);
router7.post("/login", loginUser2);
router7.get("/me", authMiddleware, getMe2);
router7.get("/dashboard", authMiddleware, getStudentDashboard);
router7.get("/profile", authMiddleware, getMyProfile);
router7.put("/update-profile", authMiddleware, updateProfile);
var user_route_default = router7;

// src/modules/dashboard/dashboard.routes.ts
import { Router as Router7 } from "express";
var router8 = Router7();
router8.get("/student", authMiddleware, studentDashboard);
router8.get("/tutor", authMiddleware, roleMiddleware("TUTOR"), getTutorDashboard);
router8.get("/admin", authMiddleware, roleMiddleware("ADMIN"), adminDashboard);
var dashboard_routes_default = router8;

// src/routes/index.ts
var router9 = Router8();
router9.use("/auth", auth_route_default);
router9.use("/categories", category_route_default);
router9.use("/tutors", tutor_route_default);
router9.use("/reviews", review_route_default);
router9.use("/bookings", booking_route_default);
router9.use("/users", user_route_default);
router9.use("/admin", admin_route_default);
router9.use("/dashboard", dashboard_routes_default);
var routes_default = router9;

// src/middlewares/error.middleware.ts
var errorMiddleware = (err, _req, res, _next) => {
  console.error(err);
  res.status(500).json({
    success: false,
    message: err.message || "Internal Server Error"
  });
};
var error_middleware_default = errorMiddleware;

// src/app.ts
var app = express2();
app.use(helmet());
app.use(cors({
  origin: process.env.FRONTEND_URL || "*"
}));
app.use(express2.json());
app.use(express2.urlencoded({ extended: true }));
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}
app.get("/", (_req, res) => {
  res.send("SkillBridge API Running \u{1F680}");
});
app.get("/favicon.ico", (_req, res) => res.status(204).end());
app.use("/api", routes_default);
app.use((_req, _res, next) => {
  const error = new Error("Route not found");
  error.status = 404;
  next(error);
});
app.use(error_middleware_default);
var app_default = app;

export {
  prisma_default,
  app_default
};
//# sourceMappingURL=chunk-3GBCYPDC.js.map
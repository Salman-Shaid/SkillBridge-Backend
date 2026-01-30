import prisma from "../../lib/prisma";

export const createOrUpdateProfile = async (
  userId: string,
  bio: string,
  pricePerHour: number,
  categoryIds: string[]
) => {
  const existingProfile = await prisma.tutorProfile.findUnique({
    where: { userId },
  });

  if (existingProfile) {
    return prisma.tutorProfile.update({
      where: { userId },
      data: {
        bio,
        pricePerHour,
        categories: {
          set: categoryIds.map((id) => ({ id })), 
        },
      },
      include: {
        user: true,
        categories: true,
        availability: true,
        bookings: true,
        reviews: true,
      },
    });
  }

  return prisma.tutorProfile.create({
    data: {
      userId,
      bio,
      pricePerHour,
      categories: {
        connect: categoryIds.map((id) => ({ id })),
      },
    },
    include: {
      user: true,
      categories: true,
      availability: true,
      bookings: true,
      reviews: true,
    },
  });
};


export const getTutorProfileByUserId = async (userId: string) => {
  return prisma.tutorProfile.findUnique({
    where: { userId },
    include: {
      user: true,
      categories: true,
      availability: true,
      bookings: true,
      reviews: true,
    },
  });
};

export const addAvailability = async (
  tutorId: string,
  date: string,
  startTime: string,
  endTime: string
) => {
  return await prisma.availability.create({
    data: {
      tutorId,
      date: new Date(date),
      startTime: new Date(startTime),
      endTime: new Date(endTime),
    },
  });
};

export const getAllTutors = async () => {
  return prisma.tutorProfile.findMany({
    include: {
      user: true,
      categories: true,
      availability: true,
      bookings: true,
      reviews: true,
    },
  });
};

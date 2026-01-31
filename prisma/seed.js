import prisma from "../src/lib/prisma";
async function main() {
    const student = await prisma.user.create({
        data: {
            name: "Student One",
            email: "student@example.com",
            password: "password123",
            role: "STUDENT",
        },
    });
    const tutor = await prisma.user.create({
        data: {
            name: "Tutor One",
            email: "tutor@example.com",
            password: "password123",
            role: "TUTOR",
        },
    });
    const tutorProfile = await prisma.tutorProfile.create({
        data: {
            userId: tutor.id,
            bio: "I am a math tutor",
        },
    });
    await prisma.booking.create({
        data: {
            studentId: student.id,
            tutorId: tutorProfile.id,
            date: new Date("2026-02-01T10:00:00Z"),
        },
    });
    console.log("✅ Seed complete");
}
main()
    .catch((e) => {
    console.error(e);
    process.exit(1);
})
    .finally(async () => {
    await prisma.$disconnect();
});

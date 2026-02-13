// utils/mockInterviews.ts
import dayjs from "dayjs";
import { v4 as uuidv4 } from "uuid";

const techStacks = [
  ["JavaScript", "React", "Node.js"],
  ["Python", "Django", "PostgreSQL"],
  ["Java", "Spring Boot", "MySQL"],
  ["C#", ".NET", "SQL Server"],
  ["TypeScript", "Next.js", "MongoDB"],
];

const roles = [
  "Frontend Developer",
  "Backend Developer",
  "Full Stack Engineer",
  "DevOps Engineer",
  "Data Scientist",
];

const interviewTypes = ["Technical", "Behavioral", "System Design", "Mixed"];

const feedbackMessages = [
  "Strong technical skills but need to work on communication.",
  "Excellent problem-solving approach, well done!",
  "Good fundamentals but could improve on system design.",
  "Impressive depth of knowledge in your field.",
  "Would benefit from more concrete examples in responses.",
];

export const generateMockInterviews = (count: number) => {
  return Array.from({ length: count }, (_, i) => {
    console.log(`Generating interview ${i + 1} of ${count}`);

    const hasFeedback = Math.random() > 0.3; // 70% chance of having feedback
    const randomTechStack =
      techStacks[Math.floor(Math.random() * techStacks.length)];
    const randomDate = dayjs()
      .subtract(Math.floor(Math.random() * 30), "days")
      .toISOString();

    return {
      id: uuidv4(),
      userId: "user_" + uuidv4(),
      role: roles[Math.floor(Math.random() * roles.length)],
      type: interviewTypes[Math.floor(Math.random() * interviewTypes.length)],
      techstack: randomTechStack,
      createdAt: randomDate,
      ...(hasFeedback && {
        feedback: {
          id: uuidv4(),
          createdAt: randomDate,
          totalScore: Math.floor(Math.random() * 40) + 60, // Random score between 60-100
          finalAssessment:
            feedbackMessages[
              Math.floor(Math.random() * feedbackMessages.length)
            ],
        },
      }),
    };
  });
};

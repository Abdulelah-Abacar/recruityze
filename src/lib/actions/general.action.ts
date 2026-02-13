"use server";

import { feedbackSchema } from "@/constants";
import { PrismaClient } from "@prisma/client";
import { google } from "@ai-sdk/google";
import { generateObject } from "ai";

const prisma = new PrismaClient();

// general.action.ts

export async function createInterview(params: CreateInterviewParams) {
  try {
    const interview = await prisma.interview.create({
      data: {
        userId: params.userId,
        finalized: params.finalized,
        role: params.role,
        level: params.level,
        type: params.type,
        questions: params.questions,
        techstack: params.techstack,
      },
    });

    console.log("Interview created successfully:", interview.id);
    return interview;
  } catch (error) {
    console.error("Error creating interview:", error);
    return null;
  }
}

export async function updateInterview(
  interviewId: string,
  data: {
    finalized?: boolean;
    transcript?: any;
  },
) {
  try {
    const interview = await prisma.interview.update({
      where: {
        id: interviewId,
      },
      data: {
        finalized: data.finalized,
        // transcript: data.transcript,
        updatedAt: new Date(),
      },
    });

    console.log("Interview updated successfully:", interview.id);
    return interview;
  } catch (error) {
    console.error("Error updating interview:", error);
    return null;
  }
}

export async function getInterviewsByUserId(
  userId: string,
): Promise<Interview[] | null> {
  const interviews = await prisma.interview.findMany({
    where: {
      userId,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return interviews as Interview[];
}

export async function getLatestInterviews(
  params: GetLatestInterviewsParams,
): Promise<Interview[] | null> {
  const { userId, limit = 20 } = params;

  const interviews = await prisma.interview.findMany({
    where: {
      finalized: true,
      userId: {
        not: userId,
      },
    },
    orderBy: {
      createdAt: "desc",
    },
    take: limit,
  });

  return interviews as Interview[];
}

export async function getInterviewById(id: string): Promise<Interview | null> {
  const interview = await prisma.interview.findUnique({
    where: {
      id,
    },
  });

  return interview as Interview | null;
}

export async function createFeedback(params: CreateFeedbackParams) {
  const { interviewId, userId, transcript } = params;

  try {
    const formattedTranscript = transcript
      .map(
        (sentence: { role: string; content: string }) =>
          `- ${sentence.role}: ${sentence.content}\n`,
      )
      .join("");

    const { object } = await generateObject({
      model: google("gemini-2.5-flash-lite", {
        structuredOutputs: false,
      }),
      schema: feedbackSchema,
      prompt: `
      You are an AI interviewer analyzing a mock interview. Your task is to evaluate the candidate based on structured categories. Be thorough and detailed in your analysis. Don't be lenient with the candidate. If there are mistakes or areas for improvement, point them out.
      Transcript:
      ${formattedTranscript}

      Please score the candidate from 0 to 100 in the following areas. Do not add categories other than the ones provided:
      - **Communication Skills**: Clarity, articulation, structured responses.
      - **Technical Knowledge**: Understanding of key concepts for the role.
      - **Problem-Solving**: Ability to analyze problems and propose solutions.
      - **Cultural & Role Fit**: Alignment with company values and job role.
      - **Confidence & Clarity**: Confidence in responses, engagement, and clarity.
      `,
      system:
        "You are a professional interviewer analyzing a mock interview. Your task is to evaluate the candidate based on structured categories",
    });

    console.log("Generated feedback object:", object);

    const feedback = await prisma.feedback.create({
      data: {
        interviewId,
        userId,
        totalScore: object.totalScore,
        categoryScores: object.categoryScores, // Stored as JSON
        strengths: object.strengths,
        areasForImprovement: object.areasForImprovement,
        finalAssessment: object.finalAssessment,
      },
    });

    console.log("Feedback created successfully:", feedback.id);

    return { success: true, feedbackId: feedback.id };
  } catch (error) {
    console.error("Error creating feedback:", error);
    return { success: false };
  }
}

export async function getFeedbackByInterviewId(
  params: GetFeedbackByInterviewIdParams,
): Promise<Feedback | null> {
  const { interviewId, userId } = params;

  const feedback = await prisma.feedback.findFirst({
    where: {
      interviewId,
      userId,
    },
  });

  return feedback as Feedback | null;
}

'use server';

import prisma from '@/lib/prisma';
import { Prisma } from '@prisma/client';

interface CreateFeedbackResponse {
  success: boolean;
  data?: Prisma.FeedbackGetPayload<{}>;
}

export async function createFeedback(
  data: Prisma.FeedbackCreateInput
): Promise<CreateFeedbackResponse> {
  try {
    const feedback = await prisma.feedback.create({
      data,
    });
    return {
      success: true,
      data: feedback,
    };
  } catch (error) {
    console.log(error);
    return {
      success: false,
    };
  }
}

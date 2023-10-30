'use server';

import { Prisma } from '@prisma/client';
import { getAuthUser } from './auth';
import prisma from './prisma';

export async function createProject(
  data: Omit<Prisma.ProjectCreateInput, 'user'>
) {
  const user = await getAuthUser();
  if (!user) {
    return {
      success: false,
      message: 'User not authenticated.',
    };
  }
  try {
    await prisma.project.create({
      data: {
        name: data.name,
        user: {
          connect: {
            // @ts-ignore
            id: user.id,
          },
        },
      },
    });
    return {
      success: true,
      message: 'Project created.',
    };
  } catch (error) {
    return {
      success: false,
      message: 'Project creation failed.',
    };
  }
}

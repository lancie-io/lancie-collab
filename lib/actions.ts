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
        members: {
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

export async function saveProject(id: string, content: string) {
  const user = await getAuthUser();
  if (!user) {
    return {
      success: false,
      message: 'User not authenticated.',
    };
  }
  try {
    await prisma.project.update({
      where: {
        id: id,
      },
      data: {
        content,
      },
    });
    return {
      success: true,
      message: 'Project saved.',
    };
  } catch (error) {
    return {
      success: false,
      message: 'Project creation failed.',
    };
  }
}

export async function getProjectUsers(id: string) {
  const user = await getAuthUser();
  if (!user) {
    return {
      success: false,
      message: 'User not authenticated.',
    };
  }
  try {
    const users = await prisma.project.findUnique({
      where: {
        id: id,
      },
      select: {
        members: true,
      },
    });
    return {
      success: true,
      message: 'Project users fetched.',
      data: users,
    };
  } catch (error) {
    return {
      success: false,
      message: 'Project users fetch failed.',
      data: null,
    };
  }
}

export async function updateProject(
  id: string,
  data: Prisma.ProjectUpdateInput
) {
  const user = await getAuthUser();
  if (!user) {
    return {
      success: false,
      message: 'User not authenticated.',
    };
  }
  try {
    const project = await prisma.project.update({
      where: {
        id: id,
      },
      data,
    });
    return {
      success: true,
      message: 'Project updated.',
      data: project,
    };
  } catch (error) {
    return {
      success: false,
      message: 'Project updated failed.',
    };
  }
}

export async function createComment(id: string, content: string) {
  const user = await getAuthUser();
  if (!user) {
    return {
      success: false,
      message: 'User not authenticated.',
    };
  }
  try {
    await prisma.comment.create({
      data: {
        content,
        user: {
          connect: {
            // @ts-ignore
            id: user.id,
          },
        },
        project: {
          connect: {
            id,
          },
        },
      },
    });
    return {
      success: true,
      message: 'Comment created.',
    };
  } catch (error) {
    return {
      success: false,
      message: 'Comment failed.',
    };
  }
}

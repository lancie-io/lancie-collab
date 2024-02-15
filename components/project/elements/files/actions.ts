'use server';

import { getAuthUser } from '@/lib/auth';
import prisma from '@/lib/prisma';
import { Prisma } from '@prisma/client';

export async function getFiles({ projectId }: { projectId?: string }) {
  if (!projectId) {
    return null;
  }
  try {
    const files = await prisma.file.findMany({
      where: {
        projectId,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
    return { data: files };
  } catch (error) {
    return { error: error };
  }
}

export async function addFile(
  file: Prisma.FileCreateInput,
  projectId?: string
): Promise<{ success: boolean; data: Prisma.FileGetPayload<{}> | null }> {
  try {
    const user = await getAuthUser();
    if (!user) {
      throw new Error('User not found');
    }
    if (!projectId) {
      throw new Error('Project ID is required');
    }
    const dbFile = await prisma.file.create({
      data: {
        name: file.name,
        url: file.url,
        size: file.size,
        project: {
          connect: {
            id: projectId,
          },
        },
        user: {
          connect: {
            id: user.id,
          },
        },
      },
    });
    return {
      success: true,
      data: dbFile,
    };
  } catch (error) {
    return {
      success: false,
      data: null,
    };
  }
}

export async function deleteFile(fileId: string) {
  try {
    const file = await prisma.file.delete({
      where: {
        id: fileId,
      },
    });
    return file;
  } catch (error) {
    return { error: error };
  }
}

'use server';

import { getAuthUser } from '@/lib/auth';
import prisma from '@/lib/prisma';
import { Prisma } from '@prisma/client';

export async function renameFile(fileId: string, newName: string) {
  try {
    const file = await prisma.file.update({
      where: {
        id: fileId,
      },
      data: {
        name: newName,
      },
    });
    return {
      success: true,
      data: file,
    };
  } catch (error) {
    return {
      success: false,
      data: null,
    };
  }
}

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
    return { files };
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
        type: file.type,
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

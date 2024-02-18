'use server';

import { Prisma } from '@prisma/client';
import { redirect } from 'next/navigation';
import { getAuthUser } from './auth';
import prisma from './prisma';
import { sendInviteEmail } from './sendgrid';

export async function getProjectTitle(id?: string) {
  const project = await prisma.project.findUnique({
    where: {
      id,
    },
    select: {
      name: true,
    },
  });
  return project?.name;
}

export async function getProjectCover(id?: string) {
  const project = await prisma.project.findUnique({
    where: {
      id,
    },
    select: {
      cover: true,
    },
  });
  return project?.cover;
}

export async function updateUser(data: Prisma.UserUpdateInput) {
  const user = await getAuthUser();
  if (!user) {
    return {
      success: false,
      message: 'User not authenticated.',
    };
  }
  try {
    await prisma.user.update({
      where: {
        id: user.id,
      },
      data,
    });
    return {
      success: true,
      message: 'User updated.',
    };
  } catch (error) {
    return {
      success: false,
      message: 'User update failed.',
    };
  }
}

export async function handleInvite(inviteId: string) {
  const user = await getAuthUser();
  const invite = await prisma.invite.findUnique({
    where: {
      id: inviteId,
    },
    include: {
      project: {
        select: {
          id: true,
        },
      },
    },
  });

  if (!user) {
    // const loginCallbackPath = `/login?callbackUrl=${encodeURIComponent(
    //   `/app/project/${invite?.project.id}`
    // )}`;
    redirect('/login');
  }
  redirect(`/app/project/${invite?.project.id}`);
}

interface InviteLinkResponse {
  success: boolean;
  message: string;
  data: any;
}
export async function generateInviteLink(
  projectId: string
): Promise<InviteLinkResponse> {
  const user = await getAuthUser();
  if (!user) {
    return {
      success: false,
      message: 'User not authenticated.',
      data: null,
    };
  }
  try {
    const invite = await prisma.invite.create({
      data: {
        fromUser: {
          connect: {
            id: user.id,
          },
        },
        project: {
          connect: {
            id: projectId,
          },
        },
      },
    });
    return {
      success: true,
      message: 'Invite link generated.',
      data: invite,
    };
  } catch (error) {
    return {
      success: false,
      message: 'Invite link generation failed.',
      data: null,
    };
  }
}

export async function createInvite({
  email,
  projectId,
}: {
  email: string;
  projectId: string;
}) {
  const user = await getAuthUser();

  if (!user) {
    return {
      success: false,
      message: 'User not authenticated.',
    };
  }

  try {
    const project = await prisma.project.findUnique({
      where: {
        id: projectId,
      },
      select: {
        members: true,
        name: true,
      },
    });
    if (!project) {
      throw new Error('Project not found.');
    }
    const isMemberOfProject = project.members.some(
      (member) => member.email === email
    );
    if (isMemberOfProject) {
      return {
        success: false,
        message: 'User is already a member of the project.',
      };
    }

    const dbInvite = await prisma.invite.findFirst({
      where: {
        toEmail: email,
        projectId,
      },
    });

    if (dbInvite) {
      return {
        success: false,
        message: 'User is already invited.',
      };
    }

    const signedUpUser = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (signedUpUser) {
      await prisma.project.update({
        where: {
          id: projectId,
        },
        data: {
          members: {
            connect: {
              email: email,
            },
          },
        },
      });
    }

    const invite = await prisma.invite.create({
      data: {
        fromUser: {
          connect: {
            id: user.id,
          },
        },
        toEmail: email,
        project: {
          connect: {
            id: projectId,
          },
        },
      },
    });

    const sendgridProjectData = {
      projectName: project.name,
      senderName: user.name,
      recipientName: signedUpUser?.name,
      inviteId: invite.id,
      domain: process.env.NEXT_PUBLIC_HOST_URL,
    };

    console.log('email and data:', email, sendgridProjectData);
    //TBD: send email to user
    sendInviteEmail(email, sendgridProjectData);
    return {
      success: true,
      message: 'User added to project.',
    };
  } catch (error) {
    return {
      success: false,
      message: 'Invite failed',
    };
  }
}

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

export async function deleteProject(id: string) {
  const user = await getAuthUser();
  if (!user) {
    return {
      success: false,
      message: 'User not authenticated.',
    };
  }
  try {
    await prisma.project.delete({
      where: {
        id: id,
      },
    });
    return {
      success: true,
      message: 'Project deleted.',
    };
  } catch (error) {
    return {
      success: false,
      message: 'Project deletion failed.',
    };
  }
}

export async function saveProject(id: string, content: string) {
  console.log('save executed');
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

export async function getLiveBlockUsersByUserIDs(userIds: string[]) {
  const users = await prisma.user.findMany({
    where: {
      id: {
        in: userIds,
      },
    },
    select: {
      id: true,
      name: true,
      image: true,
    },
  });
  return [...users];
}

export async function getLiveBlockUsersByProjectID(id: string) {
  const project = await prisma.project.findUnique({
    where: {
      id: id,
    },
    select: {
      members: true,
    },
  });
  if (!project) {
    return [];
  }
  return [...project.members];
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

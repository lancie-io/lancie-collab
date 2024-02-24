import Container from '@/components/shared/Container';
import { Icons } from '@/components/shared/Icons';
import { buttonVariants } from '@/components/ui/button';
import { getAuthUser } from '@/lib/auth';
import prisma from '@/lib/prisma';
import Link from 'next/link';
import { notFound, redirect } from 'next/navigation';

const InvitePage = async ({
  params,
  searchParams,
}: {
  params: { id: string };
  searchParams?: { project?: string };
}) => {
  const invite = await prisma.invite.findUnique({
    where: {
      id: params.id,
    },
    include: {
      project: true,
      fromUser: true,
    },
  });
  if (!invite) {
    notFound();
  }

  const user = await getAuthUser();

  let nextHref = '';
  if (user) {
    await prisma.project.update({
      where: {
        id: invite.project.id,
      },
      data: {
        members: {
          connect: {
            id: user.id,
          },
        },
      },
    });
    nextHref = `/app/project/${invite?.project.id}`;
    if (searchParams?.project) {
      redirect(`/app/project/${searchParams.project}`);
    }
  } else {
    nextHref = `/login?callbackUrl=${encodeURIComponent(
      `/invite/${invite.id}?project=${invite.project.id}`
    )}`;
  }

  return (
    <Container className="grow flex flex-col items-center justify-center gap-8 md:gap-12">
      <Link href="/" className="w-20 absolute top-8">
        <Icons.logoText />
      </Link>
      <Icons.inviteLancieMail className="w-24 md:w-40" />
      <div className="space-y-2">
        <h1 className="font-normal text-center text-lg md:text-xl">
          {invite?.fromUser.name} <br />
          invited you to the project:
        </h1>
        <h2 className="font-semibold text-center text-3xl md:text-5xl">
          {invite.project.name}
        </h2>
      </div>

      <Link
        href={nextHref}
        className={buttonVariants({ variant: 'primary', size: 'mega' })}
      >
        Join now
      </Link>
    </Container>
  );
};

export default InvitePage;

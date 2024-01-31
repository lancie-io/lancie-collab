import { getAuthUser } from '@/lib/auth';
import Link from 'next/link';
import { Button, buttonVariants } from '../ui/button';

interface AccessButtonsProps {
  projectId: string;
}

const AccessButtons = async ({ projectId }: AccessButtonsProps) => {
  const user = await getAuthUser();
  if (!user) {
    return (
      <Button variant="outline" size="sm">
        Log In
      </Button>
    );
  }

  if (user.projects.includes(projectId)) {
    return (
      <Link
        className={buttonVariants({ variant: 'outline', size: 'sm' })}
        href={`${process.env.NEXT_PUBLIC_HOST_URL}/app/project/${projectId}`}
      >
        Edit
      </Link>
    );
  }
  return (
    <Button variant="outline" size="sm">
      Request Edit Access
    </Button>
  );
};

export default AccessButtons;

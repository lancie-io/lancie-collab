import { getAuthUser } from '@/lib/auth';
import { Home } from 'lucide-react';
import Link from 'next/link';

const HomeLink = async () => {
  const user = await getAuthUser();
  return (
    <Link
      href={`/app/${user?.id}`}
      className="transition duration-150 border-r h-full grid place-items-center relative -left-3 md:-left-4 px-3 md:px-4 group hover:bg-accent -mr-3 md:-mr-4"
    >
      <Home className="w-5 h-5" />
    </Link>
  );
};

export default HomeLink;

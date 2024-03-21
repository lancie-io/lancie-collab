import { getAuthUser } from '@/lib/auth';
import { redirect } from 'next/navigation';

const AppPage = async ({
  params,
  searchParams,
}: {
  params: { slug: string };
  searchParams?: string[][];
}) => {
  const user = await getAuthUser();
  console.log('SP:', searchParams);
  if (!user) {
    redirect('/');
  }

  const newSP = new URLSearchParams(searchParams);
  const spString = newSP && `?${newSP.toString()}`;
  redirect(`/app/${user.id}${spString}`);
};

export default AppPage;

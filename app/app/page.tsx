import { getAuthUser } from '@/lib/auth';
import { redirect } from 'next/navigation';

const AppPage = async () => {
  const user = await getAuthUser();
  if (!user) {
    redirect('/');
  }
  //   @ts-ignore
  redirect(`/app/${user.id}`);
};

export default AppPage;

import { getAuthUser } from '@/lib/auth';
import prisma from '@/lib/prisma';
import NotificationSettingsForm from './NotificationSettingsForm';

const NotificationSettings = async () => {
  const user = await getAuthUser();
  const userData = await prisma.user.findUnique({
    where: {
      id: user?.id,
    },
    select: {
      id: true,
      receiveComments: true,
      receiveMarketing: true,
    },
  });
  return <NotificationSettingsForm userData={userData} />;
};

export default NotificationSettings;

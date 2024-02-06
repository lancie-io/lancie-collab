import prisma from '@/lib/prisma';
import Notifications from './Notifications';

const NotificationsTab = async ({ userId }: { userId?: string }) => {
  const userData = await prisma.user.findUnique({
    where: {
      id: userId,
    },
    select: {
      id: true,
      receiveComments: true,
      receiveMarketing: true,
    },
  });
  return (
    <div>
      <Notifications userData={userData} />
    </div>
  );
};

export default NotificationsTab;

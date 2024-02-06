import UserLayout from '@/components/layout/UserLayout';
import GeneralSettings from '@/components/settings/GeneralSettings';
import NotificationsTab from '@/components/settings/NotificationsTab';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { getAuthUser } from '@/lib/auth';
import prisma from '@/lib/prisma';

const SettingsPage = async () => {
  const user = await getAuthUser();
  const userData = await prisma.user.findUnique({
    where: {
      id: user?.id,
    },
  });
  return (
    <UserLayout title="Settings" page="/settings">
      <Tabs defaultValue="general">
        <TabsList className="grid grid-cols-2 w-[240px]">
          <TabsTrigger value="general">General</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
        </TabsList>
        <TabsContent value="general">
          <GeneralSettings user={userData} />
        </TabsContent>
        <TabsContent value="notifications">
          <NotificationsTab userId={user?.id} />
        </TabsContent>
      </Tabs>
    </UserLayout>
  );
};

export default SettingsPage;

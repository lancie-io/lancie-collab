import UserLayout from '@/components/layout/UserLayout';
import GeneralSettings from '@/components/settings/GeneralSettings';
import LoadingSettings from '@/components/settings/LoadingSettings';
import NotificationSettings from '@/components/settings/NotificationSettings';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Suspense } from 'react';

const SettingsPage = () => {
  return (
    <UserLayout title="Settings">
      <Tabs defaultValue="general">
        <TabsList className="grid grid-cols-2 w-[240px]">
          <TabsTrigger value="general">General</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
        </TabsList>
        <TabsContent value="general" className="mt-8">
          <Suspense fallback={<LoadingSettings />}>
            <GeneralSettings />
          </Suspense>
        </TabsContent>
        <TabsContent value="notifications" className="mt-8">
          <Suspense fallback={<LoadingSettings />}>
            <NotificationSettings />
          </Suspense>
        </TabsContent>
      </Tabs>
    </UserLayout>
  );
};

export default SettingsPage;

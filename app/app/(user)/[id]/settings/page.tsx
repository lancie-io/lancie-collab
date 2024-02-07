import UserLayout from '@/components/layout/UserLayout';
import GeneralSettings from '@/components/settings/GeneralSettings';
import NotificationSettings from '@/components/settings/NotificationSettings';
import { Skeleton } from '@/components/ui/skeleton';
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

export const LoadingSettings = () => {
  return (
    <div className="flex flex-col md:flex-row gap-8">
      <Skeleton className="w-48 h-48 rounded-full" />
      <div className="space-y-4">
        <div className="space-y-2">
          <Skeleton className="w-32 h-4" />
          <Skeleton className="w-64 h-10" />
        </div>
        <div className="space-y-2">
          <Skeleton className="w-32 h-4" />
          <Skeleton className="w-64 h-10" />
        </div>
      </div>
    </div>
  );
};

import React from 'react';
import Title from '../shared/Title';
import { MobileAppSidebar } from './AppSidebar';

interface UserLayoutProps {
  title: string;
  children: React.ReactNode;
  cta?: React.ReactNode;
  page: '/' | '/settings';
}

const UserLayout = ({ title, children, cta, page }: UserLayoutProps) => {
  return (
    <div className="space-y-8">
      <div className="flex items-center md:items-end justify-between">
        <MobileAppSidebar />
        <Title className="mr-auto text-lg md:text-2xl">{title}</Title>
        {cta}
      </div>
      {children}
    </div>
  );
};

export default UserLayout;

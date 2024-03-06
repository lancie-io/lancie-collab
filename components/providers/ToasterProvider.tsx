'use client';
import { Toaster as SonnerToaster } from '@/components/ui/sonner';
import { getLocalStorage } from '@/lib/hooks/useLocalStorage';
import colors from '@/resolveConfig';
import React from 'react';
import { Toaster } from 'react-hot-toast';

const ToasterProvider = ({ children }: { children: React.ReactNode }) => {
  const showTrackingEventToast = getLocalStorage('show-tracking-event-toast');
  return (
    <>
      {children}
      <SonnerToaster
        position={showTrackingEventToast ? 'bottom-right' : 'top-center'}
        theme="dark"
        expand={true}
      />
      <Toaster
        toastOptions={{
          // Define default options
          position: 'top-center',
          duration: 3000,
          style: {
            padding: '12px 12px 12px 12px',
            backgroundColor: colors.slate[800],
            color: colors.slate[50],
          },
          iconTheme: {
            primary: colors.slate[50],
            secondary: colors.slate[950],
          },

          success: {
            style: {
              backgroundColor: colors.green[600],
            },
            iconTheme: {
              primary: colors.slate[50],
              secondary: colors.green[600],
            },
          },

          error: {
            style: {
              backgroundColor: colors.red[600],
            },
            iconTheme: {
              primary: colors.slate[50],
              secondary: colors.red[600],
            },
          },
        }}
      />
    </>
  );
};

export default ToasterProvider;

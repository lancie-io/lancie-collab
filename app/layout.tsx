import AuthProvider from '@/components/providers/AuthProvider';
import { ModalProvider } from '@/components/shared/modal';
import { inter } from '@/lib/fonts';
import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Lancie Collab',
  description: 'The fastest path to production.',
};

export default function RootLayout({
  children,
  modal,
}: {
  children: React.ReactNode;
  modal?: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.className}`}>
        <main className="flex min-h-screen flex-col">
          <AuthProvider>
            <ModalProvider>
              {children}
              {modal}
            </ModalProvider>
          </AuthProvider>
        </main>
      </body>
    </html>
  );
}

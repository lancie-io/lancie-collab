import AuthProvider from '@/components/providers/AuthProvider';
import QueryProvider from '@/components/providers/QueryProvider';
import ToasterProvider from '@/components/providers/ToasterProvider';
import { ModalProvider } from '@/components/shared/modal';
import { inter } from '@/lib/fonts';
import '@liveblocks/react-comments/styles.css';
import '@liveblocks/react-comments/styles/dark/attributes.css';
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
    <html lang="en" className="dark">
      <body className={`${inter.className}`}>
        <main className="flex min-h-screen flex-col">
          <AuthProvider>
            <ToasterProvider>
              <QueryProvider>
                <ModalProvider>
                  {children}
                  {modal}
                </ModalProvider>
              </QueryProvider>
            </ToasterProvider>
          </AuthProvider>
        </main>
      </body>
    </html>
  );
}

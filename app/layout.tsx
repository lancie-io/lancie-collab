import AnimatedCursorShowHandler from '@/components/AnimatedCursorShowHandler';
import AuthProvider from '@/components/providers/AuthProvider';
import LoadingProvider from '@/components/providers/LoadingProvider';
import QueryProvider from '@/components/providers/QueryProvider';
import ToasterProvider from '@/components/providers/ToasterProvider';
import { ModalProvider } from '@/components/shared/modal';
import { EdgeStoreProvider } from '@/lib/edgestore';
import { inter } from '@/lib/fonts';
import '@liveblocks/react-comments/styles.css';
import '@liveblocks/react-comments/styles/dark/attributes.css';
import type { Metadata } from 'next';
import '../styles/animate.css';
import '../styles/custom.css';
import '../styles/globals.css';
import '../styles/liveblocks.css';
import '../styles/prose.css';

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
    <html lang="en" className="dark no-scrollbar">
      <body className={`${inter.className}`}>
        <main className="flex min-h-screen flex-col">
          <AuthProvider>
            <ToasterProvider>
              <EdgeStoreProvider>
                <QueryProvider>
                  <ModalProvider>
                    <LoadingProvider>
                      {children}
                      {modal}
                      <AnimatedCursorShowHandler />
                    </LoadingProvider>
                  </ModalProvider>
                </QueryProvider>
              </EdgeStoreProvider>
            </ToasterProvider>
          </AuthProvider>
        </main>
      </body>
    </html>
  );
}

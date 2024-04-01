import AnimatedCursorShowHandler from '@/components/AnimatedCursorShowHandler';
import PathWatcher from '@/components/PathWatcher';
import Analytics from '@/components/providers/Analytics';
import AuthProvider from '@/components/providers/AuthProvider';
import LoadingProvider from '@/components/providers/LoadingProvider';
import QueryProvider from '@/components/providers/QueryProvider';
import ToasterProvider from '@/components/providers/ToasterProvider';
import ErrorBoundary from '@/components/shared/ErrorBoundary';
import { ModalProvider } from '@/components/shared/modal';
import { EdgeStoreProvider } from '@/lib/edgestore';
import { inter } from '@/lib/fonts';
import '@liveblocks/react-comments/styles.css';
import '@liveblocks/react-comments/styles/dark/attributes.css';
import type { Metadata } from 'next';
import Head from 'next/head';
import '../styles/animate.css';
import '../styles/custom.css';
import '../styles/globals.css';
import '../styles/liveblocks.css';
import '../styles/prose.css';

export const metadata: Metadata = {
  title: 'Lancie - Video pre-production made easy',
  description:
    'Collaborative video pre-production tool for creators and teams. Create stunning visuals and drive real results.',
};

// export const viewport: Viewport = {
//   width: 'device-width',
//   initialScale: 1,
//   maximumScale: 1,
//   userScalable: false,
//   // Also supported by less commonly used
//   // interactiveWidget: 'resizes-visual',
// };

export default function RootLayout({
  children,
  modal,
}: {
  children: React.ReactNode;
  modal?: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark no-scrollbar">
      <Head>
        <meta
          property="twitter:title"
          content="Lancie - Video pre-production made easy"
        />
        <meta
          property="twitter:description"
          content="Collaborative video pre-production tool for creators and production teams. Create stunning visuals and drive real results."
        />
      </Head>
      <body className={`${inter.className}`}>
        <main className="flex min-h-screen flex-col">
          <ErrorBoundary type="App Error">
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
              <PathWatcher />
            </AuthProvider>
          </ErrorBoundary>
        </main>
      </body>
      <Analytics />
    </html>
  );
}

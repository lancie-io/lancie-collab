import { PrismaAdapter } from '@auth/prisma-adapter';
import { NextAuthOptions, getServerSession } from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import { useSession } from 'next-auth/react';
import { sendSignIn } from './make';
import prisma from './prisma';
import { sendMagicLinkEmail } from './sendgrid';

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  session: {
    strategy: 'jwt',
  },
  pages: {
    signIn: '/login',
    verifyRequest: '/verify',
    error: '/error',
  },
  providers: [
    GoogleProvider({
      clientId: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID!,
      clientSecret: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_SECRET!,
    }),
    {
      id: 'email',
      type: 'email',
      name: 'Email',
      from: 'contact@lancie.com',
      server: {},
      maxAge: 24 * 60 * 60,
      options: {},
      async sendVerificationRequest({ identifier: email, url }) {
        console.log('emaildata', { identifier: email, url });
        sendMagicLinkEmail(email, url);
      },
    },
  ],
  callbacks: {
    async signIn({ user, account, profile }) {
      const result = await prisma.user.findUnique({
        where: {
          email: user.email as string,
        },
      });
      let newUser = true;
      if (result) {
        newUser = false;
      }

      const makeUserData = {
        name: user.name,
        email: user.email,
        image: user.image,
        provider: account?.provider,
        locale: profile?.locale,
        new: newUser,
      };
      if (!result?.isInternal) {
        sendSignIn(makeUserData);
      }
      return true;
    },
    async session({ token, session }) {
      if (token) {
        session.user.id = token.id;
        session.user.name = token.name;
        session.user.email = token.email;
        session.user.image = token.image;
        session.user.projects = token.projects;
        session.user.memberProjects = token.memberProjects;
        session.user.hasSeenWelcomeModal = token.hasSeenWelcomeModal;
      }
      return session;
    },

    async jwt({ token, user }: any) {
      console.log('USER: ', user);
      let dbUser;
      dbUser = await prisma.user.findFirst({
        where: {
          email: token.email,
        },
        include: {
          projects: {
            select: {
              id: true,
            },
          },
          memberProjects: {
            select: {
              id: true,
            },
          },
        },
      });

      console.log('TOKEN: ', token);
      if (!dbUser) {
        return token;
      }

      return {
        id: dbUser.id,
        name: dbUser.name || 'Fellow Creator',
        email: dbUser.email,
        image: dbUser.image,
        projects: dbUser.projects.map((project) => project.id),
        memberProjects: dbUser.memberProjects.map((project) => project.id),
        hasSeenWelcomeModal: dbUser.hasSeenWelcomeModal,
      };
    },

    async redirect({ url, baseUrl }) {
      if (url.startsWith('/')) return `${baseUrl}${url}`;
      else if (new URL(url).origin === baseUrl) return url;
      return baseUrl;
    },
  },
  secret: process.env.NEXTAUTH_SECRET!,
};

export const getAuthSession = () => getServerSession(authOptions);

export const getAuthUser = async () => {
  const session = await getAuthSession();
  return session?.user;
};

export const useAuthUser = () => {
  const session = useSession();
  return session?.data?.user;
};

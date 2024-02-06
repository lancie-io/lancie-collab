import { DefaultSession } from 'next-auth';

declare module 'next-auth' {
  interface Session {
    user: {
      id: string;
      projects: string[];
    } & DefaultSession['user'];
  }

  interface Profile {
    locale?: string;
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    /** This is an example. You can find me in types/next-auth.d.ts */
    id: string;
    image: string;
    projects: string[];
  }
}

import { getAuthUser } from '@/lib/auth';
import { Liveblocks } from '@liveblocks/node';

const liveblocks = new Liveblocks({
  secret: process.env.LIVEBLOCKS_SECRET_KEY!,
});

export async function POST(request: Request) {
  // Get the current user from your database
  const user = await getAuthUser();
  // if (!user) {
  //   return new Response('Unauthorized', { status: 401 });
  // }

  // Start an auth session inside your endpoint
  const session = liveblocks.prepareSession(
    user?.id || 'anonymous',
    {
      userInfo: {
        name: (user?.name || 'Anonymous') as string | undefined,
        avatar: user?.image as string | undefined,
        color: '#ff0000',
      },
    } // Optional
  );

  // Implement your own security, and give the user access to the room
  const { room } = await request.json();
  if (room) {
    session.allow(room, session.FULL_ACCESS);
  }

  // Authorize the user and return the result
  const { status, body } = await session.authorize();
  return new Response(body, { status });
}

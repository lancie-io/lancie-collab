import prisma from '@/lib/prisma';
import { WebhookHandler } from '@liveblocks/node';

const WEBHOOK_SECRET = process.env.LIVEBLOCKS_STORAGE_WEBHOOK_SECRET!;
const webhookHandler = new WebhookHandler(WEBHOOK_SECRET);

const ACCEPTED_EVENTS = [
  'storageUpdated',
  'threadCreated',
  'commentCreated',
  'ydocUpdated',
  'commentEdited',
];

export async function POST(request: Request) {
  const body = await request.json();
  const headers = request.headers;
  console.log('Body: ', body);
  let event;
  try {
    event = webhookHandler.verifyRequest({
      headers: headers,
      rawBody: JSON.stringify(body),
    });
  } catch (error) {
    console.error('Webhook verification failed', error);
    return new Response('Could not verify webhook call.', { status: 400 });
  }

  if (!ACCEPTED_EVENTS.includes(event.type)) {
    return new Response('Event not accepted.', { status: 400 });
  }
  const { roomId } = event.data;

  let projectId = roomId;
  if (event.type === 'ydocUpdated') {
    projectId = roomId.split('-')[0];
  }

  try {
    const p = await prisma.project.update({
      where: {
        id: projectId,
      },
      data: {
        updatedAt: new Date(),
      },
    });
    console.log('p:', p);
  } catch (err) {
    return new Response('Problem inserting data into database', {
      status: 500,
    });
  }

  return new Response(null, { status: 200 });
}

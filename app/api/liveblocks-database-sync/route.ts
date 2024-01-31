export async function POST(request: Request) {
  const body = await request.json();
  const headers = request.headers;

  // Handle webhooks and notifications
  // ...

  return new Response(null, { status: 200 });
}

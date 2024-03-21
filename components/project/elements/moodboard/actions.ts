'use server';
export async function triggerUnsplashDownloadLink(downloadLocation: string) {
  const res = await fetch(downloadLocation, {
    headers: {
      Authorization: `Client-ID ${process.env.NEXT_PUBLIC_UNSPLASH_ACCESS_KEY}`,
    },
  });
  if (res.ok) {
    return {
      success: true,
      data: await res.json(),
    };
  } else {
    return {
      success: false,
      error: await res.json(),
    };
  }
}

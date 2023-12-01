'use server';

export type UnsplashPhoto = {
  id: string;
  created_at: string;
  width: number;
  height: number;
  color: string;
  blur_hash: string;
  description: string;
  alt_description: string;
  likes: number;
  liked_by_user: boolean;
  urls: {
    raw: string;
    full: string;
    regular: string;
    small: string;
    thumb: string;
    small_s3: string;
  };
  links: {
    self: string;
    html: string;
    download: string;
    download_location: string;
  };
};

interface UnsplashParams {
  query: string;
  page?: number;
  per_page?: number;
  // Add other optional parameters as needed
}

type UnsplashResponse = UnsplashPhoto[];

const UNSPLASH_API_URL = 'https://api.unsplash.com';

export async function fetchUnsplash(
  params: UnsplashParams
): Promise<UnsplashResponse> {
  const queryParams = params
    ? new URLSearchParams(params as any).toString()
    : '';
  const queryString = queryParams ? `?${queryParams}` : '';
  const fetchUrl = `${UNSPLASH_API_URL}/photos${queryString}`;
  console.log('URL: ', fetchUrl);
  const res = await fetch(fetchUrl, {
    headers: {
      Authorization: `Client-ID ${process.env.UNSPLASH_ACCESS_KEY}`,
    },
  });
  return res.json();
}

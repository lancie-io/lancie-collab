'use server';

export type UnsplashUserProfile = {
  id: string;
  updated_at: string;
  username: string;
  name: string;
  first_name: string;
  last_name: string;
  twitter_username: string | null;
  portfolio_url: string;
  bio: string;
  location: string;
  links: {
    self: string;
    html: string;
    photos: string;
    likes: string;
    portfolio: string;
    following: string;
    followers: string;
  };
  profile_image: {
    small: string;
    medium: string;
    large: string;
  };
  instagram_username: string;
  total_collections: number;
  total_likes: number;
  total_photos: number;
  total_promoted_photos: number;
  accepted_tos: boolean;
  for_hire: boolean;
  social: {
    instagram_username: string;
    portfolio_url: string;
    twitter_username: string;
    paypal_email: string | null;
  };
};

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
  user: UnsplashUserProfile;
};

interface UnsplashParams {
  query: string;
  page?: number;
  per_page?: number;
  // Add other optional parameters as needed
}

export interface UnsplashSuccess {
  total: number;
  total_pages: number;
  results: UnsplashPhoto[];
}

interface UnsplashError {
  errors: string[];
}

export type UnsplashResponse = UnsplashSuccess | UnsplashError;

const UNSPLASH_API_URL = 'https://api.unsplash.com';

export async function fetchUnsplash(
  params: UnsplashParams
): Promise<UnsplashResponse> {
  const queryParam = new URLSearchParams(params as any).get('query') || '';
  const queryString = queryParam.length > 0 ? `?query=${queryParam}` : '';
  const fetchUrl = `${UNSPLASH_API_URL}/search/photos${queryString}`;
  const res = await fetch(fetchUrl, {
    headers: {
      Authorization: `Client-ID ${process.env.NEXT_PUBLIC_UNSPLASH_ACCESS_KEY}`,
    },
  });
  return res.json();
}

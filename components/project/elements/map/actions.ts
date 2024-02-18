'use server';
type GooglePhoto = {
  height: number;
  html_attributions: string[];
  photo_reference: string;
  width: number;
};

export async function getPlacePhotos(placeId: string): Promise<any> {
  const res = await fetch(
    `https://maps.googleapis.com/maps/api/place/details/json?place_id=${placeId}&fields=photo&key=${process.env.NEXT_PUBLIC_GOOGLE_API_KEY}`
  );
  const {
    result: { photos },
  } = await res.json();
  //map over photos and get photo_reference and put all in an array
  const photoRefs =
    photos?.map((photo: GooglePhoto) => photo.photo_reference) || [];
  return photoRefs;
}

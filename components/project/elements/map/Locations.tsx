import { useLoadScript } from '@react-google-maps/api';
import React from 'react';
import GMap from './GMap';
import { LocationsElement } from './LocationsBuilderElement';
import PlacesAutocomplete from './PlacesAutocomplete';

const containerStyle = {
  width: '100%',
  height: '100%',
};

const center = {
  lat: -3.745,
  lng: -38.523,
};

interface LocationsProps {
  element: LocationsElement;
  isPreview: boolean;
}

function Locations({ element, isPreview }: LocationsProps) {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_API_KEY!,
    libraries: ['places'],
  });
  if (!isLoaded) return <div>Loading...</div>;

  return (
    <div className="grid grid-cols-12 aspect-[3/1]">
      <div className="col-span-5 p-2 flex flex-col overflow-hidden">
        <PlacesAutocomplete element={element} isPreview={isPreview} />
      </div>
      <div className="col-span-7 p-3 flex flex-col">
        <GMap element={element} />
      </div>
    </div>
  );
}

export default React.memo(Locations);

import { GoogleMap, MarkerF } from '@react-google-maps/api';
import { useState } from 'react';
import { GoogleLocation } from './PlacesAutocomplete';

const containerStyle = {
  width: '100%',
  height: '100%',
};

interface GMapProps {
  location: GoogleLocation;
}

const GMap = ({ location }: GMapProps) => {
  const center = location?.coordinates || {
    lat: 52.520008,
    lng: 13.404954,
  };

  const [zoom, setZoom] = useState(10);
  return (
    <div className="w-full h-full rounded-md overflow-hidden">
      <GoogleMap mapContainerStyle={containerStyle} center={center} zoom={zoom}>
        <MarkerF
          key={location.placeId}
          position={location.coordinates}
          onLoad={() => console.log('Marker Loaded')}
        />
      </GoogleMap>
    </div>
  );
};

export default GMap;

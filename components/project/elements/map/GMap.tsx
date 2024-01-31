import { GoogleMap, MarkerF } from '@react-google-maps/api';
import { useState } from 'react';
import { LocationsElement } from './LocationsBuilderElement';
import { GoogleLocation } from './PlacesAutocomplete';

const containerStyle = {
  width: '100%',
  height: '100%',
};

interface GMapProps {
  element: LocationsElement;
}

const GMap = ({ element }: GMapProps) => {
  const center = element.extraAttributes.locations[0]?.coordinates || {
    lat: 52.520008,
    lng: 13.404954,
  };

  const [zoom, setZoom] = useState(10);
  return (
    <div className="w-full h-full rounded-md overflow-hidden">
      <GoogleMap mapContainerStyle={containerStyle} center={center} zoom={zoom}>
        {element.extraAttributes.locations.map(
          (location: GoogleLocation, idx: string) => (
            <MarkerF
              key={location.placeId}
              position={location.coordinates}
              onLoad={() => console.log('Marker Loaded')}
            />
            // <OverlayView
            //   mapPaneName={OverlayView.OVERLAY_MOUSE_TARGET}
            //   key={location.placeId}
            //   position={location.coordinates}

            //   onLoad={() => console.log('Marker Loaded')}
            // >
            //   <Icons.marker className="w-8" />
            // </OverlayView>
          )
        )}
      </GoogleMap>
    </div>
  );
};

export default GMap;

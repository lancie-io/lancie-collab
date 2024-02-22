import { useLoadScript } from '@react-google-maps/api';
import React, { useEffect } from 'react';
import LocationDetails from './LocationDetails';
import { LocationsElement } from './LocationsBuilderElement';
import PlacesAutocomplete, { GoogleLocation } from './PlacesAutocomplete';

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
    <LocationProvider
      initValue={0}
      locations={element.extraAttributes.locations}
    >
      <div className="grid grid-cols-12 lg:aspect-[3/1] divide-y lg:divide-x lg:divide-y-0">
        <div className="col-span-12 lg:col-span-4 p-2 flex flex-col overflow-hidden">
          <PlacesAutocomplete element={element} isPreview={isPreview} />
        </div>
        <div className="col-span-12 lg:col-span-8 p-3 flex flex-col">
          <LocationDetails element={element} />
        </div>
      </div>
    </LocationProvider>
  );
}

export default React.memo(Locations);

type LocationContextType = {
  selectedLocationId: number;
  setSelectedLocationId: React.Dispatch<React.SetStateAction<any>>;
};

const LocationContext = React.createContext<LocationContextType>({
  selectedLocationId: 0,
  setSelectedLocationId: () => {},
});

const LocationProvider = ({
  children,
  initValue,
  locations,
}: {
  children: React.ReactNode;
  initValue: any;
  locations: GoogleLocation[];
}) => {
  const [selectedLocationId, setSelectedLocationId] = React.useState(initValue);
  const value = {
    selectedLocationId,
    setSelectedLocationId,
  };
  useEffect(() => {
    console.log('locations changed');
    if (!locations[selectedLocationId]) {
      setSelectedLocationId(0);
    }
  }, [locations.length]);
  return (
    <LocationContext.Provider value={value}>
      {children}
    </LocationContext.Provider>
  );
};

export const useLocation = () => {
  const context = React.useContext(LocationContext);
  if (context === undefined) {
    throw new Error('useLocation must be used within a LocationProvider');
  }
  return context;
};

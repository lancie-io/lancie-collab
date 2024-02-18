import Title from '@/components/shared/Title';
import Editor from '@/components/shared/editor';
import { JSONContent } from '@tiptap/react';
import { useBuilder } from '../../BuilderProvider';
import EmptyState from '../shared/EmptyState';
import GMap from './GMap';
import { useLocation } from './Locations';
import { LocationsElement } from './LocationsBuilderElement';
import { GoogleLocation } from './PlacesAutocomplete';

interface LocationDetailsProps {
  element: LocationsElement;
}

const LocationDetails = ({ element }: LocationDetailsProps) => {
  const { selectedLocationId, setSelectedLocationId } = useLocation();
  const { updateElement } = useBuilder();

  const locations: GoogleLocation[] = element.extraAttributes.locations;
  const location = locations[selectedLocationId];
  function updateLocationNotes(notes: JSONContent) {
    console.log('triggered');
    const newLocations = locations.map((l) => {
      if (l.id === location.id) {
        return {
          ...l,
          notes,
        };
      }
      return l;
    });
    console.log('newLocations', newLocations);
    updateElement(element.id, {
      ...element,
      extraAttributes: {
        ...element.extraAttributes,
        locations: newLocations,
      },
    });
  }
  if (!location) {
    return (
      <EmptyState
        icon="MapPin"
        title="Add a place"
        description="Organize your team around important shooting locations."
        className="aspect-[5/4]"
      />
    );
  }
  return (
    <div className="aspect-[5/4]">
      <Title>{location.formatted.main}</Title>
      <p className="text-sm text-muted-foreground">
        {location.formatted.secondary}
      </p>
      {location.photos.length > 0 && (
        <div className="flex gap-2 w-full overflow-scroll no-scrollbar h-20 mt-2">
          {location.photos.map((photo, index) => {
            let imageUrl;
            if (photo.reference) {
              imageUrl = `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photo_reference=${photo.reference}&key=${process.env.NEXT_PUBLIC_GOOGLE_API_KEY}`;
            } else if (photo.url) {
              imageUrl = photo.url;
            }
            if (!imageUrl) return null;
            return (
              <img key={index} className="h-full rounded-md" src={imageUrl} />
            );
          })}
        </div>
      )}

      <div className="grid grid-cols-2 mt-4 gap-4">
        <div className="bg-muted border rounded-md">
          <Editor
            onUpdate={updateLocationNotes}
            json={location.notes}
            placeholder="Take notes about this location..."
          />
        </div>
        <div className="aspect-square">
          <GMap location={location} />
        </div>
      </div>
    </div>
  );
};

export default LocationDetails;

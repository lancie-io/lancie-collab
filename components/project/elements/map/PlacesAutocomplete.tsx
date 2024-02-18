import Title from '@/components/shared/Title';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { cn, idGenerator } from '@/lib/utils';
import { JSONContent } from '@tiptap/react';
import { AnimatePresence, motion } from 'framer-motion';
import { Trash } from 'lucide-react';
import { useEffect, useState } from 'react';
import usePlacesAutocomplete, {
  getGeocode,
  getLatLng,
} from 'use-places-autocomplete';
import { useBuilder } from '../../BuilderProvider';
import { useLocation } from './Locations';
import { LocationsElement } from './LocationsBuilderElement';
import { getPlacePhotos } from './actions';

interface PlacesAutocompleteProps {
  element: LocationsElement;
  isPreview: boolean;
}

export type GoogleLocation = {
  id: string;
  placeId: string;
  description: string;
  formatted: {
    main: string;
    secondary: string;
  };
  coordinates: {
    lat: number;
    lng: number;
  };
  photos: {
    reference?: string;
    url?: string;
  }[];
  notes?: JSONContent;
};

const PlacesAutocomplete = ({
  element,
  isPreview,
}: PlacesAutocompleteProps) => {
  const { id } = element;
  const { updateElement } = useBuilder();

  const locations: GoogleLocation[] = element.extraAttributes.locations;
  const {
    ready,
    value,
    suggestions: { status, data },
    setValue,
    clearSuggestions,
  } = usePlacesAutocomplete({
    requestOptions: {},
    debounce: 150,
    cache: 86400,
  });

  function addLocation(location: GoogleLocation) {
    updateElement(id, {
      ...element,
      extraAttributes: {
        ...element.extraAttributes,
        locations: [location, ...element.extraAttributes.locations],
      },
    });
  }

  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (data.length > 0) {
      setOpen(true);
    } else {
      setOpen(false);
    }
  }, [data]);

  const handleSelect = async (
    location: Omit<GoogleLocation, 'coordinates' | 'photos' | 'id'>
  ) => {
    setValue('', false);
    clearSuggestions();
    const results = await getGeocode({ placeId: location.placeId });
    const placePhotos = await getPlacePhotos(location.placeId);
    const { lat, lng } = getLatLng(results[0]);
    const photos = placePhotos.map((photo: string) => ({
      reference: photo,
      url: null,
    }));
    const newLocation: GoogleLocation = {
      placeId: location.placeId,
      id: idGenerator(),
      description: location.description,
      formatted: location.formatted,
      photos,
      coordinates: { lat, lng },
    };
    addLocation(newLocation);
  };
  return (
    <div className="relative flex flex-col gap-3 grow overflow-hidden p-1">
      {!isPreview && (
        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger disabled className="w-full">
            <Input
              disabled={!ready}
              value={value}
              onChange={(e) => setValue(e.target.value)}
              placeholder="Search a place..."
              className="w-full shrink-0"
            />
          </PopoverTrigger>
          <PopoverContent
            align="start"
            onOpenAutoFocus={(e) => e.preventDefault()}
            className="p-1 mt-2"
          >
            <ul>
              {data.map(
                ({
                  place_id,
                  description,
                  structured_formatting: { main_text, secondary_text },
                }) => (
                  <li
                    key={place_id}
                    onClick={() =>
                      handleSelect({
                        placeId: place_id,
                        description: description,
                        formatted: {
                          main: main_text,
                          secondary: secondary_text,
                        },
                      })
                    }
                    className="cursor-pointer transition duration-100 hover:bg-accent px-2 py-1.5 text-sm whitespace-nowrap overflow-scroll no-scrollbar rounded-sm"
                  >
                    {description}
                  </li>
                )
              )}
            </ul>
          </PopoverContent>
        </Popover>
      )}

      <div className="space-y-2 overflow-scroll no-scrollbar grow max-h-[120px] lg:max-h-none">
        <AnimatePresence>
          {locations.map((location: GoogleLocation, idx: number) => (
            <LocationCard
              element={element}
              location={location}
              key={location.id}
              idx={idx}
            />
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default PlacesAutocomplete;

interface LocationCardProps {
  location: GoogleLocation;
  element: LocationsElement;
  idx: number;
}

const LocationCard = ({ location, element, idx }: LocationCardProps) => {
  const { updateElement } = useBuilder();
  const { selectedLocationId, setSelectedLocationId } = useLocation();

  function removeLocation(locationId: string) {
    updateElement(element.id, {
      ...element,
      extraAttributes: {
        ...element.extraAttributes,
        locations: element.extraAttributes.locations.filter(
          (location: any) => location.id !== locationId
        ),
      },
    });
  }
  const isActive = selectedLocationId === idx;
  return (
    <motion.div
      className={cn(
        'relative rounded-md p-3 border bg-muted cursor-pointer hover:bg-accent transition-colors duration-150',
        isActive && 'border-ring bg-accent'
      )}
      onClick={() => setSelectedLocationId(idx)}
      initial={{ opacity: 0, scale: 1, y: 10 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 1, y: 10 }}
      transition={{ ease: 'easeInOut', duration: 0.2 }}
      key={location.id}
      layoutId={location.id}
    >
      <Title className="text-base">{location.formatted.main}</Title>
      <p className="text-sm text-muted-foreground">
        {location.formatted.secondary}
      </p>
      <Button
        variant="ghost"
        size="iconXS"
        className="absolute top-2 right-2"
        onClick={() => removeLocation(location.id)}
      >
        <Trash className="w-3 h-3" />
      </Button>
    </motion.div>
  );
};

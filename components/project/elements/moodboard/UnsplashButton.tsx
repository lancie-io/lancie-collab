import { Icons } from '@/components/shared/Icons';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { useQuery } from '@tanstack/react-query';
import { useDebounce } from '@uidotdev/usehooks';
import { Loader2 } from 'lucide-react';
import Image from 'next/image';
import { useState } from 'react';
import { useBuilder } from '../../BuilderProvider';
import { MoodboardElement } from './MoodboardBuilderElement';
import { fetchUnsplash } from './unsplash-action';

interface UnsplashButtonProps {
  element: MoodboardElement;
}

const UnsplashButton = ({ element }: UnsplashButtonProps) => {
  const [searchValue, setSearchValue] = useState('');
  const debouncedSearchValue = useDebounce(searchValue, 300);
  const { data, status } = useQuery({
    queryKey: ['unsplash', debouncedSearchValue],
    queryFn: async () => {
      return await fetchUnsplash({ query: debouncedSearchValue });
    },
  });

  const handleChange = (e: React.FormEvent<HTMLInputElement>) => {
    setSearchValue(e.currentTarget.value);
  };

  function distributeItems<T>(items: T[], n: number): T[][] {
    const result = Array.from({ length: n }, () => [] as T[]);
    items.forEach((item, index) => {
      const arrayIndex = index % n;
      result[arrayIndex].push(item);
    });
    return result;
  }

  const { updateElement } = useBuilder();

  const [open, setOpen] = useState(false);

  const handleClick = (url: string) => {
    updateElement(element.id, {
      ...element,
      extraAttributes: {
        ...element.extraAttributes,
        images: [{ url }, ...element.extraAttributes.images],
      },
    });
    setOpen(false);
  };

  return (
    <div>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button size="s" variant="outline">
            <Icons.unsplash className="w-2.5 h-2.5 text-foreground fill-foreground" />
            Unsplash
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto">
          <div className="h-[400px] w-[600px] flex flex-col gap-4">
            <Input
              value={searchValue}
              onChange={handleChange}
              placeholder="Search for image..."
              className="shrink-0"
            />
            <div className="grow overflow-scroll no-scrollbar">
              {status === 'pending' && (
                <div className="w-full h-full grid place-items-center">
                  <Loader2 className="animate-spin" />
                </div>
              )}
              {status === 'error' && <div>Error...</div>}
              {/* {status === 'success' && photos.length < 1 && (
                <div className="text-muted-foreground">No photos found</div>
              )} */}
              {data?.results?.length && (
                <div className="grid grid-cols-3 gap-4">
                  {distributeItems(data.results, 3).map(
                    (column, colIdx: number) => {
                      return (
                        <div className="space-y-4" key={colIdx}>
                          {column.map((photo, rowIdx: number) => {
                            return (
                              <button
                                key={photo.urls.regular}
                                tabIndex={-1}
                                className="relative overflow-hidden rounded-md"
                                onClick={() => handleClick(photo.urls.regular)}
                              >
                                <Image
                                  src={photo.urls.regular}
                                  width={photo.width}
                                  height={photo.height}
                                  alt={photo.alt_description}
                                />
                              </button>
                            );
                          })}
                        </div>
                      );
                    }
                  )}
                </div>
              )}
            </div>
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
};

export default UnsplashButton;

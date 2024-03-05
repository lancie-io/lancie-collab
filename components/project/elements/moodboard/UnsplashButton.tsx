import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { useQuery } from '@tanstack/react-query';
import { useDebounce } from '@uidotdev/usehooks';
import { HeartCrack, Image as ImageIcon, Loader2, Search } from 'lucide-react';
import { useState } from 'react';
import Masonry, { ResponsiveMasonry } from 'react-responsive-masonry';
import { MoodboardCustomInstance } from './MoodboardBuilderElement';
import { triggerUnsplashDownloadLink } from './actions';
import {
  UnsplashPhoto,
  UnsplashResponse,
  fetchUnsplash,
} from './unsplash-action';
import { useMoodboard } from './useMoodboard';

interface UnsplashButtonProps {
  element: MoodboardCustomInstance;
}

const UnsplashButton = ({ element }: UnsplashButtonProps) => {
  const [searchValue, setSearchValue] = useState('');
  const debouncedSearchValue = useDebounce(searchValue, 300);
  const { data, status } = useQuery({
    queryKey: ['unsplash', debouncedSearchValue],
    queryFn: async (): Promise<UnsplashResponse> => {
      return await fetchUnsplash({ query: debouncedSearchValue });
    },
  });

  const handleChange = (e: React.FormEvent<HTMLInputElement>) => {
    setSearchValue(e.currentTarget.value);
  };

  const { addUnsplashImage } = useMoodboard(element);

  const [open, setOpen] = useState(false);

  const handleClick = async (photo: UnsplashPhoto) => {
    addUnsplashImage(photo);
    const res = await triggerUnsplashDownloadLink(
      photo.links.download_location
    );
    // if (res.success) {
    //   toast.success('Image added successfully');
    // } else {
    //   toast.error(JSON.stringify(res.error));
    // }
    setOpen(false);
  };

  return (
    <div>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button size="s" variant="outline">
            <Search className="w-3 h-3" />
            Search
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto max-h-[400px] overflow-scroll">
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
              {data && 'errors' in data && (
                <div className="flex flex-col gap-4 font-medium items-center h-full w-full justify-center">
                  <ImageIcon className="w-10 h-10" />
                  Start searching images
                </div>
              )}
              {data && !('errors' in data) && !data?.results?.length && (
                <div className="flex flex-col gap-4 items-center font-medium h-full w-full justify-center">
                  <HeartCrack className="w-10 h-10" />
                  No photos found
                </div>
              )}
              {data && !('errors' in data) && data?.results?.length && (
                <ResponsiveMasonry
                  columnsCountBreakPoints={{ 350: 2, 768: 2, 960: 3 }}
                >
                  <Masonry gutter="16px">
                    {data.results.map((photo) => {
                      return (
                        <button
                          key={photo.urls.regular}
                          tabIndex={-1}
                          className="relative overflow-hidden rounded-md group"
                          onClick={() => handleClick(photo)}
                        >
                          <img src={photo.urls.small} />
                          <a
                            className="absolute left-2 bottom-1 font-medium opacity-0 group-hover:opacity-100 text-xs"
                            href={`https://unsplash.com/@${photo.user.username}?utm_source=lancie_name&utm_medium=referral`}
                            target="_blank"
                          >
                            {photo.user.name}
                          </a>
                        </button>
                      );
                    })}
                  </Masonry>
                </ResponsiveMasonry>
              )}
            </div>
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
};

export default UnsplashButton;

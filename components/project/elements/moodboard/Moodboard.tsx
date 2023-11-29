import { Icons } from '@/components/shared/Icons';
import ImageUploadPlaceholder from '@/components/shared/ImageUploadPlaceholder';
import OptimizedImage from '@/components/shared/OptimizedImage';
import { Button } from '@/components/ui/button';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Link, MessagesSquare, Upload } from 'lucide-react';
import ElementBar from '../shared/ElementBar';

const images = [
  'https://images.pexels.com/photos/209977/pexels-photo-209977.jpeg?auto=compress&cs=tinysrgb&w=1600',
  'https://images.pexels.com/photos/863988/pexels-photo-863988.jpeg?auto=compress&cs=tinysrgb&w=1600',
  'https://images.pexels.com/photos/71104/utah-mountain-biking-bike-biking-71104.jpeg?auto=compress&cs=tinysrgb&w=1600',
  'https://images.pexels.com/photos/163407/cyclists-trail-bike-clouds-163407.jpeg?auto=compress&cs=tinysrgb&w=1600',
  'https://images.pexels.com/photos/7862/pexels-photo.jpg?auto=compress&cs=tinysrgb&w=1600',
  'https://images.pexels.com/photos/1761282/pexels-photo-1761282.jpeg?auto=compress&cs=tinysrgb&w=1600',
  'https://images.pexels.com/photos/1604869/pexels-photo-1604869.jpeg?auto=compress&cs=tinysrgb&w=1600',
  'https://images.pexels.com/photos/1068596/pexels-photo-1068596.jpeg?auto=compress&cs=tinysrgb&w=1600',
];

const Moodboard = () => {
  return (
    <div className="aspect-[3/2] group w-full flex flex-col">
      <ElementBar>
        <Button size="s" variant="outline">
          <Link className="w-3 h-3" />
          Embed
        </Button>
        <Button size="s" variant="outline">
          <Upload className="w-3 h-3" />
          Upload
        </Button>
        <Button size="s" variant="outline">
          <Icons.unsplash className="w-2.5 h-2.5 text-foreground fill-foreground" />
          Unsplash
        </Button>
      </ElementBar>
      {images && (
        <div className="grid grid-cols-3 gap-4 p-4 items-start">
          {images.map((image, idx) => (
            <div className="relative" key={idx}>
              <OptimizedImage src={image} />
              {idx % 2 === 0 && (
                <div className="relative">
                  <Popover>
                    <PopoverTrigger>
                      <Button
                        size="iconSmall"
                        variant="primary"
                        className="absolute bottom-0 right-0 translate-x-2 translate-y-2"
                      >
                        <MessagesSquare className="w-5 h-5" />
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent>Chat</PopoverContent>
                  </Popover>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
      {!images && (
        <div className="grow w-full grid place-items-center">
          <ImageUploadPlaceholder />
        </div>
      )}
    </div>
  );
};

export default Moodboard;

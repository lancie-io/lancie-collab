'use client';
import { getCloudinaryImage } from '@/lib/cloudinary';
import { AdvancedImage, responsive } from '@cloudinary/react';
import { FC } from 'react';

interface OptimizedImageProps {
  src: string;
  steps?: number[];
  objectFit?: 'cover' | 'contain';
  style?: any;
}

const OptimizedImage: FC<OptimizedImageProps> = ({
  src,
  steps,
  objectFit = 'cover',
  style,
}) => {
  return (
    <AdvancedImage
      style={{ objectFit: objectFit, width: '100%', height: '100%', ...style }}
      cldImg={getCloudinaryImage(src)}
      plugins={[responsive({ steps })]}
    />
  );
};

export default OptimizedImage;

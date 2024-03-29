'use client';
import { getCloudinaryImage } from '@/lib/cloudinary';
import { AdvancedImage, responsive } from '@cloudinary/react';
import { CSSProperties, FC } from 'react';

interface OptimizedImageProps
  extends React.ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  steps?: number[];
  objectFit?: 'cover' | 'contain';
  style?: CSSProperties;
  fill?: boolean;
}

const OptimizedImage: FC<OptimizedImageProps> = ({
  src,
  steps,
  objectFit = 'cover',
  style,
  fill = false,
  onLoad,
}) => {
  const fillStyle = fill
    ? { width: '100%', height: '100%', position: 'absolute', left: 0, top: 0 }
    : {};

  return (
    <AdvancedImage
      style={{
        objectFit: objectFit,
        ...fillStyle,
        ...style,
      }}
      cldImg={getCloudinaryImage(src)}
      plugins={[responsive({ steps })]}
      width="100%"
      height="100%"
      onLoad={onLoad}
    />
  );
};

export default OptimizedImage;

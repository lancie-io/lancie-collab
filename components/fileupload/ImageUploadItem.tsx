import { ListItemProps } from './UploadDisplay';

interface ImageUploadItemProps extends ListItemProps {}

const ImageUploadItem = ({ progress, imageUrl }: ImageUploadItemProps) => {
  return (
    <div>
      <p>Item</p>
      <img src={imageUrl} alt="" />
      {JSON.stringify(progress)}
    </div>
  );
};

export default ImageUploadItem;

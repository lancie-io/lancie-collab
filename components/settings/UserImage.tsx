'use client';
import { Prisma } from '@prisma/client';
import Avatar from '../shared/Avatar';
import { FileUploadTrigger } from '../shared/upload/FileUpload';
import { useUpload } from '../shared/upload/UploadProvider';

const UserImage = ({ user }: { user?: Prisma.UserGetPayload<{}> | null }) => {
  const { isUploading } = useUpload();
  return (
    <FileUploadTrigger>
      <Avatar
        user={user}
        loading={isUploading}
        className="cursor-pointer w-32 h-32"
      />
    </FileUploadTrigger>
  );
};

export default UserImage;

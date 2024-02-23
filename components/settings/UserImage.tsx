'use client';
import { Prisma } from '@prisma/client';
import { useUpload } from '../fileupload/Upload';
import Avatar from '../shared/Avatar';

const UserImage = ({ user }: { user?: Prisma.UserGetPayload<{}> | null }) => {
  const { isUploading } = useUpload();
  return (
    <Avatar
      user={user}
      loading={isUploading}
      className="cursor-pointer w-48 h-48"
    />
  );
};

export default UserImage;

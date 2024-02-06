'use client';
import { cn } from '@/lib/utils';
import { Prisma } from '@prisma/client';
import { Loader2 } from 'lucide-react';
import Image from 'next/image';
import { FileUploadTrigger } from '../shared/upload/FileUpload';
import { useUpload } from '../shared/upload/UploadProvider';

const UserImage = ({ user }: { user?: Prisma.UserGetPayload<{}> | null }) => {
  const { isUploading } = useUpload();
  return (
    <FileUploadTrigger>
      <div className="w-32 relative aspect-square rounded-full overflow-hidden grid place-items-center cursor-pointer">
        <Image
          src={user?.image as string}
          fill
          alt="avatar"
          className={cn(isUploading && 'opacity-50')}
          objectFit="cover"
        />
        {isUploading && <Loader2 className="w-16 h-16 animate-spin" />}
      </div>
    </FileUploadTrigger>
  );
};

export default UserImage;

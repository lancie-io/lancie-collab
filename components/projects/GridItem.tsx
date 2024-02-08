'use client';
import { updateProject } from '@/lib/actions';
import { useAuthUser } from '@/lib/auth';
import { formatDistance } from 'date-fns';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import Avatar from '../shared/Avatar';
import UploadProvider, { UploadedFile } from '../shared/upload/UploadProvider';
import ItemContent from './ItemContent';
import ItemOptions from './ItemOptions';
import { GridProjectT } from './ProjectGrid';

interface GridItemProps {
  project: GridProjectT;
}

const GridItem = ({ project }: GridItemProps) => {
  const user = useAuthUser();

  const router = useRouter();

  const addImage = async (file: UploadedFile) => {
    console.log('add image');
    const res = await updateProject(project.id, { cover: file.url });
    if (res.success) {
      toast.success('Project thumbnail updated.');
      router.refresh();
    } else {
      toast.error('Project thumbnail update failed.');
    }
  };
  const isOwner = project.user.id === user?.id;
  return (
    <UploadProvider onFileChange={addImage}>
      <motion.div
        initial={{
          opacity: 0.5,
          scale: 1,
        }}
        animate={{
          opacity: 1,
          scale: 1,
        }}
        transition={{
          duration: 0.5,
        }}
      >
        <div className="relative border-2 transition duration-150 aspect-video grid place-items-center rounded-lg  hover:border-ring bg-muted overflow-hidden">
          <ItemContent project={project} />

          <div className="absolute top-3 right-3">
            <ItemOptions isOwner={isOwner} project={project} />
          </div>
        </div>
        <div className="pt-1.5 flex items-center justify-between w-full">
          <div>
            <h2 className="font-semibold">{project.name}</h2>
            <h3 className="text-muted-foreground text-sm">
              Edited{' '}
              {formatDistance(project.updatedAt, new Date(), {
                addSuffix: true,
              })}
            </h3>
          </div>
          {!isOwner && (
            <div className="text-xs rounded-full text-muted-foreground flex gap-1.5 items-center border pl-2">
              Owned by <Avatar className="w-7 h-7" user={project.user} />
            </div>
          )}
        </div>
      </motion.div>
    </UploadProvider>
  );
};

export default GridItem;

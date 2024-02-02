'use client';
import { updateProject } from '@/lib/actions';
import { Prisma } from '@prisma/client';
import { formatDistance } from 'date-fns';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import UploadProvider, { UploadedFile } from '../shared/upload/UploadProvider';
import ItemContent from './ItemContent';
import ItemOptions from './ItemOptions';

interface GridItemProps {
  project: Prisma.ProjectGetPayload<{}>;
}

const GridItem = ({ project }: GridItemProps) => {
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
  return (
    <UploadProvider onFileChange={addImage}>
      <div>
        <div className="relative border-2 transition duration-150 aspect-video grid place-items-center rounded-lg  hover:border-ring bg-muted overflow-hidden">
          <ItemContent project={project} />
          <div className="absolute top-3 right-3">
            <ItemOptions project={project} />
          </div>
        </div>
        <div className="pt-1.5">
          <h2 className="font-semibold">{project.name}</h2>
          <h3 className="text-muted-foreground text-sm">
            Edited{' '}
            {formatDistance(project.updatedAt, new Date(), { addSuffix: true })}
          </h3>
        </div>
      </div>
    </UploadProvider>
  );
};

export default GridItem;

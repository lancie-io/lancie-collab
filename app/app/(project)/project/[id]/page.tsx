import { CommentProvider } from '@/components/project/CommentToggle';
import DragOverlayWrapper from '@/components/project/DragOverlayWrapper';
import DndProvider from '@/components/providers/DndProvider';
import ProjectProvider from '@/components/providers/ProjectProvider';
import { RoomProvider } from '@/components/providers/RoomProvider';
import ViewProvider from '@/components/providers/ViewProvider';
import { getProject } from '@/lib/actions';
import { getAuthUser } from '@/lib/auth';
import prisma from '@/lib/prisma';
import { MetaDataData, createMetaDataObject } from '@/lib/utils';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import ProjectPageCore from './ProjectPageCore';

type Props = {
  params: { id: string };
  searchParams: { [key: string]: string | string[] | undefined };
};

export async function generateMetadata({
  params,
}: Props): Promise<Metadata | undefined> {
  // read route params
  const id = params.id;

  // fetch data
  const project = await getProject(id);
  if (!project) {
    return;
  }
  const newMetadata: MetaDataData = {
    title: project.name!,
    description: project.description!,
    imageUrl: project.cover!,
  };
  const metadata = createMetaDataObject(newMetadata);
  return metadata;
}

const ProjectPage = async ({ params }: { params: { id: string } }) => {
  const project = await prisma.project.findUnique({
    where: {
      id: params.id,
    },
    include: {
      members: true,
    },
  });
  const user = await getAuthUser();

  if (!project) {
    notFound();
  }

  const isMemberOfProject = project?.members.some(
    (member) => member.id === user?.id
  );

  return (
    <ViewProvider initialView={isMemberOfProject ? 'edit' : 'view'}>
      <RoomProvider roomId={params.id}>
        <DndProvider>
          <ProjectProvider initProjectId={params.id}>
            <CommentProvider>
              <ProjectPageCore
                projectId={params.id}
                isAuthorized={isMemberOfProject}
              />
            </CommentProvider>
            <DragOverlayWrapper />
          </ProjectProvider>
        </DndProvider>
      </RoomProvider>
    </ViewProvider>
  );
};

export default ProjectPage;

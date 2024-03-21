'use client';

import Upload from '@/components/fileupload/Upload';
import { useProjectId } from '@/components/providers/ProjectProvider';
import { useView } from '@/components/providers/ViewProvider';
import OptimizedImage from '@/components/shared/OptimizedImage';
import Title from '@/components/shared/Title';
import { UploadedFile } from '@/components/shared/upload/UploadProvider';
import { getProjectCover, getProjectTitle, updateProject } from '@/lib/actions';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { format } from 'date-fns';
import { toast } from 'sonner';
import { z } from 'zod';
import { useSettings } from './Summary';
import { SettingsCustomInstance } from './SummaryBuilderElement';
import SummaryCoverUpload from './SummaryCoverUpload';
import TitleForm from './TitleForm';

const formSchema = z.object({
  title: z.string(),
  description: z.string(),
  creator: z.string(),
  persons: z.array(
    z.object({ name: z.string(), role: z.string(), image: z.string() })
  ),
});

const SummaryPlayground = ({
  element,
}: {
  element: SettingsCustomInstance;
}) => {
  const projectId = useProjectId();

  const queryClient = useQueryClient();

  async function uploadCoverImage(file: UploadedFile) {
    console.log(file);
    if (!projectId) return;
    const res = await updateProject(projectId, { cover: file.url });
    if (res.success) {
      toast.success('Project cover updated.');
    } else {
      toast.error('Project cover update failed.');
    }
    queryClient.invalidateQueries({ queryKey: ['cover'] });
  }

  const { data: title, status } = useQuery({
    queryKey: ['title', projectId],
    queryFn: async () => {
      return await getProjectTitle(projectId);
    },
  });

  const { data: url, status: coverStatus } = useQuery({
    queryKey: ['cover', projectId],
    queryFn: async () => {
      return await getProjectCover(projectId);
    },
  });

  const { settings } = useSettings();
  const { isView } = useView();
  const productionDate = element.extraAttributes.production;
  const publishingDate = element.extraAttributes.publishing;
  return (
    <Upload
      options={{
        maxFiles: 1,
      }}
      onUpload={uploadCoverImage}
    >
      <div className="flex flex-col lg:flex-row w-full p-3 md:p-6 gap-3 md:gap-6">
        {isView && url && (
          <div className="aspect-video grow relative overflow-hidden rounded-md border">
            <OptimizedImage fill src={url} />
          </div>
        )}
        {settings.cover && !isView && (
          <div className="grow">
            <SummaryCoverUpload />
          </div>
        )}
        <div className="shrink-0 w-full lg:w-1/2">
          {isView && (
            <div className="space-y-4">
              <Title className="text-3xl  ">{title}</Title>
              <p>{element.extraAttributes.description}</p>
              {(productionDate || publishingDate) && (
                <div className="flex gap-24">
                  {productionDate && (
                    <div>
                      <p className="text-xs text-muted-foreground font-medium uppercase tracking-wide">
                        Production Date
                      </p>
                      <p className="text-xl font-semibold">
                        {format(new Date(productionDate), 'MMM do, yyyy')}
                      </p>
                    </div>
                  )}
                  {publishingDate && (
                    <div>
                      <p className="text-xs text-muted-foreground font-medium uppercase tracking-wide">
                        Publishing Date
                      </p>
                      <p className="text-xl font-semibold">
                        {format(new Date(publishingDate), 'MMM do, yyyy')}
                      </p>
                    </div>
                  )}
                </div>
              )}
            </div>
          )}
          {!isView && <TitleForm element={element} />}
        </div>
      </div>
    </Upload>
  );
};

export default SummaryPlayground;

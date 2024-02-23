'use client';

import Upload from '@/components/fileupload/Upload';
import { useProjectId } from '@/components/providers/ProjectProvider';
import { UploadedFile } from '@/components/shared/upload/UploadProvider';
import { updateProject } from '@/lib/actions';
import { useQueryClient } from '@tanstack/react-query';
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

  const { settings } = useSettings();

  return (
    <Upload
      options={{
        maxFiles: 1,
      }}
      onUpload={uploadCoverImage}
    >
      <div className="flex flex-col lg:flex-row w-full p-3 md:p-6 gap-3 md:gap-6">
        {settings.cover && (
          <div className="grow">
            <SummaryCoverUpload />
          </div>
        )}
        <div className="shrink-0 w-full lg:w-1/2">
          <TitleForm element={element} />
        </div>
      </div>
    </Upload>
  );
};

export default SummaryPlayground;

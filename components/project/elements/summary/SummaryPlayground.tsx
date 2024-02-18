'use client';

import { useProjectId } from '@/components/providers/ProjectProvider';
import UploadProvider, {
  UploadedFile,
} from '@/components/shared/upload/UploadProvider';
import { updateProject } from '@/lib/actions';
import { zodResolver } from '@hookform/resolvers/zod';
import { useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';
import { useSettings } from './Summary';
import { SettingsCustomInstance } from './SummaryBuilderElement';
import SummaryCoverUpload from './SummaryCoverUpload';
import TitleForm from './TitleForm';

type PersonT = {
  name?: string;
  email?: string;
  image?: string;
  role?: string;
};

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
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: undefined,
      description: undefined,
      creator: undefined,
      persons: [
        {
          name: 'Lukas Hoppe',
          role: 'Camera',
          image:
            'https://uplift-images.s3.amazonaws.com/experiments/1707309048-lukas_dark_new-min.jpg',
        },
        {
          name: 'Niek',
          role: 'Producer',
          image:
            'https://img.limburger.nl/3tD2qWM6BkVTS4Mb3qEwuEJKfTU=/960x640/smart/https%3A%2F%2Fstatic.limburger.nl%2FAssets%2FImages_Upload%2F2020%2F03%2F30%2F6c68de48-726e-11ea-8ceb-2aca2f204717_web_scale_0.6179775_0.6179775__.jpg',
        },
        {
          name: 'Amelie',
          role: 'Drone Pilot',
          image:
            'https://res.cloudinary.com/du3mz9iny/image/upload/v1707499582/Screenshot_2024-02-09_at_18.26.04_sckhib.png',
        },
      ],
    },
  });
  const router = useRouter();

  const queryClient = useQueryClient();

  async function uploadImage(file: UploadedFile) {
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
    <div className="flex flex-col lg:flex-row w-full p-6 gap-6">
      {settings.cover && (
        <div className="grow">
          <UploadProvider onFileChange={uploadImage}>
            <SummaryCoverUpload />
          </UploadProvider>
        </div>
      )}
      <div className="shrink-0 w-1/2">
        <TitleForm element={element} />
      </div>
    </div>
  );
};

export default SummaryPlayground;

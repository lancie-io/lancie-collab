'use client';

import { useProjectId } from '@/components/providers/ProjectProvider';
import { updateProject } from '@/lib/actions';
import { useEdgeStore } from '@/lib/edgestore';
import { useState } from 'react';
import { toast } from 'sonner';
import { SingleImageDropzone } from './SingleImageDropzone';

export function SingleImageDropzoneUsage() {
  const [file, setFile] = useState<File>();
  const { edgestore } = useEdgeStore();
  const [progress, setProgress] = useState<number>(0);
  const projectId = useProjectId();
  if (!projectId) return null;
  return (
    <div>
      <SingleImageDropzone
        width={200}
        height={200}
        value={file}
        progress={progress}
        onChange={async (file) => {
          setFile(file);
          if (file) {
            const res = await edgestore.publicFiles.upload({
              file,
              onProgressChange: (progress) => {
                // you can use this to show a progress bar
                console.log(progress);
                setProgress(progress);
              },
            });
            const dbRes = await updateProject(projectId, { cover: res.url });
            if (dbRes.success) {
              toast.success('Project thumbnail updated.');
            } else {
              toast.error('Project thumbnail update failed.');
            }
          }
        }}
      />
    </div>
  );
}

import Upload from '@/components/fileupload/Upload';
import { UploadedFile } from '@/components/fileupload/types';
import { useView } from '@/components/providers/ViewProvider';
import { cn } from '@/lib/utils';
import { useEventListener } from '@/liveblocks.config';
import ElementBar from '../shared/ElementBar';
import FileEmbedButton from './FileEmbedButton';
import { FilesManagerCustomInstance } from './FilesBuilderElement';
import FilesGrid from './FilesGrid';
import useFiles from './useFiles';

interface FilesManagerProps {
  element: FilesManagerCustomInstance;
}

const FilesManager = ({ element }: FilesManagerProps) => {
  const { files, addFile, refetch } = useFiles();
  const { isView } = useView();
  useEventListener(({ event, user, connectionId }: any) => {
    if (event.type === 'refetch') {
      refetch();
    }
  });

  async function handleFileUpload(file: UploadedFile) {
    await addFile({
      name: file.name,
      url: file.url,
      type: 'file',
    });
  }

  return (
    <Upload
      onUpload={handleFileUpload}
      options={{
        type: 'multi',
        maxFiles: 20,
      }}
    >
      <div
        className={cn(
          'flex flex-col overflow-hidden',
          !isView && 'min-h-[240px]'
        )}
      >
        <ElementBar>
          <FileEmbedButton />
        </ElementBar>
        <FilesGrid element={element} />
      </div>
    </Upload>
  );
};

export default FilesManager;

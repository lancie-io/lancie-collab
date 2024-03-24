import { useUpload } from '@/components/fileupload/Upload';
import { UploadTrigger } from '@/components/fileupload/UploadTrigger';
import { useView } from '@/components/providers/ViewProvider';
import FileItem, { LoadingFileItem } from './FileItem';
import { FilesManagerCustomInstance } from './FilesBuilderElement';
import useFiles from './useFiles';

const FilesGrid = ({ element }: { element: FilesManagerCustomInstance }) => {
  const { files, status } = useFiles();
  const { uploadingItems } = useUpload();
  const { isView } = useView();
  return (
    <div className="flex flex-wrap gap-3 p-3">
      {!isView && (
        <div className="relative w-[160px] aspect-[5/4]">
          <UploadTrigger />
        </div>
      )}

      {uploadingItems.map(({ progress, file }, idx) => (
        <LoadingFileItem key={idx} file={file} progress={progress} />
      ))}
      {files?.map((file) => {
        return <FileItem file={file} element={element} key={file.id} />;
      })}
    </div>
  );
};

export default FilesGrid;

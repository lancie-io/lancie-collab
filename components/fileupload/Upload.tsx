import { createContext, useContext, useMemo, useState } from 'react';
import {
  FileState,
  UploadContextType,
  UploadOptionsType,
  UploadedFile,
} from './types';

const UploadContext = createContext<UploadContextType>({
  fileStates: [],
  setFileStates: () => {},
  updateFileProgress: () => {},
  uploadOptions: {},
  onUpload: () => {},
  isUploading: false,
  setIsUploading: () => {},
  uploadingItems: [],
});

export const useUpload = (): UploadContextType => {
  const context = useContext(UploadContext);
  if (context === undefined) {
    throw new Error('useUpload must be used within an UploadProvider');
  }
  return context;
};

interface UploadProps {
  children: React.ReactNode;
  options?: UploadOptionsType;
  onUpload: (file: UploadedFile) => void;
}

const Upload = ({ options, onUpload, children }: UploadProps) => {
  const defaultOptions: UploadOptionsType = {
    type: 'single',
  };

  const [fileStates, setFileStates] = useState<FileState[]>([]);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadOptions] = useState({ ...defaultOptions, ...options });

  const uploadingItems = useMemo(() => {
    if (fileStates) {
      return fileStates.map((fileState) => {
        let url;
        let img = new Image();
        if (typeof fileState.file === 'string') {
          // in case a url is passed in, use it to display the image
          url = fileState.file;
        } else {
          // in case a file is passed in, create a base64 url to display the image
          img.src = URL.createObjectURL(fileState.file);
          img.onload = () => {
            console.log('width:', img.width, 'height:', img.height);
          };
          // imageUrl = URL.createObjectURL(fileState.file);
        }
        return {
          ...fileState,
          url: img.src,
          dimensions: { width: img.width, height: img.height },
        };
      });
    }
    return [];
  }, [fileStates]);

  function updateFileProgress(key: string, progress: FileState['progress']) {
    setFileStates((fileStates) => {
      const newFileStates = structuredClone(fileStates);
      const fileState = newFileStates.find(
        (fileState) => fileState.key === key
      );
      if (fileState) {
        fileState.progress = progress;
      }
      return newFileStates;
    });
  }

  const contextValue = {
    fileStates,
    setFileStates,
    updateFileProgress,
    uploadOptions,
    onUpload,
    isUploading,
    setIsUploading,
    uploadingItems,
  };
  return (
    <UploadContext.Provider value={contextValue}>
      {children}
    </UploadContext.Provider>
  );
};

export default Upload;

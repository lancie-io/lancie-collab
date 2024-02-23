import { DropzoneOptions } from 'react-dropzone';

export type Progress = 'PENDING' | 'COMPLETE' | 'ERROR' | number;

export type FileState = {
  file: File;
  key: string; // used to identify the file in the progress callback
  progress: Progress;
};

export type InputProps = {
  children?: React.ReactNode;
  className?: string;
  value?: FileState[];
  onChange?: (files: FileState[]) => void | Promise<void>;
  onFilesAdded?: (addedFiles: FileState[]) => void | Promise<void>;
  disabled?: boolean;
  dropzoneOptions?: Omit<DropzoneOptions, 'disabled'>;
  noClick?: boolean;
};

export type UploadOptionsType = Omit<DropzoneOptions, 'disabled'> & {
  type?: 'single' | 'multi';
};

export type UploadingItemType = FileState & {
  url: string;
  dimensions: { width: number; height: number };
};

export type UploadContextType = {
  fileStates: FileState[];
  setFileStates: (newStates: FileState[]) => void;
  updateFileProgress: (key: string, progress: FileState['progress']) => void;
  uploadOptions: UploadOptionsType | undefined;
  onUpload: (file: UploadedFile) => void;
  isUploading: boolean;
  setIsUploading: (isUploading: boolean) => void;
  uploadingItems: UploadingItemType[];
};

export type UploadedFile = {
  name: string | null;
  url: string | null;
};

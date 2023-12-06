'use client';
import {
  Dispatch,
  SetStateAction,
  createContext,
  useContext,
  useState,
} from 'react';
import toast from 'react-hot-toast';

export type UploadedFile = {
  name: string | null;
  url: string | null;
};

interface UploadContextProps {
  uploadFile: (e: any) => void;
  isUploading: boolean;
  setIsUploading: Dispatch<SetStateAction<boolean>>;
  file: UploadedFile;
  setFile: Dispatch<SetStateAction<UploadedFile>>;
  clearUrl: () => void;
  error: string;
  setError: Dispatch<SetStateAction<string>>;
}

const UploadContext = createContext<UploadContextProps | null>(null);

export const useUpload = (): UploadContextProps => {
  const context = useContext(UploadContext);
  if (!context) {
    throw new Error('useUpload must be used within an UploadProvider');
  }
  return context;
};

interface UploadProviderProps {
  children: React.ReactNode;
  onFileChange: (file: UploadedFile) => void;
}

const UploadProvider = ({ children, onFileChange }: UploadProviderProps) => {
  const [isUploading, setIsUploading] = useState(false);
  const [file, setFile] = useState<UploadedFile>({ name: null, url: null });
  const [url, setUrl] = useState('');
  const [error, setError] = useState('');

  const uploadFile = async (e: any) => {
    setIsUploading(true);
    const file = e.target.files[0];
    if (!file) {
      setIsUploading(false);
      return;
    }
    const filename = encodeURIComponent(file.name);
    const res = await fetch(`/api/upload?filename=${filename}`);
    const data = await res.json();
    console.log('data-aws', data);
    const formData = new FormData();
    Object.entries({ ...data.post.fields, file }).forEach(
      ([key, value]: any) => {
        formData.append(key, value);
      }
    );
    const upload = await fetch(data.post.url, {
      method: 'POST',
      body: formData,
    });
    if (!res.ok || !upload.ok) {
      toast.error('Image could not be uploaded.');
      return;
    }
    setTimeout(
      () => {
        setFile({
          name: filename,
          url: `https://${process.env.NEXT_PUBLIC_AWS_S3_BUCKET_NAME}.s3.amazonaws.com/experiments/${data.timestamp}-${filename}`,
        });
        onFileChange({
          name: filename,
          url: `https://${process.env.NEXT_PUBLIC_AWS_S3_BUCKET_NAME}.s3.amazonaws.com/experiments/${data.timestamp}-${filename}`,
        });
      },

      500
    );
    setIsUploading(false);
  };

  const clearUrl = () => {
    setUrl('');
  };

  const contextValue = {
    uploadFile,
    isUploading,
    setIsUploading,
    file,
    setFile,
    clearUrl,
    error,
    setError,
  };
  return (
    <UploadContext.Provider value={contextValue}>
      {children}
    </UploadContext.Provider>
  );
};

export default UploadProvider;

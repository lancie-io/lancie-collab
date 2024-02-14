import UploadProvider, {
  UploadedFile,
} from '@/components/shared/upload/UploadProvider';
import { useBuilder } from '../../BuilderProvider';
import SummaryCoverUpload from './SummaryCoverUpload';
import SummaryForm from './SummaryForm';

interface SummaryProps {}

const Summary = () => {
  const { updateElement } = useBuilder();

  function uploadImage(file: UploadedFile) {
    console.log(file);
  }
  return (
    <div className="flex flex-col lg:flex-row w-full p-8 gap-6 bg-gradient-to-br from-[#780206] to-[#061161]">
      <div className="grow">
        <UploadProvider onFileChange={uploadImage}>
          <SummaryCoverUpload />
        </UploadProvider>
      </div>
      <div className="shrink-0 w-1/2">
        <SummaryForm />
      </div>
    </div>
  );
};

export default Summary;

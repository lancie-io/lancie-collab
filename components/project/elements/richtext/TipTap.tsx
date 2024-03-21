'use client';

import { useView } from '@/components/providers/ViewProvider';
import LiveEditor from '@/components/shared/editor/LiveEditor';
import { BuilderElementInstance } from '../../BuilderElements';
import { CustomInstance } from './RichtextBuilderElement';

interface TipTapProps {
  elementInstance: BuilderElementInstance;
  isPreview: boolean;
}

const Tiptap = ({ elementInstance, isPreview }: TipTapProps) => {
  const element = elementInstance as CustomInstance;
  const { isView } = useView();
  return (
    <div className="min-h-[150px] overflow-scroll max-h-[800px]">
      <LiveEditor
        id={element.id}
        placeholder="Write about the project..."
        editable={!isView}
      />
    </div>
  );
};

export default Tiptap;

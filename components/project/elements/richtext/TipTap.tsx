'use client';

import LiveEditor from '@/components/shared/editor/LiveEditor';
import { BuilderElementInstance } from '../../BuilderElements';
import { CustomInstance } from './RichtextBuilderElement';

interface TipTapProps {
  elementInstance: BuilderElementInstance;
  isPreview: boolean;
}

const Tiptap = ({ elementInstance, isPreview }: TipTapProps) => {
  const element = elementInstance as CustomInstance;

  return (
    <div className="min-h-[150px] overflow-scroll max-h-[800px]">
      <LiveEditor id={element.id} placeholder="Write about the project..." />
    </div>
  );
};

export default Tiptap;

'use client';

import Editor from '@/components/shared/editor';
import { useLiveblocks } from '@/lib/liveblocks';
import { JSONContent } from '@tiptap/react';
import { BuilderElementInstance } from '../../BuilderElements';
import { CustomInstance } from './RichtextBuilderElement';

interface TipTapProps {
  elementInstance: BuilderElementInstance;
  isPreview: boolean;
}

const Tiptap = ({ elementInstance, isPreview }: TipTapProps) => {
  const element = elementInstance as CustomInstance;
  const { updateElement } = useLiveblocks();

  function updateContent(content: JSONContent) {
    updateElement(element.id, {
      ...element,
      extraAttributes: {
        ...element.extraAttributes,
        content: content,
      },
    });
  }

  return (
    <div className="min-h-[150px] overflow-scroll max-h-[300px]">
      <Editor
        onUpdate={updateContent}
        json={element.extraAttributes.content as unknown as JSONContent}
      />
    </div>
  );
};

export default Tiptap;

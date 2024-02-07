'use client';

import {
  BuilderElementInstance,
  BuilderElements,
} from '@/components/project/BuilderElements';
import PreviewModuleBar from '@/components/project/elements/shared/PreviewModuleBar';
import { cn } from '@/lib/utils';

interface ClientParentProps {
  elements: BuilderElementInstance[];
}

const Modules = ({ elements }: ClientParentProps) => {
  return (
    // <BuilderProvider>
    <div className="grow overflow-scroll flex flex-col gap-4 py-4 px-[100px]">
      {elements.map((element) => {
        const BuilderElement = BuilderElements[element.type].previewComponent;
        return (
          <div
            key={element.id}
            className={cn('border bg-background rounded-lg relative shrink-0')}
          >
            <PreviewModuleBar element={element} />
            <BuilderElement elementInstance={element} />
          </div>
        );
      })}
    </div>
    // </BuilderProvider>
  );
};

export default Modules;

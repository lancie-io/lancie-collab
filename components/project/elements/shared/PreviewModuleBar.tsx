'use client';
import { BuilderElementInstance } from '../../BuilderElements';
import CommentButton from './CommentButton';

interface ModuleBarProps {
  element: BuilderElementInstance;
}

const PreviewModuleBar = ({ element }: ModuleBarProps) => {
  const { label } = element.extraAttributes;
  return (
    <div className="flex items-center h-12 border-b gap-2 px-3 relative justify-between">
      <div className="flex items-center gap-2">
        <div className="h-4 w-1 bg-primary rounded-lg" />
        <span className="font-medium">{label}</span>
      </div>
      <CommentButton element={element} />
    </div>
  );
};

export default PreviewModuleBar;

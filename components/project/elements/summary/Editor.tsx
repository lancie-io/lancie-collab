import { BuilderElementInstance } from '../../BuilderElements';
import Tiptap from './TipTap';

const Editor = ({
  elementInstance,
}: {
  elementInstance: BuilderElementInstance;
}) => {
  return (
    <div>
      <Tiptap elementInstance={elementInstance} />
    </div>
  );
};

export default Editor;

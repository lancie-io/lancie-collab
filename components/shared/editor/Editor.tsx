import { useRoom } from '@/liveblocks.config';
import LiveblocksProvider from '@liveblocks/yjs';
import { useEffect, useState } from 'react';
import * as Y from 'yjs';

import { TiptapEditor } from './TipTapEditor';

interface EditorProps {
  placeholder?: string;
  editable?: boolean;
}

const Editor = ({ placeholder, editable = true }: EditorProps) => {
  const room = useRoom();
  const [doc, setDoc] = useState<Y.Doc>();
  const [provider, setProvider] = useState<any>();

  useEffect(() => {
    const yDoc = new Y.Doc();
    const yProvider = new LiveblocksProvider(room, yDoc);
    setDoc(yDoc);
    setProvider(yProvider);
    return () => {
      yDoc?.destroy();
      yProvider?.destroy();
    };
  }, [room]);
  if (!doc || !provider) return null;

  return (
    <TiptapEditor
      placeholder={placeholder}
      editable={editable}
      doc={doc}
      provider={provider}
    />
  );
};

export default Editor;

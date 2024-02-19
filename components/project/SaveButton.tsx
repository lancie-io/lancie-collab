'use client';
import { saveProject } from '@/lib/actions';
import { useLiveblocks } from '@/lib/liveblocks';
import { Loader2, Save } from 'lucide-react';
import { useState } from 'react';
import toast from 'react-hot-toast';
import { Button } from '../ui/button';

interface SaveButtonProps {
  projectId: string;
}

const SaveButton = ({ projectId }: SaveButtonProps) => {
  const { elements } = useLiveblocks();
  const [loading, setLoading] = useState(false);
  const handleClick = async () => {
    setLoading(true);
    const jsonElements = JSON.stringify(elements);
    const res = await saveProject(projectId, jsonElements);
    if (res.success) {
      toast.success(res.message);
    } else {
      toast.error(res.message);
    }
    setLoading(false);
  };
  return (
    <Button
      onClick={handleClick}
      size="iconSmall"
      variant="secondary"
      disabled={loading}
    >
      {!loading && (
        <>
          <Save className="w-4 h-4" />
        </>
      )}
      {loading && <Loader2 className="animate-spin w-4 h-4" />}
    </Button>
  );
};

export default SaveButton;

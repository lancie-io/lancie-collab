'use client';
import { saveProject } from '@/lib/actions';
import { Loader2, Save } from 'lucide-react';
import { useState } from 'react';
import toast from 'react-hot-toast';
import { Button } from '../ui/button';
import useBuilder from './hooks/useBuilder';

interface SaveButtonProps {
  id: string;
}

const SaveButton = ({ id }: SaveButtonProps) => {
  const { elements } = useBuilder();
  const [loading, setLoading] = useState(false);
  const handleClick = async () => {
    setLoading(true);
    const jsonElements = JSON.stringify(elements);
    const res = await saveProject(id, jsonElements);
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
      size="sm"
      variant="secondary"
      disabled={loading}
      className="w-[80px]"
    >
      {!loading && (
        <>
          <Save className="w-4 h-4" />
          Save
        </>
      )}
      {loading && <Loader2 className="animate-spin w-4 h-4" />}
    </Button>
  );
};

export default SaveButton;

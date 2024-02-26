'use client';

import { useProjectId } from '@/components/providers/ProjectProvider';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Check, Link } from 'lucide-react';
import { useState } from 'react';
import InfoTooltip from './InfoTooltip';

const copyToClipboard = async (text: string) => {
  try {
    await navigator.clipboard.writeText(text);
  } catch {
    return;
  }
};

const PublishArea = () => {
  const projectId = useProjectId();
  const [copiedToClipboard, setCopiedToClipboard] = useState(false);

  const handleCopy = () => {
    copyToClipboard(
      `${process.env.NEXT_PUBLIC_HOST_URL}/app/project/${projectId}`
    );
    setCopiedToClipboard(true);
    setTimeout(() => {
      setCopiedToClipboard(false);
    }, 5000);
  };

  return (
    <div className="space-y-2">
      <div className="flex items-center gap-1.5">
        <Label>Publish board</Label>
        <InfoTooltip>
          Share this link with your clients and stakeholders. They will be able
          to view but not edit the board.
        </InfoTooltip>
      </div>
      <Input
        value={`${process.env.NEXT_PUBLIC_HOST_URL}/app/project/${projectId}`}
        readOnly
      />
      {copiedToClipboard ? (
        <Button className="w-full" variant="success">
          <Check className="w-4 h-4" />
          Copied to clipboard!
        </Button>
      ) : (
        <Button className="w-full" variant="primary" onClick={handleCopy}>
          <Link className="w-4 h-4" />
          Copy Link
        </Button>
      )}
    </div>
  );
};

export default PublishArea;

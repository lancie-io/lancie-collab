'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { generateInviteLink } from '@/lib/actions';
import { cn } from '@/lib/utils';
import { Check, Copy, Loader2 } from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner';

const GenerateLinkButton = ({ projectId }: { projectId: string }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [inviteId, setInviteId] = useState();

  const handleClick = async () => {
    setIsLoading(true);
    const res = await generateInviteLink(projectId);
    if (res.success) {
      setInviteId(res.data.id);
    } else {
      toast.error('Failed to generate invite link');
    }
    setIsLoading(false);
  };

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(
        process.env.NEXT_PUBLIC_HOST_URL + '/invite/' + inviteId
      );
      toast.success('Invite link copied to clipboard');
    } catch {
      return;
    }
  };
  return (
    <div className="w-full space-y-2">
      <Button
        variant="secondary"
        onClick={handleClick}
        disabled={isLoading}
        className={cn('w-full', inviteId && 'bg-green-500 pointer-events-none')}
      >
        {isLoading && <Loader2 className="animate-spin w-4 h-4" />}
        {inviteId ? <Check className="w-4 h-4" /> : null}
        {inviteId ? 'Link generated' : 'Generate Invite Link'}
      </Button>
      {inviteId && (
        <div>
          <div className="flex gap-2">
            <Input
              value={process.env.NEXT_PUBLIC_HOST_URL + '/invite/' + inviteId}
              readOnly
            />
            <Button variant="secondary" onClick={copyToClipboard}>
              <Copy className="w-4 h-4" />
              Copy
            </Button>
          </div>
          <p className="text-green-500 text-xs mt-1">
            Everyone with this link will be able to join your project as an
            editor.
          </p>
        </div>
      )}
    </div>
  );
};

export default GenerateLinkButton;

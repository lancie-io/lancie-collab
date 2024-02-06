'use client';

import { Button } from '@/components/ui/button';
import { handleInvite } from '@/lib/actions';
import { Loader2 } from 'lucide-react';
import { useState } from 'react';

const JoinButton = ({ inviteId }: { inviteId: string }) => {
  const [isLoading, setIsLoading] = useState(false);

  const handleClick = async () => {
    setIsLoading(true);
    await handleInvite(inviteId);
    return;
  };
  return (
    <Button
      variant="primary"
      size="mega"
      onClick={handleClick}
      disabled={isLoading}
    >
      {isLoading && <Loader2 className="animate-spin w-4 h-4" />}
      Join now
    </Button>
  );
};

export default JoinButton;

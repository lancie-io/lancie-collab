'use client';
import { Button, ButtonProps } from '@/components/ui/button';
import { removeInvite, removeUserFromProject } from '@/lib/actions';
import { cn } from '@/lib/utils';
import { Loader2, Trash } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { toast } from 'sonner';
import { MemberType } from './MemberTable';

interface DeleteButtonProps extends ButtonProps {
  projectId: string;
  member: {
    email: string | null;
    type: MemberType;
  };
}

const DeleteButton = ({ className, projectId, member }: DeleteButtonProps) => {
  const [isDeleting, setIsDeleting] = useState(false);
  const router = useRouter();
  const handleDelete = async () => {
    const email = member.email as string;
    setIsDeleting(true);
    let res = {
      success: false,
      message: 'Removal failed.',
    };
    if (member.type === 'invited') {
      // delete invite
      res = await removeInvite(projectId, email);
    }
    if (member.type === 'editor') {
      // remove member
      res = await removeUserFromProject(projectId, email);
    }
    if (res.success) {
      toast.success(res.message);
    } else {
      toast.error(res.message);
    }
    router.refresh();
    setIsDeleting(false);
  };
  return (
    <Button
      variant="ghost"
      className={cn(className)}
      size="iconXS"
      onClick={handleDelete}
    >
      {!isDeleting && <Trash className="w-3 h-3" />}
      {isDeleting && <Loader2 className="animate-spin w-3 h-3" />}
    </Button>
  );
};

export default DeleteButton;

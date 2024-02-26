'use client';
import { removeInvite } from '@/lib/actions';
import { useEffect } from 'react';

const ClientSideSetter = ({ projectId }: { projectId: string }) => {
  useEffect(() => {
    const remove = async () => {
      const res = await removeInvite(projectId);
      console.log('invite removed', res);
    };
    remove();
  }, [projectId]);
  return <></>;
};

export default ClientSideSetter;

'use client';
import { removeInvite } from '@/lib/actions';
import { COLORS } from '@/lib/constants';
import { useOthers, useUpdateMyPresence } from '@/liveblocks.config';
import { useEffect } from 'react';

const colors = COLORS;

const ClientSideSetter = ({ projectId }: { projectId: string }) => {
  const updateMyPresence = useUpdateMyPresence();
  const others = useOthers();

  useEffect(() => {
    let assignedColors = others.map((other) => other.presence.color);
    let possibleColors = colors.filter(
      (color) => !assignedColors.includes(color)
    );
    let color = possibleColors[0];
    updateMyPresence({ color });
  }, [projectId, updateMyPresence, others]);
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

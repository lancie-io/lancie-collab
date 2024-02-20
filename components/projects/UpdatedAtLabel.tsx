import { getUpdatedAtValue } from '@/lib/actions';
import { Prisma } from '@prisma/client';
import { useQuery } from '@tanstack/react-query';
import { formatDistance } from 'date-fns';

const UpdatedAtLabel = ({
  projectId,
  updatedAt,
}: {
  projectId: string;
  updatedAt: Prisma.ProjectGetPayload<{
    select: {
      updatedAt: true;
    };
  }>['updatedAt'];
}) => {
  const { data } = useQuery({
    queryKey: ['updatedAt', projectId],
    queryFn: async () => getUpdatedAtValue(projectId),
    placeholderData: updatedAt,
  });
  return (
    <h3 className="text-muted-foreground text-sm">
      Edited{' '}
      {formatDistance(data!, new Date(), {
        addSuffix: true,
      })}
    </h3>
  );
};

export default UpdatedAtLabel;

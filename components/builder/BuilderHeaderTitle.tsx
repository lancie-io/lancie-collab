import { getProject } from '@/lib/actions';
import Title from '../shared/Title';

const BuilderHeaderTitle = async ({ projectId }: { projectId: string }) => {
  const p = await getProject(projectId);

  return <Title className="text-base font-medium">{p?.name}</Title>;
};

export default BuilderHeaderTitle;

import Title from '../shared/Title';
import { getProject } from './functions';

const BuilderHeaderTitle = async ({ projectId }: { projectId: string }) => {
  const p = await getProject(projectId);

  return <Title className="text-base font-medium">{p.name}</Title>;
};

export default BuilderHeaderTitle;

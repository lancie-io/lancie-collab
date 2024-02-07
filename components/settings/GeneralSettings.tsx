import { getAuthUser } from '@/lib/auth';
import prisma from '@/lib/prisma';
import GeneralSettingsForm from './GeneralSettingsForm';

const GeneralSettings = async () => {
  const user = await getAuthUser();
  const userData = await prisma.user.findUnique({
    where: {
      id: user?.id,
    },
  });
  return <GeneralSettingsForm user={userData} />;
};

export default GeneralSettings;

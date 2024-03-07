import visualBuilding from '@/public/visual-building.png';
import visualCollaborating from '@/public/visual-collaboration.png';
import visualSharing from '@/public/visual-sharing.png';
import colors from '@/resolveConfig';
import Image from 'next/image';
import { ReactNode } from 'react';

export type FlipperData = {
  label: string;
  fromColor: string;
  toColor: string;
  title: ReactNode;
  description: string;
  visual: ReactNode;
  classNameText?: string;
  classNameVisual?: string;
  narrow?: boolean;
};

export const flippers: FlipperData[] = [
  {
    label: 'Create',
    fromColor: colors.emerald[500],
    toColor: colors.emerald[600],
    title: (
      <>
        Craft beautiful concepts.
        <br />
        Breathtakingly fast.
      </>
    ),
    description:
      "Don't start from scratch. Pre-built modules help you structure creative thoughts quickly.",
    visual: (
      <Image
        src={visualBuilding}
        alt="Lancie building block UI"
        sizes="(max-width: 768px) 400px, 900px"
      />
    ),
  },
  {
    label: 'Pitch',
    fromColor: colors.cyan[500],
    toColor: colors.cyan[600],
    title: (
      <>
        Share instantly.
        <br />
        Impress clients.
      </>
    ),
    description:
      'Share your Lancie board with clients and stakeholders in one-click.',

    visual: (
      <Image
        src={visualSharing}
        alt="Lancie sharing UI"
        sizes="(max-width: 768px) 400px, 600px"
      />
    ),
    classNameVisual: 'col-span-12 md:col-span-5 md:col-start-2',
    classNameText: 'col-span-12 md:col-span-5',
    narrow: true,
  },
  {
    label: 'Collaborate',
    fromColor: colors.fuchsia[500],
    toColor: colors.fuchsia[600],
    title: (
      <>
        Invite collaborators.
        <br />
        Align perfectly.
      </>
    ),
    description:
      'Move beyond emails, spreadsheets and other tools. Ideate, collaborate and manage files all in one place. In real-time.',
    visual: (
      <Image
        src={visualCollaborating}
        alt="Lancie collaborating users"
        sizes="(max-width: 768px) 400px, 900px"
      />
    ),
  },
];

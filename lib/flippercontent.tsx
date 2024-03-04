import colors from '@/resolveConfig';
import { ReactNode } from 'react';

export type FlipperData = {
  label: string;
  fromColor: string;
  toColor: string;
  title: ReactNode;
  description: string;
  visual: ReactNode;
};

export const flippers: FlipperData[] = [
  {
    label: 'Create',
    fromColor: colors.green[500],
    toColor: colors.green[600],
    title: (
      <>
        Craft beautiful concepts.
        <br />
        Breathtakingly fast.
      </>
    ),
    description:
      "Don't start from scratch. Pre-built modules help you structure creative thoughts quickly.",
    visual: <div>Animation Move</div>,
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
    visual: <div>Animation Share</div>,
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
    visual: <div>Animation Collaborate</div>,
  },
];

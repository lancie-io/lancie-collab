export type FlipperData = {
  keyword: string;
  colorClass: string;
  title: string;
  description: string;
};

export const flippers: FlipperData[] = [
  {
    keyword: 'Create',
    colorClass: 'text-green-500',
    title: 'Craft beautiful video concepts in seconds.',
    description:
      'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua.',
  },
  {
    keyword: 'Pitch',
    colorClass: 'text-fuchsia-500',
    title: 'Impress clients with a stunning pitch deck.',
    description:
      'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua.',
  },
  {
    keyword: 'Collaborate',
    colorClass: 'text-blue-500',
    title: 'Get everyone onboard. Realtime.',
    description:
      'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua.',
  },
];

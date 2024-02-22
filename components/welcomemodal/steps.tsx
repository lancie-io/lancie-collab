export const getStepsWithUserName = (name: string) => [
  {
    label: 'Welcome',
    title: (
      <>
        Welcome {name}.<br />
        Say hi to Lancie.
      </>
    ),
    content: 'A new way to build up next-level video projects.',
    image: '/step-welcome.jpg',
    id: 0,
  },
  {
    label: 'Create',
    title: (
      <>
        Create
        <br />
        custom boards.
      </>
    ),
    content: 'New video project. New board. Better process.',
    image: '/step-build.jpg',
    id: 1,
  },
  {
    label: 'Build',
    title: (
      <>
        Build
        <br />
        modularly.
      </>
    ),
    content:
      'Lancie is designed upon the concept of modules. Drag them in and create concepts with ease.',
    image: '/step-build.jpg',
    id: 2,
  },
  {
    label: 'Publish',
    title: (
      <>
        Publish
        <br />
        your boards.
      </>
    ),
    content:
      'Share public board links with clients. Keep edit access to your collaborators.',
    image: '/step-publish.jpg',
    id: 3,
  },
  {
    label: 'Collaborate',
    title: (
      <>
        Collaborate
        <br />
        with team mates.
      </>
    ),
    content: 'Invite your team and stakeholders into the project with ease.',
    image: '/step-collaborate.jpg',
    id: 4,
  },
];

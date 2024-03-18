import step3Img from '@/public/visual-building.png';
import step5Img from '@/public/visual-collaboration.png';
import step2Img from '@/public/visual-lancie.png';
import step4Img from '@/public/visual-sharing.png';
import step1Img from '@/public/visual-welcome.png';
import Image from 'next/image';

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
    image: (
      <Image
        className="absolute bottom-0 right-0 w-[90%]"
        src={step1Img}
        alt=""
        sizes="500px"
      />
    ),
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
    image: (
      <Image
        key={1}
        className="absolute -bottom-4 right-0 w-[95%]"
        src={step2Img}
        alt=""
        sizes="500px"
      />
    ),
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
    image: (
      <Image key={2} className="w-[110%]" src={step3Img} alt="" sizes="500px" />
    ),
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
    image: (
      <Image
        key={3}
        className="h-[90%] w-auto"
        src={step4Img}
        alt=""
        sizes="500px"
      />
    ),
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
    image: (
      <Image key={4} className="w-[90%]" src={step5Img} alt="" sizes="500px" />
    ),
    id: 4,
  },
];

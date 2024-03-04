import { icons } from 'lucide-react';
import Container from '../shared/Container';
import LucideIcon from '../shared/LucideIcon';
import Title from '../shared/Title';

type TDetail = {
  title: string;
  description: string;
  icon: keyof typeof icons;
};

const detailsData: TDetail[] = [
  {
    title: 'Moodboard',
    description: 'Visualize ideas and create a tone for the movie.',
    icon: 'Images',
  },
  {
    title: 'Files Manager',
    description: 'Upload your files and keep them organized.',
    icon: 'File',
  },
  {
    title: 'Location Scouting',
    description: 'Find the perfect location for your next shoot.',
    icon: 'Map',
  },
  {
    title: 'Financials',
    description: 'Track your budget and expenses.',
    icon: 'DollarSign',
  },
  {
    title: 'Reference Media',
    description: 'Keep all your reference media in one place.',
    icon: 'Video',
  },
  {
    title: 'Deliverables',
    description:
      'Keep track of different video formats and distribution channels.',
    icon: 'Group',
  },
  {
    title: 'Script',
    description: 'Write down your movie script and screenplay.',
    icon: 'Pen',
  },
  {
    title: 'Team',
    description: 'Assign crew and stakeholders to tasks.',
    icon: 'Users',
  },
];

const DetailsOverview = () => {
  return (
    <section id="detailsoverview">
      <Container className="space-y-8 max-w-[1200px]">
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-6">
          <Title className="text-2xl sm:text-3xl lg:text-4xl">
            Ready
            <br />
            for everything
          </Title>
          {detailsData.map((detail, idx) => (
            <Detail detail={detail} key={idx} />
          ))}
        </div>
      </Container>
    </section>
  );
};

export default DetailsOverview;

interface DetailProps {
  detail: TDetail;
}

const Detail = ({ detail }: DetailProps) => {
  const { title, description, icon } = detail;
  return (
    <div className="p-5 md:p-6 rounded-xl border space-y-3">
      <LucideIcon
        name={icon}
        className="text-brand-600 w-9 h-9  md:w-12 md:h-12"
      />
      <p className="md:text-lg font-medium text-muted-foreground">
        <span className="text-foreground">{title}. </span>
        {description}
      </p>
    </div>
  );
};

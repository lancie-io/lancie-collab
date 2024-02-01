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
    title: 'Comments',
    description: 'Get feedback from your team and clients.',
    icon: 'MessagesSquare',
  },
  {
    title: 'File Upload',
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
    description: 'Keep track of your budget and expenses.',
    icon: 'DollarSign',
  },
  {
    title: 'Reference Media',
    description: 'Keep all your reference media in one place.',
    icon: 'Video',
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

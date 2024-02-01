import { cn } from '@/lib/utils';
import Title from '../shared/Title';

interface InfoBlockProps {
  keyword: string;
  title: string;
  description: string;
}

const InfoBlock = ({ keyword, title, description }: InfoBlockProps) => {
  return (
    <div className="space-y-4">
      <span className={cn('uppercase font-medium tracking-wider')}>
        {keyword}
      </span>
      <Title as="h2" className="font-bold text-4xl">
        {title}
      </Title>
      <p className="text-lg text-muted-foreground">{description}</p>
    </div>
  );
};

export default InfoBlock;

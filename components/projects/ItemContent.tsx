import { Prisma } from '@prisma/client';
import { Loader2 } from 'lucide-react';
import Link from 'next/link';
import OptimizedImage from '../shared/OptimizedImage';
import Title from '../shared/Title';
import { useUpload } from '../shared/upload/UploadProvider';

interface ItemContentProps {
  project: Prisma.ProjectGetPayload<{}>;
}

const ItemContent = ({ project }: ItemContentProps) => {
  const { isUploading } = useUpload();
  return (
    <Link
      href={`/app/project/${project.id}`}
      className="absolute left-0 top-0 w-full h-full grid place-items-center"
    >
      {project.cover && (
        // <Image src={project.cover} alt="cover" fill objectFit="cover" />
        <OptimizedImage src={project.cover} steps={[500]} />
      )}
      {isUploading && <Loader2 className="animate-spin w-16 h-16 absolute" />}
      {!project.cover && !isUploading && (
        <Title mega className="text-muted-foreground text-6xl absolute">
          {abbreviate(project.name as string)}
        </Title>
      )}
    </Link>
  );
};

export default ItemContent;

function abbreviate(name: string): string {
  const words = name.split(' ');

  if (words.length === 1) {
    // If it's one word, take the first two letters
    return words[0].substring(0, 2).toUpperCase();
  } else if (words.length === 2 || words.length === 3) {
    // If it's two or three words, take the first letter of each word
    const abbreviation = words
      .map((word) => word.charAt(0).toUpperCase())
      .join('');
    return abbreviation;
  } else {
    // If it's more than three words, only consider the first three words
    const abbreviation = words
      .slice(0, 3)
      .map((word) => word.charAt(0).toUpperCase())
      .join('');
    return abbreviation;
  }
}

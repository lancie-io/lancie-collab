import Avatar from '@/components/shared/Avatar';
import { Badge } from 'lucide-react';

export type PersonT = {
  name?: string;
  email?: string;
  image?: string;
  role?: string;
};

const Person = ({ person }: { person: PersonT }) => {
  return (
    <div className="border border-foreground/20 rounded-md flex flex-col items-center gap-2 p-4">
      <Avatar user={person} className="w-16 h-16" />
      <span className="font-medium">{person.name}</span>
      <Badge>{person.role}</Badge>
    </div>
  );
};

export default Person;

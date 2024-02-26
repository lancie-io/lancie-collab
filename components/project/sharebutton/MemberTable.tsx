import { Badge } from '@/components/ui/badge';
import { Label } from '@/components/ui/label';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import prisma from '@/lib/prisma';
import { capitalize, cn } from '@/lib/utils';
import DeleteButton from './DeleteButton';

export type MemberType = 'owner' | 'editor' | 'invited';

interface MemberTableProps {
  projectId: string;
}

const MemberTable = async ({ projectId }: MemberTableProps) => {
  const project = await prisma.project.findUnique({
    where: {
      id: projectId,
    },
    include: {
      members: true,
      user: true,
      invites: {
        where: {
          toEmail: {
            not: null,
          },
        },
      },
    },
  });
  const membersEmails = project?.members.map((member) => member.email) || [];
  const invitedEmails = project?.invites.map((invite) => invite.toEmail) || [];
  const allEmails = [...new Set([...membersEmails, ...invitedEmails])];
  const mergedMembers: {
    email: string | null;
    type: MemberType;
  }[] = allEmails.map((email) => {
    const isMember = project?.members.some((member) => member.email === email);
    const isOwner = project?.user.email === email;
    const hasInvite = project?.invites.some(
      (invite) => invite.toEmail === email
    );
    const isMemberWithoutInvite = isMember && !hasInvite;
    const memberType: MemberType = isOwner
      ? 'owner'
      : isMemberWithoutInvite
      ? 'editor'
      : 'invited';
    return {
      email: email,
      type: memberType, // Check if member or invited
    };
  });
  //list all project members that dont have an invite

  return (
    <div className="space-y-1.5">
      <Label className="">Collaborators</Label>
      <div className="border rounded-md max-h-[235px] overflow-y-scroll">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>User</TableHead>
              <TableHead>Type</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {mergedMembers.map((member) => {
              return (
                <TableRow key={member.email} className="group">
                  <TableCell className="relative">
                    {member.email}
                    {member.type !== 'owner' && (
                      <DeleteButton
                        member={member}
                        projectId={projectId}
                        className="opacity-0 absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none group-hover:pointer-events-auto group-hover:opacity-50 hover:opacity-100"
                      />
                    )}
                  </TableCell>
                  <TableCell className="font-medium">
                    <RoleBadge role={member.type} />
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default MemberTable;

const RoleBadge = ({ role }: { role: string }) => {
  let variant:
    | 'default'
    | 'secondary'
    | 'outline'
    | 'destructive'
    | null
    | undefined = 'default';
  switch (role) {
    case 'owner':
      variant = 'default';
      break;
    case 'editor':
      variant = 'secondary';
      break;
    default:
      variant = 'outline';
  }

  return (
    <Badge
      variant={variant}
      className={cn(role === 'invited' && 'text-muted-foreground')}
    >
      {capitalize(role)}
    </Badge>
  );
};

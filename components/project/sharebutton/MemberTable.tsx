import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import prisma from '@/lib/prisma';

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
    },
  });
  return (
    <div>
      <h3 className="text-sm font-medium mb-2">People with access</h3>
      <div className="border rounded-md">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>User</TableHead>
              <TableHead>Type</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {project?.members.map((member) => {
              const isOwner = member.email == project.user.email;
              return (
                <TableRow key={member.id}>
                  <TableCell>{member.email}</TableCell>
                  <TableCell>{isOwner ? 'Owner' : 'Editor'}</TableCell>
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

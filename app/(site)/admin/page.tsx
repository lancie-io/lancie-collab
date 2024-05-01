import Avatar from '@/components/shared/Avatar';
import Container from '@/components/shared/Container';
import Title from '@/components/shared/Title';
import { buttonVariants } from '@/components/ui/button';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import prisma from '@/lib/prisma';
import { cn } from '@/lib/utils';
import { format } from 'date-fns';
import Link from 'next/link';

export default async function AdminPage() {
  const projects = await prisma.project.findMany({
    orderBy: {
      createdAt: 'desc',
    },
    include: {
      user: true,
    },
  });
  return (
    <div className="py-12 md:py-20 ">
      <Container className="space-y-6">
        <Title>Projects</Title>
        <div className="border rounded-lg">
          <Table>
            <TableCaption>A list of your recent invoices.</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[100px]">Name</TableHead>
                <TableHead>Created at</TableHead>
                <TableHead>User</TableHead>
                <TableHead>Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {projects.map((p) => (
                <TableRow key={p.id}>
                  <TableCell className="font-medium">{p.name}</TableCell>
                  <TableCell>
                    <p>
                      {format(p.createdAt, 'MMM do, yyyy')}{' '}
                      <span className="text-muted-foreground">
                        {format(p.createdAt, 'hh:mm a')}
                      </span>
                    </p>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1.5">
                      <Avatar
                        user={{
                          name: p.user.name,
                          image: p.user.image,
                        }}
                      />
                      <div>
                        <p>{p.user.name}</p>
                        <p className="text-muted-foreground">{p.user.email}</p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="w-16">
                    {/* <ProjectModalButton projectId={p.id} /> */}
                    <Link
                      className={cn(buttonVariants())}
                      href={`/admin/${p.id}`}
                    >
                      View project
                    </Link>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </Container>
    </div>
  );
}

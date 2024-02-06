import Container from '@/components/shared/Container';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { buttonVariants } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { ShieldX } from 'lucide-react';
import Link from 'next/link';

const UnauthorizedPage = () => {
  return (
    <div className="grow grid place-items-center">
      <Container className="flex justify-center">
        <Alert className="max-w-[400px]" variant="destructive">
          <ShieldX className="h-4 w-4" />
          <AlertTitle>Access denied!</AlertTitle>
          <AlertDescription className="space-y-2">
            <p>You are not authorized to access this project.</p>

            <Link
              href="/app"
              className={cn(buttonVariants({ variant: 'default' }))}
            >
              View my projects
            </Link>
          </AlertDescription>
        </Alert>
      </Container>
    </div>
  );
};

export default UnauthorizedPage;

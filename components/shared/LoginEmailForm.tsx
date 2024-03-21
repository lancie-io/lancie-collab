'use client';
import { zodResolver } from '@hookform/resolvers/zod';
import { Loader2 } from 'lucide-react';
import { signIn } from 'next-auth/react';
import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';
import { trackEvent } from '../providers/Analytics';
import { Button } from '../ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '../ui/form';
import { Input } from '../ui/input';

const formSchema = z.object({
  email: z.string(),
});

const LoginEmailForm = () => {
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get('callbackUrl');
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: undefined,
    },
  });
  const isSubmitting = form.formState.isSubmitting;
  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    const newUrl = new URL(
      callbackUrl || `${process.env.NEXT_PUBLIC_HOST_URL}/app`
    );
    newUrl.searchParams.set('login_success', 'true');
    trackEvent('LoginButton Clicked', { provider: 'email' });
    toast.info(newUrl.toString());
    signIn('email', {
      email: values.email,
      callbackUrl: newUrl.toString(),
    });
  }

  useEffect(() => {
    return () => {
      setIsLoading(false);
    };
  }, []);

  const handleOpen = () => {
    setIsOpen(true);
  };
  return (
    <>
      {/* {!isOpen && (
        <Button className="w-[240px]" variant="outline" onClick={handleOpen}>
          Login with Email
        </Button>
      )} */}
      {true && (
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="w-[240px] flex"
          >
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      {...field}
                      disabled={isLoading}
                      placeholder="Enter email..."
                      style={{
                        borderTopLeftRadius: 6,
                        borderBottomLeftRadius: 6,
                        borderTopRightRadius: 0,
                        borderBottomRightRadius: 0,
                      }}
                    />
                  </FormControl>
                  <FormMessage className="absolute" />
                </FormItem>
              )}
            />
            <Button
              style={{
                borderTopLeftRadius: 0,
                borderBottomLeftRadius: 0,
                borderTopRightRadius: 6,
                borderBottomRightRadius: 6,
              }}
              className="ring-offset-0 w-[67px]"
              type="submit"
              disabled={isLoading}
            >
              {isLoading ? <Loader2 className="animate-spin" /> : 'Send'}
            </Button>
          </form>
        </Form>
      )}
    </>
  );
};

export default LoginEmailForm;

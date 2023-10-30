import { Button, ButtonProps } from '@/components/ui/button';
import { cn, generateStatusStrings } from '@/lib/utils';

interface FormSubmitButtonProps extends ButtonProps {
  label: string;
  isSubmitting: boolean;
}

const FormSubmitButton = ({
  label,
  isSubmitting,
  ...props
}: FormSubmitButtonProps) => {
  const { className } = props;
  const statusStrings = generateStatusStrings(label);

  return (
    <Button className={cn('', className)} type="submit" disabled={isSubmitting}>
      {isSubmitting ? statusStrings.submitting : statusStrings.default}
    </Button>
  );
};

export default FormSubmitButton;

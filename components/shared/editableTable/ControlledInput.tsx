import { Input, InputProps } from '@/components/ui/input';
import { useState } from 'react';

interface ControlledInputProps extends InputProps {
  initialValue: string | undefined;
}

const ControlledInput = ({ initialValue, ...props }: ControlledInputProps) => {
  const [value, setValue] = useState<string>(initialValue || '');
  return (
    <Input
      className="min-w-0 w-full"
      value={value}
      onChange={(e) => setValue(e.target.value)}
      {...props}
    />
  );
};

export default ControlledInput;

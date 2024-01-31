import { useState } from 'react';
import { Input } from '../ui/input';

interface EditableLabelProps {
  label: string;
}

const EditableLabel = ({ label }: EditableLabelProps) => {
  const [value, setValue] = useState(label);
  return <Input value={value} onChange={(e) => setValue(e.target.value)} />;
};

export default EditableLabel;

'use client';

import { useLocalStorage } from '@uidotdev/usehooks';
import { Label } from '../ui/label';
import { Switch } from '../ui/switch';

const DevSettings = () => {
  const [isCustomCursor, setIsCustomCursor] = useLocalStorage(
    'custom-cursor',
    false
  );
  return (
    <div className="max-w-[400px]">
      <div className="flex justify-between items-center">
        <Label className="text-base">Show Custom Cursor</Label>
        <Switch
          checked={isCustomCursor}
          onCheckedChange={() =>
            setIsCustomCursor((isCustomCursor) => !isCustomCursor)
          }
        />
      </div>
    </div>
  );
};

export default DevSettings;

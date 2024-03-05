'use client';

import useLocalStorage from '@/lib/hooks/useLocalStorage';
import { Label } from '../ui/label';
import { Switch } from '../ui/switch';

const DevSettings = () => {
  const [showCustomCursor, setShowCustomCursor] = useLocalStorage(
    'show-custom-cursor',
    false
  );
  const [showTrackingEventToast, setShowTrackingEventToast] = useLocalStorage(
    'show-tracking-event-toast',
    false
  );
  return (
    <div className="max-w-[400px] space-y-8">
      <div className="flex justify-between items-center">
        <Label className="text-base">Show custom cursor</Label>
        <Switch
          key="cursor"
          checked={showCustomCursor}
          onCheckedChange={() =>
            setShowCustomCursor(
              (showCustomCursor: boolean) => !showCustomCursor
            )
          }
        />
      </div>
      <div className="flex justify-between items-center">
        <Label className="text-base">Show tracking event toasts</Label>
        <Switch
          key={'tracking'}
          checked={showTrackingEventToast}
          onCheckedChange={() =>
            setShowTrackingEventToast(
              (showTrackingEventToast: boolean) => !showTrackingEventToast
            )
          }
        />
      </div>
    </div>
  );
};

export default DevSettings;

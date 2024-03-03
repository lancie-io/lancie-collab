'use client';
import Container from '@/components/shared/Container';
import Title from '@/components/shared/Title';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { useLocalStorage } from '@uidotdev/usehooks';

const DevPage = () => {
  const [isCustomCursor, setIsCustomCursor] = useLocalStorage(
    'custom-cursor',
    false
  );
  return (
    <div className="py-12 md:py-20">
      <Container>
        <div className="pb-6 md:py-10">
          <Title>Dev Settings</Title>
          <p className="text-primary mt-1">
            Back in the app, after any settings update, refresh the browser
            (CMD+R) to make sure that changes take effect.
          </p>
        </div>
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
      </Container>
    </div>
  );
};

export default DevPage;

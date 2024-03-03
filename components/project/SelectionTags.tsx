import { getPresenceColor } from '@/lib/utils';
import { useOthers } from '@/liveblocks.config';
import { AnimatePresence } from 'framer-motion';
import SelectionTag from './SelectionTag';

const SelectionTags = ({ elementId }: { elementId: string }) => {
  const others = useOthers();
  return (
    <div className="absolute -translate-y-full top-0 right-3 flex gap-2 overflow-hidden">
      <AnimatePresence>
        {others.map(({ connectionId, presence, info, id }) => {
          if (presence.selectedModule !== elementId) return null;
          return (
            <SelectionTag
              key={id}
              name={info.name}
              color={getPresenceColor(connectionId)}
            />
          );
        })}
      </AnimatePresence>
    </div>
  );
};

export default SelectionTags;

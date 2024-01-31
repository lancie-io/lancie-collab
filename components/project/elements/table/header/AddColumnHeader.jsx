import { TableHead } from '@/components/ui/table';
import { Plus } from 'lucide-react';
import { ActionTypes, Constants } from '../utils';

export default function AddColumnHeader({ getHeaderProps, dataDispatch }) {
  return (
    <TableHead
      {...getHeaderProps()}
      className="noselect"
      onClick={(e) =>
        dataDispatch({
          type: ActionTypes.ADD_COLUMN_TO_LEFT,
          columnId: Constants.ADD_COLUMN_ID,
          focus: true,
        })
      }
    >
      <div className="h-full flex items-center">
        <Plus className="w-4 h-4 text-muted-foreground" />
      </div>
    </TableHead>
  );
}

import { Trash2 } from 'lucide-react';
import { ActionTypes } from '../utils';

interface DeleteCellProps {
  rowIndex: number;
  columnId: string;
  dataDispatch: any;
}

const DeleteCell = ({ rowIndex, columnId, dataDispatch }: DeleteCellProps) => {
  return (
    <div className="px-4 flex items-center h-[52px]">
      <Trash2
        onClick={() =>
          dataDispatch({ type: ActionTypes.DELETE_ROW, columnId, rowIndex })
        }
        className="w-4 h-4 cursor-pointer text-muted-foreground hover:text-foreground transition duration-100"
      />
    </div>
  );
};

export default DeleteCell;

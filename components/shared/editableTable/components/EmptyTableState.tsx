import { TableCell, TableRow } from '@/components/ui/table';
import { Table2 } from 'lucide-react';

const EmptyTableState = ({ colSpan }: { colSpan: number }) => {
  return (
    <TableRow>
      <TableCell colSpan={colSpan} className="h-48 text-center">
        <div className="flex flex-col items-center">
          <Table2 className="w-5 h-5" />
          <h3 className="font-semibold text-base mt-1">No data added</h3>
          <p className="text-muted-foreground text-sm">Add rows to the table</p>
        </div>
      </TableCell>
    </TableRow>
  );
};

export default EmptyTableState;

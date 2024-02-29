interface MyDataType {
  [key: string]: any; // Use a more specific type according to your actual data structure
}

export type CellAddress = {
  columnId: string;
  rowId: string;
};

type Option = {
  label: string;
  value: string;
  color: string;
};

export type Column = {
  id: string;
  header: string;
  type: string;
  accessorKey: string;
  cell?: string;
  options?: Option[];
};

// export type Column = ColumnDef<MyDataType>;

export type Row = {
  id: string;
};

export type Cell = {
  value: any;
};

export type ExpressionResult =
  | {
      type: 'error';
    }
  | {
      type: 'number';
      value: number;
    }
  | {
      type: 'string';
      value: string;
    };

export type FixedArray<T, N extends number> = N extends N
  ? number extends N
    ? T[]
    : RecursiveFixedArray<T, N, []>
  : never;

type RecursiveFixedArray<
  T,
  N extends number,
  R extends unknown[],
> = R['length'] extends N ? R : RecursiveFixedArray<T, N, [T, ...R]>;

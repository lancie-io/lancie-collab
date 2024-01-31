export function shortId() {
  return '_' + Math.random().toString(36).substr(2, 9);
}

export function randomColor() {
  return `hsl(${Math.floor(Math.random() * 360)}, 95%, 90%)`;
}

export function makeData(columns: any[]) {
  let data = [];
  let options = [];
  for (let i = 0; i < 3; i++) {
    let row = {
      ID: i,
      name: '',
      role: null,
      phoneNumber: '+49123456789',
    };
    options.push({ label: 'Driver', backgroundColor: randomColor() });

    data.push(row);
  }

  options = options.filter(
    (a, i, self) => self.findIndex((b) => b.label === a.label) === i
  );

  // let columns = [
  //   {
  //     id: 'firstName',
  //     label: 'First Name',
  //     accessor: 'firstName',
  //     minWidth: 100,
  //     dataType: DataTypes.TEXT,
  //     options: [],
  //   },
  //   {
  //     id: 'lastName',
  //     label: 'Last Name',
  //     accessor: 'lastName',
  //     minWidth: 100,
  //     dataType: DataTypes.TEXT,
  //     options: [],
  //   },
  //   {
  //     id: 'age',
  //     label: 'Age',
  //     accessor: 'age',
  //     width: 80,
  //     dataType: DataTypes.NUMBER,
  //     options: [],
  //   },
  //   {
  //     id: 'email',
  //     label: 'E-Mail',
  //     accessor: 'email',
  //     width: 300,
  //     dataType: DataTypes.TEXT,
  //     options: [],
  //   },
  //   {
  //     id: 'music',
  //     label: 'Music Preference',
  //     accessor: 'music',
  //     dataType: DataTypes.SELECT,
  //     width: 200,
  //     options: options,
  //   },
  //   {
  //     id: Constants.ADD_COLUMN_ID,
  //     width: 20,
  //     label: '+',
  //     disableResizing: true,
  //     dataType: 'null',
  //   },
  // ];
  return { columns: columns, data: data, skipReset: false };
}

export const ActionTypes = Object.freeze({
  ADD_OPTION_TO_COLUMN: 'add_option_to_column',
  ADD_ROW: 'add_row',
  DELETE_ROW: 'delete_row',
  UPDATE_COLUMN_TYPE: 'update_column_type',
  UPDATE_COLUMN_HEADER: 'update_column_header',
  UPDATE_CELL: 'update_cell',
  ADD_COLUMN_TO_LEFT: 'add_column_to_left',
  ADD_COLUMN_TO_RIGHT: 'add_column_to_right',
  DELETE_COLUMN: 'delete_column',
  ENABLE_RESET: 'enable_reset',
});

export const DataTypes = Object.freeze({
  NUMBER: 'number',
  TEXT: 'text',
  SELECT: 'select',
  DELETE: 'delete',
});

export const Constants = Object.freeze({
  ADD_COLUMN_ID: 999999,
});

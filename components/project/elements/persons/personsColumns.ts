import { Constants, DataTypes, randomColor } from '../table/utils';

export const personsData = [
  {
    role: 'Camera Assistant',
  },
  {
    role: 'Model',
  },
  {
    role: 'Director',
  },
];

export const personsColumns = [
  {
    id: 'name',
    label: 'Name',
    accessor: 'name',
    minWidth: 100,
    dataType: DataTypes.TEXT,
    options: [],
  },
  {
    id: 'role',
    label: 'Role',
    accessor: 'role',
    dataType: DataTypes.SELECT,
    options: [
      { label: 'Camera Assistant', backgroundColor: randomColor() },
      { label: 'Model', backgroundColor: randomColor() },
      { label: 'Director', backgroundColor: randomColor() },
    ],
  },
  {
    id: 'phoneNumber',
    label: 'Phone Number',
    accessor: 'phoneNumber',
    minWidth: 120,
    dataType: DataTypes.TEXT,
    options: [],
  },
  {
    id: Constants.ADD_COLUMN_ID,
    label: '+',
    disableResizing: true,
    dataType: DataTypes.DELETE,
  },
];

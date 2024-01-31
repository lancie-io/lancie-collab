import { Constants, DataTypes, randomColor } from '../table/utils';

export const financialsData = [
  {
    title: 'Script-Writing',
    category: 'Pre-Production',
    amount: 400,
  },
  {
    title: 'Location Rent',
    category: 'Production',
    amount: 1200,
  },
  {
    title: 'Song License',
    category: 'Post-Production',
    amount: 99,
  },
];

export const financialsColumns = [
  {
    id: 'title',
    label: 'Title',
    accessor: 'title',
    minWidth: 100,
    dataType: DataTypes.TEXT,
  },
  {
    id: 'category',
    label: 'Category',
    accessor: 'category',
    dataType: DataTypes.SELECT,
    minWidth: 100,
    options: [
      { label: 'Pre-Production', backgroundColor: randomColor() },
      { label: 'Production', backgroundColor: randomColor() },
      { label: 'Post-Production', backgroundColor: randomColor() },
    ],
  },
  {
    id: 'amount',
    label: 'Amount',
    accessor: 'amount',
    dataType: DataTypes.NUMBER,
  },
  {
    id: Constants.ADD_COLUMN_ID,
    label: '+',
    disableResizing: true,
    dataType: DataTypes.DELETE,
  },
];

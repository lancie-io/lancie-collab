import { Constants, DataTypes, randomColor } from '../table/utils';

export const deliverablesData = [
  {
    format: 'Horizontal 16/9',
    channel: 'Youtube',
  },
  {
    format: 'Vertical 9/16',
    channel: 'Instagram',
  },
  {
    format: 'Vertical 4/5',
    channel: 'Website',
  },
];

export const deliverablesColumns = [
  {
    id: 'format',
    label: 'Format',
    accessor: 'format',
    minWidth: 100,
    dataType: DataTypes.SELECT,
    options: [
      { label: 'Horizontal 16/9', backgroundColor: randomColor() },
      { label: 'Vertical 9/16', backgroundColor: randomColor() },
      { label: 'Vertical 4/5', backgroundColor: randomColor() },
    ],
  },
  {
    id: 'Channel',
    label: 'Channel',
    accessor: 'channel',
    dataType: DataTypes.SELECT,
    options: [
      { label: 'Instagram', backgroundColor: randomColor() },
      { label: 'Youtube', backgroundColor: randomColor() },
      { label: 'Website', backgroundColor: randomColor() },
    ],
  },
  {
    id: 'description',
    label: 'Description',
    accessor: 'description',
    dataType: DataTypes.TEXT,
  },
  {
    id: Constants.ADD_COLUMN_ID,
    label: '+',
    disableResizing: true,
    dataType: DataTypes.DELETE,
  },
];

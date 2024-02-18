import update from 'immutability-helper';
import { useEffect, useReducer } from 'react';
import { useBuilder } from '../../BuilderProvider';
import Table from './Table';
import './style.css';
import { ActionTypes, DataTypes, randomColor, shortId } from './utils';

function reducer(state: any, action: any) {
  const columnIndex = state.columns.findIndex(
    (column: any) => column.id === action.columnId
  );
  const sId = shortId();
  switch (action.type) {
    case ActionTypes.ADD_OPTION_TO_COLUMN:
      return update(state, {
        skipReset: { $set: true },
        columns: {
          [columnIndex]: {
            options: {
              $push: [
                {
                  label: action.option,
                  backgroundColor: action.backgroundColor,
                },
              ],
            },
          },
        },
      });
    case ActionTypes.ADD_ROW:
      return update(state, {
        skipReset: { $set: true },
        data: { $push: [{}] },
      });
    case ActionTypes.UPDATE_COLUMN_TYPE:
      switch (action.dataType) {
        case DataTypes.NUMBER:
          if (state.columns[columnIndex].dataType === DataTypes.NUMBER) {
            return state;
          } else {
            return update(state, {
              skipReset: { $set: true },
              columns: {
                [columnIndex]: { dataType: { $set: action.dataType } },
              },
              data: {
                $apply: (data: any) =>
                  data.map((row: any) => ({
                    ...row,
                    [action.columnId]: isNaN(row[action.columnId])
                      ? ''
                      : Number.parseInt(row[action.columnId]),
                  })),
              },
            });
          }
        case DataTypes.SELECT:
          if (state.columns[columnIndex].dataType === DataTypes.SELECT) {
            return state;
          } else {
            let options: any[] = [];
            state.data.forEach((row: any) => {
              if (row[action.columnId]) {
                options.push({
                  label: row[action.columnId],
                  backgroundColor: randomColor(),
                });
              }
            });
            return update(state, {
              skipReset: { $set: true },
              columns: {
                [columnIndex]: {
                  dataType: { $set: action.dataType },
                  options: { $push: options },
                },
              },
            });
          }
        case DataTypes.TEXT:
          if (state.columns[columnIndex].dataType === DataTypes.TEXT) {
            return state;
          } else if (state.columns[columnIndex].dataType === DataTypes.SELECT) {
            return update(state, {
              skipReset: { $set: true },
              columns: {
                [columnIndex]: { dataType: { $set: action.dataType } },
              },
            });
          } else {
            return update(state, {
              skipReset: { $set: true },
              columns: {
                [columnIndex]: { dataType: { $set: action.dataType } },
              },
              data: {
                $apply: (data: any) =>
                  data.map((row: any) => ({
                    ...row,
                    [action.columnId]: row[action.columnId] + '',
                  })),
              },
            });
          }
        default:
          return state;
      }
    case ActionTypes.UPDATE_COLUMN_HEADER:
      return update(state, {
        skipReset: { $set: true },
        columns: { [columnIndex]: { label: { $set: action.label } } },
      });
    case ActionTypes.UPDATE_CELL:
      return update(state, {
        skipReset: { $set: true },
        data: {
          [action.rowIndex]: { [action.columnId]: { $set: action.value } },
        },
      });
    case ActionTypes.ADD_COLUMN_TO_LEFT:
      return update(state, {
        skipReset: { $set: true },
        columns: {
          $splice: [
            [
              columnIndex,
              0,
              {
                id: sId,
                label: 'Column',
                accessor: sId,
                dataType: DataTypes.TEXT,
                created: action.focus && true,
                options: [],
              },
            ],
          ],
        },
      });
    case ActionTypes.ADD_COLUMN_TO_RIGHT:
      return update(state, {
        skipReset: { $set: true },
        columns: {
          $splice: [
            [
              columnIndex + 1,
              0,
              {
                id: sId,
                label: 'Column',
                accessor: sId,
                dataType: DataTypes.TEXT,
                created: action.focus && true,
                options: [],
              },
            ],
          ],
        },
      });
    case ActionTypes.DELETE_COLUMN:
      return update(state, {
        skipReset: { $set: true },
        columns: { $splice: [[columnIndex, 1]] },
      });

    case ActionTypes.DELETE_ROW:
      return update(state, {
        skipReset: { $set: true },
        data: { $splice: [[action.rowIndex, 1]] },
      });
    case ActionTypes.ENABLE_RESET:
      return update(state, { skipReset: { $set: true } });
    default:
      return state;
  }
}

function TableModule({ columns, element, isPreview }: any) {
  const [state, dispatch] = useReducer(reducer, {
    columns: columns,
    data: element.extraAttributes.state.data,
  });
  const { id } = element;
  const { updateElement } = useBuilder();
  function updateTableState(tableState: any) {
    updateElement(id, {
      ...element,
      extraAttributes: {
        ...element.extraAttributes,
        state: state,
      },
    });
  }
  useEffect(() => {
    console.log('Changed');
    dispatch({ type: ActionTypes.ENABLE_RESET });
    updateTableState(state);
  }, [state, state.data, state.columns]);

  return (
    <div className="">
      <Table
        columns={state.columns}
        data={state.data}
        dispatch={dispatch}
        skipReset={state.skipReset}
        isPreview={isPreview}
      />
      <div id="popper-portal"></div>
    </div>
  );
}

export default TableModule;

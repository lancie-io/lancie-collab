import { DataTypes } from '../utils';
import DeleteCell from './DeleteCell';
import NumberCell from './NumberCell';
import SelectCell from './SelectCell';
import TextCell from './TextCell';

export default function Cell({
  value: initialValue,
  row: { index },
  column: { id, dataType, options },
  dataDispatch,
}) {
  function getCellElement() {
    switch (dataType) {
      case DataTypes.DELETE:
        return (
          <DeleteCell
            rowIndex={index}
            columnId={id}
            dataDispatch={dataDispatch}
          />
        );
      case DataTypes.TEXT:
        return (
          <TextCell
            initialValue={initialValue}
            rowIndex={index}
            columnId={id}
            dataDispatch={dataDispatch}
          />
        );
      case DataTypes.NUMBER:
        return (
          <NumberCell
            initialValue={initialValue}
            rowIndex={index}
            columnId={id}
            dataDispatch={dataDispatch}
          />
        );
      case DataTypes.SELECT:
        return (
          <SelectCell
            initialValue={initialValue}
            options={options}
            rowIndex={index}
            columnId={id}
            dataDispatch={dataDispatch}
          />
        );
      default:
        return <span></span>;
    }
  }

  return getCellElement();
}

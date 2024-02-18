import { Badge } from '@/components/ui/badge';
import { Plus } from 'lucide-react';
import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { usePopper } from 'react-popper';
import { grey } from '../colors';
import { ActionTypes, randomColor } from '../utils';

export default function SelectCell({
  initialValue,
  options,
  columnId,
  rowIndex,
  dataDispatch,
}: any) {
  const [selectRef, setSelectRef] = useState<any>(null);
  const [selectPop, setSelectPop] = useState<any>(null);
  const [showSelect, setShowSelect] = useState(false);
  const [showAdd, setShowAdd] = useState(false);
  const [addSelectRef, setAddSelectRef] = useState<any>(null);
  const { styles, attributes } = usePopper(selectRef, selectPop, {
    placement: 'bottom-start',
    strategy: 'fixed',
  });
  const [value, setValue] = useState({ value: initialValue, update: false });

  useEffect(() => {
    setValue({ value: initialValue, update: false });
  }, [initialValue]);

  useEffect(() => {
    if (value.update) {
      dataDispatch({
        type: ActionTypes.UPDATE_CELL,
        columnId,
        rowIndex,
        value: value.value,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value, columnId, rowIndex]);

  useEffect(() => {
    if (addSelectRef && showAdd) {
      addSelectRef.focus();
    }
  }, [addSelectRef, showAdd]);

  function getColor() {
    let match = options.find((option: any) => option.label === value.value);
    return (match && match.backgroundColor) || grey(200);
  }

  function handleAddOption(e: any) {
    setShowAdd(true);
  }

  function handleOptionKeyDown(e: any) {
    if (e.key === 'Enter') {
      if (e.target.value !== '') {
        dataDispatch({
          type: ActionTypes.ADD_OPTION_TO_COLUMN,
          option: e.target.value,
          backgroundColor: randomColor(),
          columnId,
        });
      }
      setShowAdd(false);
    }
  }

  function handleOptionBlur(e: any) {
    if (e.target.value !== '') {
      dataDispatch({
        type: ActionTypes.ADD_OPTION_TO_COLUMN,
        option: e.target.value,
        backgroundColor: randomColor(),
        columnId,
      });
    }
    setShowAdd(false);
  }

  function handleOptionClick(option: any) {
    setValue({ value: option.label, update: true });
    setShowSelect(false);
  }

  useEffect(() => {
    if (addSelectRef && showAdd) {
      addSelectRef.focus();
    }
  }, [addSelectRef, showAdd]);

  return (
    <>
      <div
        className="p-4"
        ref={setSelectRef}
        onClick={() => setShowSelect(true)}
      >
        {value.value && (
          <Badge
            className="text-background"
            style={{
              backgroundColor: getColor(),
            }}
          >
            {value.value}
          </Badge>
        )}
      </div>
      {showSelect && (
        <div className="overlay" onClick={() => setShowSelect(false)} />
      )}
      {showSelect &&
        createPortal(
          <div
            className="shadow-xl bg-accent border rounded-md"
            ref={setSelectPop}
            {...attributes.popper}
            style={{
              ...styles.popper,
              zIndex: 4,
              minWidth: 200,
              maxWidth: 320,
              maxHeight: 400,
              padding: '0.75rem',
              overflow: 'auto',
            }}
          >
            <div className="flex flex-wrap gap-1">
              {options.map((option: any, index: number) => (
                <div
                  key={index}
                  className="cursor-pointer"
                  onClick={() => handleOptionClick(option)}
                >
                  <Badge
                    className="text-background"
                    style={{
                      backgroundColor: option.backgroundColor,
                    }}
                  >
                    {option.label}
                  </Badge>
                </div>
              ))}
              {showAdd && (
                <div
                  className="bg-grey-200 border-radius-sm"
                  style={{
                    width: 120,
                    padding: '2px 4px',
                  }}
                >
                  <input
                    type="text"
                    className="option-input text-background"
                    onBlur={handleOptionBlur}
                    ref={setAddSelectRef}
                    onKeyDown={handleOptionKeyDown}
                  />
                </div>
              )}
              <div className="cursor-pointer" onClick={handleAddOption}>
                <Badge
                  style={{
                    backgroundColor: grey(200),
                  }}
                  className="h-[22px]"
                >
                  <Plus className="w-3 h-3 text-background" />
                </Badge>
              </div>
            </div>
          </div>,
          document.querySelector('#popper-portal') || document.body
        )}
    </>
  );
}

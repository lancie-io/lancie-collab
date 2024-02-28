import { TableMetaType } from './DataTable';
import { WrapperCellProps } from './WrapperCell';

import { Check } from 'lucide-react';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from '@/components/ui/command';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import TailwindColor from '@/lib/tailwind';
import { cn } from '@/lib/utils';
import { ColumnMeta } from '@tanstack/react-table';
import { useEffect, useState } from 'react';
import { SelectOption } from './columns';

interface SelectCellProps<TData, TValue>
  extends WrapperCellProps<TData, TValue> {}

const SelectCell = <TData, TValue>({
  getValue,
  row,
  column,
  table,
}: SelectCellProps<TData, TValue>) => {
  const initialValue = getValue();
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(initialValue);
  const { updateData, updateColumn } = table.options.meta as TableMetaType<
    TData,
    TValue
  >;
  const columnMeta: any = column.columnDef.meta as ColumnMeta<TData, TValue>;
  const options: SelectOption[] = columnMeta.options || [];

  const [currentValue, setCurrentValue] = useState<string>('');
  const [currentColor, setCurrentColor] = useState<string>('');
  const [isEqualToLastSuggestion, setIsEqualToLastSuggestion] = useState(false);

  useEffect(() => {
    setValue(initialValue);
  }, [initialValue]);

  function addOption(newOption: SelectOption) {
    updateColumn(column.getIndex(), {
      ...column.columnDef,
      meta: {
        ...columnMeta,
        options: [...options, newOption],
      },
    });
    setOpen(false);
  }
  useEffect(() => {
    if (currentValue.length === 0) {
      const newColor = new TailwindColor({
        colorType: 'colorful',
        range: {
          min: 400,
          max: 700,
        },
      }).pick();
      setCurrentColor(newColor);
    }
  }, [currentValue]);
  const hasValue = options.find((option) => option.value === value);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="none"
          role="combobox"
          className={cn(
            'p-4 w-full text-left h-full justify-start',
            open && 'ring-2 ring-ring ring-offset-2'
          )}
          aria-expanded={open}
        >
          <Badge
            variant="none"
            style={{
              backgroundColor: `${hasValue?.color}70`,
              border: !hasValue ? '1px solid #27282A' : undefined,
            }}
          >
            {value ? hasValue?.label : 'Select'}
          </Badge>
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandInput
            value={currentValue}
            onValueChange={setCurrentValue}
            placeholder={columnMeta.placeholder || 'Search or create...'}
          />
          <CommandEmpty>Not found.</CommandEmpty>
          <CommandGroup>
            {options.map((option) => (
              <CommandItem
                key={option.value}
                value={option.value}
                onSelect={(currentValue) => {
                  setValue(option.value);
                  updateData(row.index, column.id, option.value as any);
                  setOpen(false);
                }}
              >
                <Check
                  className={cn(
                    'mr-2 h-4 w-4',
                    value === option.value ? 'opacity-100' : 'opacity-0'
                  )}
                />
                <Badge
                  variant="none"
                  style={{ backgroundColor: `${option.color}70` }}
                >
                  {option.label}
                </Badge>
              </CommandItem>
            ))}
            {currentValue &&
              !options.find(
                (option) => option.value === currentValue.toLowerCase()
              ) && (
                <CommandItem
                  key={currentValue.toLowerCase()}
                  value={currentValue.toLowerCase()}
                  onSelect={() => {
                    const newOption: SelectOption = {
                      label: currentValue,
                      value: currentValue.toLowerCase(),
                      color: currentColor,
                    };
                    addOption(newOption);
                    updateData(row.index, column.id, newOption.value as any);
                    setCurrentValue('');
                    setOpen(false);
                  }}
                >
                  <span className="mr-2">Create</span>
                  <Badge
                    variant="none"
                    style={{ backgroundColor: `${currentColor}70` }}
                  >
                    {currentValue}
                  </Badge>
                </CommandItem>
              )}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  );
};

export default SelectCell;

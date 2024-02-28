import { DataTable } from '@/components/shared/editableTable/DataTable';
import {
  personsColumns,
  personsData,
} from '@/components/shared/editableTable/columns';
import { PersonsCustomInstance } from './PersonsBuilderElement';

interface PersonsProps {
  element: PersonsCustomInstance;
  isPreview: boolean;
}

const Persons = ({ element, isPreview }: PersonsProps) => {
  return (
    <div className="">
      <DataTable columns={personsColumns} data={personsData} />
    </div>
  );
};

export default Persons;

import React from 'react';
import TableModule from '../table/TableModule';
import { PersonsElement } from './PersonsBuilderElement';

interface PersonsProps {
  element: PersonsElement;
  isPreview: boolean;
}

const Persons = ({ element, isPreview }: PersonsProps) => {
  return (
    <div className="w-full bg-background overflow-scroll">
      <TableModule
        columns={element.extraAttributes.state.columns}
        element={element}
        isPreview={isPreview}
      />
    </div>
  );
};

export default React.memo(Persons);

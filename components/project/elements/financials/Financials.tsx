import React from 'react';
import TableModule from '../table/TableModule';
import { FinancialsElement } from './FinancialsBuilderElement';

interface FinancialsProps {
  element: FinancialsElement;
  isPreview: boolean;
}

const Financials = ({ element, isPreview }: FinancialsProps) => {
  return (
    <div className="w-full bg-background overflow-scroll">
      <TableModule
        isPreview={isPreview}
        columns={element.extraAttributes.state.columns}
        element={element}
      />
    </div>
  );
};

export default React.memo(Financials);

import React from 'react';
import TableModule from '../table/TableModule';
import { DeliverablesElement } from './DeliverablesBuilderElement';

interface DeliverablesProps {
  element: DeliverablesElement;
  isPreview: boolean;
}

const Deliverables = ({ element, isPreview }: DeliverablesProps) => {
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

export default React.memo(Deliverables);

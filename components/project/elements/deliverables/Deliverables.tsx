import { DataTable } from '@/components/shared/editableTable/DataTable';
import {
  deliverablesColumns,
  deliverablesData,
} from '@/components/shared/editableTable/mydata';
import React from 'react';
import { DeliverablesElement } from './DeliverablesBuilderElement';

interface DeliverablesProps {
  element: DeliverablesElement;
  isPreview: boolean;
}

const Deliverables = ({ element, isPreview }: DeliverablesProps) => {
  return (
    <div>
      <DataTable data={deliverablesData} columns={deliverablesColumns} />
    </div>
  );
};

export default React.memo(Deliverables);

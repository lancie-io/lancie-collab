import { DataTable } from '@/components/shared/editableTable/DataTable';
import {
  financialsColumns,
  financialsData,
} from '@/components/shared/editableTable/mydata';
import React from 'react';
import { FinancialsCustomInstance } from './FinancialsBuilderElement';

interface FinancialsProps {
  element: FinancialsCustomInstance;
  isPreview: boolean;
}

const Financials = ({ element, isPreview }: FinancialsProps) => {
  return (
    <div>
      <DataTable data={financialsData} columns={financialsColumns} />
    </div>
  );
};

export default React.memo(Financials);

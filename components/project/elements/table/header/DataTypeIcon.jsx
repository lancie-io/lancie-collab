import { AlignLeft, Hash, Tag } from 'lucide-react';
import { DataTypes } from '../utils';

export default function DataTypeIcon({ dataType }) {
  function getPropertyIcon(dataType) {
    switch (dataType) {
      case DataTypes.NUMBER:
        return <Hash className="w-4 h-4 shrink-0" />;
      case DataTypes.TEXT:
        return <AlignLeft className="w-4 h-4 shrink-0" />;
      case DataTypes.SELECT:
        return <Tag className="w-4 h-4 shrink-0" />;
      default:
        return null;
    }
  }

  return getPropertyIcon(dataType);
}

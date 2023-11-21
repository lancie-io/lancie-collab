import { X } from 'lucide-react';
import { Button } from '../ui/button';
import { BuilderElements } from './BuilderElements';
import useBuilder from './hooks/useBuilder';

const PropertiesSidebar = () => {
  const { selectedElement, setSelectedElement } = useBuilder();
  if (!selectedElement) return null;
  const PropertiesForm =
    BuilderElements[selectedElement.type].propertiesComponent;
  return (
    <div>
      <div className="flex justify-between items-center">
        <p>Element Properties</p>
        <Button
          size={'icon'}
          variant="ghost"
          onClick={() => setSelectedElement(null)}
        >
          <X />
        </Button>
      </div>
      <PropertiesForm elementInstance={selectedElement} />
    </div>
  );
};

export default PropertiesSidebar;

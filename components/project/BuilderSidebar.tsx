'use client';
import ModuleButtonsSidebar from './ModuleButtonsSidebar';
import PropertiesSidebar from './PropertiesSidebar';
import useBuilder from './hooks/useBuilder';

const BuilderSidebar = () => {
  const { selectedElement } = useBuilder();
  return (
    <aside className="border-r p-3 space-y-3 shrink-0 ">
      {!selectedElement && <ModuleButtonsSidebar />}
      {selectedElement && <PropertiesSidebar />}
    </aside>
  );
};

export default BuilderSidebar;

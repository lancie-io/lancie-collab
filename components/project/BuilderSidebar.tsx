'use client';
import ModuleButtonsSidebar from './ModuleButtonsSidebar';
import useBuilder from './hooks/useBuilder';

const BuilderSidebar = () => {
  const { selectedElement } = useBuilder();
  return (
    <aside className="border-r shrink-0">
      {!selectedElement && <ModuleButtonsSidebar />}
      {/* {selectedElement && <PropertiesSidebar />} */}
    </aside>
  );
};

export default BuilderSidebar;

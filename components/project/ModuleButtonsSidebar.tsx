import { BuilderElements } from './BuilderElements';
import ModuleButton from './ModuleButton';

const ModuleButtonsSidebar = () => {
  return (
    <div className="grid grid-cols-2 gap-4">
      <ModuleButton builderElement={BuilderElements.summary} />
      <ModuleButton builderElement={BuilderElements.moodboard} />
      <ModuleButton builderElement={BuilderElements.map} />
      <ModuleButton builderElement={BuilderElements.videos} />
      <ModuleButton builderElement={BuilderElements.files} />
      <ModuleButton builderElement={BuilderElements.responsibilities} />
      <ModuleButton builderElement={BuilderElements.deliverables} />
      <ModuleButton builderElement={BuilderElements.financials} />
    </div>
  );
};

export default ModuleButtonsSidebar;

import { BuilderElements } from './BuilderElements';
import ModuleButton from './ModuleButton';

const ModuleButtonsSidebar = () => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
      <ModuleButton builderElement={BuilderElements.summary} />
      <ModuleButton builderElement={BuilderElements.moodboard} />
      <ModuleButton builderElement={BuilderElements.locations} />
      <ModuleButton builderElement={BuilderElements.videos} />
      <ModuleButton builderElement={BuilderElements.files} />
      <ModuleButton
        disabled
        builderElement={BuilderElements.responsibilities}
      />
      <ModuleButton disabled builderElement={BuilderElements.deliverables} />
      <ModuleButton disabled builderElement={BuilderElements.financials} />
    </div>
  );
};

export default ModuleButtonsSidebar;

import FeedbackButton from '../FeedbackButton';
import { Separator } from '../ui/separator';
import { BuilderElements } from './BuilderElements';
import ModuleButton from './ModuleButton';

const ModuleButtonsSidebar = () => {
  return (
    <div className="flex flex-col max-w-[290px]">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 p-3 grow-0">
        <ModuleButton builderElement={BuilderElements.summary} />
        <ModuleButton builderElement={BuilderElements.moodboard} />
        <ModuleButton builderElement={BuilderElements.locations} />
        <ModuleButton builderElement={BuilderElements.videos} />
        <ModuleButton builderElement={BuilderElements.files} />
        <ModuleButton builderElement={BuilderElements.persons} />
        <ModuleButton builderElement={BuilderElements.deliverables} />
        <ModuleButton builderElement={BuilderElements.financials} />
      </div>
      <Separator />
      <div className="shrink flex flex-col p-3 flex-grow text-sm">
        <h2 className="font-medium">Need more modules?</h2>
        <p className="text-muted-foreground mt-1">
          The Lancie team is happy to receive suggestions about new modules or
          features.
        </p>

        <FeedbackButton className="w-full mt-2" />
      </div>
    </div>
  );
};

export default ModuleButtonsSidebar;

const ModuleButtonsTopBar = () => {
  return <div></div>;
};

import { createContext, useContext, useState } from 'react';
import { SettingsCustomInstance } from './SummaryBuilderElement';
import SummaryPlayground from './SummaryPlayground';

interface SummaryProps {
  element: SettingsCustomInstance;
}

const Summary = ({ element }: SummaryProps) => {
  return (
    <SettingsProvider initialValue={element.extraAttributes.settings}>
      <div>
        {/* <ElementBar>
          <SummarySettings />
        </ElementBar> */}
        <SummaryPlayground element={element} />
      </div>
    </SettingsProvider>
  );
};

export default Summary;

export type SettingsType = {
  title: boolean;
  description: boolean;
  cover: boolean;
  production: boolean;
  publishing: boolean;
};

type SettingsContextType = {
  settings: SettingsType;
  setSettings: React.Dispatch<React.SetStateAction<any>>;
};

const SettingsContext = createContext<SettingsContextType | undefined>({
  settings: {
    title: true,
    description: true,
    cover: true,
    production: true,
    publishing: true,
  },
  setSettings: () => {},
});

export const useSettings = () => {
  const context = useContext(SettingsContext);
  if (context === undefined) {
    throw new Error('useSettings must be used within a SettingsProvider');
  }
  return context;
};

const SettingsProvider = ({
  children,
  initialValue,
}: {
  children: React.ReactNode;
  initialValue: SettingsType;
}) => {
  const [settings, setSettings] = useState({
    title: true,
    description: true,
    cover: true,
    production: true,
    publishing: true,
  });

  return (
    <SettingsContext.Provider value={{ settings, setSettings }}>
      {children}
    </SettingsContext.Provider>
  );
};

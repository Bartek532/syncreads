import { useState } from "react";

import { GeneralTab } from "../../../components/dashboard/generalTab/GeneralTab";
import { Tabs } from "../../../components/dashboard/tabs/Tabs";

const tabs = [{ label: "General", panel: <GeneralTab /> }];

const labels = tabs.map(({ label }) => label);
const panels = tabs.map(({ panel }) => panel);

export const SettingsView = () => {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <section className="mx-auto mt-8 max-w-6xl px-4 sm:px-6 lg:mt-12 lg:px-8">
      <h2 className="mb-8 text-lg font-medium leading-6 text-gray-900">
        Settings
      </h2>

      <Tabs labels={labels} index={activeTab} onChange={setActiveTab} />

      {panels.map((panel, index) => (
        <Tabs.Panel key={index} index={index} value={activeTab}>
          {panel}
        </Tabs.Panel>
      ))}
    </section>
  );
};

import { useState } from "react";

import { GeneralTab } from "../../../components/dashboard/generalTab/GeneralTab";
import { Heading } from "../../../components/dashboard/heading/Heading";
import { Tabs } from "../../../components/dashboard/tabs/Tabs";

const tabs = [{ label: "General", panel: <GeneralTab /> }];

const labels = tabs.map(({ label }) => label);
const panels = tabs.map(({ panel }) => panel);

export const SettingsView = () => {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <section className="mx-auto mt-8 max-w-6xl px-4 sm:px-6 lg:mt-12 lg:px-8">
      <Heading level={2} className="mb-8">
        Settings
      </Heading>

      <Tabs labels={labels} index={activeTab} onChange={setActiveTab} />

      {panels.map((panel, index) => (
        <Tabs.Panel key={index} index={index} value={activeTab}>
          {panel}
        </Tabs.Panel>
      ))}
    </section>
  );
};

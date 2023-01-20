import { useSession } from "next-auth/react";

import { Heading } from "../heading/Heading";
import { SettingsRow } from "../settingsRow/SettingsRow";

export const GeneralTab = () => {
  const { data } = useSession();

  const handleRowChange = (content: string) => {
    console.log("saving...", content);
  };

  return (
    <section className="mt-8">
      <hgroup>
        <Heading level={3}>Profile</Heading>
        <p className="max-w-2xl text-sm text-gray-500">
          This information will be displayed publicly so be careful what you
          share.
        </p>
      </hgroup>

      {data?.user && (
        <ul className="mt-6 divide-y divide-gray-300 border-y border-gray-300">
          <SettingsRow
            label="Name"
            content={data.user.name ?? ""}
            onChange={handleRowChange}
          />
          <SettingsRow
            label="E-mail"
            contentType="email"
            content={data.user.email}
            onChange={handleRowChange}
          />
          <SettingsRow
            label="Passowrd"
            contentType="password"
            onChange={handleRowChange}
          />
        </ul>
      )}
    </section>
  );
};

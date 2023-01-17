import { useSession } from "next-auth/react";

import { Heading } from "../heading/Heading";

import { UserSettingsRow } from "./UserSettingsRow";

export const GeneralTab = () => {
  const { data } = useSession();

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
          <UserSettingsRow
            name="Name"
            type="text"
            initValue={data.user.name ?? ""}
          />
          <UserSettingsRow
            name="E-mail"
            type="email"
            initValue={data.user.email}
          />
          <UserSettingsRow name="Passowrd" type="password" />
        </ul>
      )}
    </section>
  );
};

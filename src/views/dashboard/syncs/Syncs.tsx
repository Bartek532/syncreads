import { useState } from "react";

import { trpc } from "../../../utils/trpc";

export const SyncsView = () => {
  const [messages, setMessages] = useState<string[]>([]);

  trpc.sync.getTestEvent.useSubscription(undefined, {
    onData(data) {
      setMessages((m) => [...m, data]);
    },
  });

  const test = trpc.sync.addTestEvent.useMutation();

  return (
    <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
      <h1 className="mt-8 text-lg font-bold">Syncs view coming soon...</h1>
      {messages.map((message) => (
        <div key={message}>{message}</div>
      ))}
      <button onClick={() => test.mutate("xd")}>Emit</button>
    </div>
  );
};

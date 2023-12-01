import Image from "next/image";
import { memo } from "react";

type AuthHeaderProps = {
  readonly title: string;
  readonly description: string;
};

export const AuthHeader = memo<AuthHeaderProps>(({ title, description }) => {
  return (
    <div>
      <Image
        src="/android-icon-72x72.png"
        width="36"
        height="36"
        alt="rssmarkable logo"
      />
      <h2 className="mt-6 text-3xl font-bold tracking-tight text-gray-900 dark:text-white">
        {title}
      </h2>
      <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
        {description}
      </p>
    </div>
  );
});

AuthHeader.displayName = "AuthHeader";

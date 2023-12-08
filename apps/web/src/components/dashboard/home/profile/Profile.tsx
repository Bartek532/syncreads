import { CheckCircleIcon, XCircleIcon } from "@heroicons/react/20/solid";
import { memo } from "react";

import { supabase } from "../../../../lib/supabase/server";
import { Avatar } from "../../../common/Avatar";

import type { Device } from "@rssmarkable/database";

interface ProfileProps {
  readonly device: Device | null;
}

export const Profile = memo<ProfileProps>(async ({ device }) => {
  const { data } = await supabase.auth.getSession();

  if (!data.session) {
    return null;
  }

  return (
    <div className="min-w-0 flex-1">
      <div className="flex items-center">
        {<Avatar name={data.session.user.email} />}

        <div>
          <div className="flex items-center">
            {/* {width <= 640 && <Avatar image={user.image} name={user.name} />} */}
            <h1 className="ml-3 text-2xl font-bold leading-7 text-gray-900 dark:text-gray-100 sm:truncate sm:leading-9">
              {/* Welcome back, {user.name?.split(" ")[0] ?? user.email}! */}
              Welcome, guest!
            </h1>
          </div>
          <dl className="mt-6 flex flex-col sm:ml-3 sm:mt-1 sm:flex-row sm:flex-wrap">
            <dt className="sr-only dark:text-gray-300">Account status</dt>
            <dd className="mt-3 flex items-center text-sm font-medium text-gray-500 sm:mr-6 sm:mt-0">
              {!!device ? (
                <>
                  <CheckCircleIcon
                    className="mr-1.5 h-5 w-5 flex-shrink-0 text-green-400"
                    aria-hidden="true"
                  />
                  <span className="dark:text-gray-400">
                    Device registered - sync active
                  </span>
                </>
              ) : (
                <>
                  <XCircleIcon
                    className="mr-1.5 h-5 w-5 flex-shrink-0 text-red-400"
                    aria-hidden="true"
                  />
                  Device not registered - sync inactive
                </>
              )}
            </dd>
          </dl>
        </div>
      </div>
    </div>
  );
});

Profile.displayName = "Profile";

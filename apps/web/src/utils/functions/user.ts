import type { User } from "@rssmarkable/database";

export const getName = (user: User) => {
  const identity = user.identities?.[0]?.identity_data;
  const name: unknown =
    user.user_metadata?.name ||
    identity?.name ||
    identity?.full_name ||
    identity?.user_name ||
    identity?.preferred_username;

  return typeof name === "string" ? name : undefined;
};

export const getAvatar = (user: User) => {
  const identity = user.identities?.[0]?.identity_data;
  const avatar: unknown =
    identity?.avatar_url || user.user_metadata?.avatar_url;

  return typeof avatar === "string" ? avatar : undefined;
};

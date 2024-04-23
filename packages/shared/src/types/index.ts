import type { UserMetadata } from "../validation";
import type {
  User as UserType,
  Session as SessionType,
} from "@syncreads/database";

export type User = UserType & { user_metadata: Partial<UserMetadata> };
export type Session = SessionType & { user: User };

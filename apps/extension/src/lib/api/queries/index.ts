import { getSession } from "./session";

export enum QUERIES {
  SESSION = "session",
}

export const queries = {
  [QUERIES.SESSION]: getSession,
};

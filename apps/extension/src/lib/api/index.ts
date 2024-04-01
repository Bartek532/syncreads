import { QueryClient } from "@tanstack/react-query";

import { mutations } from "./mutations";
import { queries } from "./queries";

export const queryClient = new QueryClient();

export enum OPERATION_TYPE {
  QUERY = "QUERY",
  MUTATION = "MUTATION",
}

export const operations = {
  [OPERATION_TYPE.QUERY]: queries,
  [OPERATION_TYPE.MUTATION]: mutations,
} as const;

export type OperationName<T extends OPERATION_TYPE> =
  keyof typeof operations[T];

export type Message<
  T extends OPERATION_TYPE,
  K extends OperationName<T>,
  F = typeof operations[T][K],
> = {
  type: T;
  name: K;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  payload: F extends (...args: any) => any ? Parameters<F>[0] : never;
};

export type Response<
  T extends OPERATION_TYPE,
  K extends OperationName<T>,
  F = typeof operations[T][K],
> = {
  error: string | null;
  data: // eslint-disable-next-line @typescript-eslint/no-explicit-any
  (F extends (...args: any) => any ? Awaited<ReturnType<F>> : never) | null;
};

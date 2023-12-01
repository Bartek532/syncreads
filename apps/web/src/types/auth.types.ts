export interface Login {
  readonly email: string;
  readonly password: string;
}

export interface Register {
  readonly name: string;
  readonly email: string;
  readonly password: string;
}

export enum AUTH_PROVIDER {
  GITHUB = "github",
  GOOGLE = "google",
}

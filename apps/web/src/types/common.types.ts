import type { ForwardRefExoticComponent, RefAttributes, SVGProps } from "react";

export enum HTTP_METHOD {
  CONNECT = "CONNECT",
  DELETE = "DELETE",
  GET = "GET",
  HEAD = "HEAD",
  OPTIONS = "OPTIONS",
  PATCH = "PATCH",
  POST = "POST",
  PUT = "PUT",
  TRACE = "TRACE",
}

export type HeroIcon =
  | ForwardRefExoticComponent<
      Omit<SVGProps<SVGSVGElement>, "ref"> & {
        title?: string;
        titleId?: string;
      } & RefAttributes<SVGSVGElement>
    >
  | ForwardRefExoticComponent<
      SVGProps<SVGSVGElement> & { title?: string; titleId?: string }
    >;

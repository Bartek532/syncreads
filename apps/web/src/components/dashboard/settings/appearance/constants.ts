/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import DarkThemeIcon from "public/svg/theme/dark.svg";
import LightThemeIcon from "public/svg/theme/light.svg";
import SystemThemeIcon from "public/svg/theme/system.svg";

import { THEME } from "../../../../types/settings.types";

export const themes = [
  {
    label: "Auto",
    value: THEME.SYSTEM,
    icon: SystemThemeIcon,
  },
  {
    label: "Light",
    value: THEME.LIGHT,
    icon: LightThemeIcon,
  },
  {
    label: "Dark",
    value: THEME.DARK,
    icon: DarkThemeIcon,
  },
];

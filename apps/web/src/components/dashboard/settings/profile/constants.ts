/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { OUTPUT_FORMAT } from "@rssmarkable/shared";

import EpubFormatIcon from "../../../../../public/svg/format/epub.svg";
import PdfFormatIcon from "../../../../../public/svg/format/pdf.svg";

export const formats = [
  {
    label: `.${OUTPUT_FORMAT.EPUB}`,
    value: OUTPUT_FORMAT.EPUB,
    icon: EpubFormatIcon,
  },
  {
    label: `.${OUTPUT_FORMAT.PDF}`,
    value: OUTPUT_FORMAT.PDF,
    icon: PdfFormatIcon,
  },
];

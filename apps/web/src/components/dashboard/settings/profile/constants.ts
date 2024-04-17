/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { OUTPUT_FORMAT } from "@syncreads/shared";

import EpubFormatIcon from "../../../../../public/svg/format/epub.svg";
import PdfFormatIcon from "../../../../../public/svg/format/pdf.svg";

export const formats = [
  {
    label: `.${OUTPUT_FORMAT.EPUB}`,
    value: OUTPUT_FORMAT.EPUB,
    description: "Faster, suitable for e-readers, more feature-rich than PDF.",
    icon: EpubFormatIcon,
  },
  {
    label: `.${OUTPUT_FORMAT.PDF}`,
    value: OUTPUT_FORMAT.PDF,
    description:
      "Slower, more universal, easier to print, suitable for documents.",
    icon: PdfFormatIcon,
  },
];

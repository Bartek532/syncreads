export const parseHtml = (html: string) => {
  const SCRIPT_REGEX = /<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi;
  let cleanHtml = html;
  while (SCRIPT_REGEX.test(cleanHtml)) {
    cleanHtml = cleanHtml.replace(SCRIPT_REGEX, "");
  }

  return cleanHtml;
};

export const capitalize = (text: string) =>
  text.charAt(0).toUpperCase() + text.slice(1);

export const truncateTextByWordsCount = (text: string, wordsCount: number) => {
  const splittedText = text.split(" ");

  if (splittedText.length <= wordsCount) {
    return splittedText.join(" ");
  }

  return splittedText.slice(0, wordsCount).join(" ") + "...";
};

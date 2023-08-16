import { removeHtmlTags } from "./removeHtmlTags";

export const getDescription = (
  article: string,
  minLimit: number,
  maxLimit: number
) => {
  const cleanContent = removeHtmlTags(article);

  if (cleanContent.length <= maxLimit) {
    return cleanContent;
  }

  let truncatedText = cleanContent.substring(0, maxLimit);
  const firstFullStopIndex = truncatedText.indexOf(".");

  if (firstFullStopIndex !== -1 && firstFullStopIndex >= minLimit) {
    return truncatedText.substring(0, firstFullStopIndex + 1); // Include the first full stop
  }

  const secondFullStopIndex = truncatedText.indexOf(
    ".",
    firstFullStopIndex + 1
  );

  if (secondFullStopIndex !== -1) {
    return truncatedText.substring(0, secondFullStopIndex + 1); // Include the second full stop
  }

  const lastSpaceIndex = truncatedText.lastIndexOf(" ");

  if (lastSpaceIndex !== -1 && lastSpaceIndex >= minLimit) {
    return truncatedText.substring(0, lastSpaceIndex); // Exclude the last space
  }

  return truncatedText;
};

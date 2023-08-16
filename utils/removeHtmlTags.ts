export const removeHtmlTags = (article: string) => {
  // Regex to match HTML tags
  const regex = /(<([^>]+)>)/gi;

  const space = " ";

  const text = article.replace(regex, space).replace(/\s+/g, space).trim();

  return text;
};

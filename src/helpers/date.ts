export const formatDateDMYStr = (date: Date, languageCode?: string): string => {
  const day = date.getDate();

  const month = languageCode
    ? date.toLocaleDateString(languageCode, {
        month: "long",
      })
    : date.getMonth() + 1;
  const year = date.getFullYear();

  return `${day} ${month} ${year}`;
};

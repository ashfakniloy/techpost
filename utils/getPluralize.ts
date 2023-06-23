export const getPluralize = (
  count: number,
  name: string,
  suffix: string = "s"
) => {
  return count > 1 ? `${count} ${name}${suffix}` : `${count} ${name}`;
};

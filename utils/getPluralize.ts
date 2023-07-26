type PluralizeProps = {
  count: number;
  name: string;
  plural: string;
};

export const getPluralize = ({ count, name, plural }: PluralizeProps) => {
  return count > 1 ? `${count} ${plural}` : `${count} ${name}`;
};

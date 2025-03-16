export const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const chunk = <T>(array: T[], size: number): T[][] => {
  return Array.from({ length: Math.ceil(array.length / size) }, (_, index) =>
    array.slice(index * size, (index + 1) * size)
  );
};

export const generateId = () => Math.random().toString(36).substring(2);

export const capitalize = (str: string) => 
  str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();

export const groupBy = <T>(array: T[], key: keyof T): Record<string, T[]> => {
  return array.reduce((groups, item) => {
    const groupKey = String(item[key]);
    return {
      ...groups,
      [groupKey]: [...(groups[groupKey] || []), item],
    };
  }, {} as Record<string, T[]>);
};

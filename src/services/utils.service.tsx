export const ensureArray = (input: any | any[]): any[] => {
  return Array.isArray(input) ? input : [input];
};

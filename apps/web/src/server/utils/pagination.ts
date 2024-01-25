export const getRange = (page: number, size: number) => {
  const from = page ? (page - 1) * size : 0;
  const to = page ? from + size : size;

  return { from, to };
};

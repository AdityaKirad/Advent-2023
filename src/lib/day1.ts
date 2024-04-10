export type ElfTally = {
  name: string;
  tally: number;
};

export function getPaginatedItemsFromChildrens({
  data,
  offset,
  pageSize,
  searchTerm
}: {
  data: ElfTally[];
  offset: number;
  pageSize: number;
  searchTerm: string;
}) {
  if (offset < 0 || pageSize < 0) throw new Error('Offset and PageSize must be positive integer');

  const startIndex = (offset - 1) * pageSize;
  const endIndex = Math.min(startIndex + pageSize, data.length);

  return data
    .slice(startIndex, endIndex)
    .map((data, index) => {
      return { ...data, index: startIndex + index + 1 };
    })
    .filter((child) => child.name.toLowerCase().indexOf(searchTerm.toLowerCase()) !== -1);
}

export function getNiceChild(data: ElfTally[]) {
  if (!data || !data.length) return;
  let niceChild = data[0];
  for (let i = 1; i < data.length; i++) {
    const currentChild = data[i];
    niceChild = currentChild.tally > niceChild.tally ? currentChild : niceChild;
  }
  return niceChild;
}

export function getNaughtyChild(data: ElfTally[]) {
  if (!data || !data.length) return;
  let naughtyChild = data[0];
  for (let i = 1; i < data.length; i++) {
    const currentChild = data[i];
    naughtyChild = currentChild.tally < naughtyChild.tally ? currentChild : naughtyChild;
  }
  return naughtyChild;
}

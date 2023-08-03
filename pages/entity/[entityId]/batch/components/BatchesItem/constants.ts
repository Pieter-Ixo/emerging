export const isProgressComplete = (minted?: number, retired?: number) =>
  !!(minted && retired === minted);

export const isBatchHasProgress = (amount?: number, retired?: number) =>
  Boolean(amount === 0 && (retired || 0) > 0);

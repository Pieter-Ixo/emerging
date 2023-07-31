const TREES_LENGTH = 10;
const TREE_STEP = 200_000;

export default function fillTreesProgress(totalTrees: number): number[] {
  const emptyTrees: number[] = Array.from({ length: TREES_LENGTH }, () => 0);

  let totalOpacity = totalTrees;

  const filledProgress: number[] = emptyTrees.map(() => {
    if (totalOpacity % TREE_STEP >= 0) {
      const temp = totalOpacity;

      totalOpacity -= TREE_STEP;

      return temp;
    }

    return 0;
  });

  const opacities: number[] = filledProgress.map((num) => {
    switch (true) {
      case num >= TREE_STEP:
        return 1;
      case num >= 150_000 && num < TREE_STEP:
        return 0.75;
      case num >= 100_000 && num < 150_000:
        return 0.5;
      case num > 0 && num < 100_000:
        return 0.25;
      default:
        return 0;
    }
  });

  return opacities;
}

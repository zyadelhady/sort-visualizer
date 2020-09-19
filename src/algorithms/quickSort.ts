import { ISteps } from '../ISteps';

const swap = (arr: any[], i: number, j: number) => {
  const temp = arr[i];
  arr[i] = arr[j];
  arr[j] = temp;
};

const partition = (arr: number[], lo: number, hi: number, steps: ISteps[]) => {
  steps.push({ role: 'color', indexes: [lo, lo] });

  let i = lo,
    j = hi + 1;
  const v = arr[lo];
  while (true) {
    while (arr[++i] < v) if (i === hi) break;
    while (v < arr[--j]) if (j === lo) break;
    if (i >= j) break;
    steps.push({ role: 'setHeight', indexes: [i, j] });
    steps.push({ role: 'discolor', indexes: [i, j] });
    swap(arr, i, j);
  }
  steps.push({ role: 'setHeight', indexes: [lo, j] });
  steps.push({ role: 'discolor', indexes: [lo, j] });
  swap(arr, lo, j);

  return j;
};

const sort = (arr: number[], lo: number, hi: number, steps: ISteps[]) => {
  if (hi <= lo) return;
  const j = partition(arr, lo, hi, steps);
  sort(arr, lo, j - 1, steps);
  sort(arr, j + 1, hi, steps);
};

export const quicksort = (arr: number[]) => {
  const steps: ISteps[] = [];
  sort(arr, 0, arr.length - 1, steps);
  return steps;
};

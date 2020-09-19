import { ISteps } from '../ISteps';

const sort = (
  arr: number[],
  aux: number[],
  lo: number,
  hi: number,
  steps: ISteps[]
) => {
  if (hi <= lo) return;
  const mid = Math.floor(lo + (hi - lo) / 2);
  sort(arr, aux, lo, mid, steps);
  sort(arr, aux, mid + 1, hi, steps);
  merge(arr, aux, lo, mid, hi, steps);
};

const merge = (
  arr: number[],
  aux: number[],
  lo: number,
  mid: number,
  hi: number,
  steps: ISteps[]
) => {
  for (let k = lo; k <= hi; k++) {
    aux[k] = arr[k];
  }
  let i = lo,
    j = mid + 1;
  for (let k = lo; k <= hi; k++) {
    if (i > mid) {
      steps.push({ role: 'color', indexes: [j, j] });
      steps.push({ role: 'setHeight', indexes: [k, aux[j]] });
      steps.push({ role: 'discolor', indexes: [j, j] });
      steps.push({ role: 'discolor', indexes: [k, k] });
      ////////////////////////
      arr[k] = aux[j++];
    } else if (j > hi) {
      steps.push({ role: 'color', indexes: [i, i] });
      steps.push({ role: 'setHeight', indexes: [k, aux[i]] });
      steps.push({ role: 'discolor', indexes: [i, i] });
      steps.push({ role: 'discolor', indexes: [k, k] });

      ////////////////////////
      arr[k] = aux[i++];
    } else if (aux[j] < aux[i]) {
      steps.push({ role: 'color', indexes: [i, j] });
      steps.push({ role: 'setHeight', indexes: [k, aux[j]] });
      steps.push({ role: 'discolor', indexes: [i, j] });
      steps.push({ role: 'discolor', indexes: [k, k] });

      ////////////////////////
      arr[k] = aux[j++];
    } else {
      steps.push({ role: 'color', indexes: [i, j] });
      steps.push({ role: 'setHeight', indexes: [k, aux[i]] });
      steps.push({ role: 'discolor', indexes: [i, j] });
      steps.push({ role: 'discolor', indexes: [k, k] });

      ////////////////////////
      arr[k] = aux[i++];
    }
  }
};

export const mergeSortSteps = (arr: number[]) => {
  const aux = [...arr];
  const steps: ISteps[] = [];
  sort(arr, aux, 0, arr.length - 1, steps);
  return steps;
};

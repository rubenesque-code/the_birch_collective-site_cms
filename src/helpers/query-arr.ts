/** returns items of arr1 not in arr2 */
export function strArrayDivergence(items1: string[], items2: string[]) {
  return items1.filter((item1) => !items2.includes(item1));
}

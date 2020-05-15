import index from './_index';

/**
 * Gets value at index.
 * @param x an array
 * @param i index (0)
 */
function get<T>(x: T[], i: number=0): T {
  return x[index(x.length, i)];
}
export default get;

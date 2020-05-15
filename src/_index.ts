/**
 * Gets zero-based index.
 * @param X array length
 * @param i index (-ve: from right) (0)
 */
function index(X: number, i: number): number {
  return i<0? Math.max(X+i, 0) : Math.min(i, X);
}
export default index;

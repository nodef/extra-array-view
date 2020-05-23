

/**
 * Lists all values.
 * @param x an array
 */
function* values<T>(x: T[]): IterableIterator<T> {
  for(var v of x)
    yield v;
}
export default values;

import proxy from './_proxy';
import index from './_index';

function popLength<T>(x: T[]): number {
  var X = x.length;
  return Math.max(X-1, 0);
}

function popAt<T>(x: T[], k: number): [T[], number] {
  var X = x.length;
  var k = index(Math.max(X-1, 0), k);
  if(k<X-1) return [x, k];
  return [null, -1];
}

/**
 * Removes last value.
 * @param x an array
 */
function pop<T>(x: T[]): T[] {
  return proxy(x, () => popLength(x), (k) => {
    var [a, k] = popAt(x, k);
    if(k>=0) return a[k];
  }, (k, w) => {
    var [a, k] = popAt(x, k);
    if(k>=0) a[k] = w;
  });
}
export default pop;

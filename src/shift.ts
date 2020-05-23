import proxy from './_proxy';
import index from './_index';

function shiftLength<T>(x: T[]): number {
  var X = x.length;
  return Math.max(X-1, 0);
}

function shiftAt<T>(x: T[], k: number): [T[], number] {
  var X = x.length;
  var k = index(X-1, k);
  if(k<X-1) return [x, k+1];
  return [null, -1];
}

/**
 * Removes first value.
 * @param x an array
 */
function shift<T>(x: T[]): T[] {
  return proxy(x, () => shiftLength(x), (k) => {
    var [a, k] = shiftAt(x, k);
    if(k>=0) return a[k];
  }, (k, w) => {
    var [a, k] = shiftAt(x, k);
    if(k>=0) a[k] = w;
  });
}
export default shift;

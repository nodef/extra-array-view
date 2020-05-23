import proxy from './_proxy';
import index from './_index';

function reverseLength<T>(x: T[]): number {
  var X = x.length;
  return X;
}

function reverseAt<T>(x: T[], k: number): [T[], number] {
  var X = x.length;
  var k = index(X, k);
  if(k<X) return [x, X-1-k];
  return [null, -1];
}

/**
 * Reverses the values.
 * @param x an array
 */
function reverse<T>(x: T[]): T[] {
  return proxy(x, () => reverseLength(x), (k) => {
    var [a, k] = reverseAt(x, k);
    if(k>=0) return a[k];
  }, (k, w) => {
    var [a, k] = reverseAt(x, k);
    if(k>=0) a[k] = w;
  });
}
export default reverse;

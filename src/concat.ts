import proxy from './_proxy';
import index from './_index';

function concatLength<T>(xs: T[][]): number {
  var a = 0;
  for(var x of xs)
    a += x.length;
  return a;
}

function concatAt<T>(xs: T[][], i: number): [T[], number] {
  var X = concatLength(xs);
  var i = index(X, i);
  for(var x of xs) {
    if(i<x.length) return [x, i];
    i -= x.length;
  }
  return [null, -1];
}

/**
 * Appends arrays together.
 * @param xs arrays
 */
function concat<T>(...xs: T[][]): T[] {
  return proxy(xs as any, () => concatLength(xs), (k) => {
    var [x, k] = concatAt(xs, k);
    if(k>=0) return x[k];
  }, (k, v) => {
    var [x, k] = concatAt(xs, k);
    if(k>=0) x[k] = v;
  });
}
export default concat;

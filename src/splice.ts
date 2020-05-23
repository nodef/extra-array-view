import proxy from './_proxy';
import index from './_index';

function spliceLength<T>(x: T[], i: number, n: number, vs: T[]): number {
  var X = x.length, VS = vs.length;
  var i = index(X, i), REM = Math.min(n, X-i);
  return X-REM+VS;
}

function spliceAt<T>(x: T[], i: number, n: number, vs: T[], k: number): [T[], number] {
  var X = x.length, VS = vs.length;
  var i = index(X, i), REM = Math.min(n, X-i);
  var k = index(X-REM+VS, k);
  if(k<i) return [x, k];
  if(k<i+VS) return [vs, k-i];
  if(k<X-REM+VS) return [x, k-i-VS];
  return [null, -1];
}

/**
 * Removes or replaces existing values.
 * @param x an array
 * @param i remove index
 * @param n number of values to remove (rest)
 * @param vs values to insert
 */
function splice<T>(x: T[], i: number, n: number, ...vs: T[]): T[] {
  return proxy(x, () => spliceLength(x, i, n, vs), (k) => {
    var [a, k] = spliceAt(x, i, n, vs, k);
    if(k>=0) return a[k];
  }, (k, w) => {
    var [a, k] = spliceAt(x, i, n, vs, k);
    if(i>=0) a[k] = w;
  });
}
export default splice;

import proxy from './_proxy';
import index from './_index';

function unshiftLength<T>(x: T[], vs: T[]): number {
  var X = x.length, VS = vs.length;
  return VS+X;
}

function unshiftAt<T>(x: T[], vs: T[], k: number): [T[], number] {
  var X = x.length, VS = vs.length;
  var k = index(VS+X, k);
  if(k<VS) return [vs, k];
  if(k<X) return [x, k-VS];
  return [null, -1];
}

/**
 * Adds values to the start.
 * @param x an array
 * @param vs values to add
 */
function unshift<T>(x: T[], ...vs: T[]): T[] {
  return proxy(x, () => unshiftLength(x, vs), (k) => {
    var [a, k] = unshiftAt(x, vs, k);
    if(k>=0) return a[k];
  }, (k, w) => {
    var [a, k] = unshiftAt(x, vs, k);
    if(k>=0) a[k] = w;
  });
}
export default unshift;

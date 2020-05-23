import proxy from './_proxy';
import index from './_index';

function pushLength<T>(x: T[], vs: T[]): number {
  var X = x.length, VS = vs.length;
  return X+VS;
}

function pushAt<T>(x: T[], vs: T[], k: number): [T[], number] {
  var X = x.length, VS = vs.length;
  var k = index(X+VS, k);
  if(k<X) return [x, k];
  if(k<X+VS) return [vs, k-X];
  return [null, -1];
}

/**
 * Adds values to the end. 
 * @param x an array
 * @param vs values to add
 */
function push<T>(x: T[], ...vs: T[]): T[] {
  return proxy(x, () => pushLength(x, vs), (k) => {
    var [a, k] = pushAt(x, vs, k);
    if(k>=0) return a[k];
  }, (k, w) => {
    var [a, k] = pushAt(x, vs, k);
    if(k>=0) a[k] = w;
  });
}
export default push;

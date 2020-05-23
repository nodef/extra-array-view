import proxy from './_proxy';
import index from './_index';
import type {mapFn} from './_types';

function mapLength<T>(x: T[]): number {
  var X = x.length;
  return X;
}

function mapAt<T>(x: T[], k: number): [T[], number] {
  var X = x.length;
  var k = index(X, k);
  if(k<X) return [x, k];
  return [null, -1];
}

/**
 * Updates values based on map function.
 * @param x an array
 * @param fn map function (v, i, x)
 * @param ths this argument
 */
function map<T, U>(x: T[], fn: mapFn<T, T|U>, ths: object=null): (T|U)[] {
  return proxy(x, () => mapLength(x), (k) => {
    var [a, k] = mapAt(x, k);
    if(k>=0) return fn.call(ths, a[k], k, a);
  }, (k, w) => {
    var [a, k] = mapAt(x, k);
    if(k>=0) a[k] = w;
  });
}
export default map;

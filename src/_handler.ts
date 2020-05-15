import type {getFn} from './_types';

/**
 * Gives a proxy handler for array.
 * @param n length of array
 * @param fn get function (i)
 */
function handler<T>(n: number, fn: getFn<T>): ProxyHandler<T[]> {
  var iterator = function*() {
    for(var i=0; i<n; i++)
      yield fn(i);
  };
  return {
    get(x, k) {
      if(k==='length') return n;
      if(k===Symbol.iterator) return iterator;
      return fn(k as number);
    },
    ownKeys(x) {
      return Reflect.ownKeys(x);
    }
  };
}
export default handler;

import type {lengthFn, getFn, setFn} from './_types';

function* proxyValues<T>(fl: lengthFn, fg: getFn<T>): IterableIterator<T> {
  for(var i=0, I=fl(); i<I; i++)
    yield fg(i);
}

/**
 * Generates a proxy for array.
 * @param x an array
 * @param n length function
 * @param fn get function (x, i)
 */
function proxy<T>(x: T[], fl: lengthFn, fg: getFn<T>, fs: setFn<T>): T[] {
  return new Proxy<T[]>(x, {
    get(x, k) {
      if(k===Symbol.iterator) return () => proxyValues(fl, fg);
      if(isFinite(k as any)) return fg(k as any);
      if(k==='length') return fl();
      return Array.prototype[k].call;
    },
    set(x, k, v) {
      if(isFinite(k as any)) fs(k as any, v);
      return false;
    },
    ownKeys(x) {
      return Reflect.ownKeys(x);
    }
  });
}
export default proxy;

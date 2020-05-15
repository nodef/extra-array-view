import values from './values';
import type {getFn, lengthFn} from './_types';

/**
 * Generates a proxy for array.
 * @param x an array
 * @param n length function
 * @param fn get function (x, i)
 */
function handler<T>(x: T[], flen: lengthFn<T>, fget: getFn<T>): T[] {
  return new Proxy<T[]>(x, {
    get(x, k) {
      if(k==='length') return flen(x);
      if(k===Symbol.iterator) return () => values(x);
      return fget(x, k as number);
    },
    ownKeys(x) {
      return Reflect.ownKeys(x);
    }
  });
}
export default handler;

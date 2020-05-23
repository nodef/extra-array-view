import proxy from './_proxy';
import index from './_index';

function sliceLength<T>(x: T[], i: number, I: number): number {
  var X = x.length, i = index(X, i), I = index(X, i);
  return Math.max(I-i, 0);
}

function sliceAt<T>(x: T[], i: number, I: number, k: number): [T[], number] {
  var X = x.length, i = index(X, i), I = index(X, i);
  var k = index(Math.max(I-i, 0), k);
  if(k<I-i) return [x, k+i];
  return [null, -1];
}

/**
 * Gets a part of array.
 * @param x an array
 * @param i start index (0)
 * @param I end index (end)
 */
function slice<T>(x: T[], i: number=0, I: number=x.length): T[] {
  return proxy(x, () => sliceLength(x, i, I), (k) => {
    var [a, k] = sliceAt(x, i, I, k);
    if(k>=0) return a[k];
  }, (k, w) => {
    var [a, k] = sliceAt(x, i, I, k);
    if(k>=0) a[k] = w;
  });
}
export default slice;

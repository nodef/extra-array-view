import proxy from './_proxy';
import index from './_index';

function unshift<T>(x: T[], ...vs: T[]): T[] {
  var X = x.length, VS = vs.length, A = VS+X;
  return proxy(x, () => A, (k) => {
    var k = index(A, k);
    return k<VS? vs[k] : x[k-VS];
  }, (k, w) => {

  });
}
export default unshift;

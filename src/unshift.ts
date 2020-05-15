import proxy from './_proxy';
import index from './_index';

function unshift<T>(x: T[], ...vs: T[]): T[] {
  var X = x.length, VS = vs.length, A = VS+X;
  return proxy(x, () => A, (_, i) => {
    var i = index(A, i);
    return i<VS? vs[i] : x[i-VS];
  });
}
export default unshift;

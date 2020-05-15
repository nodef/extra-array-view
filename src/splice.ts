import handler from './_handler';
import index from './_index';

function splice<T>(x: T[], i: number, n: number, ...vs: T[]): T[] {
  var X = x.length, VS = vs.length;
  var i = index(X, i), REM = Math.min(X-i, n);
  var A = X - REM + VS;
  return new Proxy<T[]>(x, handler(A, k => {
    if(k<i) return x[k];
    if(k>=i+VS) return x[k-VS+REM];
    return vs[k-i];
  }));
}
export default splice;

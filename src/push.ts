import proxy from './_proxy';
import index from './_index';

function push<T>(x: T[], ...vs: T[]): T[] {
  var VS = vs.length;
  return proxy(x, () => x.length+VS, (k) => {
    var X = x.length;
    var k = index(X+VS, k);
    return k<X? x[k] : vs[k-X];
  }, (k, w) => {
    var X = x.length;
    var k = index(X+VS, k);
    if(k<X) x[k] = w;
    else vs[k-X] = w;
  });
}
export default push;

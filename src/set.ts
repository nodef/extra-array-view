import proxy from './_proxy';
import index from './_index'

function set<T>(x: T[], i: number, v: T): T[] {
  var X = x.length, i = index(X, i);
  return proxy(x, () => x.length, (k) => {
    var k = index(x.length, k);
    return k===i? v : x[k];
  }, (k, w) => {
    var k = index(x.length, k);
    if(k===i) v = w;
    else x[k] = w;
  });
}
export default set;

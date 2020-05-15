import proxy from './_proxy';
import index from './_index'

function set<T>(x: T[], i: number, v: T): T[] {
  var X = x.length, i = index(X, i);
  return proxy(x, () => x.length, (_, j) => {
    var j = index(X, j);
    return j===i? v : x[j];
  });
}
export default set;

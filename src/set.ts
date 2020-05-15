import index from "@extra-array/index";
import handler from './_handler';

function set<T>(x: T[], i: number, v: T): T[] {
  var i = index(x, i);
  return new Proxy<T[]>(x, handler(x.length, j => {
    var j = index(x, j);
    return j===i? v : x[j];
  }));
}
export default set;

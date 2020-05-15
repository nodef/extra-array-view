import proxy from './_proxy';
import index from './_index';

function concatLength(xs: any) {
  var a = 0;
  for(var x of xs)
    a += x.length;
  return a;
}

function concat<T>(...xs: T[][]): T[] {
  var XS = xs.length;
  return proxy(xs as any, concatLength, (_, k) => {
    var A = concatLength(xs), k = index(A, k);
    for(var i=XS-1, j=A; i>=0; i--) {
      if(k>=j) return xs[i][k-j];
      j -= xs[i].length;
    }
  })
}
export default concat;

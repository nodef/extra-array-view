import index from "@extra-array/index";

function set<T>(x: T[], i: number, v: T): ProxyConstructor {
  // @ts-ignore
  return new Proxy<T[]>(x, () => ({
    get(x: T[], k: PropertyKey): any {
      if(k==='length') return x.length;
      if(k===Symbol.iterator) return function* () {
        for(var j=0, J=x.length; j<J; j++)
          yield j==index(x, i)? v : x[j];
      };
      if(index(x, k as number)==index(x, i)) return v;
      return x[index(x, k as number)];
    }
  }));
}
export default set;

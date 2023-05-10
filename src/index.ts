import {
  CompareFunction,
  ProcessFunction,
  TestFunction,
  MapFunction,
  ReduceFunction,
} from "extra-array";





// #region TYPES
// =============

/** Array view without support for array access operator. */
class RawArrayView<T> {
  /** The base array. */
  readonly base:  T[];
  /** Begin index in the base array. */
  readonly begin: number;
  /** End index in the base array. */
  readonly end:   number;


  /**
   * Create a new array view.
   * @param x base array
   * @param i begin index [0]
   * @param I end index (exclusive) [|x|]
   */
  constructor(x: T[], i: number=0, I: number=x.length) {
    this.base  = x;
    this.begin = i;
    this.end   = I;
  }


  // #region ABOUT
  // -------------

  /** Get iterator to iterate through values. */
  [Symbol.iterator](): IterableIterator<T> {
    return this.base.slice(this.begin, this.end)[Symbol.iterator]();
  }


  /**
   * List all indices.
   * @returns 0, 1, ..., |this|-1
   */
  keys(): IterableIterator<number> {
    return this.base.slice(this.begin, this.end).keys();
  }


  /**
   * List all values.
   * @returns v₀, v₁, ... | vᵢ = this[i]
   */
  values(): IterableIterator<T> {
    return this.base.slice(this.begin, this.end).values();
  }


  /**
   * List all index-value pairs.
   * @returns [0, v₀], [1, v₁], ... | vᵢ = this[i]
   */
  entries(): IterableIterator<[number, T]> {
    return this.base.slice(this.begin, this.end).entries();
  }
  // #endregion


  // #region INDEX
  // -------------

  /**
   * Get zero-based index for an element in array view.
   * @param i ±index
   * @returns i' | this[i'] = this[i]; i' ∈ [0, |this|]
   */
  index(i: number): number {
    return i>=0? Math.min(this.begin + i, this.end) : Math.max(this.begin, this.end + i);
  }


  /**
   * Get zero-based index range for part of array view.
   * @param i begin ±index [0]
   * @param I end ±index (exclusive) [|this|]
   * @returns [i', I'] | i' ≤ I'; i', I' ∈ [0, |this|]
   */
  indexRange(i: number=0, I: number=this.length): [number, number] {
    var i = i>=0? Math.min(this.begin + i, this.end) : Math.max(this.begin, this.end + i);
    var I = I>=0? Math.min(this.begin + I, this.end) : Math.max(this.begin, this.end + I);
    return [i, Math.max(i, I)];
  }
  // #endregion


  // #region LENGTH
  // -------------

  /** Length of the array view. */
  get length(): number {
    return this.end - this.begin;
  }
  // #endregion


  // #region GET/SET
  /**
   * Get value at index.
   * @param i index
   * @returns this[i]
   */
  get(i: number): T {
    if (i>=0 && i<this.length) return this.base[this.begin + i];
  }


  /**
   * Get value at index.
   * @param i ±index
   * @returns this[i]
   */
  at(i: number): T {
    if (i>=-this.length && i<this.length) return this.base[this.index(i)];
  }


  /**
   * Set value at index.
   * @param i index
   * @param v value
   */
  set(i: number, v: T): void {
    if (i>=0 && i<this.length) this.base[this.begin + i] = v;
  }


  // TODO: with()
  // #endregion


  // #region SORT
  // ------------

  /**
   * Arrange values in order.
   * @param fc compare function (a, b)
   */
  sort(fc: CompareFunction<T>): void {
    var x = this.base.slice(this.begin, this.end);
    x.sort(fc);  // PERF: Optimize with rangedSort()?
    this.base.splice(this.begin, x.length, ...x);
  }


  // TODO: toSorted()
  // #endregion


  // #region PART
  // ------------

  /**
   * Get part of an array.
   * @param i begin index [0]
   * @param I end index [|this|]
   * @returns this[i..I]
   */
  slice(i: number=0, I: number=this.length): T[] {
    return this.base.slice(this.begin, this.end).slice(i, I);
  }
  // #endregion


  // #region FIND
  // ------------

  /**
   * Find first value passing a test.
   * @param ft test function (v, i, x)
   * @param ths this argument
   * @returns first v | ft(v) = true; v ∈ x
   */
  find(ft: TestFunction<T>, ths?: any): T {
    return this.base.slice(this.begin, this.end).find(ft, ths);
  }


  // TODO: findLast()
  // #endregion


  // #region SEARCH
  // --------------

  /**
   * Find index of first value passing a test.
   * @param ft test function (v, i, x)
   * @param ths this argument
   * @returns first index of value, -1 if not found
   */
  findIndex(ft: TestFunction<T>, ths?: any): number {
    return this.base.slice(this.begin, this.end).findIndex(ft, ths);
  }


  // TODO: findLastIndex()
  // #endregion


  // #region SEARCH VALUE
  // --------------------

  /**
   * Check if array has a value.
   * @param v search value
   * @param i begin index [0]
   * @returns v ∈ this[i..]?
   */
  includes(v: T, i: number=0): boolean {
    return this.base.slice(this.begin, this.end).includes(v, i);
  }


  /**
   * Find first index of a value.
   * @param v search value
   * @param i begin index [0]
   * @returns index of v in this[i..] if found else -1
   */
  indexOf(v: T, i: number=0): number {
    return this.base.slice(this.begin, this.end).indexOf(v, i);
  }


  /**
   * Find last index of a value.
   * @param v search value
   * @param i begin index [|this|-1]
   * @returns last index of v in this[0..i] if found else -1
   */
  lastIndexOf(v: T, i: number=this.length-1): number {
    return this.base.slice(this.begin, this.end).lastIndexOf(v, i);
  }
  // #endregion


  // #region FUNCTIONAL
  // ------------------

  /**
   * Call a function for each value.
   * @param fn process function (v, i, x)
   * @param ths this argument
   */
  forEach(fn: ProcessFunction<T>, ths?: any): void {
    this.base.slice(this.begin, this.end).forEach(fn, ths);
  }


  /**
   * Examine if any value satisfies a test.
   * @param ft test function (v, i, x)
   * @param ths this argument
   * @returns true if ft(vᵢ) = true for some vᵢ ∈ this
   */
  some(ft: TestFunction<T>, ths?: any): boolean {
    return this.base.slice(this.begin, this.end).some(ft, ths);
  }


  /**
   * Examine if all values satisfy a test.
   * @param ft test function (v, i, x)
   * @param ths this argument
   * @returns true if ft(vᵢ) = true for all vᵢ ∈ this
   */
  every(ft: TestFunction<T>, ths?: any): boolean {
    return this.base.slice(this.begin, this.end).every(ft, ths);
  }


  /**
   * Transform values of the array view.
   * @param fm map function (v, i, x)
   * @param ths this argument
   * @returns [fm(v₀), fm(v₁), ...] | vᵢ ∈ this
   */
  map(fm: MapFunction<T, T>, ths?: any): T[] {
    return this.base.slice(this.begin, this.end).map(fm, ths);
  }


  /**
   * Reduce values of array to a single value.
   * @param fr reduce function (acc, v, i, x)
   * @param init initial value
   * @returns fr(fr(acc, v₀), v₁)... | fr(acc, v₀) = v₀ if acc not given
   */
  reduce(fr: ReduceFunction<T, T>, init?: T): T {
    return this.base.slice(this.begin, this.end).reduce(fr, init);
  }


  /**
   * Reduce values from right, to a single value.
   * @param fr reduce function (acc, v, i, x)
   * @param init initial value
   * @returns fr(fr(acc, vₓ₋₀), vₓ₋₁)... | fr(acc, vₓ₋₀) = vₓ₋₀ if acc not given
   */
  reduceRight(fr: ReduceFunction<T, T>, init?: T): T {
    return this.base.slice(this.begin, this.end).reduceRight(fr, init);
  }


  /**
   * Keep values which pass a test.
   * @param ft test function (v, i, x)
   * @param ths this argument
   * @returns [v₀, v₁, ...] | ft(vᵢ) = true; vᵢ ∈ this
   */
  filter(ft: TestFunction<T>, ths?: any): T[] {
    return this.base.slice(this.begin, this.end).filter(ft, ths);
  }
  // #endregion


  // #region FLATTEN
  // ---------------

  /**
   * Flatten nested array to given depth.
   * @param d depth [1]
   * @returns flat array
   */
  flat(d: number=1): any[] {
    return this.base.slice(this.begin, this.end).flat(d);
  }


  /**
   * Flatten nested array, based on map function.
   * @param fm map function (v, i, x)
   * @param ths this argument
   * @returns flat array
   */
  flatMap<U>(fm: MapFunction<T, U>, ths?: any): U[] {
    return this.base.slice(this.begin, this.end).flatMap(fm, ths);
  }
  // #endregion


  // #region MANIPULATION
  // --------------------

  /**
   * Fill with given value!
   * @param v value
   * @param i begin index [0]
   * @param I end index [|this|]
   */
  fill(v: T, i: number=0, I: number=this.length): void {
    var [i, I] = this.indexRange(i, I);
    this.base.fill(v, i, I);
  }


  /**
   * Add value to the end (NOP).
   * @param vs values to add
   * @returns |this|
   */
  push(...vs: T[]): number {
    // NOTE: push() can't be performed on array view.
    return this.length;
  }


  /**
   * Remove last value (NOP).
   * @returns undefined
   */
  pop() {
    // NOTE: pop() can't be performed on array view.
    return undefined;
  }


  /**
   * Remove first value (NOP).
   * @returns undefined
   */
  shift() {
    // NOTE: shift() can't be performed on array view.
    return undefined;
  }


  /**
   * Add value to the start (NOP).
   * @param vs values to add
   * @returns |this|
   */
  unshift(...vs: T[]): number {
    // NOTE: unshift() can't be performed on array view.
    return this.length;
  }


  /**
   * Copy part of array within.
   * @param j write index [0]
   * @param i read begin index [0]
   * @param I read end index [|this|]
   */
  copyWithin(j: number, i: number, I: number=this.length): void {
    var x = this.base.slice(this.begin, this.end);
    x.copyWithin(j, i, I);  // PERF: Can be optimized?
    this.base.splice(this.begin, x.length, ...x);
  }


  /**
   * Remove or replace existing values (NOP).
   * @param i remove index
   * @param n number of values to remove [rest]
   * @param vs values to insert
   * @returns []
   */
  splice(i: number, n: number, ...vs: T[]): T[] {
    // NOTE: splice() can't be performed on array view.
    return [];
  }


  // TODO: toSpliced()
  // #endregion


  // #region CONCAT/JOIN
  // -------------------

  /**
   * Append values from arrays.
   * @param xs arrays
   * @returns ...this, ...x₀, ...x₁, ... | [x₀, x₁, ...] = xs
   */
  concat(...xs: T[][]): T[] {
    return this.base.slice(this.begin, this.end).concat(...xs);
  }


  /**
   * Join values together into a string.
   * @param sep separator [,]
   * @returns "$\{v₀\}$\{sep\}$\{v₁\}..." | vᵢ ∈ this
   */
  join(sep: string=","): string {
    return this.base.slice(this.begin, this.end).join(sep);
  }
  // #endregion


  // #region REARRANGE
  // -----------------

  /**
   * Reverse the values.
   */
  reverse(): void {
    var x = this.base.slice(this.begin, this.end);
    x.reverse();  // PERF: Can be optimized?
    this.base.splice(this.begin, x.length, ...x);
  }


  // TODO: toReversed()
  // #endregion


  // #region TO STRING
  // -----------------

  /**
   * Convert array view to locale-specific string.
   * @returns "$\{v₀\},$\{v₁\},..." | vᵢ ∈ this
   */
  toLocaleString(): string {
    return this.base.slice(this.begin, this.end).toLocaleString();
  }


  /**
   * Convert array view to string.
   * @returns "$\{v₀\},$\{v₁\},..." | vᵢ ∈ this
   */
  toString(): string {
    return this.base.slice(this.begin, this.end).toString();
  }
  // #endregion
}
// #endregion




// #region METHODS
// ===============

// #region GENERATE
// ----------------

/**
 * Convert array range to array view.
 * @param x an array
 * @param i begin index [0]
 * @param I end index [|x|]
 * @returns proxy-based array view
 */
export function fromArray<T>(x: T[], i: number=0, I: number=x.length): T[] {
  var y = new RawArrayView(x, i, I);
  return new Proxy<T[]>(x, {
    get(_, k) {
      if (typeof k==="symbol" || !isFinite(k as any)) return y[k];
      return y.get(Number(k));
    },
    set(_, k, v) {
      if (typeof k==="symbol" || !isFinite(k as any)) return false;
      y.set(Number(k), v);
      return true;
    },
    ownKeys(x) {
      return Reflect.ownKeys(x);
    }
  });
}
export {fromArray as from};
// #endregion
// #endregion

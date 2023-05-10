import {
  fromArray,
} from "../src";




// #region ABOUT
// -------------

test("Symbol.iterator", () => {
  var x = [10, 40, 30, 20, 50];
  var y = fromArray(x, 1, 4);
  var a = y[Symbol.iterator]();
  expect([...a]).toEqual([40, 30, 20]);
});


test("keys", () => {
  var x = [10, 40, 30, 20, 50];
  var y = fromArray(x, 1, 4);
  var a = y.keys();
  expect([...a]).toEqual([0, 1, 2]);
});


test("values", () => {
  var x = [10, 40, 30, 20, 50];
  var y = fromArray(x, 1, 4);
  var a = y.values();
  expect([...a]).toEqual([40, 30, 20]);
});


test("entries", () => {
  var x = [10, 40, 30, 20, 50];
  var y = fromArray(x, 1, 4);
  var a = y.entries();
  expect([...a]).toEqual([[0, 40], [1, 30], [2, 20]]);
});
// #endregion




// #region LENGTH
// --------------

test("length", () => {
  var x = [10, 40, 30, 20, 50];
  var y = fromArray(x, 1, 4);
  expect(y.length).toBe(3);
});
// #endregion




// #region GET/SET
// ---------------

test("get[]", () => {
  var x = [10, 40, 30, 20, 50];
  var y = fromArray(x, 1, 4);
  expect(y[0]).toBe(40);
  expect(y[1]).toBe(30);
  expect(y[2]).toBe(20);
  expect(y[ 3]).toBeUndefined();
  expect(y[-1]).toBeUndefined();
});


test("at()", () => {
  var x = [10, 40, 30, 20, 50];
  var y = fromArray(x, 1, 4);
  expect(y.at(0)).toBe(40);
  expect(y.at(1)).toBe(30);
  expect(y.at(2)).toBe(20);
  expect(y.at(-1)).toBe(20);
  expect(y.at( 3)).toBeUndefined();
  expect(y.at(-4)).toBeUndefined();
});


test("set[]", () => {
  var x = [10, 40, 30, 20, 50];
  var y = fromArray(x, 1, 4);
  y[0] = 41;
  y[1] = 31;
  y[2] = 21;
  expect(x).toEqual([10, 41, 31, 21, 50]);
});
// #endregion




// #region SORT
// ------------

test("sort", () => {
  var x = [10, 40, 30, 20, 50];
  var y = fromArray(x, 1, 4);
  y.sort();
  expect(y).toEqual([20, 30, 40]);
  expect(x).toEqual([10, 20, 30, 40, 50]);
});
// #endregion




// #region PART
// ------------

test("slice", () => {
  var x = [10, 40, 30, 20, 50];
  var y = fromArray(x, 1, 4);
  expect(y.slice(0,  1)).toEqual([40]);
  expect(y.slice(0,  2)).toEqual([40, 30]);
  expect(y.slice(0, -1)).toEqual([40, 30]);
});
// #endregion




// #region FIND
// ------------

test("find", () => {
  var x = [10, 40, 30, 20, 50];
  var y = fromArray(x, 1, 4);
  expect(y.find(v => v<40)).toBe(30);
  expect(y.find(v => v<20)).toBeUndefined();
});
// #endregion




// #region SEARCH
// --------------

test("findIndex", () => {
  var x = [10, 40, 30, 20, 50];
  var y = fromArray(x, 1, 4);
  expect(y.findIndex(v => v<40)).toBe(1);
  expect(y.findIndex(v => v<20)).toBe(-1);
});
// #endregion




// #region SEARCH VALUE
// --------------------

test("includes", () => {
  var x = [10, 40, 30, 20, 50];
  var y = fromArray(x, 1, 4);
  expect(y.includes(30)).toBe(true);
  expect(y.includes(20)).toBe(true);
  expect(y.includes(10)).toBe(false);
});


test("indexOf", () => {
  var x = [10, 40, 30, 20, 50];
  var y = fromArray(x, 1, 4);
  expect(y.indexOf(30)).toBe(1);
  expect(y.indexOf(20)).toBe(2);
  expect(y.indexOf(10)).toBe(-1);
});


test("lastIndexOf", () => {
  var x = [10, 40, 30, 20, 40];
  var y = fromArray(x, 1, 4);
  expect(y.lastIndexOf(30)).toBe(1);
  expect(y.lastIndexOf(20)).toBe(2);
  expect(y.lastIndexOf(10)).toBe(-1);
});
// #endregion




// #region FUNCTIONAL
// ------------------

test("forEach", () => {
  var x = [10, 40, 30, 20, 40];
  var y = fromArray(x, 1, 4);
  var a: number[] = [];
  y.forEach(v => a.push(v));
  expect(a).toEqual([40, 30, 20]);
});


test("some", () => {
  var x = [10, 40, 30, 20, 40];
  var y = fromArray(x, 1, 4);
  expect(y.some(v => v<40)).toBe(true);
  expect(y.some(v => v<30)).toBe(true);
  expect(y.some(v => v<20)).toBe(false);
});


test("every", () => {
  var x = [10, 40, 30, 20, 40];
  var y = fromArray(x, 1, 4);
  expect(y.every(v => v<50)).toBe(true);
  expect(y.every(v => v<40)).toBe(false);
  expect(y.every(v => v<30)).toBe(false);
});


test("map", () => {
  var x = [10, 40, 30, 20, 40];
  var y = fromArray(x, 1, 4);
  var a = y.map(v => v+1);
  expect(a).toEqual([41, 31, 21]);
});


test("reduce", () => {
  var x = [10, 40, 30, 20, 40];
  var y = fromArray(x, 1, 4);
  var a = y.reduce((a, v) => a+v, 0);
  expect(a).toBe(90);
});


test("reduceRight", () => {
  var x = [10, 40, 30, 20, 40];
  var y = fromArray(x, 1, 4);
  var a = y.reduceRight((a, v) => a+v, 0);
  expect(a).toBe(90);
});


test("filter", () => {
  var x = [10, 40, 30, 20, 40];
  var y = fromArray(x, 1, 4);
  var a = y.filter(v => v<40);
  expect(a).toEqual([30, 20]);
});
// #endregion




// #region FLATTEN
// ---------------

test("flat", () => {
  var x = [10, [40, 30], 20, [50]];
  var y = fromArray(x, 1, 4);
  expect(y.flat()).toEqual([40, 30, 20, 50]);
});


test("flatMap", () => {
  var x = [10, 40, 30, 20, 50];
  var y = fromArray(x, 1, 4);
  var a = y.flatMap(v => [v, v+1]);
  expect(a).toEqual([40, 41, 30, 31, 20, 21]);
});
// #endregion




// #region MANIPULATION
// --------------------

test("fill", () => {
  var x = [10, 40, 30, 20, 50];
  var y = fromArray(x, 1, 4);
  y.fill(0);
  expect(y).toEqual([0, 0, 0]);
  expect(x).toEqual([10, 0, 0, 0, 50]);
});


test("push", () => {
  var x = [10, 40, 30, 20, 50];
  var y = fromArray(x, 1, 4);
  y.push(60);
  // NOTE: push() can't be performed on array view.
  expect(y).toEqual([40, 30, 20]);
  expect(x).toEqual([10, 40, 30, 20, 50]);
});


test("pop", () => {
  var x = [10, 40, 30, 20, 50];
  var y = fromArray(x, 1, 4);
  var a = y.pop();
  // NOTE: pop() can't be performed on array view.
  expect(a).toBeUndefined();
  expect(y).toEqual([40, 30, 20]);
  expect(x).toEqual([10, 40, 30, 20, 50]);
});


test("shift", () => {
  var x = [10, 40, 30, 20, 50];
  var y = fromArray(x, 1, 4);
  var a = y.shift();
  // NOTE: shift() can't be performed on array view.
  expect(a).toBeUndefined();
  expect(y).toEqual([40, 30, 20]);
  expect(x).toEqual([10, 40, 30, 20, 50]);
});


test("unshift", () => {
  var x = [10, 40, 30, 20, 50];
  var y = fromArray(x, 1, 4);
  y.unshift(0);
  // NOTE: unshift() can't be performed on array view.
  expect(y).toEqual([40, 30, 20]);
  expect(x).toEqual([10, 40, 30, 20, 50]);
});


test("copyWithin", () => {
  var x = [10, 40, 30, 20, 50];
  var y = fromArray(x, 1, 4);
  y.copyWithin(0, 1, 3);
  expect(y).toEqual([30, 20, 20]);
  expect(x).toEqual([10, 30, 20, 20, 50]);
});


test("splice", () => {
  var x = [10, 40, 30, 20, 50];
  var y = fromArray(x, 1, 4);
  var a = y.splice(1, 1, 31, 32);
  // NOTE: splice() can't be performed on array view.
  expect(a).toEqual([]);
  expect(y).toEqual([40, 30, 20]);
  expect(x).toEqual([10, 40, 30, 20, 50]);
});
// #endregion




// #region CONCAT/JOIN
// -------------------

test("concat", () => {
  var x = [10, 40, 30, 20, 50];
  var y = fromArray(x, 0, 3);
  var z = fromArray(x, 2, 4);
  var a = y.concat(z);
  expect(a).toEqual([10, 40, 30, 30, 20]);
});


test("join", () => {
  var x = [10, 40, 30, 20, 50];
  var y = fromArray(x, 1, 4);
  var a = y.join();
  expect(a).toBe("40,30,20");
});
// #endregion




// #region REARRANGE
// -----------------

test("reverse", () => {
  var x = [10, 40, 30, 20, 50];
  var y = fromArray(x, 1, 4);
  y.reverse();
  expect(y).toEqual([20, 30, 40]);
  expect(x).toEqual([10, 20, 30, 40, 50]);
});
// #endregion




// #region TO STRING
// -----------------

test("toLocaleString", () => {
  var x = [10, 40, 30, 20, 50];
  var y = fromArray(x, 1, 4);
  var a = y.toLocaleString();
  expect(a).toBe("40,30,20");
});


test("toString", () => {
  var x = [10, 40, 30, 20, 50];
  var y = fromArray(x, 1, 4);
  var a = y.toString();
  expect(a).toBe("40,30,20");
});
// #endregion

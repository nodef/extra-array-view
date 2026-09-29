import {assertEquals} from "@std/assert";
import {
  fromArray,
} from "./index.ts";




// #region ABOUT
// -------------

Deno.test("Symbol.iterator", () => {
  const x = [10, 40, 30, 20, 50];
  const y = fromArray(x, 1, 4);
  const a = y[Symbol.iterator]();
  assertEquals([...a], [40, 30, 20]);
});


Deno.test("keys", () => {
  const x = [10, 40, 30, 20, 50];
  const y = fromArray(x, 1, 4);
  const a = y.keys();
  assertEquals([...a], [0, 1, 2]);
});


Deno.test("values", () => {
  const x = [10, 40, 30, 20, 50];
  const y = fromArray(x, 1, 4);
  const a = y.values();
  assertEquals([...a], [40, 30, 20]);
});


Deno.test("entries", () => {
  const x = [10, 40, 30, 20, 50];
  const y = fromArray(x, 1, 4);
  const a = y.entries();
  assertEquals([...a], [[0, 40], [1, 30], [2, 20]]);
});
// #endregion




// #region LENGTH
// --------------

Deno.test("length", () => {
  const x = [10, 40, 30, 20, 50];
  const y = fromArray(x, 1, 4);
  assertEquals(y.length, 3);
});
// #endregion




// #region GET/SET
// ---------------

Deno.test("get[]", () => {
  const x = [10, 40, 30, 20, 50];
  const y = fromArray(x, 1, 4);
  assertEquals(y[0], 40);
  assertEquals(y[1], 30);
  assertEquals(y[2], 20);
  assertEquals(y[ 3], undefined);
  assertEquals(y[-1], undefined);
});


Deno.test("at()", () => {
  const x = [10, 40, 30, 20, 50];
  const y = fromArray(x, 1, 4);
  assertEquals(y.at(0), 40);
  assertEquals(y.at(1), 30);
  assertEquals(y.at(2), 20);
  assertEquals(y.at(-1), 20);
  assertEquals(y.at( 3), undefined);
  assertEquals(y.at(-4), undefined);
});


Deno.test("set[]", () => {
  const x = [10, 40, 30, 20, 50];
  const y = fromArray(x, 1, 4);
  y[0] = 41;
  y[1] = 31;
  y[2] = 21;
  assertEquals(x, [10, 41, 31, 21, 50]);
});
// #endregion




// #region SORT
// ------------

Deno.test("sort", () => {
  const x = [10, 40, 30, 20, 50];
  const y = fromArray(x, 1, 4);
  console.log(y.length, y);
  y.sort();
  console.log(y.length, y);
  assertEquals(y, [20, 30, 40]);
  assertEquals(x, [10, 20, 30, 40, 50]);
});
// #endregion




// #region PART
// ------------

Deno.test("slice", () => {
  const x = [10, 40, 30, 20, 50];
  const y = fromArray(x, 1, 4);
  assertEquals(y.slice(0,  1), [40]);
  assertEquals(y.slice(0,  2), [40, 30]);
  assertEquals(y.slice(0, -1), [40, 30]);
});
// #endregion




// #region FIND
// ------------

Deno.test("find", () => {
  const x = [10, 40, 30, 20, 50];
  const y = fromArray(x, 1, 4);
  assertEquals(y.find(v => v<40), 30);
  assertEquals(y.find(v => v<20), undefined);
});
// #endregion




// #region SEARCH
// --------------

Deno.test("findIndex", () => {
  const x = [10, 40, 30, 20, 50];
  const y = fromArray(x, 1, 4);
  assertEquals(y.findIndex(v => v<40), 1);
  assertEquals(y.findIndex(v => v<20), -1);
});
// #endregion




// #region SEARCH VALUE
// --------------------

Deno.test("includes", () => {
  const x = [10, 40, 30, 20, 50];
  const y = fromArray(x, 1, 4);
  assertEquals(y.includes(30), true);
  assertEquals(y.includes(20), true);
  assertEquals(y.includes(10), false);
});


Deno.test("indexOf", () => {
  const x = [10, 40, 30, 20, 50];
  const y = fromArray(x, 1, 4);
  assertEquals(y.indexOf(30), 1);
  assertEquals(y.indexOf(20), 2);
  assertEquals(y.indexOf(10), -1);
});


Deno.test("lastIndexOf", () => {
  const x = [10, 40, 30, 20, 40];
  const y = fromArray(x, 1, 4);
  assertEquals(y.lastIndexOf(30), 1);
  assertEquals(y.lastIndexOf(20), 2);
  assertEquals(y.lastIndexOf(10), -1);
});
// #endregion


// #region FUNCTIONAL
// ------------------

Deno.test("forEach", () => {
  const x = [10, 40, 30, 20, 40];
  const y = fromArray(x, 1, 4);
  const a: number[] = [];
  y.forEach(v => a.push(v));
  assertEquals(a, [40, 30, 20]);
});


Deno.test("some", () => {
  const x = [10, 40, 30, 20, 40];
  const y = fromArray(x, 1, 4);
  assertEquals(y.some(v => v<40), true);
  assertEquals(y.some(v => v<30), true);
  assertEquals(y.some(v => v<20), false);
});


Deno.test("every", () => {
  const x = [10, 40, 30, 20, 40];
  const y = fromArray(x, 1, 4);
  assertEquals(y.every(v => v<50), true);
  assertEquals(y.every(v => v<40), false);
  assertEquals(y.every(v => v<30), false);
});


Deno.test("map", () => {
  const x = [10, 40, 30, 20, 40];
  const y = fromArray(x, 1, 4);
  const a = y.map(v => v+1);
  assertEquals(a, [41, 31, 21]);
});


Deno.test("reduce", () => {
  const x = [10, 40, 30, 20, 40];
  const y = fromArray(x, 1, 4);
  const a = y.reduce((a, v) => a+v, 0);
  assertEquals(a, 90);
});


Deno.test("reduceRight", () => {
  const x = [10, 40, 30, 20, 40];
  const y = fromArray(x, 1, 4);
  const a = y.reduceRight((a, v) => a+v, 0);
  assertEquals(a, 90);
});


Deno.test("filter", () => {
  const x = [10, 40, 30, 20, 40];
  const y = fromArray(x, 1, 4);
  const a = y.filter(v => v<40);
  assertEquals(a, [30, 20]);
});
// #endregion




// #region FLATTEN
// ---------------

Deno.test("flat", () => {
  const x = [10, [40, 30], 20, [50]];
  const y = fromArray(x, 1, 4);
  assertEquals(y.flat(), [40, 30, 20, 50]);
});


Deno.test("flatMap", () => {
  const x = [10, 40, 30, 20, 50];
  const y = fromArray(x, 1, 4);
  const a = y.flatMap(v => [v, v+1]);
  assertEquals(a, [40, 41, 30, 31, 20, 21]);
});
// #endregion




// #region MANIPULATION
// --------------------

Deno.test("fill", () => {
  const x = [10, 40, 30, 20, 50];
  const y = fromArray(x, 1, 4);
  y.fill(0);
  assertEquals(y, [0, 0, 0]);
  assertEquals(x, [10, 0, 0, 0, 50]);
});


Deno.test("push", () => {
  const x = [10, 40, 30, 20, 50];
  const y = fromArray(x, 1, 4);
  y.push(60);
  // NOTE: push() can't be performed on array view.
  assertEquals(y, [40, 30, 20]);
  assertEquals(x, [10, 40, 30, 20, 50]);
});


Deno.test("pop", () => {
  const x = [10, 40, 30, 20, 50];
  const y = fromArray(x, 1, 4);
  const a = y.pop();
  // NOTE: pop() can't be performed on array view.
  assertEquals(a, undefined);
  assertEquals(y, [40, 30, 20]);
  assertEquals(x, [10, 40, 30, 20, 50]);
});


Deno.test("shift", () => {
  const x = [10, 40, 30, 20, 50];
  const y = fromArray(x, 1, 4);
  const a = y.shift();
  // NOTE: shift() can't be performed on array view.
  assertEquals(a, undefined);
  assertEquals(y, [40, 30, 20]);
  assertEquals(x, [10, 40, 30, 20, 50]);
});


Deno.test("unshift", () => {
  const x = [10, 40, 30, 20, 50];
  const y = fromArray(x, 1, 4);
  y.unshift(0);
  // NOTE: unshift() can't be performed on array view.
  assertEquals(y, [40, 30, 20]);
  assertEquals(x, [10, 40, 30, 20, 50]);
});


Deno.test("copyWithin", () => {
  const x = [10, 40, 30, 20, 50];
  const y = fromArray(x, 1, 4);
  y.copyWithin(0, 1, 3);
  assertEquals(y, [30, 20, 20]);
  assertEquals(x, [10, 30, 20, 20, 50]);
});


Deno.test("splice", () => {
  const x = [10, 40, 30, 20, 50];
  const y = fromArray(x, 1, 4);
  const a = y.splice(1, 1, 31, 32);
  // NOTE: splice() can't be performed on array view.
  assertEquals(a, []);
  assertEquals(y, [40, 30, 20]);
  assertEquals(x, [10, 40, 30, 20, 50]);
});
// #endregion




// #region CONCAT/JOIN
// -------------------

Deno.test("concat", () => {
  const x = [10, 40, 30, 20, 50];
  const y = fromArray(x, 0, 3);
  const z = fromArray(x, 2, 4);
  const a = y.concat(z);
  assertEquals(a, [10, 40, 30, 30, 20]);
});


Deno.test("join", () => {
  const x = [10, 40, 30, 20, 50];
  const y = fromArray(x, 1, 4);
  const a = y.join();
  assertEquals(a, "40,30,20");
});
// #endregion




// #region REARRANGE
// -----------------

Deno.test("reverse", () => {
  const x = [10, 40, 30, 20, 50];
  const y = fromArray(x, 1, 4);
  y.reverse();
  assertEquals(y, [20, 30, 40]);
  assertEquals(x, [10, 20, 30, 40, 50]);
});
// #endregion




// #region TO STRING
// -----------------

Deno.test("toLocaleString", () => {
  const x = [10, 40, 30, 20, 50];
  const y = fromArray(x, 1, 4);
  const a = y.toLocaleString();
  assertEquals(a, "40,30,20");
});


Deno.test("toString", () => {
  const x = [10, 40, 30, 20, 50];
  const y = fromArray(x, 1, 4);
  const a = y.toString();
  assertEquals(a, "40,30,20");
});
// #endregion

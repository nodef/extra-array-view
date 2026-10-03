An [array view] is a proxy to an underlying array.<br>

▌
📦 [JSR](https://jsr.io/@nodef/extra-array-view),
📦 [NPM](https://www.npmjs.com/package/@nodef/extra-array-view),
📰 [Docs](https://jsr.io/@nodef/extra-array-view/doc).

<br>


This package provides a **view** to an underlying array. It is a proxy of the
array, and any changes made to it are reflected in the underlying array. It is
similar to a *slice* of an array, but it does not copy the array. To obtain a
view, use the `fromArray()` function.

[array view]: https://stackoverflow.com/questions/16990064/are-array-views-possible

<br>

```javascript
import * as xarrayView from "jsr:@nodef/extra-array-view";

var x = [10, 40, 30, 20, 50];
var y = xarrayView.fromArray(x, 1, 4);

y[0];
// → 40

y[1];
// → 30

y.at(-1);
// → 20

y.sort();
x;
// → [ 10, 20, 30, 40, 50 ]

y.reverse();
x;
// → [ 10, 40, 30, 20, 50 ]

y.fill(0);
x;
// → [ 10, 0, 0, 0, 50 ]
```

<br>
<br>


## Index

| Property | Description |
|  ----  |  ----  |
| [fromArray] | Convert array range to array view. |


<br>
<br>


## References

- [negative-array - npm : Sindre Sorhus](https://www.npmjs.com/package/negative-array)
- [TypedArray : MDN Web Docs](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/TypedArray)
- [Array : MDN Web Docs](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array)
- [Proxy : MDN Web Docs](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Proxy)
- [Operator overloading in JavaScript : Saad Quadri](https://www.proposals.es/proposals/Operator%20overloading)
- [How would you overload the [] operator in javascript](https://stackoverflow.com/a/25658975/1413259)
- [Check if value is a Symbol in JavaScript](https://stackoverflow.com/a/46479190/1413259)
- [how to get an array out of a javascript proxy](https://stackoverflow.com/a/71645169/1413259)

<br>
<br>

[![](https://raw.githubusercontent.com/qb40/designs/gh-pages/0/image/11.png)](https://wolfram77.github.io)<br>
[![ORG](https://img.shields.io/badge/org-nodef-green?logo=Org)](https://nodef.github.io)
![](https://ga-beacon.deno.dev/G-RC63DPBH3P:SH3Eq-NoQ9mwgYeHWxu7cw/github.com/nodef/extra-array-view)


[fromArray]: https://jsr.io/@nodef/extra-array-view/doc/~/fromArray

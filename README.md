An [array view] is a proxy to an underlying array.<br>
📦 [Node.js](https://www.npmjs.com/package/extra-array-view),
🌐 [Web](https://www.npmjs.com/package/extra-array-view.web),
📜 [Files](https://unpkg.com/extra-array-view/),
📰 [Docs](https://nodef.github.io/extra-array-view/),
📘 [Wiki](https://github.com/nodef/extra-array-view/wiki/).

<br>


This package provides a **view** to an underlying array. It is a proxy of the
array, and any changes made to it are reflected in the underlying array. It is
similar to a *slice* of an array, but it does not copy the array. To obtain a
view, use the `fromArray()` function.

With this package, you can simplify the implementation of complex algorithms.
Try it out today! This package is available in *Node.js* and *Web* formats. To
use it on the web, simply use the `extra_array_view` global variable after
loading with a `<script>` tag from the [jsDelivr CDN].

> Stability: [Experimental](https://www.youtube.com/watch?v=L1j93RnIxEo).

[array view]: https://stackoverflow.com/questions/16990064/are-array-views-possible
[jsDelivr CDN]: https://cdn.jsdelivr.net/npm/extra-array-view.web/index.js

<br>

```javascript
const xarrayView = require('extra-array-view');
// import * as xarrayView from "extra-array-view";
// import * as xarrayView from "https://unpkg.com/extra-array-view/index.mjs"; (deno)

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

[![](https://img.youtube.com/vi/z0ttvjJvh2s/maxresdefault.jpg)](https://www.youtube.com/watch?v=z0ttvjJvh2s)<br>
[![ORG](https://img.shields.io/badge/org-nodef-green?logo=Org)](https://nodef.github.io)
[![Coverage Status](https://coveralls.io/repos/github/nodef/extra-array-view/badge.svg?branch=master)](https://coveralls.io/github/nodef/extra-array-view?branch=master)
[![Test Coverage](https://api.codeclimate.com/v1/badges/b5039bd76147c1625bce/test_coverage)](https://codeclimate.com/github/nodef/extra-array-view/test_coverage)
<!-- [![DOI](https://zenodo.org/badge/133759104.svg)](https://zenodo.org/badge/latestdoi/133759104) -->


[fromArray]: https://github.com/nodef/extra-array-view/wiki/fromArray

rework-hwb
==========

Rework plugin for hwb color functions, as proposed in [CSS Color Module Level 4 Working Draft](http://dev.w3.org/csswg/css-color/#the-hwb-notation).

## Introduction

The HWB color model is coming to CSS, and you can use it right now with Sass. Read more about the HWB model [here](http://fettblog.eu/hwb-colors/) and at the [W3C working draft for the CSS color module, level 4](http://dev.w3.org/csswg/css-color/#the-hwb-notation).


## Installation

```
$ npm install rework-color-hwb
```

## Usage

Example Rework code:

```
'use strict';

var fs    = require('fs'),
  rework  = require('rework'),
  hwb     = require('rework-hwb');

var css = fs.readFileSync('css/main.css', 'utf8').toString();

var output = rework(css)
  .use(hwb)
  .toString();

fs.writeFileSync('dist/main.output.css', output);
```

And start using it:

```
body {
	// results in rgba(127, 255, 0, 0.5)
	background-color: hwb(90deg, 0, 0, 0.5);
	// results in rgb(127,233,255)
	color: hwb(190deg, 0.5, 0);
}
```

## Further reading

* [CSS levels up: HWB colour model](http://fettblog.eu/hwb-colors/)
* [W3C working draft for the CSS color module, level 4](http://dev.w3.org/csswg/css-color/#the-hwb-notation).


## Credits

* @pangratz for unit tests
* @ianstormtaylor, who made the `rework-color-function`, and whose code structure inspired this plugin

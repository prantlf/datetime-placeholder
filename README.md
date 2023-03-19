# DateTime Pattern Placeholder

[![Latest version](https://img.shields.io/npm/v/datetime-placeholder)
 ![Dependency status](https://img.shields.io/librariesio/release/npm/datetime-placeholder)
](https://www.npmjs.com/package/datetime-placeholder)
[![Coverage](https://codecov.io/gh/prantlf/datetime-placeholder/branch/master/graph/badge.svg)](https://codecov.io/gh/prantlf/datetime-placeholder)
[![Codacy Badge](https://api.codacy.com/project/badge/Grade/9f1034029c0747a980cd49f64f16338b)](https://www.codacy.com/app/prantlf/datetime-placeholder?utm_source=github.com&amp;utm_medium=referral&amp;utm_content=prantlf/datetime-placeholder&amp;utm_campaign=Badge_Grade)

Simplifies a date/time-formatting pattern using [Unicode LDML] tokens to a pattern usable in date/time pickers.

Although [Unicode LDML] is a widely accepted standard for tokens in date/time formatting patterns, the variety of the tokens is not comprehensible, when presented in a date/time picker to an end-user. Patterns presented as value placeholders can be simpler, because the parser accepts more variants of the input form of a date/value part.

| Locale | Formatting pattern  | Picker placeholder          |
|:-------|:--------------------|:----------------------------|
| en     | M/d/yy, h:mm a      | mm/dd/yy, hh:mm aa          |
| cs     | d. MMMM y H:mm:ss z | dd. mmm yyyy hh:mm:ss zz    |

```js
const placeholder = simplifyDateTimePattern('d.M.yy') // dd.mm.yy
```

* ES, CJS and UMD module exports.
* TypeScript type declarations (typings).
* No other dependencies.
* Tiny code base - 1.88 kB minified, 801 B gzipped, 731 B brotlied.

Related projects:

* [date-and-time-formatter] - formats a date/time value to a localised string using a pattern consisting of [Unicode LDML] tokens.
* [datetime-locale-patterns] - provides localized date/time format patterns for styles `full`, `long`, `medium` and `short` using [Unicode CLDR], compliant with [Unicode LDML].
* [intl-datetimeformat-options] - provides localized date/time format patterns for styles `full`, `long`, `medium` and `short`, using [`Intl.DateTimeFormat`].
* [intl-datetimeformat-pattern] - creates a valid [`Intl.DateTimeFormat`] options object from a [Unicode CLDR] skeleton or token pattern.

## Installation

This module can be installed in your project using [NPM], [PNPM] or [Yarn]. Make sure, that you use [Node.js] version 16.14 or newer.

```sh
$ npm i datetime-placeholder
$ pnpm i datetime-placeholder
$ yarn add datetime-placeholder
```

Functions are exposed as named exports from ES and CJS modules, for example:

```js
import { simplifyDateTimePattern } from 'datetime-placeholder'
```

```js
const { simplifyDateTimePattern } = require('datetime-placeholder')
```

A UMD module can be loaded to the browser either directly:

```html
<script src="https://unpkg.com/datetime-placeholder@1.0.0/lib/index.min.js"></script>
<script>
  const { simplifyDateTimePattern } = window.dateTimePlaceholder
</script>
```

Or using an AMD module loader:

```html
<script>
  require([
    'https://unpkg.com/datetime-placeholder@1.0.0/lib/index.min.js'
  ], ({ simplifyDateTimePattern }) => {
    ...
  })
</script>
```

## API

### simplifyDateTimePattern(pattern)

Returns a simplified pattern to show to the end-user in a date/time picker.

The **pattern** argument must be a date/time-formatting pattern using [Unicode LDML] tokens.

```js
import { simplifyDateTimePattern } from 'datetime-placeholder'

const placeholder = simplifyDateTimePattern('M/d/yy')
console.log(placeholder) // prints 'mm/dd/yy'
```

### simplifyDateTimePatternToParts(pattern)

Returns a simplified pattern to show to the end-user in a date/time picker as an array of parts, which values are supposed to be concatenated together.

The **pattern** argument must be a date/time-formatting pattern using [Unicode LDML] tokens.

```js
import { simplifyDateTimePatternToParts } from 'datetime-placeholder'

const placeholder = simplifyDateTimePatternToParts('M/d/yy')
console.log(placeholder) // prints the following:
// { type: 'month', value: 'mm',
//   type: 'literal', value: '/',
//   type; 'day', value: 'dd',
//   type: 'literal', value: '/',
//   type: 'year': value: 'yy' }
```

## Pattern Conversion

The characters wrapped between two single quotes characters (`'`) are escaped.
Two single quotes in a row, whether inside or outside a quoted sequence,
represent a "real" single quote. (see the last example)

The input pattern is based on [Unicode Technical Standard #35].
Only those tokens are supported, which can appear in patterns for formatting
instances of `Date` by [`Intl.DateTimeFormat`]. For example, only the "formatting"
variant of a token (M, E) is supported, not the "stand-alone" one (L, i).
("Formatting" means declined according to the rules of the language
 in the context of a date. "Stand-alone" means always nominative singular.)

Accepted patterns:

| Unit                         | Pattern | Placeholder | Meaning      |
|------------------------------|---------|-------------|--------------|
| Era                          | G...    | ee          | era          |
| Calendar year                | y       | yyyy        | full year    |
|                              | yy      | yy          | 2-digit year |
|                              | yyy...  | yyyy        | full year    |
| Month                        | M | MM  | mm          | month number |
|                              | MMM...  | mmm         | month name   |
| Day of month                 | d | dd  | dd          | day number   |
| Day of week                  | E...    | www         | weekday name |
| AM, PM                       | a...    | aa          | AM/PM        |
| AM, PM, noon, midnight       | b...    | aa          |              |
| Flexible day period          | B...    | aa          |              |
| Hour [1-12]                  | h | hh  | hh          | hours        |
| Hour [0-23]                  | H | HH  | hh          |              |
| Hour [0-11]                  | K | KK  | hh          |              |
| Hour [1-24]                  | k | kk  | hh          |              |
| Minute                       | m | mm  | mm          | minutes      |
| Second                       | s | ss  | ss          | seconds      |
| Fraction of second           | S...    | mmm         | milliseconds |
| Timezone (ISO-8601 w/ Z)     | X...    | zz          | time zone    |
| Timezone (ISO-8601 w/o Z)    | x...    | zz          |              |
| Timezone (GMT)               | O...    | zz          |              |
| Timezone (specific non-loc.) | z...    | zz          |              |

Although some placeholders are the same, their meaning is clear from the context within the pattern, because people know how to write down a date/time value.

### Examples

```js
// Represent 11 February 2014 in middle-endian format
simplifyDateTimePattern('MM/dd/yyyy')
//=> 'mm/dd/yyyy'
```

```js
// Escape string by single quote characters
simplifyDateTimePattern("h 'o''clock'")
//=> "hh o'clock"
```

## Contributing

In lieu of a formal styleguide, take care to maintain the existing coding style.  Add unit tests for any new or changed functionality. Lint and test your code using Grunt.

## License

Copyright (c) 2023 Ferdinand Prantl

Licensed under the MIT license.

[Node.js]: http://nodejs.org/
[NPM]: https://www.npmjs.com/
[PNPM]: https://pnpm.io/
[Yarn]: https://yarnpkg.com/
[date-and-time-formatter]: https://github.com/prantlf/date-and-time-formatter
[datetime-locale-patterns]: https://github.com/prantlf/datetime-locale-patterns
[intl-datetimeformat-pattern]: https://github.com/caridy/intl-datetimeformat-pattern
[intl-datetimeformat-options]: https://github.com/prantlf/intl-datetimeformat-options
[Unicode LDML]: https://unicode.org/reports/tr35/
[Unicode CLDR]: https://cldr.unicode.org/
[`Intl.DateTimeFormat`]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/DateTimeFormat
[Unicode Technical Standard #35]: https://www.unicode.org/reports/tr35/tr35-dates.html#Date_Field_Symbol_Table

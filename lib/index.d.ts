/**
 * An object describing a part of a pattern.
 */
interface PatternPart {
  /**
   * A type of the part compatible with [Intl.DateTiemFormat:formatToParts](
   * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/DateTimeFormat/formatToParts).
   */
  type: 'era' | 'year' | 'month' | 'day' | 'weekday' | 'hour' | 'minute' |
        'second' | 'fractionalSecond' | 'dayPeriod'| 'timeZoneName' | 'literal'
  /**
   * The textual part of the pattern.
   */
  value: string
}

/**
 * Returns a simplified pattern to show to the end-user in a date/time picker
 * as an array of parts, which values are supposed to be concatenated together.
 *
 * ### Pattern Conversion
 * 
 * The characters wrapped between two single quotes characters (') are escaped.
 * Two single quotes in a row, whether inside or outside a quoted sequence,
 * represent a "real" single quote. (see the last example)
 *
 * The input pattern is based on [Unicode Technical Standard #35](
 * https://www.unicode.org/reports/tr35/tr35-dates.html#Date_Field_Symbol_Table).
 * Only those tokens are supported, which can appear in patterns for formatting
 * instances of `Date` by `Intl.DateTimeFormat`. For example, only the "formatting"
 * variant of a token (M, E) is supported, not the "stand-alone" one (L, i).
 * ("Formatting" means declined according to the rules of the language
 *  in the context of a date. "Stand-alone" mean s always nominative singular.)
 * 
 * Accepted patterns:
 * 
 * | Unit                         | Pattern | Placeholder | Meaning      |
 * |------------------------------|---------|-------------|--------------|
 * | Era                          | G...    | ee          | era          |
 * | Calendar year                | y       | yyyy        | full year    |
 * |                              | yy      | yy          | 2-digit year |
 * |                              | yyy...  | yyyy        | full year    |
 * | Month                        | M | MM  | mm          | month number |
 * |                              | MMM...  | mmm         | month name   |
 * | Day of month                 | d | dd  | dd          | day number   |
 * | Day of week                  | E...    | www         | weekday name |
 * | AM, PM                       | a...    | aa          | AM/PM        |
 * | AM, PM, noon, midnight       | b...    | aa          |              |
 * | Flexible day period          | B...    | aa          |              |
 * | Hour [1-12]                  | h | hh  | hh          | hours        |
 * | Hour [0-23]                  | H | HH  | hh          |              |
 * | Hour [0-11]                  | K | KK  | hh          |              |
 * | Hour [1-24]                  | k | kk  | hh          |              |
 * | Minute                       | m | mm  | mm          | minutes      |
 * | Second                       | s | ss  | ss          | seconds      |
 * | Fraction of second           | S...    | mmm         | milliseconds |
 * | Timezone (ISO-8601 w/ Z)     | X...    | zz          | time zone    |
 * | Timezone (ISO-8601 w/o Z)    | x...    | zz          |              |
 * | Timezone (GMT)               | O...    | zz          |              |
 * | Timezone (specific non-loc.) | z...    | zz          |              |
 * 
 * Although some placeholders are the same, their meaning is clear from the context
 * within the pattern, because people know how to write down a date/time value.
 * 
 * @param pattern a date/time pattern consisting of Unicode LDML tokens
 * @returns an array of parts of the simplified date/time value placeholder
 * @throws {RangeError} if format string contains unbalanced apostrophes (single quotes)
 * @throws {SyntaxError} if format string contains an invalid letter (Unicode LDML token)
 *
 * @example
 * // Represent 11 February 2014 in middle-endian format
 * simplifyDateTimePatternToParts('MM/dd/yyyy')
 * //=> [{ type: 'month', value: 'mm',
 *         type: 'literal', value: '/',
 *         type; 'day', value: 'dd',
 *         type: 'literal', value: '/',
 *         type: 'year': value: 'yyyy' }]
 *
 * @example
 * // Escape string by single quote characters
 * simplifyDateTimePatternToParts("h 'o''clock'")
 * //=> [{ type: 'hour', value: 'hh',
 *         type: 'literal', value: ' o\'clock' }]
 */
export function simplifyDateTimePatternToParts(pattern: string): PatternPart[]

/**
 * Returns a simplified pattern to show to the end-user in a date/time picker.
 *
 * ### Pattern Conversion
 * 
 * The characters wrapped between two single quotes characters (') are escaped.
 * Two single quotes in a row, whether inside or outside a quoted sequence,
 * represent a "real" single quote. (see the last example)
 *
 * The input pattern is based on [Unicode Technical Standard #35](
 * https://www.unicode.org/reports/tr35/tr35-dates.html#Date_Field_Symbol_Table).
 * Only those tokens are supported, which can appear in patterns for formatting
 * instances of `Date` by `Intl.DateTimeFormat`. For example, only the "formatting"
 * variant of a token (M, E) is supported, not the "stand-alone" one (L, i).
 * ("Formatting" means declined according to the rules of the language
 *  in the context of a date. "Stand-alone" mean s always nominative singular.)
 * 
 * Accepted patterns:
 * 
 * | Unit                         | Pattern | Placeholder | Meaning      |
 * |------------------------------|---------|-------------|--------------|
 * | Era                          | G...    | ee          | era          |
 * | Calendar year                | y       | yyyy        | full year    |
 * |                              | yy      | yy          | 2-digit year |
 * |                              | yyy...  | yyyy        | full year    |
 * | Month                        | M | MM  | mm          | month number |
 * |                              | MMM...  | mmm         | month name   |
 * | Day of month                 | d | dd  | dd          | day number   |
 * | Day of week                  | E...    | www         | weekday name |
 * | AM, PM                       | a...    | aa          | AM/PM        |
 * | AM, PM, noon, midnight       | b...    | aa          |              |
 * | Flexible day period          | B...    | aa          |              |
 * | Hour [1-12]                  | h | hh  | hh          | hours        |
 * | Hour [0-23]                  | H | HH  | hh          |              |
 * | Hour [0-11]                  | K | KK  | hh          |              |
 * | Hour [1-24]                  | k | kk  | hh          |              |
 * | Minute                       | m | mm  | mm          | minutes      |
 * | Second                       | s | ss  | ss          | seconds      |
 * | Fraction of second           | S...    | mmm         | milliseconds |
 * | Timezone (ISO-8601 w/ Z)     | X...    | zz          | time zone    |
 * | Timezone (ISO-8601 w/o Z)    | x...    | zz          |              |
 * | Timezone (GMT)               | O...    | zz          |              |
 * | Timezone (specific non-loc.) | z...    | zz          |              |
 * 
 * Although some placeholders are the same, their meaning is clear from the context
 * within the pattern, because people know how to write down a date/time value.
 * 
 * @param pattern a date/time pattern consisting of Unicode LDML tokens
 * @returns a string with the simplified date/time value placeholder
 * @throws {RangeError} if format string contains unbalanced apostrophes (single quotes)
 * @throws {SyntaxError} if format string contains an invalid letter (Unicode LDML token)
 *
 * @example
 * // Represent 11 February 2014 in middle-endian format
 * simplifyDateTimePattern('MM/dd/yyyy')
 * //=> 'mm/dd/yyyy'
 *
 * @example
 * // Escape string by single quote characters
 * simplifyDateTimePattern("h 'o''clock'")
 * //=> "hh o'clock"
 */
export function simplifyDateTimePattern(pattern: string): string

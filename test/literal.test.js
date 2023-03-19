import tehanu from 'tehanu'
import { deepStrictEqual, strictEqual } from 'assert'
import { simplifyDateTimePattern, simplifyDateTimePatternToParts } from '../lib/index.js'

const test = tehanu(import.meta.url)

test('escapes characters between the single quote characters', () => {
  strictEqual(
    simplifyDateTimePattern("'yyyy-'MM-dd'THH:mm:ss.SSSX' yyyy-'MM-dd'"),
    "yyyy-mm-ddTHH:mm:ss.SSSX yyyy-MM-dd"
  )
  deepStrictEqual(
    simplifyDateTimePatternToParts("'yyyy-'MM-dd'THH:mm:ss.SSSX' yyyy-'MM-dd'"), [
      { type: 'literal', value: 'yyyy-' },
      { type: 'month', value: 'mm' },
      { type: 'literal', value: '-' },
      { type: 'day', value: 'dd' },
      { type: 'literal', value: 'THH:mm:ss.SSSX ' },
      { type: 'year', value: 'yyyy' },
      { type: 'literal', value: '-MM-dd' }
    ]
  )
})

test('two single quote characters are transformed into a "real" single quote', () => {
  strictEqual(
    simplifyDateTimePattern("''h 'o''clock'''"),
    "'hh o'clock'"
  )
  deepStrictEqual(
    simplifyDateTimePatternToParts("''h 'o''clock'''"), [
      { type: 'literal', value: "'" },
      { type: 'hour', value: 'hh' },
      { type: 'literal', value: " o'clock'" }
    ]
  )
})

test('accepts new line character', () => {
  strictEqual(
    simplifyDateTimePattern("yy-MM-dd'\n'HH:mm:ss."),
    'yy-mm-dd\nhh:mm:ss.'
  )
  deepStrictEqual(
    simplifyDateTimePatternToParts("yy-MM-dd'\n'HH:mm:ss."), [
      { type: 'year', value: 'yy' },
      { type: 'literal', value: '-' },
      { type: 'month', value: 'mm' },
      { type: 'literal', value: '-' },
      { type: 'day', value: 'dd' },
      { type: 'literal', value: '\n' },
      { type: 'hour', value: 'hh' },
      { type: 'literal', value: ':' },
      { type: 'minute', value: 'mm' },
      { type: 'literal', value: ':' },
      { type: 'second', value: 'ss' },
      { type: 'literal', value: '.' }
    ]
  )
})

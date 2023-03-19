import tehanu from 'tehanu'
import { throws } from 'assert'
import { simplifyDateTimePattern } from '../lib/index.js'

const test = tehanu(import.meta.url)

test('throws an error if the format string contains an unescaped latin alphabet character', () => {
  throws(simplifyDateTimePattern.bind(null, 'yyyy-MM-dd-nnnn'), RangeError)
})

test('throws an error if the format string contains unbalanced apostrophes', () => {
  throws(simplifyDateTimePattern.bind(null, "'yyyy"), SyntaxError)
})

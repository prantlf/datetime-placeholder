const test = require('tehanu')(__filename)
const { strictEqual } = require('assert')
const { simplifyDateTimePattern, simplifyDateTimePatternToParts } = require('../lib/index.cjs')

test('exports named functions', () => {
  strictEqual(typeof simplifyDateTimePattern, 'function')
  strictEqual(typeof simplifyDateTimePatternToParts, 'function')
  simplifyDateTimePattern('G')
  simplifyDateTimePatternToParts('G')
})

import { simplifyDateTimePattern, simplifyDateTimePatternToParts, PatternPart } from '../lib/index.js'

type testCallback = () => void
declare function test (label: string, callback: testCallback): void

test('Type declarations for TypeScript', () => {
  let _placeholder: string = simplifyDateTimePattern('G')
  _placeholder = simplifyDateTimePattern('G', {})
  _placeholder = simplifyDateTimePattern('G', { letterCase: 'uppercase' })
  let _parts: PatternPart[] = simplifyDateTimePatternToParts('G')
  _parts = simplifyDateTimePatternToParts('G', {})
  _parts = simplifyDateTimePatternToParts('G', { letterCase: 'uppercase' })
})

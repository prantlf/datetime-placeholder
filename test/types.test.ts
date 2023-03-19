import { simplifyDateTimePattern, simplifyDateTimePatternToParts, PatternPart } from '../lib/index.js'

type testCallback = () => void
declare function test (label: string, callback: testCallback): void

test('Type declarations for TypeScript', () => {
  const _placeholder: string = simplifyDateTimePattern('G')
  const _parts: PatternPart[] = simplifyDateTimePatternToParts('G')
})

// Placeholder tokens

const ee = { type: 'era', value: 'ee' }
const yy = { type: 'year', value: 'yy' }
const yyyy = { type: 'year', value: 'yyyy' }
const mm1 = { type: 'month', value: 'mm' }
const mmm1 = { type: 'month', value: 'mmm' }
const www = { type: 'weekday', value: 'www' }
const dd = { type: 'day', value: 'dd' }
const hh = { type: 'hour', value: 'hh' }
const mm2 = { type: 'minute', value: 'mm' }
const ss = { type: 'second', value: 'ss' }
const mmm2 = { type: 'fractionalSecond', value: 'mmm' }
const aa = { type: 'dayPeriod', value: 'aa' }
const zz = { type: 'timeZoneName', value: 'zz' }

// Formatting Token replacements

const tokens = new Map(Object.entries({
  G: ee,
  GG: ee,
  GGG: ee,
  GGGG: ee,
  GGGGG: ee,
  y: yyyy,
  yy: yy,
  yyy: yyyy,
  yyyy: yyyy,
  yyyyy: yyyy,
  M: mm1,
  MM: mm1,
  MMM: mmm1,
  MMMM: mmm1,
  MMMMM: mmm1,
  E: www,
  EE: www,
  EEE: www,
  EEEE: www,
  EEEEE: www,
  d: dd,
  dd: dd,
  h: hh,
  hh: hh,
  H: hh,
  HH: hh,
  K: hh,
  KK: hh,
  k: hh,
  kk: hh,
  m: mm2,
  mm: mm2,
  s: ss,
  ss: ss,
  S: mmm2,
  SS: mmm2,
  SSS: mmm2,
  SSSS: mmm2,
  a: aa,
  aa: aa,
  aaa: aa,
  aaaa: aa,
  aaaaa: aa,
  b: aa,
  bb: aa,
  bbb: aa,
  bbbb: aa,
  bbbbb: aa,
  B: aa,
  BB: aa,
  BBB: aa,
  BBBB: aa,
  BBBBB: aa,
  Z: zz,
  ZZ: zz,
  ZZZ: zz,
  ZZZZ: zz,
  ZZZZZ: zz,
  z: zz,
  zz: zz,
  zzz: zz,
  zzzz: zz,
  O: zz,
  OOOO: zz,
  X: zz,
  XX: zz,
  XXX: zz,
  XXXX: zz,
  XXXXX: zz,
  x: zz,
  xx: zz,
  xxx: zz,
  xxxx: zz,
  xxxxx: zz
}))

// Pattern simplifier

function pushLiteral(parts, value) {
  const { length } = parts
  if (length > 0) {
    const last = parts[length - 1]
    if (last.type === 'literal') {
      last.value += value
      return
    }
  }
  parts.push({ type: 'literal', value })
}

export function simplifyDateTimePatternToParts(pattern, options) {
  const parts = []
  for (let i = 0, l = pattern.length; i < l;) {
    let char = pattern[i]
    // Letters are formatting tokens
    if (char >= 'A' && char <= 'Z' || char >= 'a' && char <= 'z') {
      // Multiple occurrences of the same letter are a single token
      const start = i
      do {
        char = pattern[++i]
      } while (char >= 'A' && char <= 'Z' || char >= 'a' && char <= 'z')
      const token = pattern.substring(start, i)
      let part = tokens.get(token)
      if (!part) throw new RangeError(`invalid token: "${token}"`)
      if (options?.letterCase === 'uppercase') {
        const { type, value } = part
        part = { type, value: value.toUpperCase() }
      }
      parts.push(part)
    } else if (char === '\'') {
      // Apostrophes surround a literal to be formatted as-is
      const start = i + 1
      for(;;) {
        if (++i === l) throw new SyntaxError('missing trailing "\'"')
        char = pattern[i]
        if (char === '\'') {
          // An apostrophe can be escaped by doubling
          if (pattern[i + 1] === '\'') {
            ++i
            continue
          }
          break
        }
      }
      // An apostrophe can be escaped by doubling
      const literal = start === i ? '\'' : pattern.substring(start, i).replaceAll('\'\'', '\'')
      pushLiteral(parts, literal)
      ++i
    } else {
      // Punctuation is formatted as-is
      const start = i
      do {
        if (++i === l) break
        char = pattern[i]
      } while (!(char >= 'A' && char <= 'Z' || char >= 'a' && char <= 'z' || char === '\''))
      const punctuation = pattern.substring(start, i)
      pushLiteral(parts, punctuation)
    }
  }

  return parts
}

export function simplifyDateTimePattern(pattern, options) {
  const parts = simplifyDateTimePatternToParts(pattern)
  let result = ''
  for (const { value } of parts) {
    result += value
  }
  if (options?.letterCase === 'uppercase') result = result.toUpperCase()
  return result
}

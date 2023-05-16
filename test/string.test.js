import tehanu from 'tehanu'
import { strictEqual } from 'assert'
import { simplifyDateTimePattern } from '../lib/index.js'

const test = tehanu(import.meta.url)

test('era', () => {
  strictEqual(simplifyDateTimePattern('G GG GGG GGGG GGGGG'), 'ee ee ee ee ee')
})

test('year', () => {
  strictEqual(simplifyDateTimePattern('y yy yyy yyyy yyyyy'), 'yyyy yy yyyy yyyy yyyy')
})

test('month', () => {
  strictEqual(simplifyDateTimePattern('M MM MMM MMMM MMMMM'), 'mm mm mmm mmm mmm')
})

test('day of week', () => {
  strictEqual(simplifyDateTimePattern('E EE EEE EEEE EEEEE'), 'www www www www www')
})

test('day', () => {
  strictEqual(simplifyDateTimePattern('d dd'), 'dd dd')
})

test('hour', () => {
  strictEqual(simplifyDateTimePattern('h hh H HH k kk K KK'), 'hh hh hh hh hh hh hh hh')
})

test('minute', () => {
  strictEqual(simplifyDateTimePattern('m mm'), 'mm mm')
})

test('second', () => {
  strictEqual(simplifyDateTimePattern('s ss'), 'ss ss')
})

test('fraction of second', () => {
  strictEqual(simplifyDateTimePattern('S SS SSS SSSS'), 'mmm mmm mmm mmm')
})

test('day period', () => {
  strictEqual(
    simplifyDateTimePattern('a aa aaa aaaa aaaaa b bb bbb bbbb bbbbb B BB BBB BBBB BBBBB'),
    'aa aa aa aa aa aa aa aa aa aa aa aa aa aa aa'
  )
})

test('time zone', () => {
  strictEqual(
    simplifyDateTimePattern('Z ZZ ZZZ ZZZZ ZZZZZ z zz zzz zzzz O OOOO X XX XXX XXXX XXXXX x xx xxx xxxx xxxxx'),
    'zz zz zz zz zz zz zz zz zz zz zz zz zz zz zz zz zz zz zz zz zz'
  )
})

test('uppercase', () => {
  strictEqual(
    simplifyDateTimePattern('G E y M d H m s S a z', { letterCase: 'uppercase' }),
    'EE WWW YYYY MM DD HH MM SS MMM AA ZZ'
  )
})

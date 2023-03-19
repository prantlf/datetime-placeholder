import tehanu from 'tehanu'
import { deepStrictEqual } from 'assert'
import { simplifyDateTimePatternToParts } from '../lib/index.js'

const test = tehanu(import.meta.url)

test('era', () => {
  deepStrictEqual(simplifyDateTimePatternToParts('G'), [
    { type: 'era', value: 'ee' }
  ])
})

test('year', () => {
  deepStrictEqual(simplifyDateTimePatternToParts('y'), [
    { type: 'year', value: 'yyyy' }
  ])
  deepStrictEqual(simplifyDateTimePatternToParts('yy'), [
    { type: 'year', value: 'yy' }
  ])
})

test('month', () => {
  deepStrictEqual(simplifyDateTimePatternToParts('M'), [
    { type: 'month', value: 'mm' }
  ])
})

test('day of week', () => {
  deepStrictEqual(simplifyDateTimePatternToParts('E'), [
    { type: 'weekday', value: 'www' }
  ])
})

test('day', () => {
  deepStrictEqual(simplifyDateTimePatternToParts('d'), [
    { type: 'day', value: 'dd' }
  ])
})

test('hour', () => {
  deepStrictEqual(simplifyDateTimePatternToParts('h'), [
    { type: 'hour', value: 'hh' }
  ])
})

test('minute', () => {
  deepStrictEqual(simplifyDateTimePatternToParts('m'), [
    { type: 'minute', value: 'mm' }
  ])
})

test('second', () => {
  deepStrictEqual(simplifyDateTimePatternToParts('s'), [
    { type: 'second', value: 'ss' }
  ])
})

test('fraction of second', () => {
  deepStrictEqual(simplifyDateTimePatternToParts('S'), [
    { type: 'fractionalSecond', value: 'mmm' }
  ])
})

test('day period', () => {
  deepStrictEqual(simplifyDateTimePatternToParts('a'), [
    { type: 'dayPeriod', value: 'aa' }
  ])
  deepStrictEqual(simplifyDateTimePatternToParts('b'), [
    { type: 'dayPeriod', value: 'aa' }
  ])
  deepStrictEqual(simplifyDateTimePatternToParts('B'), [
    { type: 'dayPeriod', value: 'aa' }
  ])
})

test('time zone', () => {
  deepStrictEqual(simplifyDateTimePatternToParts('Z'), [
    { type: 'timeZoneName', value: 'zz' }
  ])
  deepStrictEqual(simplifyDateTimePatternToParts('z'), [
    { type: 'timeZoneName', value: 'zz' }
  ])
  deepStrictEqual(simplifyDateTimePatternToParts('O'), [
    { type: 'timeZoneName', value: 'zz' }
  ])
  deepStrictEqual(simplifyDateTimePatternToParts('X'), [
    { type: 'timeZoneName', value: 'zz' }
  ])
  deepStrictEqual(simplifyDateTimePatternToParts('x'), [
    { type: 'timeZoneName', value: 'zz' }
  ])
})

import { definedOrThrow, isNonNullable } from '../utils'
import { AClockworkOrange } from './fixtures/book'

describe('Entity utils', () => {
  describe(`selectIdValue()`, () => {
    const OLD_ENV = process.env

    beforeEach(() => {
      jest.resetModules() // this is important - it clears the cache
      process.env = { ...OLD_ENV, NODE_ENV: 'development' }
    })

    afterEach(() => {
      process.env = OLD_ENV
      jest.resetAllMocks()
    })

    it('should not warn when key does exist', () => {
      const { selectIdValue } = require('../utils')
      const spy = jest.spyOn(console, 'warn')

      selectIdValue(AClockworkOrange, (book: any) => book.id)
      expect(spy).not.toHaveBeenCalled()
    })

    it('should warn when key does not exist in dev mode', () => {
      const { selectIdValue } = require('../utils')
      const spy = jest.spyOn(console, 'warn')

      selectIdValue(AClockworkOrange, (book: any) => book.foo)

      expect(spy).toHaveBeenCalled()
    })

    it('should warn when key is undefined in dev mode', () => {
      const { selectIdValue } = require('../utils')
      const spy = jest.spyOn(console, 'warn')

      const undefinedAClockworkOrange = { ...AClockworkOrange, id: undefined }
      selectIdValue(undefinedAClockworkOrange, (book: any) => book.id)

      expect(spy).toHaveBeenCalled()
    })

    it('should not warn when key does not exist in prod mode', () => {
      process.env.NODE_ENV = 'production'
      const { selectIdValue } = require('../utils')
      const spy = jest.spyOn(console, 'warn')

      selectIdValue(AClockworkOrange, (book: any) => book.foo)

      expect(spy).not.toHaveBeenCalled()
    })

    it('should not warn when key is undefined in prod mode', () => {
      process.env.NODE_ENV = 'production'
      const { selectIdValue } = require('../utils')
      const spy = jest.spyOn(console, 'warn')

      const undefinedAClockworkOrange = { ...AClockworkOrange, id: undefined }
      selectIdValue(undefinedAClockworkOrange, (book: any) => book.id)

      expect(spy).not.toHaveBeenCalled()
    })
  })

  describe('isNonNullable()', () => {
    it('returns true if input is not a nullable', () => {
      expect(isNonNullable('Mr.Greg')).toBe(true)
      expect(isNonNullable({})).toBe(true)
    })

    it('returns returns false is a nullable', () => {
      expect(isNonNullable(undefined)).toBe(false)
      expect(isNonNullable(null)).toBe(false)
    })
  })

  describe('definedOrThrow()', () => {
    it('returns supplied value if it is defined', () => {

      const bookTitle = AClockworkOrange.title
      expect(definedOrThrow(bookTitle)).toBe(bookTitle)
    })

    it('throws if supplied value not undefined or null', () => {
      expect(() => { definedOrThrow(undefined) }).toThrowError()
      expect(() => { definedOrThrow(null) }).toThrowError()
    })
  })
})

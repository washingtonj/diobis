import { describe, it, expect } from 'vitest'
import { createMasonry } from '../Masonry.svelte'

describe('Masonry', () => {
  describe('Mansory mount logic', () => {
    it('Should order the array in a masonry style', () => {
      const data = [1, 2, 3, 4, 5, 6, 7, 8]
      const numberOfColumns = 4
  
      const result = createMasonry(data, numberOfColumns).data
  
      expect(result).toEqual([1, 5, 2, 6, 3, 7, 4, 8])
    })
  
    it('Should remove items if the array is not divisible', () => {
      const data = [1, 2, 3, 4, 5, 6, 7]
      const numberOfColumns = 3
  
      const result = createMasonry(data, numberOfColumns).data
  
      expect(result).toEqual([1, 4, 2, 5, 3, 6])
    })
  
    it('Should chunk the array', () => {
      const data = [1, 2, 3, 4, 5, 6, 7]
      const numberOfColumns = 3
  
      const result = createMasonry(data, numberOfColumns).chuck()
  
      expect(result).toEqual([[1, 4], [2, 5], [3, 6]])
    })
  })

  describe.skip('Mansory component', () => {})
})
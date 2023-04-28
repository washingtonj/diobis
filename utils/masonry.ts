export function createMasonry (data: Array<any>, numColuns: number) {
  function order (items: any[], numColumns: number): any[] {
    const numRows = Math.ceil(items.length / numColumns)
    const newArray = new Array(items.length)

    for (let i = 0; i < items.length; i++) {
      const col = i % numColumns
      const row = Math.floor(i / numColumns)
      const index = row + col * numRows
      newArray[index] = items[i]
    }

    return newArray
  }

  function lengthWithoutSpare (length: number, columns: number) {
    if (length < columns) { return length }

    const spare = length % columns
    return spare ? length - spare : length
  }

  function chunk (items: any[], numColumns: number): any[] {
    const newArray = []
    const numRows = Math.ceil(items.length / numColumns)

    for (let i = 0; i < numColumns; i++) {
      const start = i * numRows
      const end = start + numRows
      newArray.push(items.slice(start, end))
    }

    return newArray
  }

  const clearedData = data.slice(0, lengthWithoutSpare(data.length, numColuns))

  return {
    data: order(clearedData, numColuns),
    chuck () { return chunk(this.data, numColuns) }
  }
}

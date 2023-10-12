<script context="module" lang="ts">
  /**
   * Creates a masonry layout by ordering and chunking the given data into the specified number of columns.
   * @param data - The array of data to be ordered and chunked.
   * @param numberOfColumns - The number of columns to chunk the data into.
   * @returns An object with the ordered and chunked data.
   */
  export function createMasonry<T>(data: Array<T>, numberOfColumns: number) {
    /**
     * Orders an array of items into a grid with the specified number of columns.
     * @param items - The array of items to be ordered.
     * @param numberOfColumns - The number of columns in the grid.
     * @returns A new array with the items ordered in a grid.
     */
    function order(items: T[], numberOfColumns: number): T[] {
      const numberOfRows = Math.ceil(items.length / numberOfColumns);
      const newOrderedArray = new Array(items.length);

      for (let i = 0; i < items.length; i++) {
        const col = i % numberOfColumns;
        const row = Math.floor(i / numberOfColumns);
        const index = row + col * numberOfRows;
        newOrderedArray[index] = items[i];
      }

      return newOrderedArray;
    }

    /**
     * Chunks an array of items into an array of arrays with the specified number of columns.
     * @param items - The array of items to be chunked.
     * @param numberOfColumns - The number of columns in the grid.
     * @returns A new array of arrays with the items chunked.
     */
    function chunk(items: T[], numberOfColumns: number): T[][] {
      const arrayOfChuncks: T[][] = [];
      const numberOfRows = Math.ceil(items.length / numberOfColumns);

      for (let i = 0; i < numberOfColumns; i++) {
        const start = i * numberOfRows;
        const end = start + numberOfRows;
        arrayOfChuncks.push(items.slice(start, end));
      }

      return arrayOfChuncks;
    }

    /**
     * Calculates the length of an array without the spare elements.
     * @param length - The length of the array.
     * @param numberOfColumns - The number of columns in the grid.
     * @returns The length of the array without the spare elements.
     */
    function lengthWithoutSpare(length: number, numberOfColumns: number) {
      if (length < numberOfColumns) return length;
      const spare = length % numberOfColumns;
      return spare ? length - spare : length;
    }

    const processedData = data.slice(0, lengthWithoutSpare(data.length, numberOfColumns));

    return {
      data: order(processedData, numberOfColumns),
      chuck() {
        return chunk(this.data, numberOfColumns);
      }
    };
  }
</script>

<div data-testid="masonry-container" class="grid md:grid-cols-2 lg:grid-cols-3 gap-3">
  <slot />
</div>

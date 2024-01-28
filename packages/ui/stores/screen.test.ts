import '../tests/match-media-mock';
import { describe, it, expect } from 'vitest';
import { fontSize, nextFontSize } from './screen';
import { get } from 'svelte/store';

describe('Screen Store', () => {
  it('Should change to the next available fontSize', () => {
    // When
    nextFontSize();

    const currentFontSize = get(fontSize);

    // Then
    expect(currentFontSize).toEqual('large');
  });
});

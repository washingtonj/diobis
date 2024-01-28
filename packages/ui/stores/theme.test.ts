import { get } from 'svelte/store';
import { describe, it, expect } from 'vitest';
import { nextTheme, availableThemes, currentTheme } from './theme';

describe('Theme Store', () => {
  it('Should return the current theme', () => {
    // given
    const theme = get(currentTheme);

    // when
    nextTheme();

    // them
    expect(theme).toEqual(availableThemes[0]);
  });

  it('Should change to the next theme', () => {
    // given
    const theme = get(currentTheme);

    // when
    nextTheme();

    // them
    expect(theme).toEqual(availableThemes[1]);
  });
});

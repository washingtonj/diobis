import { writable, get } from 'svelte/store';
import { renderOnClient, storageSync } from '../functions';

const LOCAL_STORAGE_FONT_SIZE_KEY = 'app-font-size';

type ScreenSize = (typeof screenSizes)[number];
type FontSize = (typeof fontSizes)[number];

const screenSizes = ['small', 'mid', 'wide', 'ultrawide'] as const;
const fontSizes = ['small', 'mid', 'large'] as const;

export const screenSize = writable<ScreenSize>('wide');
export const fontSize = writable<FontSize>('mid');

function _onMediaQueryChange() {
  const isMobile = window.matchMedia('(max-width: 767px)').matches;
  const isTablet = window.matchMedia('(max-width: 1023px)').matches;
  const isWide = window.matchMedia('(max-width: 1500px)').matches;

  if (isMobile) {
    screenSize.set('small');
  } else if (isTablet) {
    screenSize.set('mid');
  } else if (isWide) {
    screenSize.set('wide');
  } else {
    screenSize.set('ultrawide');
  }
}

function _changeFontSizeOnDOM(newFontSize: FontSize) {
  const html = document.querySelector('html');

  let currentFontSize: FontSize = 'mid';

  if (html?.classList.contains('text-sm')) {
    currentFontSize = 'small';
  } else if (html?.classList.contains('text-lg')) {
    currentFontSize = 'large';
  }

  const propertyBySize: Record<FontSize, string> = {
    small: 'text-sm',
    mid: 'text-md',
    large: 'text-lg'
  };

  html?.classList.remove(propertyBySize[currentFontSize]);
  html?.classList.add(propertyBySize[newFontSize]);
}

export function nextFontSize() {
  const currentFontName = get(fontSize);
  const currentFontSize = fontSizes.indexOf(currentFontName);
  const nextFontSizeName = fontSizes[currentFontSize + 1] || fontSizes[0];

  fontSize.set(nextFontSizeName);
}

renderOnClient(() => {
  _onMediaQueryChange();
  window.addEventListener('resize', _onMediaQueryChange);
  fontSize.subscribe(_changeFontSizeOnDOM);
  storageSync(LOCAL_STORAGE_FONT_SIZE_KEY, fontSize);
});

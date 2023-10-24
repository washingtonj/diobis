import { writable } from 'svelte/store';

export type ScreenType = 'mobile' | 'tablet' | 'desktop' | 'ultra';

export const screenType = writable<ScreenType>('desktop');

function onMediaQueryChange() {
  const isMobile = window.matchMedia('(max-width: 767px)').matches;
  const isTablet = window.matchMedia('(min-width: 768px) and (max-width: 1023px)').matches;
  const isUltra = window.matchMedia('(min-width: 2048px)').matches;

  if (isMobile) {
    screenType.set('mobile');
  } else if (isTablet) {
    screenType.set('tablet');
  } else if (isUltra) {
    screenType.set('ultra');
  } else {
    screenType.set('desktop');
  }
}

window.addEventListener('resize', onMediaQueryChange);

onMediaQueryChange();
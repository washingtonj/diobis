import { writable, get } from 'svelte/store';
import { renderOnClient, storageSync } from '../functions';

const LOCAL_STORAGE_THEME_KEY = 'app-theme';

type Themes = (typeof availableThemes)[number];

/** Please consult the daisyUI themes available on tailwind.config.js */
export const availableThemes = ['dracula', 'dark'] as const;

export const currentTheme = writable<Themes>('dracula');

function _changeThemeOnDOM(theme: Themes) {
  const html = document.querySelector('html');
  const dataTheme = html?.getAttribute('data-theme');

  if (!dataTheme) {
    console.warn(`No defined theme, setting ${get(currentTheme)} as default`);
    html?.setAttribute('data-theme', get(currentTheme));
    return;
  }

  html?.setAttribute('data-theme', theme);
}

export function nextTheme() {
  const currentThemeName = get(currentTheme);
  const currentThemeIndex = availableThemes.indexOf(currentThemeName);
  const nextThemeName = availableThemes[currentThemeIndex + 1] || availableThemes[0];

  currentTheme.set(nextThemeName);
}

renderOnClient(() => {
  currentTheme.subscribe((theme) => {
    _changeThemeOnDOM(theme);
  });

  storageSync(LOCAL_STORAGE_THEME_KEY, currentTheme);
});

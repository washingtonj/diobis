import { Writable } from 'svelte/store';
import { renderOnClient } from './render-on-client';

export function storageSync(key: string, state: Writable<string>) {
  const savedValue = window.localStorage.getItem(key);

  if (savedValue) state.set(savedValue);

  state.subscribe((value) => {
    const stringfy = typeof value === 'string' ? value : JSON.stringify(value);

    window.localStorage.setItem(key, stringfy);
    return;
  });
}

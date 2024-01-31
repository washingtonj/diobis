import { writable } from 'svelte/store';

export const searchKeys = writable<string[]>([]);

export function setSearchKeys(keys: string[]) {
  searchKeys.set(keys);
}

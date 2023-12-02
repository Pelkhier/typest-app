import { writable } from "svelte/store";

export type Lang = "en" | "ar";

const defaultLang: Lang = "en";

export const langStore = writable<Lang>(defaultLang);
export const loader = writable(false);
export const settingsLoader = writable(false);

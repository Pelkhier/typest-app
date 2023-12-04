import { writable } from "svelte/store";
import type { KeyboardSettins } from "../routes/levels/types";

export type Lang = "en" | "ar";

const defaultLang: Lang = "en";

export const userStore = writable({
    id: 1,
    name: "Admin",
    email: "Admin@admin.com",
    password: "password123",
});

export const langStore = writable<Lang>(defaultLang);
export const loader = writable(false);
export const settingsLoader = writable(false);
export const settingsStore = writable<KeyboardSettins>({
    miniGameSound: true,
    textSize: "medium",
    keyboardSound: true,
    keyboardShow: true,
});

import type { ar } from "./lettersLang";

export type Lang = "en" | "ar";

export type ChoosenLang = typeof ar;

export type TextContent = (typeof ar)["textContentLC"];

import type { Action } from "svelte/action";

export type GameData = {
    time: number | null;
    accuracy: number | null;
    wpm: number | null;
    userId: number;
    levelId: number;
    completed: boolean;
    level: {
        words: string;
        lang: string;
        name: string;
        type: string;
        order: number;
        expectedMiniGameScore: number | null;
    };
};

export type GameType =
    | "learn"
    | "practice"
    | "samurai-game"
    | "duck-hunt"
    | "story-time";
export type GameTypeAr =
    | "تعلم"
    | "تمرين"
    | "لعبة الساموراي"
    | "الصياد"
    | "قصة قصيرة";

export type Game = "waiting for input" | "in progress" | "game over";

export type Words = string;

export type ActiveKey = {
    top: number;
    left: number;
    width: number;
    height: number;
} | null;

export type TextSize = "small" | "medium" | "large";

export type KeyboardSettins = {
    textSize: TextSize;
    keyboardSound: boolean;
    keyboardShow: boolean;
    miniGameSound: boolean;
};

type Attributes = {
    "on:click_outside"?: (e: CustomEvent) => void;
};
export type OutsideEvent = Action<HTMLDivElement, any, Attributes>;

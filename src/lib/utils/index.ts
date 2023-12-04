import type { Hand } from "./types";
import type { Lang } from "../stores/global";
import type { OutsideEvent } from "../routes/levels/types";

const shiftRightHandEN = [
    "`",
    "1",
    "2",
    "3",
    "4",
    "5",
    "6",
    "q",
    "w",
    "e",
    "r",
    "t",
    "a",
    "s",
    "d",
    "f",
    "g",
    "z",
    "x",
    "c",
    "v",
    "b",
    "~",
    "!",
    "@",
    "#",
    "$",
    "%",
    "^",
    "Q",
    "W",
    "E",
    "R",
    "T",
    "A",
    "S",
    "D",
    "F",
    "G",
    "Z",
    "X",
    "C",
    "V",
    "B",
];
const shiftLeftHandEN = [
    "7",
    "8",
    "9",
    "0",
    "-",
    "=",
    "y",
    "u",
    "i",
    "o",
    "p",
    "[",
    "]",
    "\\",
    "h",
    "j",
    "k",
    "l",
    ";",
    "'",
    "n",
    "m",
    ",",
    ".",
    "/",
    "&",
    "*",
    "(",
    ")",
    "_",
    "+",
    "Y",
    "U",
    "I",
    "O",
    "P",
    "{",
    "}",
    "|",
    "H",
    "J",
    "K",
    "L",
    ":",
    '"',
    "N",
    "M",
    "<",
    ">",
    "?",
    " ",
];
const shiftRightHandAR = [
    "ذ",
    "1",
    "2",
    "3",
    "4",
    "5",
    "6",
    "ض",
    "ص",
    "ث",
    "ق",
    "ف",
    "ش",
    "س",
    "ي",
    "ب",
    "ل",
    "ئ",
    "ء",
    "ؤ",
    "ر",
    "لا",
    "ّ",
    "!",
    "@",
    "#",
    "$",
    "%",
    "^",
    "َ",
    "ً",
    "ُ",
    "ٌ",
    "لإ",
    "ِ",
    "ٍ",
    "]",
    "[",
    "لأ",
    "~",
    "ْ",
    "}",
    "{",
    "لآ",
];
const shiftLeftHandAR = [
    "7",
    "8",
    "9",
    "0",
    "-",
    "=",
    "غ",
    "ع",
    "ه",
    "خ",
    "ح",
    "ج",
    "د",
    "\\",
    "ا",
    "ت",
    "ن",
    "م",
    "ك",
    "ط",
    "ى",
    "ة",
    "و",
    "ز",
    "ظ",
    "&",
    "*",
    "(",
    ")",
    "_",
    "+",
    "إ",
    "‘",
    "÷",
    "×",
    "؛",
    "<",
    ">",
    "|",
    "أ",
    "ـ",
    "،",
    "/",
    ":",
    '"',
    "آ",
    "’",
    ",",
    ".",
    "؟",
    " ",
];

export function rightOrLeft(key: string) {
    let hand: Hand = "none";

    switch (key) {
        case "keyg":
        case "keyf":
        case "keyd":
        case "keys":
        case "keya":
        case "keyt":
        case "keyr":
        case "keye":
        case "keyw":
        case "keyq":
        case "keyb":
        case "keyv":
        case "keyc":
        case "keyx":
        case "keyz":
            hand = "neutral-right";
            break;
        case "keyh":
        case "keyj":
        case "keyk":
        case "keyl":
        case "semicolon":
        case "quote":
        case "keyy":
        case "keyu":
        case "keyi":
        case "keyo":
        case "keyp":
        case "bracketleft":
        case "bracketright":
        case "keyn":
        case "keym":
        case "comma":
        case "period":
        case "slash":
        case "space":
            hand = "neutral-left";
            break;
    }

    return hand;
}

export function animateHand(event: KeyboardEvent) {
    let code = event.code.toLowerCase();
    const hand: Hand = rightOrLeft(code);

    let objectElement = document.getElementById("hands") as HTMLObjectElement;
    if (!objectElement) return;
    let doc = objectElement?.contentDocument;
    let svgEl = doc?.getElementById("hands-svg");

    let gEl = svgEl?.getElementsByClassName(
        "st0"
    ) as HTMLCollectionOf<SVGGElement>;

    let gLength = gEl?.length ?? 0;

    for (let i = 0; i < gLength; i += 1) {
        const el = gEl?.item(i);
        if (el) {
            if (el.dataset.code === code || el.id === hand) {
                el.style.display = "block";
            } else {
                el.style.display = "none";
            }
        }
    }
}

export function getLetterPosition(keyCode: string) {
    let keyboarKeys = document.getElementById("keyboard-keys");
    let pathEl = keyboarKeys?.getElementsByTagName("path");

    let length = pathEl?.length ?? 0;
    for (let i = 0; i < length; i += 1) {
        const el = pathEl?.item(i);
        if (el) {
            if (el.dataset.letter === keyCode) {
                // TODO: color should be dynamic

                let { top, left, width, height } = el.getBoundingClientRect();
                return { top, left, width, height };
            }
        }
    }
    return null;
}

export function rightOrLeftNextLetter(key: string, gameLang: Lang) {
    let hand: Hand = "none";

    if (gameLang === "en") {
        if (shiftRightHandEN.includes(key)) {
            hand = "neutral-right";
        } else if (shiftLeftHandEN.includes(key)) {
            hand = "neutral-left";
        }
    } else if (gameLang === "ar") {
        if (shiftRightHandAR.includes(key)) {
            hand = "neutral-right";
        } else if (shiftLeftHandAR.includes(key)) {
            hand = "neutral-left";
        }
    }
    return hand;
}

export function animateHandNextLetter(
    letter: string,
    letterWithShift: boolean,
    gameLang: Lang
) {
    let hand: Hand = rightOrLeftNextLetter(letter, gameLang);
    let elementDataset = "key";

    if (letterWithShift) {
        if (hand === "neutral-right") {
            hand = "shift-right";
        } else {
            hand = "shift-left";
        }
        elementDataset = "keyshift";
    }

    let objectElement = document.getElementById("hands") as HTMLObjectElement;
    if (!objectElement) return;
    let doc = objectElement.contentDocument;
    let svgEl = doc?.getElementById("hands-svg");

    let gEl = svgEl?.getElementsByClassName(
        "st0"
    ) as HTMLCollectionOf<SVGGElement>;

    let gLength = gEl?.length ?? 0;

    for (let i = 0; i < gLength; i += 1) {
        const el = gEl?.item(i);
        if (el) {
            if (el.dataset[elementDataset] === letter || el.id === hand) {
                el.style.display = "block";
            } else {
                el.style.display = "none";
            }
        }
    }

    if (hand == "shift-right" || hand == "shift-left") {
        return hand;
    }
    return null;
}

export function getNextLetterPosition(
    key: string,
    letterWithShift: boolean = false
) {
    let keyboarKeys = document.getElementById("keyboard-keys");

    let pathEl = keyboarKeys?.getElementsByTagName("path");

    let elementDataset = "key";

    if (letterWithShift) {
        elementDataset = "keyshift";
    }

    let length = pathEl?.length ?? 0;
    for (let i = 0; i < length; i += 1) {
        const el = pathEl?.item(i);
        if (el) {
            if (el.dataset[elementDataset] === key) {
                let { top, left, width, height } = el.getBoundingClientRect();
                return { top, left, width, height };
            }
        }
    }
    return null;
}

/** Dispatch event on click outside of node */
export const clickOutside: OutsideEvent = (node: HTMLElement) => {
    const handleClick = (event: MouseEvent) => {
        const target = event.target as HTMLElement;
        if (node && !node.contains(target) && !event.defaultPrevented) {
            const clickOutsideEvent = new CustomEvent("click_outside");

            node.dispatchEvent(clickOutsideEvent);
        }
    };

    document.addEventListener("click", handleClick, true);

    return {
        destroy() {
            document.removeEventListener("click", handleClick, true);
        },
    };
};

export function animateElementChildWhenShow(
    elements: HTMLElement[],
    viewTranslateCss = {
        default: "translatey(0px)",
        above: "translatey(-100px)",
        lower: "translatey(100px)",
    }
) {
    elements.forEach((el) => {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                let child = el.firstChild as HTMLDivElement;
                let parentBounding = el.getBoundingClientRect();
                if (entry.isIntersecting) {
                    child.style.transform = viewTranslateCss.default;
                } else if (parentBounding.y <= 0) {
                    child.style.transform = viewTranslateCss.above;
                } else {
                    child.style.transform = viewTranslateCss.lower;
                }
            });
        });

        observer.observe(el);
    });
}

export function removeMainLayoutNavbar() {
    document.body.style.overflow = "hidden";
    let mainLayout = document.getElementById("main-layout") as HTMLDivElement;
    mainLayout.style.padding = "0";
    mainLayout.style.height = "0";
    let nav = mainLayout.firstElementChild as HTMLDivElement;
    nav.style.display = "none";
}

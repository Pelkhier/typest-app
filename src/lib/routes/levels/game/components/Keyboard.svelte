<script lang="ts">
    import type { ChoosenLang, Lang, TextContent } from "./../types";
    import { ar, en } from "./../lettersLang";
    import { langStore } from "../../../../stores/global";

    export let firstHandsLoad: () => void;

    let lang: ChoosenLang;
    let textKey1: TextContent;
    let textKey2: TextContent;
    let objEl: HTMLObjectElement;

    let language: Lang = $langStore;

    // @ts-ignore
    if (language === "ar") {
        lang = ar;
        textKey1 = ar.textContentLC;
        textKey2 = ar.textContentUC;
    } else {
        lang = en;
        textKey1 = en.textContentLC;
        textKey2 = en.textContentUC;
    }
</script>

<div class="keyboard-plugin flex justify-center" style="width: 100%;">
    <div
        class="intro-keyboard bone"
        tabindex="-1"
        aria-hidden="true"
        style="opacity: 1; width: 685px; position: relative;"
    >
        <div tabindex="-1" id="vkeyboardkeys" style="width: 685px;">
            <svg
                class="standard-kb theme-bone"
                viewBox="0 0 683.3 254"
                xmlns="http://www.w3.org/2000/svg"
            >
                <g id="keyboard-keys">
                    <path
                        data-key={lang.textContentLC.tilda}
                        data-keyshift={lang.textContentUC.tilda}
                        data-letter="backquote"
                        id="tilda"
                        class="st0"
                        d="M58.4,53.7c0,1.7-1.4,3-3,3H18.9c-1.6,0-3-1.3-3-3V18.3c0-1.7,1.3-3,3-3h36.5c1.6,0,3,1.3,3,3V53.7z"
                    />
                    <path
                        data-key={lang.textContentLC.one}
                        data-keyshift={lang.textContentUC.one}
                        data-letter="digit1"
                        id="key-1"
                        class="st0"
                        d="M103.4,53.7c0,1.7-1.3,3-3,3H63.9c-1.7,0-3-1.3-3-3V18.3c0-1.6,1.3-3,3-3h36.5c1.7,0,3,1.4,3,3V53.7z"
                    />
                    <path
                        data-key={lang.textContentLC.q}
                        data-keyshift={lang.textContentUC.q}
                        data-letter="keyq"
                        id="q"
                        class="st0"
                        d="M126.7,97.6c0,1.6-1.3,3-3,3H87.2c-1.7,0-3-1.4-3-3V62.3c0-1.6,1.3-3,3-3h36.5c1.7,0,3,1.4,3,3V97.6z"
                    />
                    <path
                        data-key={lang.textContentLC.a}
                        data-keyshift={lang.textContentUC.a}
                        data-letter="keya"
                        id="a"
                        class="st0"
                        d="M137.4,141.5c0,1.6-1.4,3-3,3H97.9c-1.7,0-3-1.4-3-3v-35.4c0-1.7,1.3-3,3-3h36.5c1.6,0,3,1.3,3,3V141.5z"
                    />
                    <path
                        data-key={lang.textContentLC.z}
                        data-keyshift={lang.textContentUC.z}
                        data-letter="keyz"
                        id="z"
                        class="st0"
                        d="M160.8,185.4c0,1.7-1.4,3-3,3h-36.5c-1.7,0-3-1.3-3-3v-35.3c0-1.7,1.3-3,3-3h36.5c1.6,0,3,1.3,3,3V185.4z"
                    />
                    <path
                        data-key={lang.textContentLC.x}
                        data-keyshift={lang.textContentUC.x}
                        data-letter="keyx"
                        id="x"
                        class="st0"
                        d="M205.8,185.4c0,1.7-1.4,3-3,3h-36.5c-1.7,0-3-1.3-3-3v-35.3c0-1.6,1.3-3,3-3h36.5c1.6,0,3,1.4,3,3V185.4z"
                    />
                    <path
                        data-key={lang.textContentLC.c}
                        data-keyshift={lang.textContentUC.c}
                        data-letter="keyc"
                        id="c"
                        class="st0"
                        d="M250.8,185.4c0,1.7-1.4,3-3,3h-36.5c-1.7,0-3-1.3-3-3v-35.3c0-1.6,1.3-3,3-3h36.5c1.6,0,3,1.4,3,3V185.4z"
                    />
                    <path
                        data-key={lang.textContentLC.v}
                        data-keyshift={lang.textContentUC.v}
                        data-letter="keyv"
                        id="v"
                        class="st0"
                        d="M295.8,185.4c0,1.7-1.4,3-3,3h-36.5c-1.7,0-3-1.3-3-3v-35.3c0-1.6,1.3-3,3-3h36.5c1.6,0,3,1.4,3,3V185.4z"
                    />
                    <path
                        data-key={lang.textContentLC.b}
                        data-keyshift={lang.textContentUC.b}
                        data-letter="keyb"
                        id="b"
                        class="st0"
                        d="M340.8,185.4c0,1.7-1.4,3-3,3h-36.6c-1.6,0-3-1.3-3-3v-35.3c0-1.6,1.4-3,3-3h36.6c1.6,0,3,1.4,3,3V185.4z"
                    />
                    <path
                        data-key={lang.textContentLC.n}
                        data-keyshift={lang.textContentUC.n}
                        data-letter="keyn"
                        id="n"
                        class="st0"
                        d="M385.8,185.4c0,1.7-1.4,3-3,3h-36.5c-1.6,0-3-1.3-3-3v-35.3c0-1.6,1.4-3,3-3h36.5c1.6,0,3,1.4,3,3V185.4z"
                    />
                    <path
                        data-key={lang.textContentLC.m}
                        data-keyshift={lang.textContentUC.m}
                        data-letter="keym"
                        id="m"
                        class="st0"
                        d="M430.8,185.4c0,1.7-1.4,3-3,3h-36.5c-1.6,0-3-1.3-3-3v-35.3c0-1.6,1.4-3,3-3h36.5c1.6,0,3,1.4,3,3V185.4z"
                    />
                    <path
                        data-key={lang.textContentLC.comma}
                        data-keyshift={lang.textContentUC.comma}
                        data-letter="comma"
                        id="comma"
                        class="st0"
                        d="M475.8,185.4c0,1.7-1.4,3-3,3h-36.5c-1.6,0-3-1.3-3-3v-35.3c0-1.6,1.4-3,3-3h36.5c1.6,0,3,1.4,3,3V185.4z"
                    />
                    <path
                        data-key={lang.textContentLC.period}
                        data-keyshift={lang.textContentUC.period}
                        data-letter="period"
                        id="dot"
                        class="st0"
                        d="M520.8,185.4c0,1.7-1.3,3-3,3h-36.5c-1.6,0-3-1.3-3-3v-35.3c0-1.6,1.4-3,3-3h36.5c1.7,0,3,1.4,3,3V185.4z"
                    />
                    <path
                        data-key={lang.textContentLC.slash}
                        data-keyshift={lang.textContentUC.slash}
                        data-letter="slash"
                        id="slash"
                        class="st0"
                        d="M565.8,185.4c0,1.7-1.3,3-3,3h-36.5c-1.6,0-3-1.3-3-3v-35.3c0-1.6,1.4-3,3-3h36.5c1.7,0,3,1.4,3,3V185.4z"
                    />
                    <path
                        data-key={lang.textContentLC.s}
                        data-keyshift={lang.textContentUC.s}
                        data-letter="keys"
                        id="s"
                        class="st0"
                        d="M182.4,141.5c0,1.6-1.4,3-3,3h-36.5c-1.6,0-3-1.4-3-3v-35.4c0-1.7,1.4-3,3-3h36.5c1.6,0,3,1.3,3,3V141.5z"
                    />

                    <path
                        data-key={lang.textContentLC.d}
                        data-keyshift={lang.textContentUC.d}
                        data-letter="keyd"
                        id="d"
                        class="st0"
                        d="M227.4,141.5c0,1.6-1.4,3-3,3h-36.5c-1.6,0-3-1.4-3-3v-35.4c0-1.7,1.4-3,3-3h36.5c1.6,0,3,1.3,3,3V141.5z"
                    />
                    <path
                        data-key={lang.textContentLC.f}
                        data-keyshift={lang.textContentUC.f}
                        data-letter="keyf"
                        id="f"
                        class="st0"
                        d="M272.4,141.5c0,1.6-1.4,3-3,3h-36.5c-1.6,0-3-1.4-3-3v-35.4c0-1.7,1.4-3,3-3h36.5c1.6,0,3,1.3,3,3V141.5z"
                    />
                    <path
                        data-key={lang.textContentLC.g}
                        data-keyshift={lang.textContentUC.g}
                        data-letter="keyg"
                        id="g"
                        class="st0"
                        d="M317.4,141.5c0,1.6-1.4,3-3,3h-36.5c-1.6,0-3-1.4-3-3v-35.4c0-1.7,1.4-3,3-3h36.5c1.6,0,3,1.3,3,3V141.5z"
                    />
                    <path
                        data-key={lang.textContentLC.h}
                        data-keyshift={lang.textContentUC.h}
                        data-letter="keyh"
                        id="h"
                        class="st0"
                        d="M362.4,141.5c0,1.6-1.4,3-3,3h-36.5c-1.6,0-3-1.4-3-3v-35.4c0-1.7,1.4-3,3-3h36.5c1.6,0,3,1.3,3,3V141.5z"
                    />
                    <path
                        data-key={lang.textContentLC.j}
                        data-keyshift={lang.textContentUC.j}
                        data-letter="keyj"
                        id="j"
                        class="st0 active"
                        d="M407.4,141.5c0,1.6-1.4,3-3,3h-36.5c-1.6,0-3-1.4-3-3v-35.4c0-1.7,1.4-3,3-3h36.5c1.6,0,3,1.3,3,3V141.5z"
                    />
                    <path
                        data-key={lang.textContentLC.k}
                        data-keyshift={lang.textContentUC.k}
                        data-letter="keyk"
                        id="k"
                        class="st0"
                        d="M452.4,141.5c0,1.6-1.4,3-3,3h-36.5c-1.6,0-3-1.4-3-3v-35.4c0-1.7,1.4-3,3-3h36.5c1.6,0,3,1.3,3,3V141.5z"
                    />
                    <path
                        data-key={lang.textContentLC.l}
                        data-keyshift={lang.textContentUC.l}
                        data-letter="keyl"
                        id="l"
                        class="st0"
                        d="M497.4,141.5c0,1.6-1.4,3-3,3h-36.5c-1.6,0-3-1.4-3-3v-35.4c0-1.7,1.4-3,3-3h36.5c1.6,0,3,1.3,3,3V141.5z"
                    />
                    <path
                        data-key={lang.textContentLC.semicolon}
                        data-keyshift={lang.textContentUC.semicolon}
                        data-letter="semicolon"
                        id="semicolon"
                        class="st0"
                        d="M542.4,141.5c0,1.6-1.4,3-3,3h-36.5c-1.6,0-3-1.4-3-3v-35.4c0-1.7,1.4-3,3-3h36.5c1.6,0,3,1.3,3,3V141.5z"
                    />
                    <path
                        data-key={lang.textContentLC.quote}
                        data-keyshift={lang.textContentUC.quote}
                        data-letter="quote"
                        id="quote"
                        class="st0"
                        d="M587.4,141.5c0,1.6-1.4,3-3,3h-36.5c-1.7,0-3-1.4-3-3v-35.4c0-1.7,1.3-3,3-3h36.5c1.6,0,3,1.3,3,3V141.5z"
                    />
                    <path
                        data-key={lang.textContentLC.w}
                        data-keyshift={lang.textContentUC.w}
                        data-letter="keyw"
                        id="w"
                        class="st0"
                        d="M171.7,97.6c0,1.6-1.3,3-3,3h-36.5c-1.6,0-3-1.4-3-3V62.3c0-1.6,1.4-3,3-3h36.5c1.7,0,3,1.4,3,3V97.6z"
                    />
                    <path
                        data-key={lang.textContentLC.e}
                        data-keyshift={lang.textContentUC.e}
                        data-letter="keye"
                        id="e"
                        class="st0"
                        d="M216.7,97.6c0,1.6-1.3,3-3,3h-36.5c-1.6,0-3-1.4-3-3V62.3c0-1.7,1.4-3,3-3h36.5c1.7,0,3,1.3,3,3V97.6z"
                    />
                    <path
                        data-key={lang.textContentLC.r}
                        data-keyshift={lang.textContentUC.r}
                        data-letter="keyr"
                        id="r"
                        class="st0"
                        d="M261.7,97.6c0,1.6-1.4,3-3,3h-36.5c-1.6,0-3-1.4-3-3V62.3c0-1.6,1.4-3,3-3h36.5c1.6,0,3,1.4,3,3V97.6z"
                    />
                    <path
                        data-key={lang.textContentLC.t}
                        data-keyshift={lang.textContentUC.t}
                        data-letter="keyt"
                        id="t"
                        class="st0"
                        d="M306.7,97.6c0,1.6-1.4,3-3,3h-36.5c-1.6,0-3-1.4-3-3V62.3c0-1.6,1.4-3,3-3h36.5c1.6,0,3,1.4,3,3V97.6z"
                    />
                    <path
                        data-key={lang.textContentLC.y}
                        data-keyshift={lang.textContentUC.y}
                        data-letter="keyy"
                        id="y"
                        class="st0"
                        d="M351.7,97.6c0,1.6-1.4,3-3,3h-36.5c-1.6,0-3-1.4-3-3V62.3c0-1.6,1.4-3,3-3h36.5c1.6,0,3,1.4,3,3V97.6z"
                    />
                    <path
                        data-key={lang.textContentLC.u}
                        data-keyshift={lang.textContentUC.u}
                        data-letter="keyu"
                        id="u"
                        class="st0"
                        d="M396.7,97.6c0,1.6-1.4,3-3,3h-36.5c-1.6,0-3-1.4-3-3V62.3c0-1.6,1.4-3,3-3h36.5c1.6,0,3,1.4,3,3V97.6z"
                    />
                    <path
                        data-key={lang.textContentLC.i}
                        data-keyshift={lang.textContentUC.i}
                        data-letter="keyi"
                        id="i"
                        class="st0"
                        d="M441.7,97.6c0,1.6-1.4,3-3,3h-36.5c-1.6,0-3-1.4-3-3V62.3c0-1.6,1.4-3,3-3h36.5c1.6,0,3,1.4,3,3V97.6z"
                    />
                    <path
                        data-key={lang.textContentLC.o}
                        data-keyshift={lang.textContentUC.o}
                        data-letter="keyo"
                        id="o"
                        class="st0"
                        d="M486.7,97.6c0,1.6-1.4,3-3,3h-36.5c-1.6,0-3-1.4-3-3V62.3c0-1.6,1.4-3,3-3h36.5c1.6,0,3,1.4,3,3V97.6z"
                    />
                    <path
                        data-key={lang.textContentLC.p}
                        data-keyshift={lang.textContentUC.p}
                        data-letter="keyp"
                        id="p"
                        class="st0"
                        d="M531.7,97.6c0,1.6-1.3,3-3,3h-36.5c-1.6,0-3-1.4-3-3V62.3c0-1.6,1.4-3,3-3h36.5c1.7,0,3,1.4,3,3V97.6z"
                    />
                    <path
                        data-key={lang.textContentLC.bracketLeft}
                        data-keyshift={lang.textContentUC.bracketLeft}
                        data-letter="bracketleft"
                        id="open-bracket"
                        class="st0"
                        d="M576.7,97.6c0,1.6-1.3,3-3,3h-36.5c-1.6,0-3-1.4-3-3V62.3c0-1.6,1.4-3,3-3h36.5c1.7,0,3,1.4,3,3V97.6z"
                    />
                    <path
                        data-key={lang.textContentLC.bracketRight}
                        data-keyshift={lang.textContentUC.bracketRight}
                        data-letter="bracketright"
                        id="close-bracket"
                        class="st0"
                        d="M621.7,97.6c0,1.6-1.3,3-3,3h-36.5c-1.6,0-3-1.4-3-3V62.3c0-1.6,1.4-3,3-3h36.5c1.7,0,3,1.4,3,3V97.6z"
                    />
                    <path
                        data-key={lang.textContentLC.backslash}
                        data-keyshift={lang.textContentUC.backslash}
                        data-letter="backslash"
                        id="backslash"
                        class="st0"
                        d="M668.8,97.6c0,1.6-1.3,3-3,3h-38.6c-1.6,0-3-1.4-3-3V62.4c0-1.6,1.4-3,3-3h38.6c1.7,0,3,1.4,3,3V97.6z"
                    />
                    <path
                        data-key={lang.textContentLC.two}
                        data-keyshift={lang.textContentUC.two}
                        data-letter="digit2"
                        id="key-2"
                        class="st0"
                        d="M148.4,53.7c0,1.7-1.4,3-3,3h-36.5c-1.6,0-3-1.3-3-3V18.3c0-1.6,1.4-3,3-3h36.5c1.6,0,3,1.4,3,3V53.7z"
                    />
                    <path
                        data-key={lang.textContentLC.three}
                        data-keyshift={lang.textContentUC.three}
                        data-letter="digit3"
                        id="key-3"
                        class="st0"
                        d="M193.4,53.7c0,1.7-1.4,3-3,3h-36.5c-1.7,0-3-1.3-3-3V18.3c0-1.6,1.3-3,3-3h36.5c1.6,0,3,1.4,3,3V53.7z"
                    />
                    <path
                        data-key={lang.textContentLC.four}
                        data-keyshift={lang.textContentUC.four}
                        data-letter="digit4"
                        id="key-4"
                        class="st0"
                        d="M238.4,53.7c0,1.7-1.4,3-3,3H199c-1.7,0-3-1.3-3-3V18.3c0-1.7,1.3-3,3-3h36.5c1.6,0,3,1.3,3,3V53.7z"
                    />
                    <path
                        data-key={lang.textContentLC.five}
                        data-keyshift={lang.textContentUC.five}
                        data-letter="digit5"
                        id="key-5"
                        class="st0"
                        d="M283.4,53.7c0,1.7-1.3,3-3,3h-36.5c-1.7,0-3-1.3-3-3V18.3c0-1.7,1.3-3,3-3h36.5c1.7,0,3,1.3,3,3V53.7z"
                    />
                    <path
                        data-key={lang.textContentLC.six}
                        data-keyshift={lang.textContentUC.six}
                        data-letter="digit6"
                        id="key-6"
                        class="st0"
                        d="M328.4,53.7c0,1.7-1.3,3-3,3h-36.5c-1.6,0-3-1.3-3-3V18.3c0-1.7,1.4-3,3-3h36.5c1.7,0,3,1.3,3,3V53.7z"
                    />
                    <path
                        data-key={lang.textContentLC.seven}
                        data-keyshift={lang.textContentUC.seven}
                        data-letter="digit7"
                        id="key-7"
                        class="st0"
                        d="M373.4,53.7c0,1.7-1.3,3-3,3h-36.5c-1.6,0-3-1.3-3-3V18.3c0-1.6,1.4-3,3-3h36.5c1.7,0,3,1.4,3,3V53.7z"
                    />
                    <path
                        data-key={lang.textContentLC.eight}
                        data-keyshift={lang.textContentUC.eight}
                        data-letter="digit8"
                        id="key-8"
                        class="st0"
                        d="M418.4,53.7c0,1.7-1.3,3-3,3h-36.5c-1.6,0-3-1.3-3-3V18.3c0-1.6,1.4-3,3-3h36.5c1.7,0,3,1.4,3,3V53.7z"
                    />
                    <path
                        data-key={lang.textContentLC.nine}
                        data-keyshift={lang.textContentUC.nine}
                        data-letter="digit9"
                        id="key-9"
                        class="st0"
                        d="M463.4,53.7c0,1.7-1.3,3-3,3h-36.5c-1.6,0-3-1.3-3-3V18.3c0-1.6,1.4-3,3-3h36.5c1.7,0,3,1.4,3,3V53.7z"
                    />
                    <path
                        data-key={lang.textContentLC.zero}
                        data-keyshift={lang.textContentUC.zero}
                        data-letter="digit0"
                        id="key-0"
                        class="st0"
                        d="M508.4,53.7c0,1.7-1.3,3-3,3h-36.5c-1.6,0-3-1.3-3-3V18.3c0-1.6,1.4-3,3-3h36.5c1.7,0,3,1.4,3,3V53.7z"
                    />
                    <path
                        data-key={lang.textContentLC.minus}
                        data-keyshift={lang.textContentUC.minus}
                        data-letter="minus"
                        id="minus"
                        class="st0"
                        d="M553.4,53.7c0,1.7-1.4,3-3,3h-36.5c-1.7,0-3-1.3-3-3V18.3c0-1.7,1.4-3,3-3h36.5c1.6,0,3,1.3,3,3V53.7z"
                    />
                    <path
                        data-key={lang.textContentLC.equal}
                        data-keyshift={lang.textContentUC.equal}
                        data-letter="equal"
                        id="equal"
                        class="st0"
                        d="M598.4,53.7c0,1.7-1.4,3-3,3h-36.5c-1.7,0-3-1.3-3-3V18.3c0-1.6,1.3-3,3-3h36.5c1.6,0,3,1.4,3,3V53.7z"
                    />
                    <path
                        data-key={lang.textContentLC.backspace}
                        data-keyshift={lang.textContentUC.backspace}
                        data-letter="backspace"
                        id="backspace"
                        class="st0"
                        d="M668.8,53.7c0,1.7-1.3,3-3,3h-61.9c-1.7,0-3-1.3-3-3V18.3c0-1.6,1.3-3,3-3h61.9c1.7,0,3,1.4,3,3V53.7z"
                    />
                    <path
                        data-key={lang.textContentLC.tab}
                        data-keyshift={lang.textContentUC.tab}
                        data-letter="tab"
                        id="tab"
                        class="st0"
                        d="M81.7,97.6c0,1.6-1.3,3-3,3H18.9c-1.6,0-3-1.4-3-3V62.3c0-1.6,1.3-3,3-3h59.8c1.7,0,3,1.4,3,3V97.6z"
                    />
                    <path
                        data-key={lang.textContentLC.capslock}
                        data-keyshift={lang.textContentUC.capslock}
                        data-letter="capslock"
                        id="capslock"
                        class="st0"
                        d="M92.4,141.5c0,1.6-1.3,3-3,3H18.9c-1.6,0-3-1.4-3-3v-35.4c0-1.7,1.3-3,3-3h70.4c1.7,0,3,1.3,3,3V141.5z"
                    />
                    <path
                        data-key={lang.textContentLC.enter}
                        data-keyshift={lang.textContentUC.enter}
                        data-letter="enter"
                        id="enter"
                        class="st0"
                        d="M668.8,141.5c0,1.6-1.3,3-3,3h-72.9c-1.7,0-3-1.4-3-3v-35.4c0-1.7,1.3-3,3-3h72.9c1.7,0,3,1.3,3,3V141.5z"
                    />
                    <path
                        data-key={lang.textContentLC.shiftleft}
                        data-keyshift={lang.textContentUC.shiftright}
                        data-letter="shiftleft"
                        id="shift-left"
                        class="st0"
                        d="M115.8,185.4c0,1.7-1.3,3-3,3H18.9c-1.6,0-3-1.3-3-3v-35.3c0-1.6,1.3-3,3-3h93.8c1.7,0,3,1.4,3,3V185.4z"
                    />
                    <path
                        data-key={lang.textContentLC.controlleft}
                        data-keyshift={lang.textContentUC.controlleft}
                        data-letter="controlleft"
                        id="control-left"
                        class="st0 hide-on-bone"
                        d="M105,236c0,1.6-1.3,3-3,3H18.9c-1.6,0-3-1.4-3-3v-42c0-1.7,1.3-3,3-3H102c1.7,0,3,1.3,3,3V236z"
                    />
                    <path
                        data-key={lang.textContentLC.altleft}
                        data-keyshift={lang.textContentUC.altleft}
                        data-letter="altleft"
                        id="option-left"
                        class="st0 hide-on-bone"
                        d="M182.4,236c0,1.7-1.4,3-3,3h-68.8c-1.7,0-3-1.3-3-3v-42c0-1.7,1.3-3,3-3h68.8c1.6,0,3,1.3,3,3V236z"
                    />
                    <path
                        data-key={lang.textContentLC.altright}
                        data-keyshift={lang.textContentUC.altright}
                        data-letter="altright"
                        id="option-right"
                        class="st0 hide-on-bone"
                        d="M531.8,191c1.7,0,3,1.4,3,3v42c0,1.7-1.3,3-3,3h-62.9c-1.6,0-3-1.3-3-3v-42c0-1.6,1.4-3,3-3H531.8z"
                    />
                    <path
                        data-key={lang.textContentLC.controlright}
                        data-keyshift={lang.textContentUC.controlright}
                        data-letter="controlright"
                        id="control-right"
                        class="st0 hide-on-bone"
                        d="M668.8,236.1c0,1.7-1.3,3-3,3H540.3c-1.6,0-3-1.3-3-3v-42c0-1.6,1.4-3,3-3h125.5c1.7,0,3,1.4,3,3V236.1z"
                    />
                    <path
                        data-key={lang.textContentLC.space}
                        data-keyshift={lang.textContentUC.space}
                        data-letter="space"
                        id="space"
                        class="st0"
                        d="M460.4,191c1.6,0,3,1.4,3,3v42c0,1.7-1.4,3-3,3H187.5c-1.6,0-3-1.3-3-3v-42c0-1.6,1.4-3,3-3H460.4z"
                    />
                    <path
                        data-key={lang.textContentLC.shiftright}
                        data-keyshift={lang.textContentUC.shiftright}
                        data-letter="shiftright"
                        id="shift-right"
                        class="st0"
                        d="M668.8,185.4c0,1.7-1.3,3-3,3h-94.5c-1.6,0-3-1.3-3-3v-35.3c0-1.6,1.4-3,3-3h94.5c1.7,0,3,1.4,3,3V185.4z"
                    />
                </g>
                <g id="letters">
                    <text
                        transform="matrix(1 0 0 1 33.4903 33.804)"
                        class="st1 st2"
                        dx="0"
                        dy="0">{textKey2.tilda}</text
                    >
                    <text
                        transform="matrix(1 0 0 1 35.8009 52.6643)"
                        class="st1 st2"
                        dx="0"
                        dy="0">{textKey1.backTic}</text
                    >
                    <text
                        transform="matrix(1 0 0 1 78.626 50.4071)"
                        class="st1 st2"
                        dx="0"
                        dy="0">1</text
                    >
                    <text
                        transform="matrix(1 0 0 1 123.299 51.1765)"
                        class="st1 st2"
                        dx="0"
                        dy="0">2</text
                    >
                    <text
                        transform="matrix(1 0 0 1 169.6841 51.404)"
                        class="st1 st2"
                        dx="0"
                        dy="0">3</text
                    >
                    <text
                        transform="matrix(1 0 0 1 213.0758 51.404)"
                        class="st1 st2"
                        dx="0"
                        dy="0">4</text
                    >
                    <text
                        transform="matrix(1 0 0 1 258.0724 51.404)"
                        class="st1 st2"
                        dx="0"
                        dy="0">5</text
                    >
                    <text
                        transform="matrix(1 0 0 1 303.2822 51.0891)"
                        class="st1 st2"
                        dx="0"
                        dy="0">6</text
                    >
                    <text
                        transform="matrix(1 0 0 1 349.5064 51.0891)"
                        class="st1 st2"
                        dx="0"
                        dy="0">7</text
                    >
                    <text
                        transform="matrix(1 0 0 1 393.281 51.2157)"
                        class="st1 st2"
                        dx="0"
                        dy="0">8</text
                    >
                    <text
                        transform="matrix(1 0 0 1 438.5742 51.2157)"
                        class="st1 st2"
                        dx="0"
                        dy="0">9</text
                    >
                    <text
                        transform="matrix(1 0 0 1 483.4907 51.2157)"
                        class="st1 st2"
                        dx="0"
                        dy="0">0</text
                    >
                    <text
                        transform="matrix(1 0 0 1 530.4011 50.4071)"
                        class="st1 st2"
                        dx="0"
                        dy="0">-</text
                    >
                    <text
                        transform="matrix(1 0 0 1 573.5195 51.2157)"
                        class="st1 st2"
                        dx="0"
                        dy="0">=</text
                    >
                    <text
                        transform="matrix(1 0 0 1 80.5513 31.7605)"
                        class="st1 st2"
                        dx="0"
                        dy="0">!</text
                    >
                    <text
                        transform="matrix(1 0 0 1 119.8565 30.45)"
                        class="st1 st2"
                        dx="0"
                        dy="0">@</text
                    >
                    <text
                        transform="matrix(1 0 0 1 169.6841 31.76)"
                        class="st1 st2"
                        dx="0"
                        dy="0">#</text
                    >
                    <text
                        transform="matrix(1 0 0 1 213.0758 31.2171)"
                        class="st1 st2"
                        dx="0"
                        dy="0">$</text
                    >
                    <text
                        transform="matrix(1 0 0 1 255.5748 30.8318)"
                        class="st1 st2"
                        dx="0"
                        dy="0">%</text
                    >
                    <text
                        transform="matrix(1 0 0 1 303.9556 32.4427)"
                        class="st1 st2"
                        dx="0"
                        dy="0">^</text
                    >
                    <text
                        transform="matrix(1 0 0 1 348.2554 31.76)"
                        class="st1 st2"
                        dx="0"
                        dy="0">&amp;</text
                    >
                    <text
                        transform="matrix(1 0 0 1 394.5334 32.8236)"
                        class="st1 st2"
                        dx="0"
                        dy="0">*</text
                    >
                    <text
                        transform="matrix(1 0 0 1 440.3076 30.6435)"
                        class="st1 st2"
                        dx="0"
                        dy="0">(</text
                    >
                    <text
                        transform="matrix(1 0 0 1 485.1645 30.6435)"
                        class="st1 st2"
                        dx="0"
                        dy="0">)</text
                    >
                    <text
                        transform="matrix(1 0 0 1 528.7588 25.5423)"
                        class="st1 st2"
                        dx="0"
                        dy="0">_</text
                    >
                    <text
                        transform="matrix(1 0 0 1 573.5195 32.4422)"
                        class="st1 st2"
                        dx="0"
                        dy="0">+</text
                    >
                    <text
                        transform="matrix(1 0 0 1 100.9088 75.4743)"
                        class="st1"
                        dx="0"
                        dy="0">{textKey2.q}</text
                    >
                    <text
                        transform="matrix(1 0 0 1 100.9088 93.4743)"
                        class="st1 st2 b"
                        dx="-1.6937499046325684"
                        dy="-6">{textKey1.q}</text
                    >
                    <text
                        transform="matrix(1 0 0 1 145.3644 75.4744)"
                        class="st1"
                        dx="0"
                        dy="0">{textKey2.w}</text
                    >
                    <text
                        transform="matrix(1 0 0 1 145.3644 93.4744)"
                        class="st1 st2 b"
                        dx="-2.6000003814697266"
                        dy="-6">{textKey1.w}</text
                    >
                    <text
                        transform="matrix(1 0 0 1 190.5943 75.4744)"
                        class="st1"
                        dx="0"
                        dy="0">{textKey2.e}</text
                    >
                    <text
                        transform="matrix(1 0 0 1 190.5943 93.4744)"
                        class="st1 st2 b"
                        dx="-1.6937499046325684"
                        dy="-6">{textKey1.e}</text
                    >
                    <text
                        transform="matrix(1 0 0 1 236.9933 75.4743)"
                        class="st1"
                        dx="0"
                        dy="0">{textKey2.r}</text
                    >
                    <text
                        transform="matrix(1 0 0 1 236.9933 93.4743)"
                        class="st1 st2 b"
                        dx="-0.6000001430511475"
                        dy="-6">{textKey1.r}</text
                    >
                    <text
                        transform="matrix(1 0 0 1 280.6080 75.4744)"
                        class="st1"
                        dx="0"
                        dy="0">{textKey2.t}</text
                    >
                    <text
                        transform="matrix(1 0 0 1 280.6080 93.4744)"
                        class="st1 st2 b"
                        dx="0.19999980926513672"
                        dy="-6">{textKey1.t}</text
                    >
                    <text
                        transform="matrix(1 0 0 1 326.5138 75.4744)"
                        class="st1"
                        class:st2={language === "ar"}
                        dx="0"
                        dy="0">{textKey2.y}</text
                    >
                    <text
                        transform="matrix(1 0 0 1 326.5138 93.4744)"
                        class="st1 st2 b"
                        dx="-1.0187501907348633"
                        dy={language === "ar" ? -2 : -6}>{textKey1.y}</text
                    >
                    <text
                        transform="matrix(1 0 0 1 371.1386 75.4743)"
                        class="st1"
                        dx="0"
                        dy="0">{textKey2.u}</text
                    >
                    <text
                        transform="matrix(1 0 0 1 371.1386 93.4743)"
                        class="st1 st2 b"
                        dx="-1.6937499046325684"
                        dy="-6">{textKey1.u}</text
                    >
                    <text
                        transform="matrix(1 0 0 1 418.5557 75.4743)"
                        class="st1"
                        dx="0"
                        dy="0">{textKey2.i}</text
                    >
                    <text
                        transform="matrix(1 0 0 1 418.5557 93.4743)"
                        class="st1 st2 b"
                        dx="-0.07499992847442627"
                        dy="-6">{textKey1.i}</text
                    >
                    <text
                        transform="matrix(1 0 0 1 459.9639 75.4743)"
                        class="st1"
                        dx="0"
                        dy="0">{textKey2.o}</text
                    >
                    <text
                        transform="matrix(1 0 0 1 459.9639 93.4743)"
                        class="st1 st2 b"
                        dx="-1.6937499046325684"
                        dy="-6">{textKey1.o}</text
                    >
                    <text
                        transform="matrix(1 0 0 1 506.9335 75.4743)"
                        class="st1"
                        class:st2={language === "ar"}
                        dx="0"
                        dy="0">{textKey2.p}</text
                    >
                    <text
                        transform="matrix(1 0 0 1 506.9335 93.4743)"
                        class="st1 st2 b"
                        dx="-1.6937499046325684"
                        dy={language === "ar" ? -2 : -6}>{textKey1.p}</text
                    >
                    <text
                        transform="matrix(1 0 0 1 112.1346 120.3303)"
                        class="st1"
                        dx="0"
                        dy="0">{textKey2.a}</text
                    >
                    <text
                        transform="matrix(1 0 0 1 112.1346 138.3303)"
                        class="st1 st2 b"
                        dx="-1.6937499046325684"
                        dy="-6">{textKey1.a}</text
                    >
                    <text
                        transform="matrix(1 0 0 1 156.0135 120.3303)"
                        class="st1"
                        dx="0"
                        dy="0">{textKey2.s}</text
                    >
                    <text
                        transform="matrix(1 0 0 1 156.0135 138.3303)"
                        class="st1 st2 b"
                        dx="-1.4187500476837158"
                        dy="-6">{textKey1.s}</text
                    >
                    <text
                        transform="matrix(1 0 0 1 201.5241 120.3303)"
                        class="st1"
                        class:st2={language === "ar"}
                        class:right-to-left={language === "ar"}
                        dx="0"
                        dy="0">{textKey2.d}</text
                    >
                    <text
                        transform="matrix(1 0 0 1 201.5241 138.3303)"
                        class="st1 st2 b"
                        dx="-1.6937499046325684"
                        dy={language === "ar" ? -2 : -6}>{textKey1.d}</text
                    >
                    <text
                        transform="matrix(1 0 0 1 247.1121 120.3303)"
                        class="st1"
                        class:st2={language === "ar"}
                        class:right-to-left={language === "ar"}
                        dx="0"
                        dy="0">{textKey2.f}</text
                    >
                    <text
                        transform="matrix(1 0 0 1 247.1121 138.3303)"
                        class="st1 st2 b"
                        dx="-0.20000004768371582"
                        dy={language === "ar" ? -2 : -6}>{textKey1.f}</text
                    >
                    <text
                        transform="matrix(1 0 0 1 289.4753 120.3303)"
                        class="st1"
                        dx="0"
                        dy="0">{textKey2.g}</text
                    >
                    <text
                        transform="matrix(1 0 0 1 289.4753 138.3303)"
                        class="st1 st2 b"
                        dx="-1.7875001430511475"
                        dy="-6">{textKey1.g}</text
                    >
                    <text
                        transform="matrix(1 0 0 1 335.5886 120.3303)"
                        class="st1"
                        class:st2={language === "ar"}
                        dx="0"
                        dy="0">{textKey2.h}</text
                    >
                    <text
                        transform="matrix(1 0 0 1 335.5886 138.3303)"
                        class="st1 st2 b"
                        dx="-1.6937255859375"
                        dy={language === "ar" ? -2 : -6}>{textKey1.h}</text
                    >
                    <text
                        transform="matrix(1 0 0 1 382.2692 120.3303)"
                        class="st1 active"
                        dx="0"
                        dy="0">{textKey2.j}</text
                    >
                    <text
                        transform="matrix(1 0 0 1 382.2692 138.3303)"
                        class="st1 st2 b active"
                        dx="-0.11247563362121582"
                        dy="-6">{textKey1.j}</text
                    >
                    <text
                        transform="matrix(1 0 0 1 426.0182 120.3303)"
                        class="st1"
                        class:st2={language === "ar"}
                        dx="0"
                        dy="0">{textKey2.k}</text
                    >
                    <text
                        transform="matrix(1 0 0 1 426.0182 138.3303)"
                        class="st1 st2 b"
                        dx="-1.4000000953674316"
                        dy={language === "ar" ? -2 : -6}>{textKey1.k}</text
                    >
                    <text
                        transform="matrix(1 0 0 1 470.8706 120.3303)"
                        class="st1"
                        class:st2={language === "ar"}
                        dx="0"
                        dy="0">{textKey2.l}</text
                    >
                    <text
                        transform="matrix(1 0 0 1 470.8706 138.3303)"
                        class="st1 st2 b"
                        dx="-0.07499992847442627"
                        dy={language === "ar" ? -2 : -6}>{textKey1.l}</text
                    >
                    <text
                        transform="matrix(1 0 0 1 134.7896 163.7458)"
                        class="st1"
                        dx="0"
                        dy="0">{textKey2.z}</text
                    >
                    <text
                        transform="matrix(1 0 0 1 134.7896 181.7458)"
                        class="st1 st2 b"
                        dx="-1.4187500476837158"
                        dy="-6">{textKey1.z}</text
                    >
                    <text
                        transform="matrix(1 0 0 1 179.2339 163.7458)"
                        class="st1"
                        dx="0"
                        dy="0">{textKey2.x}</text
                    >
                    <text
                        transform="matrix(1 0 0 1 179.2339 181.7458)"
                        class="st1 st2 b"
                        dx="-1.4000000953674316"
                        dy="-6">{textKey1.x}</text
                    >
                    <text
                        transform="matrix(1 0 0 1 222.5416 163.7458)"
                        class="st1"
                        class:st2={language === "ar"}
                        class:right-to-left={language === "ar"}
                        dx="0"
                        dy="0">{textKey2.c}</text
                    >
                    <text
                        transform="matrix(1 0 0 1 222.5416 181.7458)"
                        class="st1 st2 b"
                        dx="-1.4187500476837158"
                        dy={language === "ar" ? -2 : -6}>{textKey1.c}</text
                    >

                    <text
                        transform="matrix(1 0 0 1 269.3973 163.7458)"
                        class:st2={language === "ar"}
                        class:right-to-left={language === "ar"}
                        class="st1"
                        dx="0"
                        dy="0">{textKey2.v}</text
                    >
                    <text
                        transform="matrix(1 0 0 1 269.3973 181.7458)"
                        class="st1 st2 v"
                        dx="-0.6187500953674316"
                        dy={language === "ar" ? -2 : -6}>{textKey1.v}</text
                    >
                    <text
                        transform="matrix(1 0 0 1 314.0098 163.7458)"
                        class="st1"
                        dx="0"
                        dy="0">{textKey2.b}</text
                    >
                    <text
                        transform="matrix(1 0 0 1 314.0098 181.7458)"
                        class="st1 st2 b"
                        dx="-1.6937499046325684"
                        dy="-6">{textKey1.b}</text
                    >
                    <text
                        transform="matrix(1 0 0 1 358.4863 163.7458)"
                        class="st1"
                        class:st2={language === "ar"}
                        dx="0"
                        dy="0">{textKey2.n}</text
                    >
                    <text
                        transform="matrix(1 0 0 1 358.4863 181.7458)"
                        class="st1 st2 b"
                        dx="-1.6937499046325684"
                        dy={language === "ar" ? -2 : -6}>{textKey1.n}</text
                    >
                    <text
                        transform="matrix(1 0 0 1 401.6816 163.7458)"
                        class="st1"
                        dx="0"
                        dy="0">{textKey2.m}</text
                    >
                    <text
                        transform="matrix(1 0 0 1 401.6816 181.7458)"
                        class="st1 st2 b"
                        dx="-3.02500057220459"
                        dy="-6">{textKey1.m}</text
                    >
                    <text
                        transform="matrix(1 0 0 1 519.074 136.7127)"
                        class="st1 st2"
                        dx="0"
                        dy="0">{textKey1.semicolon}</text
                    >
                    <text
                        transform="matrix(1 0 0 1 519.074 119.3763)"
                        class="st1 st2"
                        dx="0"
                        dy="0">{textKey2.semicolon}</text
                    >
                    <text
                        transform="matrix(1 0 0 1 451.3285 180.0409)"
                        class="st1 st2 b2"
                        dx="0"
                        dy="0">{textKey1.comma}</text
                    >
                    <text
                        transform="matrix(1 0 0 1 450.2827 164.3396)"
                        class="st1 st2"
                        dx="0"
                        dy="0">{textKey2.comma}</text
                    >
                    <text
                        transform="matrix(1 0 0 1 495.9731 181.0409)"
                        class="st1 st2 b2"
                        dx="0"
                        dy="0">{textKey1.period}</text
                    >
                    <text
                        transform="matrix(1 0 0 1 494.9274 164.3396)"
                        class="st1 st2"
                        dx="0"
                        dy="0">{textKey2.period}</text
                    >
                    <text
                        transform="matrix(1 0 0 1 543.4077 181.0408)"
                        class="st1 st2"
                        dx="0"
                        dy="0">{textKey1.slash}</text
                    >
                    <text
                        transform="matrix(1 0 0 1 541.3276 163.2498)"
                        class="st1 st2"
                        dx="0"
                        dy="0">{textKey2.slash}</text
                    >
                    <text
                        transform="matrix(1 0 0 1 565.621 138.7127)"
                        class="st1 st2"
                        dx="0"
                        dy="0">{textKey1.quote}</text
                    >
                    <text
                        transform="matrix(1 0 0 1 565.621 120.3763)"
                        class="st1 st2"
                        dx="0"
                        dy="0">{textKey2.quote}</text
                    >
                    <text
                        transform="matrix(1 0 0 1 553.3923 94.426)"
                        class="st1 st2"
                        dx="0"
                        dy="0">{textKey1.bracketLeft}</text
                    >
                    <text
                        transform="matrix(1 0 0 1 552.9709 74.8769)"
                        class="st1 st2"
                        class:right-to-left={language === "ar"}
                        dx="0"
                        dy="0">{textKey2.bracketLeft}</text
                    >
                    <text
                        transform="matrix(1 0 0 1 598.7657 94.426)"
                        class="st1 st2"
                        dx="0"
                        dy="0">{textKey1.bracketRight}</text
                    >
                    <text
                        transform="matrix(1 0 0 1 598.3443 74.7849)"
                        class="st1 st2"
                        class:right-to-left={language === "ar"}
                        dx="0"
                        dy="0">{textKey2.bracketRight}</text
                    >
                    <text
                        transform="matrix(1 0 0 1 644.3574 96.8807)"
                        class="st1 st2"
                        dx="0"
                        dy="0">{textKey1.backslash}</text
                    >
                    <text
                        transform="matrix(1 0 0 1 644.4941 74.8769)"
                        class="st1 st2"
                        dx="0"
                        dy="0">{textKey2.backslash}</text
                    >
                    <text
                        id="text-tab"
                        transform="matrix(1 0 0 1 23.3467 93.2342)"
                        class="st1 s st2">tab</text
                    >
                    <text
                        id="text-caps-lock"
                        transform="matrix(1 0 0 1 23.3467 137.7127)"
                        class="st1 s st2">caps lock</text
                    >
                    <text
                        id="text-shift-left"
                        transform="matrix(1 0 0 1 23.3467 181.0408)"
                        class="st1 s st2">shift</text
                    >
                    <text
                        id="text-shift-right"
                        transform="matrix(1 0 0 1 641.826 180.0408)"
                        class="st1 s st2">shift</text
                    >
                    <text
                        id="text-backspace"
                        transform="matrix(1 0 0 1 606.4653 51.1765)"
                        class="st1 s st2">backspace</text
                    >
                    <text
                        id="text-enter"
                        transform="matrix(1 0 0 1 636.3144 137.7128)"
                        class="st1 s st2">enter</text
                    >
                    <text
                        id="text-control-left"
                        transform="matrix(1 0 0 1 23.3467 232.465)"
                        class="st1 s st2"
                        >control
                    </text>
                    <text
                        id="text-option-left"
                        transform="matrix(1 0 0 1 114.2338 231.4646)"
                        class="st1 s st2">alt</text
                    >
                    <text
                        id="text-space"
                        transform="matrix(1 0 0 1 199.7899 232.4646)"
                        class="st1 s st2">space</text
                    >
                    <text
                        id="text-option-right"
                        transform="matrix(1 0 0 1 505.8864 231.4646)"
                        class="st1 s st2">alt</text
                    >
                    <text
                        id="text-control-right"
                        transform="matrix(1 0 0 1 618.8864 231.4646)"
                        class="st1 s st2">control</text
                    >
                </g>
            </svg>
        </div>

        <object
            bind:this={objEl}
            title="hands"
            id="hands"
            type="image/svg+xml"
            data="/both-hands-{language}.svg"
            tabindex="-1"
            on:load={() => firstHandsLoad()}
            style="position: absolute; pointer-events: none; height: 363px; top: -10px; left: 0px; opacity: 0.8; transform: translateX(55px) scale(1.55);"
        />
    </div>
</div>

<style lang="postcss">
    svg {
        direction: ltr;
    }
    .intro-keyboard.bone {
        background: rgb(55, 55, 55);
        border: solid 1px #919191;
        border-radius: 11px;
    }

    svg g text {
        fill: white;
        font-family: sans-serif;
        font-size: 14px;
        user-select: none;
    }
    .st1 {
        display: none;
    }
    .st1.st2 {
        display: block;
    }
    .right-to-left {
        direction: rtl;
    }
</style>

<script lang="ts">
    // TODO : this file needs some organizing and refactoring to make clear and easy to folow
    import Icon from "@iconify/svelte";
    import repeatIcon from "@iconify/icons-pajamas/repeat";
    import settingsIcon from "@iconify/icons-gala/settings";
    import baselineGppGood from "@iconify/icons-ic/baseline-gpp-good";
    import next32Filled from "@iconify/icons-fluent/next-32-filled";
    import { fade } from "svelte/transition";
    import { tweened } from "svelte/motion";
    import Keyboard from "./Keyboard.svelte";
    import {
        animateHandNextLetter,
        clickOutside,
        getNextLetterPosition,
    } from "../../../../utils";
    import { langStore, settingsLoader } from "../../../../stores/global";
    import type {
        ActiveKey,
        Game,
        GameData,
        GameType,
        KeyboardSettins,
        Lang,
        Words,
    } from "./../types";
    // import { goto } from "$app/navigation";
    import { onMount } from "svelte";
    // import { page } from "$app/stores";
    import GameSettings from "./GameSettings.svelte";
    import { replace } from "svelte-spa-router";
    import { invoke } from "@tauri-apps/api/tauri";
    import language from "../../../../language";

    export let data: GameData;

    export let gameType: GameType;
    export let nextGameType: GameType | null;

    export let settings: KeyboardSettins;

    let lang: Lang = $langStore;
    let game: Game = "waiting for input";
    let typedLetter = "";
    let words: Words = data.level.words + " ";

    let startTime = 0;
    let endTime = 0;
    let wordPerMinite = tweened(0, { delay: 300, duration: 1000 });
    let totalTime = tweened(0, { delay: 1300, duration: 1000 });
    let accuracy = tweened(0, { delay: 2300, duration: 1000 });

    let letterIndex = 0;
    let correctLetters = 0;
    let activeKeyLetter: ActiveKey = null;
    let activeShiftKey: ActiveKey = null;

    let reset = false;
    let showResult = false;
    let isInputFocus = false;
    let settingsMenu = false;

    let wordsEl: HTMLDivElement;
    let letterEl: HTMLSpanElement;
    let nextLetterEl: HTMLSpanElement;
    let inputEl: HTMLInputElement;
    let caretEl: HTMLDivElement;
    // TODO: fix audio issue, the sound effect sounds glitchy
    let audio: HTMLAudioElement;

    // TODO: the keys bindings should be protected and prevent default, for example the default of alt and caps locks should be prevented

    onMount(() => {
        firstHandsLoad();
        nextLetterEl = wordsEl.children[0] as HTMLSpanElement;
        moveCaret();
        // TODO: consider another track
        audio = new Audio("/typewriter_key_2.mp3");
        // audio.playbackRate = 1.4;
    });

    function firstHandsLoad() {
        moveHands(isLetterWithShift(0));
        handleInputFocus();
        isInputFocus = true;
    }

    function setGameState(state: Game) {
        game = state;
    }

    function startGame() {
        startTime = new Date().getTime();

        setGameState("in progress");
    }
    function setLetterEl() {
        const isWordCompleted = letterIndex > words.length - 1;
        if (!isWordCompleted) {
            letterEl = wordsEl.children[letterIndex] as HTMLSpanElement;
            nextLetterEl = wordsEl.children[letterIndex + 1] as HTMLSpanElement;
        }
    }

    function moveCaret() {
        // const offset = 4;
        if (!nextLetterEl?.offsetHeight) return;
        const { offsetLeft, offsetTop, offsetWidth, offsetHeight } =
            nextLetterEl;
        if (lang === "ar") {
            caretEl.style.top = `${offsetTop}px`;
            caretEl.style.left = `${offsetLeft + offsetWidth - 1}px`;
            caretEl.style.height = `${offsetHeight}px`;
        } else {
            caretEl.style.top = `${offsetTop}px`;
            caretEl.style.left = `${offsetLeft}px`;
            caretEl.style.height = `${offsetHeight}px`;
        }
    }

    function moveHands(letterWithShift: boolean) {
        // TODO: future problem !!?, shift and alt should be delt with to
        let next = words[letterIndex];

        let hand = animateHandNextLetter(next, letterWithShift, lang);
        if (hand === "shift-left") {
            activeShiftKey = getNextLetterPosition("shiftleft");
        } else if (hand === "shift-right") {
            activeShiftKey = getNextLetterPosition("shiftright");
        } else {
            activeShiftKey = null;
        }

        activeKeyLetter = getNextLetterPosition(next, letterWithShift);
    }

    function checkLetter(letterWithShift: boolean) {
        const currentLetter = words[letterIndex];

        if (currentLetter === typedLetter) {
            letterEl.dataset.letter = "correct";
            if (letterIndex === words.length - 1) return;
            moveCaret();
            nextLetter();
            correctLetters += 1;
            moveHands(letterWithShift);
        } else {
            if (gameType === "practice" || gameType === "story-time") {
                moveCaret();
                nextLetter();
                moveHands(letterWithShift);
            }
        }

        if (currentLetter !== typedLetter) {
            letterEl.dataset.letter = "incorrect";
        }
    }
    function nextLetter() {
        letterIndex += 1;
    }
    function clearLetter() {
        typedLetter = "";
    }
    function updateLine() {
        const wordEl = wordsEl.children[letterIndex];
        const wordsY = wordsEl.getBoundingClientRect().y;
        const wordY = wordEl.getBoundingClientRect().y;
        if (wordY > wordsY) {
            wordEl.scrollIntoView({ block: "center" });
        }
    }

    // TODO: write better implementation for getting accuracy and wpm
    function getAccuracy() {
        // NOTE: - 1 here becouse of the words always have an extra space at the end
        const totalLetters = words.length - 1;

        return (correctLetters / totalLetters) * 100;
    }
    function xbetween(x: number, a: number, b: number) {
        return x > a && x < b;
    }
    function isLetterWithShift(idx: number) {
        // NOTE: x is the current letter that typed letter will be compared with
        const x = words[idx].charCodeAt(0);
        // TODO: clean code and add more abstaction
        // English
        // this 65 (A) to 90 (Z)
        // or this 33 (!) 34 (") 35 (#) 36 ($) 37 (%) 38 (&)
        // or this 123 ({) 124 (|) 125 (}) 126 (~)
        // or this 40 and 41 (()) 42 (*) 43 (+)
        // or this 62 (>) 63 (?) 64 (@)
        // or this 94 (^) 95 (_)
        // or this 58 (:)
        // or this 60 (<)

        // TODO : consider adding all arabic sound symbols like shadda (__ّ_) and damma (__ٌ_) and all the rest of shift keys bindings
        // Arabic
        // this آ 1570 or أ 1571
        // or إ 1573
        // or 1567 ؟
        // or . 46 or / 47
        // or , 44
        // or [ 91 or ] 93
        // or { 123 or } 125
        // or ، 1548
        // or 1563 ؛

        let arabicFix = false;
        if (lang === "ar") {
            arabicFix =
                xbetween(x, 1569, 1572) ||
                x === 1573 ||
                x === 1567 ||
                xbetween(x, 45, 48) ||
                x === 44 ||
                x === 91 ||
                x === 93 ||
                x === 123 ||
                x === 125 ||
                x === 1548 ||
                x === 1563;
        }

        return (
            xbetween(x, 64, 91) ||
            xbetween(x, 32, 39) ||
            xbetween(x, 122, 127) ||
            xbetween(x, 39, 44) ||
            xbetween(x, 61, 65) ||
            xbetween(x, 93, 96) ||
            x == 58 ||
            x == 60 ||
            arabicFix
        );
    }

    function handleKeydown(event: KeyboardEvent) {
        isFinish();
        event.preventDefault();
        typedLetter = event.key;
        if (settings.keyboardSound) {
            audio.currentTime = 0;
            audio.play();
        }

        if (
            typedLetter === "Shift" ||
            typedLetter === "Alt" ||
            typedLetter === "Control"
        ) {
            return;
        }

        if (game == "game over") {
            checkLetter(isLetterWithShift(letterIndex + 1));
            gameOver();
            return;
        }

        if (game == "in progress" || game == "waiting for input") {
            if (game === "waiting for input") {
                startGame();
            }
            setLetterEl();
            checkLetter(isLetterWithShift(letterIndex + 1));
            updateLine();
            clearLetter();
        }

        if (letterIndex >= words.length - 1) {
            gameOver();
        }
    }

    function resetResult() {
        startTime = 0;
        endTime = 0;
        typedLetter = "";
        correctLetters = 0;
        $totalTime = 0;
        $wordPerMinite = 0;
        $accuracy = 0;
        showResult = false;
        letterIndex = 0;
        try {
            nextLetterEl = wordsEl?.children[0] as HTMLSpanElement;
        } finally {
            game = "waiting for input";
            reset = !reset;
        }
    }

    function startAgain() {
        resetResult();
        inputEl?.focus();

        moveCaret();
        moveHands(isLetterWithShift(letterIndex + 1));
    }

    function isFinish() {
        const isDone =
            (letterIndex >= words.length && game == "in progress") ||
            game == "game over";
        if (isDone) {
            game = "game over";
        }
    }

    async function gameOver() {
        game = "game over";
        endTime = new Date().getTime();
        let time = (endTime - startTime) / 1000;
        $totalTime = time;
        let acc = getAccuracy();
        $accuracy = acc;
        let wpm = 0;
        if (acc > 50) {
            wpm = ((words.split(" ").length - 1) / time) * 60;
        }
        $wordPerMinite = wpm;
        showResult = true;

        let resultData = {
            level_id: data.levelId,
            user_id: data.userId,
            wpm: null,
            time: null,
            accuracy: null,
        };

        if (gameType === "practice" || gameType === "story-time") {
            resultData = {
                ...resultData,
                // @ts-ignore
                wpm: Number(wpm.toFixed(2)),
                // @ts-ignore
                time: Number(time.toFixed(2)),
                // @ts-ignore
                accuracy: Number(acc.toFixed(2)),
            };
        }

        nextLetterEl = wordsEl.children[0] as HTMLSpanElement;

        await invoke("update_user_level", {
            updatedUserLevel: resultData,
        });
    }

    function handleInputFocus() {
        inputEl?.focus();
    }

    function nextLevel() {
        switch (nextGameType) {
            case "samurai-game":
                replace(`/levels/samurai-game/${data.level.order + 1}`);
                break;
            case "duck-hunt":
                replace(`/levels/duck-hunt/${data.level.order + 1}`);
                break;
            case "learn":
            case "practice":
            case "story-time":
                replace(`/levels/game/${data.level.order + 1}`);
                break;
            default:
                replace(`/levels`);
                break;
        }
    }

    function toggleSettings() {
        settingsMenu = !settingsMenu;
    }

    function handleClickOutsideSettings() {
        settingsMenu = false;
    }

    // $: $page.data.settings,
    //     (settings = $page.data.settings),
    //     ($settingsLoader = false);
</script>

<div
    class="my-container game-container"
    in:fade={{ duration: 300, delay: 300 }}
>
    {#if !showResult}
        <div class="float-header flex justify-end gap-4">
            <button
                on:click={startAgain}
                class="again flex items-center justify-center h-12 w-12"
            >
                <Icon class="my-2" icon={repeatIcon} />
            </button>
            <button
                on:click={toggleSettings}
                class:text-tomato={settingsMenu}
                class="settings flex items-center justify-center h-12 w-12"
            >
                <Icon class="my-2" icon={settingsIcon} />
            </button>
        </div>

        {#if settingsMenu}
            <div
                class="fixed right-20 top-36 z-50"
                use:clickOutside
                on:click_outside={() => handleClickOutsideSettings()}
            >
                <GameSettings {startAgain} />
            </div>
        {/if}
    {/if}
    {#if game !== "game over" && !showResult}
        <div class="game w-full" data-game={game}>
            <input
                type="text"
                class="input"
                disabled={showResult}
                on:focus={() => (isInputFocus = true)}
                on:blur={() => (isInputFocus = false)}
                bind:this={inputEl}
                on:keydown={handleKeydown}
            />
            <div
                class="shadow-[0px_-2px_4px_#cccccc_inset] dark:shadow-[0px_-4px_4px_#0c0d11_inset] w-full flex justify-center"
            >
                <div class="h-44 w-4/5 overflow-y-hidden">
                    <div
                        bind:this={wordsEl}
                        class="words"
                        class:text-xl={settings.textSize === "small"}
                        class:text-2xl={settings.textSize === "medium"}
                        class:text-4xl={settings.textSize === "large"}
                        on:click={handleInputFocus}
                        on:keypress={handleInputFocus}
                    >
                        {#key reset}
                            {#each words as letter}
                                <span class="letter">{letter}</span>
                            {/each}
                        {/key}
                        <div
                            bind:this={caretEl}
                            on:load={moveCaret}
                            class="caret"
                            class:h-5={settings.textSize === "small"}
                            class:h-6={settings.textSize === "medium"}
                            class:h-9={settings.textSize === "large"}
                            class:hidden={!(!showResult && isInputFocus)}
                        />
                    </div>
                </div>
            </div>
            {#if !showResult && settings.keyboardShow}
                <div class="w-full mt-4">
                    <Keyboard {firstHandsLoad} />
                </div>
            {/if}
        </div>
    {/if}

    {#if showResult}
        {#if gameType === "learn"}
            <div class="result flex flex-col justify-between">
                <div in:fade class="flex justify-around items-center">
                    <h2 class="done-text">
                        {language[`${lang}`].result.wellDone}
                    </h2>
                    <div class="done-icon">
                        <Icon class="icon" icon={baselineGppGood} />
                    </div>
                </div>
                <div
                    class="controls w-full flex justify-stretch items-center"
                    class:flex-row-reverse={lang === "ar"}
                >
                    <button
                        on:click={startAgain}
                        class="repeat w-full flex items-center {lang === 'en'
                            ? 'justify-end'
                            : 'justify-start'} gap-1 pr-12"
                    >
                        {language[`${lang}`].result.repeat}
                        <Icon icon={repeatIcon} />
                    </button>
                    <button
                        on:click={nextLevel}
                        class="next w-full flex items-center gap-1 pl-12"
                        class:justify-end={lang === "ar"}
                    >
                        {language[`${lang}`].result.next}
                        <Icon icon={next32Filled} />
                    </button>
                </div>
            </div>
        {:else}
            <div class="result flex flex-col justify-between">
                <div class="numbers">
                    <div class="per-minite">
                        {$wordPerMinite.toFixed(2)}
                        <span class="unit">
                            {language[`${lang}`].result.wpm}
                        </span>
                    </div>
                    <div class="seconds">
                        {$totalTime.toFixed(2)}
                        <span class="unit">
                            {language[`${lang}`].result.seconds}
                        </span>
                    </div>
                    <div class="accuracy">
                        {$accuracy.toFixed(2)} <span class="text-3xl">%</span>
                    </div>
                </div>
                <div
                    class="controls w-full flex justify-stretch items-center"
                    class:flex-row-reverse={lang === "ar"}
                >
                    <button
                        on:click={startAgain}
                        class="repeat w-full flex items-center {lang === 'en'
                            ? 'justify-end'
                            : 'justify-start'} gap-1 pr-12"
                    >
                        {language[`${lang}`].result.repeat}
                        <Icon icon={repeatIcon} />
                    </button>
                    <button
                        on:click={nextLevel}
                        class="next w-full flex items-center gap-1 pl-12"
                        class:justify-end={lang === "ar"}
                    >
                        {language[`${lang}`].result.next}
                        <Icon icon={next32Filled} />
                    </button>
                </div>
            </div>
        {/if}
    {/if}

    {#if activeKeyLetter?.top && !showResult && settings.keyboardShow}
        <span
            class="active-key-letter"
            style={`position: fixed; top: ${activeKeyLetter?.top}px; left: ${activeKeyLetter?.left}px; width: ${activeKeyLetter?.width}px; height: ${activeKeyLetter?.height}px;`}
        />
        {#if activeShiftKey}
            <span
                class="active-key-letter"
                style={`position: fixed; top: ${activeShiftKey.top}px; left: ${activeShiftKey.left}px; width: ${activeShiftKey.width}px; height: ${activeShiftKey?.height}px;`}
            />
        {/if}
    {/if}
</div>

<style lang="postcss">
    .game-container {
        width: 100%;
        min-width: 800px;
        min-height: 600px;
        height: 84vh;
        overflow: hidden;
    }
    .active-key-letter {
        z-index: 20;
        background-color: transparent;
        box-shadow: 0;
        animation: active-key 1s infinite;
        transition: box-shadow 1s ease;
    }
    .input {
        opacity: 0;
        width: 0;
        height: 0;
        padding: 0;
        margin: 0;
    }
    .words {
        --line-height: 1.4em;
        --lines: 3;
        margin: 3rem 0;
        position: relative;
        line-height: var(--line-height);
        overflow: hidden;
        user-select: none;
    }

    .letter {
        opacity: 0.4;
        transition: all 0.3s ease;
    }

    :global(.game[data-game="in progress"] .letter[data-letter="correct"]) {
        opacity: 0.8;
    }
    :global(.game[data-game="in progress"] .letter[data-letter="incorrect"]) {
        opacity: 1;
        background-color: rgba(255, 0, 0, 0.2);
        @apply text-tomato;
    }

    .caret {
        position: absolute;
        top: 0;
        border-right: 1px solid;
        animation: caret 1s infinite;
        transition: all 0.2s ease;
        @apply border-r-tomato;
    }
    .float-header {
        position: fixed;
        z-index: 10;
        right: 4rem;

        padding: 0 1rem;
        border-radius: 1rem;
        font-weight: 800;
        font-size: 2rem;
        @apply bg-darkblue text-gostwhite dark:bg-gostwhite dark:text-darkblue;
    }
    .float-header .again {
        @apply bg-inherit;
    }
    .float-header button:hover {
        @apply text-tomato;
    }

    .result {
        height: 60vh;
        min-height: 500px;
        margin-top: 3rem;
        border-radius: 2rem;
        opacity: 1;
        animation: result 0.5s forwards;
        @apply shadow-xl shadow-tomato text-tomato bg-mygray;
    }

    .done-text {
        font-size: 5rem;
        font-weight: 700;
        text-align: center;
        transition: all 0.5s ease;
        @apply text-tomato;
    }
    .result :global(.icon) {
        font-size: 20rem;
        opacity: 0;
        transform: scale(2);
        animation: done-icon 0.5s forwards;
        animation-delay: 0.5s;
    }

    .result .controls {
        font-size: 4rem;
    }
    .numbers {
        height: 100%;
        display: grid;
        grid-template-columns: 1fr 1fr;
        grid-template-rows: 1fr 1fr;
        gap: 0 0;
        grid-template-areas: "per-minite seconds" "accuracy accuracy";
        animation: numbers 0.5s forwards;
        animation-delay: 0.5;
    }

    .per-minite,
    .seconds,
    .accuracy {
        font-size: 5rem;
        font-weight: 700;
        text-align: center;
    }
    .per-minite {
        grid-area: per-minite;
    }
    .seconds {
        grid-area: seconds;
    }
    .accuracy {
        grid-area: accuracy;
    }
    .result .unit {
        font-size: 1rem;
        font-weight: 600;
    }
    .next {
        border-bottom-right-radius: 2rem;
    }
    .repeat {
        border-bottom-left-radius: 2rem;
    }
    .next:hover,
    .repeat:hover {
        @apply bg-tomato text-gostwhite;
    }

    @keyframes result {
        0% {
            opacity: 0;
        }
        50% {
            opacity: 1;
        }
    }
    @keyframes done-icon {
        0% {
            opacity: 0;
            transform: scale(2);
        }
        100% {
            opacity: 1;
            transform: scale(1);
        }
    }

    @keyframes caret {
        0%,
        to {
            opacity: 0;
        }
        50% {
            opacity: 1;
        }
    }
    @keyframes active-key {
        0%,
        to {
            box-shadow: 0 0 8px gold;
        }
        50% {
            box-shadow: 0 0 30px gold;
        }
    }
</style>

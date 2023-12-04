<script lang="ts">
    // TODO : fix - there's a bug when rendering the grass image. I fix it by catching the error, but it might be a better way!
    // FUTURE-UPGRADE : it would be better to get score with typing some amount of words in a row, like "this is a test" gets you perfect score ...etc
    import { removeMainLayoutNavbar } from "../../../../utils";
    import { onMount } from "svelte";
    import { Background, Dog, Duck } from "../classes";
    import TextBoxGame from "./TextBoxGame.svelte";
    import { tweened } from "svelte/motion";
    import type { GameData, GameType } from "../../types";
    import type { Lang } from "../../game/types";
    import { pop, replace } from "svelte-spa-router";
    import Icon from "@iconify/svelte";
    import { settingsStore } from "../../../../stores/global";
    import { invoke } from "@tauri-apps/api/tauri";
    // import language from "$lib/language";

    type TempData = {
        game: {
            user: {
                miniGameSound: boolean;
            };
            userId: number;
            levelId: number;
            completed: boolean;
            accuracy: number | null;
            time: number | null;
            level: {
                lang: string;
                order: number;
                name: string;
                type: string;
                expectedMiniGameScore: number | null;
                words: string;
            };
        };
        nextLevelType: GameType | undefined;
    };

    type GameState = "in progress" | "game over";
    type Score = "perfect" | "good" | "ok" | "bad" | null;

    export let data: GameData;

    export let nextGameType: GameType | null;

    let canvas: HTMLCanvasElement;
    let context: CanvasRenderingContext2D;

    let lang: Lang = "en";
    let gameState: GameState = "in progress";
    let settings = {
        mute: !$settingsStore.miniGameSound,
    };

    let text = data.level.words.split(" ");
    let totalLettersCorrect = text.join("").length;
    let textLength = totalLettersCorrect;
    const duckHuntExpectedScore = data.level.expectedMiniGameScore ?? 2;
    let score: Score = null;
    let wrongTypedWordsCount = 0;
    let wordIndex = 0;
    let wordsTime: number[] = [];
    let letterPerSecond: number[] = [];
    let wordPerMinite = tweened(0, { delay: 300, duration: 1000 });
    let totalTime = tweened(0, { delay: 1300, duration: 1000 });
    let accuracy = tweened(0, { delay: 2300, duration: 1000 });
    let animationId: number;
    let deadDucks = 0;

    const ducksSoundBackground = new Audio(
        "/duck-hunt-assets/sounds/quacking.mp3"
    );
    const shotSound = new Audio("/duck-hunt-assets/sounds/gunSound.mp3");
    const laughSound = new Audio("/duck-hunt-assets/sounds/laugh.mp3");
    const findDuckSound = new Audio("/duck-hunt-assets/sounds/findDuck.mp3");

    let backgroundGrass = new Background({
        position: {
            x: 0,
            y: 0,
        },
        imgSrc: "/duck-hunt-assets/images/scene/back/0.png",
        imageWidth: 736,
        imageHeight: 600,
    });

    let ducks: Duck[] = [];

    function initiateDuck(duckColor: string) {
        return new Duck({
            position: {
                x: 300,
                y: 300,
            },
            state: "right",
            sources: {
                left: [
                    `/duck-hunt-assets/images/duck/${duckColor}/left/0.png`,
                    `/duck-hunt-assets/images/duck/${duckColor}/left/1.png`,
                    `/duck-hunt-assets/images/duck/${duckColor}/left/2.png`,
                ],
                right: [
                    `/duck-hunt-assets/images/duck/${duckColor}/right/0.png`,
                    `/duck-hunt-assets/images/duck/${duckColor}/right/1.png`,
                    `/duck-hunt-assets/images/duck/${duckColor}/right/2.png`,
                ],
                topRight: [
                    `/duck-hunt-assets/images/duck/${duckColor}/top-right/0.png`,
                    `/duck-hunt-assets/images/duck/${duckColor}/top-right/1.png`,
                    `/duck-hunt-assets/images/duck/${duckColor}/top-right/2.png`,
                ],
                topLeft: [
                    `/duck-hunt-assets/images/duck/${duckColor}/top-left/0.png`,
                    `/duck-hunt-assets/images/duck/${duckColor}/top-left/1.png`,
                    `/duck-hunt-assets/images/duck/${duckColor}/top-left/2.png`,
                ],
                dead: [
                    `/duck-hunt-assets/images/duck/${duckColor}/dead/0.png`,
                    `/duck-hunt-assets/images/duck/${duckColor}/dead/1.png`,
                    `/duck-hunt-assets/images/duck/${duckColor}/dead/2.png`,
                ],

                shot: [`/duck-hunt-assets/images/duck/${duckColor}/shot/0.png`],
            },
        });
    }

    function spawnDucks() {
        let duckColor = "black";
        for (let _ of text) {
            const duck = initiateDuck(duckColor);
            ducks.push(duck);
            duckColor = duckColor === "black" ? "red" : "black";
        }
    }

    let dog: Dog = new Dog({
        position: {
            x: 0,
            y: 0,
            defaultY: 0,
            maxY: 0,
        },
        state: null,
        sources: {
            laugh: [
                "/duck-hunt-assets/images/dog/laugh/0.png",
                "/duck-hunt-assets/images/dog/laugh/1.png",
            ],
            single: ["/duck-hunt-assets/images/dog/single/0.png"],
        },
    });

    onMount(() => {
        // ======================== Hide navbar ========================
        removeMainLayoutNavbar();

        // ======================= Canvas dimensions ====================
        if (window.innerHeight > 600 && window.innerWidth > 1024) {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        } else {
            canvas.width = 1024;
            canvas.height = 700;
        }

        // ======================= Context dimensions and color ====================
        canvas.style.fill = "#87CEEB";
        context = canvas.getContext("2d") as CanvasRenderingContext2D;
        context.fillStyle = "#87CEEB";
        context.fillRect(0, 0, canvas.width, canvas.height);

        // ====================== Background sounds =================================
        ducksSoundBackground.loop = true;
        if (!settings.mute) {
            ducksSoundBackground.autoplay = true;
            ducksSoundBackground.play();
        }
        // ====================== Grass background Y position ========================
        backgroundGrass.position.y =
            canvas.height - backgroundGrass.imageHeight;
        backgroundGrass.update(context, canvas.width);

        // ====================== Spawn Ducks and set positions =====================================
        spawnDucks();
        ducks.forEach((duck) => {
            duck.flyBox.width = canvas.width - duck.flyBox.x;
            duck.flyBox.height =
                canvas.height - duck.flyBox.y - backgroundGrass.imageHeight / 4;

            duck.position.x = Math.floor(Math.random() * duck.flyBox.width);
        });

        // ===================== Initiate dog posistion ============================
        dog.position.defaultY = canvas.height - backgroundGrass.imageHeight / 4;
        dog.position.y = dog.position.defaultY;
        dog.position.x = canvas.width / 2;
        dog.position.maxY = dog.position.defaultY - 70;

        // ====================== Animation frames ===================================
        function updateAnimation() {
            animationId = window.requestAnimationFrame(updateAnimation);
            context.fillRect(0, 0, canvas.width, canvas.height);

            for (const duck of ducks) {
                duck.update(
                    context,
                    canvas.height - backgroundGrass.imageHeight / 5
                );
                dog.find(duck.state === "dead");
            }

            dog.update(context);
            backgroundGrass.update(context, canvas.width);
        }
        updateAnimation();
    });

    function shotIfCorrect(typedWord: string) {
        shotSound.currentTime = 0;
        if (!isMute()) {
            shotSound.play();
        }
        if (typedWord === text[wordIndex]) {
            ducks[wordIndex].die();
            deadDucks += 1;
            if (!isMute()) {
                findDuckSound.currentTime = 0;
                findDuckSound.play();
            }
        } else {
            wrongTypedWordsCount += 1;
            dog.laugh();
            if (!isMute()) {
                laughSound.currentTime = 0;
                laughSound.play();
            }
        }
    }

    function addWordTime(time: number, wrongLetter: number) {
        wordsTime.push(time);
        let lps = (text[wordIndex].length - wrongLetter) / time;
        letterPerSecond.push(lps);
        totalLettersCorrect -= wrongLetter;
    }
    function gameOver() {
        gameState = "game over";
        wordIndex = 0;
        ducksSoundBackground.pause();
        cancelAnimationFrame(animationId);
        setGameResult();
    }
    function nextWord(typedWord: string) {
        shotIfCorrect(typedWord);
        wordIndex += 1;
        if (wordIndex > text.length - 1) {
            gameOver();
        }
    }

    function handleNextLevel() {
        document.body.style.overflow = "auto";
        document.body.style.overflowX = "hidden";
        let mainLayout = document.getElementById(
            "main-layout"
        ) as HTMLDivElement;
        mainLayout.style.padding = "1rem 2rem";
        mainLayout.style.height = "auto";
        let nav = mainLayout.firstElementChild as HTMLDivElement;
        nav.style.display = "flex";

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

    function handleHomeClick() {
        // TODO : this needed to bed handled more robust way, I am forcing the change here because in this page the layout is disabled, and when returning back the layout will stay disabled, so this need fixing
        document.body.style.overflow = "auto";
        document.body.style.overflowX = "hidden";
        let mainLayout = document.getElementById(
            "main-layout"
        ) as HTMLDivElement;
        mainLayout.style.padding = "1rem 2rem";
        mainLayout.style.height = "auto";
        let nav = mainLayout.firstElementChild as HTMLDivElement;
        nav.style.display = "flex";

        // goto(`/${$page.data.lang}/levels/`);
        pop();
    }

    function setScore() {
        if (wrongTypedWordsCount <= duckHuntExpectedScore) {
            score = "perfect";
        } else if (
            wrongTypedWordsCount > duckHuntExpectedScore &&
            wrongTypedWordsCount <= duckHuntExpectedScore / 2
        ) {
            score = "good";
        } else if (
            wrongTypedWordsCount > duckHuntExpectedScore / 2 &&
            wrongTypedWordsCount <=
                duckHuntExpectedScore + duckHuntExpectedScore / 2
        ) {
            score = "ok";
        } else {
            score = "bad";
        }
    }

    async function setGameResult() {
        setScore();
        let fullTime = wordsTime.reduce((pre, cur) => pre + cur, 0);
        // TODO: find more accurate equation for calculating wpm
        let wpm = text.join("").length / 7 / (fullTime / 60);
        let acc = (totalLettersCorrect / textLength) * 100;
        $totalTime = fullTime;
        $wordPerMinite = wpm;
        $accuracy = acc;

        const resultData = {
            level_id: data.levelId,
            user_id: data.userId,
            wpm,
            time: fullTime,
            accuracy: acc,
        };

        await invoke("update_user_level", {
            updatedUserLevel: resultData,
        });
    }

    async function toggleSounds() {
        settings.mute = !settings.mute;
        laughSound.pause();
        shotSound.pause();
        findDuckSound.pause();
        if (settings.mute) {
            ducksSoundBackground.pause();
        } else {
            ducksSoundBackground.play();
        }

        await invoke("update_user_settings", {
            miniGameSound: !settings.mute,
        });
        $settingsStore = {
            ...$settingsStore,
            miniGameSound: !settings.mute,
        };
    }
    function isMute() {
        return settings.mute;
    }
</script>

<div class="inline-block relative">
    <!-- Start Ducks score top left -->
    <ul class="absolute z-20 top-4 left-10 flex gap-6">
        {#each { length: text.length } as _, idx}
            <li
                class="text-2xl test-gostwhite"
                class:text-tomato={idx + 1 <= deadDucks}
            >
                <Icon icon="icon-park-twotone:duck" />
            </li>
        {/each}
    </ul>
    <!-- End Ducks score top left -->

    {#if gameState === "in progress"}
        <!-- Start Text Box Game input -->
        <div
            class="absolute z-20 w-full h-full flex justify-center items-start"
        >
            <div class="h-full mt-8">
                <TextBoxGame word={text[wordIndex]} {nextWord} {addWordTime} />
            </div>
        </div>
        <!-- End Text Box Game input -->

        <!-- Start Sound effect controller button -->
        <button
            class="absolute z-20 top-10 right-10 text-gostwhite text-6xl"
            on:click={toggleSounds}
        >
            {#if settings.mute}
                <Icon icon="mdi:volume-off" />
            {:else}
                <Icon icon="mdi:volume-high" />
            {/if}
        </button>
        <!-- End Sound effect controller button -->
    {:else}
        <!-- Start Result panel -->
        <div
            class="absolute z-40 w-full h-full flex justify-center items-center"
            class:force-right-to-left={lang === "ar"}
        >
            <div
                class="result relative flex flex-col justify-between backdrop-blur-md border-2 border-gostwhite"
            >
                <div
                    class="absolute z-20 top-[-2.4rem] left-0 right-0 flex justify-center"
                >
                    <h3
                        class="score text-6xl font-bold capitalize bg-darkblue text-gostwhite rounded-xl p-2"
                    >
                        {score}
                    </h3>
                </div>
                <div
                    class="return-home absolute z-50 {lang === 'en'
                        ? 'right-10'
                        : 'left-10'}"
                >
                    <button
                        class="bg-gostwhite text-8xl rounded-b-lg"
                        on:click={handleHomeClick}
                    >
                        <Icon
                            class="text-darkblue"
                            icon="heroicons:home-solid"
                        />
                    </button>
                </div>

                <div class="numbers">
                    <div class="per-minite">
                        {$wordPerMinite.toFixed(2)}
                        <span class="unit">
                            <!-- {language[`${lang}`].result.wpm} -->
                            wpm
                        </span>
                    </div>
                    <div class="seconds">
                        {$totalTime.toFixed(2)}
                        <span class="unit">
                            <!-- {language[`${lang}`].result.seconds} -->
                            seconds
                        </span>
                    </div>
                    <div class="accuracy">
                        {$accuracy.toFixed(2)}
                        <span class="text-3xl">%</span>
                    </div>
                </div>

                <div
                    class="controls w-full flex justify-stretch items-center"
                    class:flex-row-reverse={lang === "ar"}
                >
                    <!-- on:click={() => goto($page.url.href)} -->
                    <button
                        class="repeat w-full flex items-center {lang === 'en'
                            ? 'justify-end'
                            : 'justify-start'} gap-1 pr-12"
                    >
                        <!-- {language[`${lang}`].result.repeat} -->
                        Repeat
                        <Icon icon="pajamas:repeat" />
                    </button>
                    <button
                        class="next w-full flex items-center gap-1 pl-12"
                        class:justify-end={lang === "ar"}
                        on:click={handleNextLevel}
                    >
                        <!-- {language[`${lang}`].result.next} -->
                        Next
                        <Icon icon="fluent:next-32-filled" />
                    </button>
                </div>
            </div>
        </div>
        <!-- End Result panel -->
    {/if}
    <canvas bind:this={canvas}></canvas>
</div>

<style lang="postcss">
    .force-right-to-left {
        direction: rtl;
    }
    .result {
        height: 60%;
        width: 80%;
        border-radius: 2rem;
        opacity: 1;
    }
    .numbers {
        height: 80%;
        display: grid;
        grid-template-columns: 1fr 1fr;
        grid-template-rows: 1fr 1fr;
        gap: 0 0;
        grid-template-areas: "per-minite seconds" "accuracy accuracy";
        /* animation: numbers 0.5s forwards;
        animation-delay: 0.5; */
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
    .result .controls {
        font-size: 4rem;
    }
    .next {
        border-bottom-right-radius: 2rem;
    }
    .repeat {
        border-bottom-left-radius: 2rem;
    }

    .next:hover,
    .repeat:hover,
    .return-home button:hover {
        @apply bg-gostwhite text-darkblue;
    }

    .result .score {
        opacity: 0;
        transition: transform 0.6s ease-in;
        animation: score-animate 0.6s forwards;
        animation-delay: 3.6s;
    }
    @keyframes score-animate {
        0% {
            opacity: 0;
            transform: scale(3);
        }
        100% {
            opacity: 1;
            transform: scale(1);
        }
    }
</style>

<script lang="ts">
    import { onMount } from "svelte";
    import { Player, Sprite } from "../classes";
    import WordGame from "./WordGame.svelte";
    import { tweened } from "svelte/motion";
    import type { Lang } from "../../game/types";
    import type { GameData, GameType } from "../../types";
    import Icon from "@iconify/svelte";
    import homeSolid from "@iconify/icons-heroicons/home-solid";
    import repeatIcon from "@iconify/icons-pajamas/repeat";
    import next32Filled from "@iconify/icons-fluent/next-32-filled";

    import { pop, replace } from "svelte-spa-router";
    import { invoke } from "@tauri-apps/api/tauri";
    import { langStore } from "../../../../stores/global";
    import language from "../../../../language";

    // TODO : add more utilities like player hitting substruct more health from enemy when all letters correct or when score prefect ...etc
    // TODO : there are some utils that unnecessary for the game to work such as controls (arrows), you can use them to add new functionality to the game or just delete them
    // TODO : this code needs refactoring and orgenaizing!
    // TODO : there are some assets for the charecters to use, like "dead", "attacks" and other images

    export let data: GameData;
    export let nextGameType: GameType | null;
    export let toggleReload: () => void;

    type GameState = "in progress" | "game over";
    type GameResult = "You won" | "You lost" | "Draw";
    type Score = "perfect" | "good" | "ok" | "bad" | null;

    let lang: Lang = $langStore;
    let text = data.level.words.split(" ");
    let totalLettersCorrect = text.join("").length;
    let textLength = text.join("").length;
    let expectedLowTimeForWord = data.level.expectedMiniGameScore ?? 2;
    let scoreForWordPerSecond: Score = null;

    let wordIndex = 0;
    let wordsTime: number[] = [];
    let letterPerSecond: number[] = [];
    let toggleScore = false;
    let showTextBox = false;
    let wordPerMinite = tweened(0, { delay: 300, duration: 1000 });
    let totalTime = tweened(0, { delay: 1300, duration: 1000 });
    let accuracy = tweened(0, { delay: 2300, duration: 1000 });

    let canvas: HTMLCanvasElement;
    // TODO : consider making time dynamic by storing it into database and modify it for each level
    let time = 60;
    let gameState: GameState = "in progress";
    let gameResult: GameResult = "Draw";
    let animationId: number;
    let timerId: any;
    const background = new Sprite({
        position: {
            x: 0,
            y: 0,
        },
        imgSrc: "/games-assets/canvas-bg-2.png",
    });

    const player = new Player({
        position: {
            x: 200,
            y: 0,
        },
        velocity: {
            x: 0,
            y: 0,
        },
        offset: {
            x: 0,
            y: 0,
        },
        boxAttackProps: {
            offset: {
                x: 100,
                y: 100,
            },
            width: 100,
            height: 50,
        },
        health: textLength,
        imgFolderSrc: "/games-assets/Samurai",
        playerState: "idle",
        maxFrames: 6,
        scale: 1.6,
    });
    const enemy = new Player({
        position: {
            x: 600,
            y: 0,
        },
        velocity: {
            x: 0,
            y: 0,
        },
        offset: {
            x: 50,
            y: 0,
        },
        boxAttackProps: {
            offset: {
                x: -20,
                y: 100,
            },
            width: 120,
            height: 50,
        },
        health: textLength,
        imgFolderSrc: "/games-assets/Samurai_Commander",
        playerState: "idle",
        maxFrames: 5,
        scale: 1.6,
    });

    // ======================== keys ======================
    const keys = {
        a: {
            pressed: false,
        },
        d: {
            pressed: false,
        },
        w: {
            pressed: false,
        },
        e: {
            pressed: false,
        },

        arrowRight: {
            pressed: false,
        },
        arrowLeft: {
            pressed: false,
        },
        arrowUp: {
            pressed: false,
        },
        p: {
            pressed: false,
        },
    };

    function handleKeydown(event: KeyboardEvent) {
        // ========== Player ==========
        switch (event.key) {
            case "d":
                keys.d.pressed = true;
                player.lastKey = "d";

                break;
            case "a":
                keys.a.pressed = true;
                player.lastKey = "a";
                break;
            case "w":
                keys.w.pressed = true;
                player.velocity.y = -15;
                break;
            case " ":
                player.attack();
                break;
            case "e":
                keys.e.pressed = true;
                break;
        }

        // ========== Enemy ==========
        switch (event.key) {
            case "ArrowRight":
                keys.arrowRight.pressed = true;
                enemy.lastKey = "ArrowRight";

                break;
            case "ArrowLeft":
                keys.arrowLeft.pressed = true;
                enemy.lastKey = "ArrowLeft";

                break;
            case "ArrowUp":
                keys.arrowUp.pressed = true;
                enemy.velocity.y = -15;
                break;
            case "ArrowDown":
                enemy.attack();
                break;
            case "p":
                keys.p.pressed = true;
                break;
        }
    }
    function handleKeyup(event: KeyboardEvent) {
        // =========== Player ===========

        switch (event.key) {
            case "d":
                keys.d.pressed = false;
                break;
            case "a":
                keys.a.pressed = false;
                break;
            case "e":
                keys.e.pressed = false;
                break;
        }
        // ============ Enemy ============
        switch (event.key) {
            case "ArrowRight":
                keys.arrowRight.pressed = false;
                break;
            case "ArrowLeft":
                keys.arrowLeft.pressed = false;
                break;
            case "p":
                keys.p.pressed = false;
                break;
        }
    }
    // =================== Result ========================
    async function setGameResult() {
        if (gameResult !== "You won") return;
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
    function determineWinner() {
        clearTimeout(timerId);

        if (player.health === enemy.health) {
            gameResult = "Draw";
        } else if (player.health > enemy.health) {
            gameResult = "You won";
        } else {
            gameResult = "You lost";
        }
        cancelAnimationFrame(animationId);
        gameState = "game over";
        setGameResult();
    }
    // =================== Result ========================

    onMount(() => {
        // TODO : this needed to bed handled more robust way, I am forcing the change here because in this page the layout is disabled, and when returning back the layout will stay disabled, so this need fixing
        document.body.style.overflow = "hidden";
        let mainLayout = document.getElementById(
            "main-layout"
        ) as HTMLDivElement;
        mainLayout.style.padding = "0";
        mainLayout.style.height = "0";
        let nav = mainLayout.firstElementChild as HTMLDivElement;
        nav.style.display = "none";
        // ================= canvas dimensions ========================
        if (window.innerHeight > 600 && window.innerWidth > 1024) {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight - 8;
        } else {
            canvas.width = 1024;
            canvas.height = 700;
        }
        // ================= canvas dimensions ========================

        // ================ initiat 2D context ========================
        let context = canvas.getContext("2d") as CanvasRenderingContext2D;
        if (!context) return;

        context?.fillRect(0, 0, canvas.width, canvas.height);

        // ================= helper functions ===============
        function playersCollision(player1: Player, player2: Player) {
            return (
                player1.position.x + player1.attackBox.width >=
                    player2.position.x &&
                player1.attackBox.position.x <=
                    player2.position.x + player2.width &&
                player1.position.y + player1.attackBox.height >=
                    player2.position.y &&
                player1.attackBox.position.y <=
                    player2.position.y + player2.height
            );
        }

        function decreaseTime() {
            if (time > 0) {
                timerId = setTimeout(decreaseTime, 1000);
                time -= 1;
            } else {
                // TODO: reset everything when over
                determineWinner();
            }
        }
        decreaseTime();

        // ================= draw players ===============
        player.draw(context);
        enemy.position.x = canvas.width - 400;
        enemy.draw(context);

        // ========================== Animate =============================
        function animate() {
            animationId = window.requestAnimationFrame(animate);

            if (enemy.position.x - player.position.x < 70) {
                keys.d.pressed = false;
                keys.arrowLeft.pressed = false;
                showTextBox = true;
            } else {
                keys.d.pressed = true;
                keys.arrowLeft.pressed = true;
            }

            context.fillStyle = "#151826";
            context.fillRect(0, 0, canvas.width, canvas.height);

            background.update(context, canvas.width, canvas.height);
            player.update(context, background.image.height);
            enemy.update(context, background.image.height);

            player.velocity.x = 0;
            enemy.velocity.x = 0;

            // player
            if (keys.d.pressed) {
                player.switchMovement("run", 8);
                player.velocity.x = 5;
            } else if (keys.a.pressed) {
                player.switchMovement("run", 8);
                player.velocity.x = -5;
            } else if (keys.e.pressed) {
                player.switchMovement("defense", 2);
            } else if (keys.w.pressed && player.velocity.y > 0) {
                player.switchMovement("jump", 9);
            } else if (!player.isAttack) {
                player.switchMovement("idle", 6);
            }

            // enemy
            if (keys.arrowRight.pressed) {
                enemy.switchMovement("run", 8);
                enemy.velocity.x = 5;
            } else if (keys.arrowLeft.pressed) {
                enemy.switchMovement("run", 8);
                enemy.velocity.x = -5;
            } else if (keys.p.pressed) {
                enemy.switchMovement("defense", 2);
            } else if (keys.arrowUp.pressed && enemy.velocity.y > 0) {
                enemy.switchMovement("jump", 7);
            } else if (!enemy.isAttack) {
                enemy.switchMovement("idle", 5);
            }

            // attack box logic
            if (playersCollision(player, enemy) && player.isAttack) {
                player.isAttack = false;
                if (enemy.playerState === "defense") return;
                enemy.health -= 1;
            }
            if (playersCollision(enemy, player) && enemy.isAttack) {
                enemy.isAttack = false;
                if (player.playerState === "defense") return;
                player.health -= 1;
            }
        }
        animate();
        // ========================== Animate =============================

        // ================= keys listeners =================
        window.addEventListener("keydown", handleKeydown);
        window.addEventListener("keyup", handleKeyup);
    });

    function playerAttack() {
        player.attack();
    }
    function enemyAttack() {
        enemy.attack();
    }
    function addWordTime(time: number, wrongLetter: number) {
        wordsTime.push(time);
        let lps = (text[wordIndex].length - wrongLetter) / time;
        letterPerSecond.push(lps);
        totalLettersCorrect -= wrongLetter;

        if (
            lps > expectedLowTimeForWord &&
            lps <= expectedLowTimeForWord + expectedLowTimeForWord / 2
        ) {
            scoreForWordPerSecond = "ok";
        } else if (
            lps > expectedLowTimeForWord + expectedLowTimeForWord / 2 &&
            lps <= expectedLowTimeForWord * 2
        ) {
            scoreForWordPerSecond = "good";
        } else if (lps > expectedLowTimeForWord * 2) {
            scoreForWordPerSecond = "perfect";
        } else {
            scoreForWordPerSecond = "bad";
        }
    }
    function nextWord() {
        wordIndex += 1;
        toggleScore = false;
        if (wordIndex > text.length - 1) {
            if (player.health > enemy.health) {
                player.attack();
                enemy.health = 0;
            } else if (player.health < enemy.health) {
                enemy.attack();
                player.health = 0;
            }
            wordIndex = 0;
        }
        toggleScore = true;
        setTimeout(() => {
            toggleScore = false;
        }, 1000);
    }

    function handleHomeClick() {
        // TODO : this needed to bed handled more robust way, I am forcing the change here because in this page the layout is disabled, and when returning back the layout will stay disabled, so this need fixing
        document.body.style.overflow = "";
        document.body.style.overflowX = "";
        let mainLayout = document.getElementById(
            "main-layout"
        ) as HTMLDivElement;
        mainLayout.style.padding = "";
        mainLayout.style.height = "";
        let nav = mainLayout.firstElementChild as HTMLDivElement;
        nav.style.display = "";

        // goto(`/${$page.data.lang}/levels/`);
        pop();
    }

    function handleNextLevel() {
        document.body.style.overflow = "";
        document.body.style.overflowX = "";
        let mainLayout = document.getElementById(
            "main-layout"
        ) as HTMLDivElement;
        mainLayout.style.padding = "";
        mainLayout.style.height = "";
        let nav = mainLayout.firstElementChild as HTMLDivElement;
        nav.style.display = "";

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

    $: {
        if (gameState === "game over") {
            window.removeEventListener("keydown", handleKeydown);
            window.removeEventListener("keyup", handleKeyup);
        }
        if (player.health <= 0 || enemy.health <= 0) {
            // TODO: reset everything when over
            determineWinner();
        }
    }
</script>

<div class="inline-block relative overflow-hidden force-left-to-right">
    {#if gameState === "game over"}
        <!-- Start Game Result -->
        <!-- TODO : this result game thing used in other games like practice game, so consider putting it inside separed component -->
        <div
            class="absolute z-40 w-full h-full backdrop-blur-md flex justify-center items-center"
            class:force-right-to-left={lang === "ar"}
        >
            <div class="result relative flex flex-col justify-between">
                <div
                    class="return-home absolute z-50 {lang === 'en'
                        ? 'right-10'
                        : 'left-10'}"
                >
                    <button
                        class="bg-tomato text-gostwhite text-8xl rounded-b-lg"
                        on:click={handleHomeClick}
                    >
                        <Icon icon={homeSolid} />
                    </button>
                </div>
                {#if gameResult !== "You won"}
                    <div
                        class="game-result w-full h-full flex justify-center items-center"
                    >
                        <span class="game-result-content text-9xl font-bold"
                            >{gameResult}</span
                        >
                    </div>
                {:else}
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
                            {$accuracy.toFixed(2)}
                            <span class="text-3xl">%</span>
                        </div>
                    </div>
                {/if}
                <div
                    class="controls w-full flex justify-stretch items-center"
                    class:flex-row-reverse={lang === "ar"}
                >
                    <!-- on:click={() => goto($page.url.href)} -->
                    <button
                        on:click={toggleReload}
                        class="repeat w-full flex items-center {lang === 'en'
                            ? 'justify-end'
                            : 'justify-start'} gap-1 pr-12"
                        class:lost-repeat={gameResult !== "You won"}
                    >
                        {language[`${lang}`].result.repeat}
                        <Icon icon={repeatIcon} />
                    </button>
                    {#if gameResult === "You won"}
                        <button
                            class="next w-full flex items-center gap-1 pl-12"
                            class:justify-end={lang === "ar"}
                            on:click={handleNextLevel}
                        >
                            {language[`${lang}`].result.next}
                            <Icon icon={next32Filled} />
                        </button>
                    {/if}
                </div>
            </div>
        </div>
        <!-- End Game Result -->
    {/if}
    {#if gameState === "in progress"}
        <button
            class="absolute top-16 right-12 z-50 bg-gostwhite text-darkblue text-3xl p-2 rounded-full opacity-70 hover:opacity-100 shadow-xl"
            on:click={handleHomeClick}
        >
            <Icon icon={homeSolid} />
        </button>
    {/if}

    <div class="flex items-center justify-between gap-6 absolute w-full p-4">
        <div class="w-full flex flex-col items-start rounded-full relative">
            <progress
                max={textLength}
                value={player.health}
                class="left-prog h-6 w-full z-20"
            />
            <div class="h-8" />
            <div
                class="bg-darkblue self-end flex items-end justify-center p-1 absolute z-0 mr-8 h-full w-40 rounded-full"
            >
                <span class="font-bold text-xl">You</span>
            </div>
        </div>
        <div
            class="h-16 w-16 shrink-0 flex items-center justify-center rounded-lg text-xl font-bold bg-tomato"
        >
            <span>{time}</span>
        </div>
        <div class="w-full flex flex-col items-end rounded-full relative">
            <progress
                max={textLength}
                value={enemy.health}
                class="right-prog h-6 w-full z-20"
            />
            <div class="h-8" />
            <div
                class="bg-darkblue self-start flex items-end justify-center p-1 absolute z-0 ml-8 h-full w-40 rounded-full"
            >
                <span class="font-bold text-xl">Enemy</span>
            </div>
        </div>
    </div>
    {#if gameState === "in progress" && showTextBox}
        <div
            class="word-layout absolute z-20 w-full h-full flex justify-center items-center"
        >
            {#if scoreForWordPerSecond}
                <div class="absolute z-30">
                    <div id="test" class="relative flex justify-center">
                        <div
                            class="absolute text-green-400 text-4xl font-bold capitalize opacity-0"
                            class:toggle-score={toggleScore}
                        >
                            {scoreForWordPerSecond}!
                        </div>
                    </div>
                </div>
            {/if}
            <WordGame
                word={text[wordIndex]}
                {nextWord}
                {playerAttack}
                {enemyAttack}
                {addWordTime}
            />
        </div>
    {/if}
    <canvas bind:this={canvas} />
</div>

<style lang="postcss">
    /* :global(body) {
        overflow: hidden;
    } */
    /* :global(div.layout) {
        padding: 0;
    }
    :global(.layout > nav) {
        display: none;
    } */
    .force-left-to-right {
        direction: ltr;
    }
    .force-right-to-left {
        direction: rtl;
    }
    progress[value] {
        -webkit-appearance: none;
        -moz-appearance: none;
        appearance: none;
        border: none;
        margin: 0 10px;
        border-radius: 10em;
        background: gold;
    }
    progress[value]::-webkit-progress-bar {
        border-radius: 10em;
        background: gold;
    }
    progress[value]::-webkit-progress-value {
        border-radius: 10em;
        background: green;
    }
    progress[value]::-moz-progress-bar {
        border-radius: 10em;
        background: green;
    }
    progress[value].left-prog {
        direction: rtl;
    }

    .word-layout {
        opacity: 0;
        animation: text-box 0.5s forwards ease-in;
    }

    .word-layout .toggle-score {
        animation: toggle-score 1s forwards ease-in-out;
    }
    @keyframes toggle-score {
        0% {
            opacity: 0;
            top: 0;
        }
        20% {
            opacity: 1;
        }
        100% {
            opacity: 0;
            top: 60px;
        }
    }
    @keyframes text-box {
        0% {
            opacity: 0;
            transform: scale(1.4);
        }
        100% {
            opacity: 1;
            transform: scale(1);
        }
    }

    .result {
        height: 60%;
        width: 80%;
        border-radius: 2rem;
        opacity: 1;
        box-shadow: 14px 14px 0;
        @apply shadow-tomato text-tomato bg-mygray;
    }
    .numbers {
        height: 80%;
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
    .result .controls {
        font-size: 4rem;
    }
    .next {
        border-bottom-right-radius: 2rem;
    }
    .repeat {
        border-bottom-left-radius: 2rem;
    }
    .repeat.lost-repeat {
        border-bottom-right-radius: 2rem;
        @apply justify-center;
    }
    .next:hover,
    .repeat:hover,
    .return-home button:hover {
        @apply bg-tomato text-gostwhite bg-opacity-50;
    }

    .game-result .game-result-content {
        opacity: 0;
        transform: scale(2);
        animation: result-content 0.5s forwards;
    }
    @keyframes result-content {
        0% {
            opacity: 0;
            transform: scale(2);
        }
        100% {
            opacity: 1;
            transform: scale(1);
        }
    }
</style>

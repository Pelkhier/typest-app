<script lang="ts">
    import { location } from "svelte-spa-router";
    import type { Lang } from "../../../stores/global";
    import type { GameType, GameTypeAr, UserLevelCard } from "../types";
    import Icon from "@iconify/svelte";

    export let userLevel: UserLevelCard;
    export let currentLevel = false;
    export let lang: Lang;
    let gameType: GameType | GameTypeAr = userLevel.level.type as GameType;

    let href = `#${$location}/game/${userLevel.level.order}`;
    let dataSveltekitPreloadData:
        | true
        | ""
        | "hover"
        | "off"
        | "tap"
        | null
        | undefined = "hover";

    if (userLevel.level.type === "samurai-game") {
        href = `#${$location}/samurai-game/${userLevel.level.order}`;
        dataSveltekitPreloadData = "off";
    } else if (userLevel.level.type === "duck-hunt") {
        href = `#${$location}/duck-hunt/${userLevel.level.order}`;
        dataSveltekitPreloadData = "off";
    }
    function handleClick(event: Event) {
        if (!(userLevel.completed || currentLevel)) {
            event.preventDefault();
            return;
        }
        // if (userLevel.level.type === "samurai-game") {
        //     $loader = true;
        // }
    }

    if (userLevel.level.lang === "ar") {
        switch (gameType) {
            case "learn":
                gameType = "تعلم";
                break;
            case "practice":
                gameType = "تمرين";
                break;
            case "samurai-game":
                gameType = "لعبة الساموراي";
                break;
            case "story-time":
                gameType = "قصة قصيرة";
                break;
        }
    }
</script>

<a
    {href}
    data-sveltekit-preload-data={dataSveltekitPreloadData}
    on:click={handleClick}
    class:completed={userLevel.completed || currentLevel}
    class="level w-48 h-40 px-4 py-2 rounded-xl"
>
    <div class="h-full flex flex-col justify-between items-start">
        <h4 class="text-md">
            {gameType.replace("-", " ").toUpperCase()}
        </h4>
        {#if userLevel.completed && userLevel.accuracy}
            <div class="flex flex-col items-start">
                <h6 class="text-sm">{userLevel.wpm?.toFixed(0)} wpm</h6>
                <h6 class="text-sm">{userLevel.accuracy.toFixed(0)} %</h6>
                <h6 class="text-sm">{userLevel.time?.toFixed(0)} s</h6>
            </div>
        {:else if userLevel.completed && !userLevel.accuracy}
            <div class="text-4xl">
                <Icon class="icon" icon="ic:baseline-gpp-good" />
            </div>
        {/if}
    </div>
    <div
        class:completed={userLevel.completed || currentLevel}
        class="finger rounded-full bg-rose-600 flex flex-col justify-center"
        data-dir={lang}
    >
        {#if userLevel.level.type === "samurai-game"}
            <div
                class="w-full h-full flex justify-center items-center text-7xl text-gostwhite"
            >
                <Icon icon="game-icons:samurai-helmet" />
            </div>
        {:else if userLevel.level.type === "duck-hunt"}
            <div
                class="w-full h-full flex justify-center items-center text-6xl text-gostwhite"
            >
                <Icon icon="icon-park-solid:duck" />
            </div>
        {:else}
            <div class="nail" data-dir={lang} />
            <div class="h-full flex items-center justify-center">
                <h2 class="text-2xl text-white w-full text-center">
                    {userLevel.level.name}
                </h2>
            </div>
        {/if}
    </div>
</a>

<style lang="postcss">
    .level {
        opacity: 0.4;
        position: relative;
        border: 1px solid;
        cursor: default;
        user-select: none;
        transition: all 0.5s ease;
        @apply bg-gostwhite bg-opacity-80 dark:bg-darkblue dark:bg-opacity-80 border-darkblue dark:border-gostwhite shadow-xl;
    }
    .level.completed {
        opacity: 1;
        cursor: pointer;
    }
    .level::before {
        content: "";
        opacity: 0.4;
        position: absolute;
        z-index: -1;
        inset: 0;
        translate: -0.8rem -0.8rem;
        border-radius: inherit;
        @apply bg-tomato;
    }
    .level.completed::before {
        opacity: 1;
    }
    :global(.layout[data-dir="ar"] .level::before) {
        translate: 0.8rem -0.8rem;
    }
    :global(.finger) {
        position: absolute;
        height: 8rem;
        width: 7rem;
        bottom: -3rem;
        right: 4px;
        transition: all 0.5s ease;
    }
    :global(.finger[data-dir="ar"]) {
        right: auto;
        left: 4px;
    }
    .level.completed:hover {
        @apply text-gostwhite bg-darkblue dark:bg-gostwhite dark:text-darkblue;
    }
    .level:hover :global(.finger.completed) {
        height: 12rem;
    }
    :global(.nail) {
        position: absolute;
        width: 70%;
        top: -1rem;
        left: 0;
        height: 6rem;
        border-top: 4px solid white;
        border-radius: 100%;
        margin: 0 1rem;
        margin-top: 2rem;
        z-index: 3;
    }
    :global(.nail[data-dir="ar"]) {
        left: auto;
        right: 0;
    }
</style>

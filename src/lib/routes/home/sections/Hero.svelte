<script lang="ts">
    import { langStore, type Lang } from "../../../stores/global";
    import type { UserStats } from "../types";
    import CyrcleChart from "./CyrcleChart.svelte";
    import LineChart from "./LineChart.svelte";

    export let userStats: UserStats;
    let currentLevelRoute =
        userStats?.currentLevel?.type === "learn" ||
        userStats?.currentLevel?.type === "practice"
            ? "game"
            : userStats?.currentLevel?.type;

    const lang: Lang = $langStore;
</script>

<div class="w-full h-full flex justify-center items-center gap-16">
    <div class="h-full w-1/2 flex flex-col gap-6">
        <LineChart />
        <div
            class="h-1/5 border-tomatoSecondary border-2 rounded-lg shadow-inner shadow-tomato p-2 z-50"
        >
            <!-- href="/{$page.data.lang}/levels/game?order={userStats
                    ?.currentLevel?.level.order ?? 1}" -->
            <a
                href="#/levels/{currentLevelRoute}/{userStats?.currentLevel
                    ?.order ?? 1}"
                class="bg-tomatoSecondary text-gostwhite bg-opacity-90 h-full w-full flex justify-around items-center rounded-md transition-all hover:scale-105 hover:shadow-lg"
            >
                <div class="flex flex-col items-center justify-center">
                    <h2 class="text-xl">
                        <!-- {language[`${lang}`].heroStats.currentLevel.title} -->
                        Current Level
                    </h2>
                    <h3 class="text-2xl font-bold">
                        <!-- {userStats?.currentLevel?.level.name ??
                            language[`${lang}`].heroStats.currentLevel.random} -->
                        {userStats?.currentLevel?.name ?? "Random"}
                    </h3>
                </div>
                <h2>
                    <!-- {language[`${lang}`].heroStats.currentLevel.continue} -->
                    Click To Continue
                    {#if lang === "en"}
                        &rightarrow;
                    {:else}
                        &leftarrow;
                    {/if}
                </h2>
            </a>
        </div>
    </div>
    <div class="w-60 h-full flex flex-col justify-between">
        <CyrcleChart {userStats} />
        <div
            class="h-2/5 bg-tomato rounded-t-xl flex flex-col items-center gap-10 pt-8"
        >
            <h2
                class="text-2xl font-bold bg-darkblue text-gostwhite text-center w-[110%] p-2 shadow-lg rounded-md"
            >
                <!-- {language[`${lang}`].heroStats.lastStoryTime.title} -->
                Last Story Time
            </h2>
            <div
                class="w-full px-12 flex justify-around items-center text-xl font-extrabold"
            >
                {#if userStats?.lastStoryTime?.accuracy && userStats.lastStoryTime.completed}
                    <h4>
                        {userStats?.lastStoryTime?.accuracy?.toFixed(0)}<span
                            class="text-sm">%</span
                        >
                    </h4>
                    <span class="text-4xl">|</span>
                    <h4>
                        {userStats?.lastStoryTime?.wpm?.toFixed(0)}
                        <span class="text-sm">
                            <!-- {language[`${lang}`].heroStats.lastStoryTime.wpm} -->
                            wpm
                        </span>
                    </h4>
                {:else}
                    <a
                        href="#/levels/game/{userStats?.lastStoryTime?.order ??
                            1}"
                        class="border-2 border-darkblue py-2 px-4 rounded-md shadow-lg text-darkblue hover:bg-darkblue hover:text-gostwhite"
                    >
                        <!-- {language[`${lang}`].heroStats.lastStoryTime.play} -->
                        Play
                    </a>
                {/if}
            </div>
        </div>
    </div>
</div>

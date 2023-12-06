<script lang="ts">
    import Chart from "chart.js/auto";
    import { onMount } from "svelte";
    import type { UserStats } from "../types";
    import { langStore, type Lang } from "../../../stores/global";
    import language from "../../../language";

    export let userStats: UserStats;

    const lang: Lang = $langStore;

    const completed = userStats?.completedLevelsCount ?? 0;
    const notCompleted =
        (userStats?.allLevelsCount ?? 0) -
        (userStats?.completedLevelsCount ?? 0);

    let data = [completed, notCompleted];
    const done = language[lang].heroStats.donhat.done;
    const notDone = language[lang].heroStats.donhat.notDone;
    let labels = [done, notDone];
    let ctx: CanvasRenderingContext2D | null;
    let canvas: HTMLCanvasElement;

    onMount(() => {
        ctx = canvas.getContext("2d");
        if (!ctx) return;
        const chart = new Chart(ctx, {
            type: "doughnut",
            data: {
                labels: labels,
                datasets: [
                    {
                        label: language[lang].heroStats.donhat.completedKeys,
                        data: data,
                        backgroundColor: ["#ff6347", "#1d212b"],
                        hoverOffset: 20,
                    },
                ],
            },
        });
    });
</script>

<div
    class="h-1/2 w-full flex flex-col items-center justify-center bg-darkblue bg-opacity-10 shadow-lg mt-10 rounded-md border-2 border-mygray transition-transform ease hover:scale-105"
>
    <h2 class="font-bold text-gostwhite dark:text-darkblue">
        {language[lang].heroStats.donhat.title}
    </h2>
    <canvas bind:this={canvas} />
</div>

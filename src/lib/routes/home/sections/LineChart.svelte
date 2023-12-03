<script lang="ts">
    import Chart from "chart.js/auto";
    import { onMount } from "svelte";

    // TODO : this line chart needs to be filled with real data

    let data = [65, 59, 80, 81, 56, 55, 40];
    let labels = [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
        "Sunday",
    ];

    let ctx: CanvasRenderingContext2D | null;
    let canvas: HTMLCanvasElement;

    onMount(() => {
        ctx = canvas.getContext("2d");
        if (!ctx) return;
        const chart = new Chart(ctx, {
            type: "line",
            data: {
                labels: labels,
                datasets: [
                    {
                        label: "Dummey Data",
                        data,
                        fill: false,
                        borderColor: "ghostwhite",
                        tension: 0.1,
                        backgroundColor: "tomato",
                    },
                ],
            },
            options: {
                scales: {
                    x: {
                        grid: {
                            color: "tomato",
                        },
                    },
                    y: {
                        grid: {
                            color: "tomato",
                        },
                    },
                },
            },
        });
    });
</script>

<div
    class="h-2/3 w-full mt-10 px-6 rounded-xl bg-darkblue flex justify-center items-center shadow-lg transition-all ease hover:scale-105 hover:shadow-2xl"
>
    <canvas bind:this={canvas} />
</div>

<script lang="ts">
    import { fade } from "svelte/transition";
    import Hero from "./sections/Hero.svelte";
    // import { Contributors, Details, TestSkills } from "$lib/components";
    import { langStore, type Lang } from "../../stores/global";
    import type { UserStats } from "./types";
    import { onMount } from "svelte";
    import { invoke } from "@tauri-apps/api/tauri";

    let userStats: UserStats = null;

    onMount(async () => {
        userStats = await invoke("get_user_stats", {
            lang: $langStore,
        });
    });

    const lang: Lang = "en";
</script>

<svelte:head>
    <title>Typest | Type Fast + Type Fun</title>
    <meta
        name="description"
        content="If you want to type fast and accurate, a place where you learn and practice fast typing in both languages, Arabic and English, this is you place."
    />
</svelte:head>

{#if userStats}
    <div
        class="my-container home mb-10"
        in:fade={{ delay: 300, duration: 300 }}
        out:fade={{ duration: 300 }}
    >
        <!-- Start Hero Section -->
        <div class="hero flex items-center justify-center" data-dir={lang}>
            <Hero {userStats} />

            <div class="key backspace flex justify-around items-center">
                <iconify-icon icon="ph:arrow-up-bold" rotate="270deg" />
                <div>backspace</div>
            </div>
            <div class="key enter flex justify-around items-center">
                <div><iconify-icon icon="mi:enter" /></div>
                <div>enter</div>
            </div>
            <div class="key shiftright flex justify-end items-center gap-2">
                <iconify-icon icon="lucide:move-up" />
                <div>shift</div>
            </div>
            <div class="key space">space</div>
            <div class="key tab flex items-center justify-around">
                <div>tab</div>
                <div class="flex flex-col justify-around h-full">
                    <iconify-icon icon="octicon:tab-24" />
                    <iconify-icon icon="octicon:tab-24" flip="horizontal" />
                </div>
            </div>
            <div class="key alt-right flex items-center justify-center">
                alt
            </div>
            <div class="key control-left flex items-center justify-center">
                ctrl
            </div>
            <div
                class="key three flex items-center justify-center text-xl font-bold"
            >
                3
            </div>
            <div
                class="key six flex items-center justify-center text-xl font-bold"
            >
                6
            </div>
            <div
                class="key zero flex items-center justify-center text-xl font-bold"
            >
                0
            </div>
        </div>
        <!-- End Hero Section -->

        <!-- Start Test Skills Section -->
        <!-- <TestSkills {lang} /> -->
        <!-- Start Test Skills Section -->
        <!-- <Details /> -->
        <!-- Start Contribute Section -->
        <!-- <Contributors githubUsers={data.githubUsers} {lang} /> -->
        <!-- End Contribute Section -->
    </div>
{/if}

<style lang="postcss">
    .home .hero {
        height: 80vh;
        min-height: 600px;
        min-width: 1200px;
    }
    :global(html .home .hero) {
        border-radius: 1.5rem 0 1.5rem 1.5rem;

        background: rgb(122, 122, 122);
        background: linear-gradient(
            9deg,
            rgba(122, 122, 122, 1) 0%,
            rgba(29, 33, 43, 1) 84%,
            rgba(29, 33, 43, 1) 100%
        );
    }
    :global(html.dark .home .hero) {
        background: rgb(179, 179, 179);
        background: linear-gradient(
            9deg,
            rgba(179, 179, 179, 1) 0%,
            rgba(248, 248, 255, 1) 84%,
            rgba(248, 248, 255, 1) 100%
        );
    }
    /* :global(html .layout[data-dir="ar"] .home .hero) {
        border-radius: 0 1.5rem 1.5rem 1.5rem;
        background: rgb(122, 122, 122);
        background: linear-gradient(
            351deg,
            rgba(122, 122, 122, 1) 0%,
            rgba(29, 33, 43, 1) 84%,
            rgba(29, 33, 43, 1) 100%
        );
    } */
    :global(html.dark .layout[data-dir="ar"] .home .hero) {
        background: rgb(179, 179, 179);
        background: linear-gradient(
            351deg,
            rgba(179, 179, 179, 1) 0%,
            rgba(248, 248, 255, 1) 84%,
            rgba(248, 248, 255, 1) 100%
        );
    }

    .hero {
        position: relative;
    }

    .key {
        position: absolute;
        direction: ltr;
        height: 4rem;
        opacity: 0;
        border: 1px solid;
        animation: key 8s infinite;
        border-radius: 0.3rem;
        @apply border-gostwhite dark:border-darkblue text-gostwhite dark:text-darkblue;
    }
    .key.backspace {
        top: 10px;
        right: 10px;
        width: 8rem;
        animation-delay: 3s;
        animation-duration: 14s;
    }
    .key.enter {
        right: 10px;
        width: 9rem;
    }
    .key.shiftright {
        right: 10px;
        top: 60%;
        width: 12rem;
        animation-delay: 4.5s;
    }
    .key.space {
        bottom: 10px;
        width: 40%;
        animation-delay: 2s;
    }
    .key.tab {
        left: 10px;
        top: 6rem;
        width: 7rem;
        animation-delay: 5.5s;
        animation-duration: 14s;
    }
    .key.alt-right {
        bottom: 10px;
        right: 20%;
        width: 5rem;
        animation-delay: 6s;
    }
    .key.control-left {
        bottom: 10px;
        left: 10px;
        width: 5rem;
        animation-delay: 0.5s;
    }
    .key.three {
        top: 10px;
        left: 20%;
        width: 5rem;
        animation-delay: 1.2s;
    }
    .key.six {
        top: 10px;
        width: 5rem;
        animation-delay: 3s;
    }
    .key.zero {
        top: 10px;
        right: 20%;
        width: 5rem;
    }

    @keyframes key {
        0%,
        to {
            opacity: 0;
        }
        35% {
            box-shadow: 8px 8px 8px black;
            opacity: 0.3;
        }
        70% {
            opacity: 0;
        }
    }
</style>

<script lang="ts">
    import { fade } from "svelte/transition";
    import { langStore, type Lang } from "../../stores/global";
    import type { UserLevelCard } from "./types";
    import LevelCard from "./components/LevelCard.svelte";
    import { onMount } from "svelte";
    import { invoke } from "@tauri-apps/api/tauri";

    // export let data: PageServerData;
    let userLevels: UserLevelCard[];
    let lang: Lang = $langStore;
    let currentLevel = 0;

    onMount(async () => {
        userLevels = await invoke("get_user_levels", { lang });

        currentLevel = userLevels.findIndex(
            (level) => level.completed === false
        );
    });
</script>

{#if userLevels}
    <div class="my-container mt-16" in:fade={{ delay: 300, duration: 300 }}>
        <!-- TODO : fix css when shrink, cards should not shrink with the screen -->
        <div id="levels" class="w-full grid grid-cols-6 gap-10 gap-y-16">
            {#each userLevels as userLevel, index}
                <LevelCard
                    {userLevel}
                    currentLevel={index === currentLevel}
                    {lang}
                />
            {/each}
        </div>
    </div>
{/if}

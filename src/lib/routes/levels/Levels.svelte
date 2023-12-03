<script lang="ts">
    import { fade } from "svelte/transition";
    import type { Lang } from "../../stores/global";
    import type { UserLevelCard } from "./types";
    import LevelCard from "./components/LevelCard.svelte";

    // export let data: PageServerData;
    let userLevels: UserLevelCard[] = [];
    let indeces = [1, 2, 3, 4, 5];

    for (let index of indeces) {
        const userLevel: UserLevelCard = {
            accuracy: 0.0,
            time: 0.0,
            wpm: 0.0,
            completed: false,
            level: {
                id: index,
                lang: "en",
                name: "test",
                order: index,
                type: "learn",
            },
        };
        userLevels.push(userLevel);
    }
    let lang: Lang = "en";
    let currentLevel = userLevels.findIndex(
        (level) => level.completed === false
    );
</script>

<div class="my-container mt-16" in:fade={{ delay: 300, duration: 300 }}>
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

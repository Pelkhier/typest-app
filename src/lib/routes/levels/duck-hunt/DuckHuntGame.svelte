<script lang="ts">
    import { onMount } from "svelte";
    import Game from "./components/Game.svelte";
    import type { GameData, GameType } from "../types";
    import { invoke } from "@tauri-apps/api/tauri";
    import { langStore } from "../../../stores/global";

    export let params: any;

    let data: GameData;
    let nextGameType: GameType | null;
    let reload = false;

    onMount(async () => {
        data = await invoke("get_level_info", {
            lang: $langStore,
            orderPosition: Number(params.id),
        });
        nextGameType = await invoke("get_next_game_type", {
            lang: $langStore,
            orderPosition: data.level.order + 1,
        });
    });

    function toggleReload() {
        reload = !reload;
    }
</script>

{#if data}
    {#key reload}
        <Game {data} {nextGameType} {toggleReload} />
    {/key}
{/if}

<script lang="ts">
    import { onMount } from "svelte";
    import Game from "./components/Game.svelte";
    import type { GameData, GameType } from "./types";
    import { invoke } from "@tauri-apps/api/tauri";
    import { langStore, settingsStore } from "../../../stores/global";
    import { location, params as paramsStore } from "svelte-spa-router";
    import Spinner from "../../../components/Spinner.svelte";

    export let params: any;

    let data: GameData;
    let gameType: GameType;
    let nextGameType: GameType | null;

    $: params = $paramsStore ? $paramsStore : params;

    async function rerenderComponent(_: any) {
        data = await invoke("get_level_info", {
            lang: $langStore,
            orderPosition: Number(params.id),
        });
        gameType = data.level.type as GameType;
        nextGameType = await invoke("get_next_game_type", {
            lang: $langStore,
            orderPosition: data.level.order + 1,
        });
    }
</script>

{#key params || $settingsStore}
    {#await rerenderComponent($location)}
        <Spinner
            wrapperClass="bg-gostwhite dark:bg-darkblue opacity-80 fixed z-[999] top-0 right-0 left-0 bottom-0"
            loaderClass="text-tomato w-[1.5em] h-[1.5em] text-lg"
        />
    {:then _}
        <Game {data} {gameType} {nextGameType} settings={$settingsStore} />
    {/await}
{/key}

<script lang="ts">
    import Separator from "../../../../components/Separator.svelte";
    import type { Lang, TextSize } from "./../types";
    import {
        langStore,
        settingsLoader,
        settingsStore,
    } from "../../../../stores/global";
    import Spinner from "../../../../components/Spinner.svelte";
    import Icon from "@iconify/svelte";
    import { invoke } from "@tauri-apps/api/tauri";

    export let startAgain: () => void;

    let lang: Lang = $langStore;
    let textSize: TextSize = $settingsStore.textSize;
    let keyboardSound = $settingsStore.keyboardSound;
    let keyboardShow = $settingsStore.keyboardShow;

    // TODO: consider using localStorage to store settings instead of the database to increase speed
    async function setSettings(settings: any) {
        $settingsLoader = true;
        // const body = JSON.stringify({
        //     userId: $page.data.user.id,
        //     settings,
        // });
        // await fetch("/api/game/settings", {
        //     method: "POST",
        //     body,
        // });
        // // TODO : consider using invalidate(url)
        // await invalidateAll();
        await invoke("update_user_settings", {
            ...settings,
        });
        $settingsStore = {
            ...$settingsStore,
            ...settings,
        };
        startAgain();
    }

    async function setTextSize(size: TextSize) {
        textSize = size;
        await setSettings({ textSize });
    }
    async function toggleSound() {
        keyboardSound = !keyboardSound;
        await setSettings({ keyboardSound });
    }
    async function toggleKeyboard() {
        keyboardShow = !keyboardShow;
        await setSettings({ keyboardShow });
    }
    $: $settingsStore, ($settingsLoader = false);
</script>

<div
    class="settings relative bg-darkblue dark:bg-gostwhite text-gostwhite dark:text-darkblue w-96 h-96 rounded-lg shadow-lg"
>
    {#if $settingsLoader}
        <Spinner
            wrapperClass="bg-gostwhite dark:bg-darkblue opacity-80 absolute z-[999] top-0 right-0 left-0 bottom-0"
            loaderClass="text-tomato w-[1.5em] h-[1.5em] text-lg"
        />
    {/if}
    <div
        class="text-size-settings text-size w-full h-1/2 px-2 flex gap-4 items-center justify-around"
    >
        <div class="w-full flex justify-center">
            <button
                on:click={() => setTextSize("small")}
                class:size-selected={textSize === "small"}
                class="flex flex-col justify-center items-center px-2 rounded-lg"
            >
                <Icon class="text-3xl" icon="fluent:text-12-filled" />
                <small>small</small>
            </button>
        </div>
        <div class=" w-full flex justify-center">
            <button
                on:click={() => setTextSize("medium")}
                class:size-selected={textSize === "medium"}
                class="flex flex-col justify-center items-center px-2 rounded-lg"
            >
                <Icon class="text-6xl" icon="fluent:text-12-filled" />
                <small>medium</small>
            </button>
        </div>
        <div class="w-full flex justify-center">
            <button
                on:click={() => setTextSize("large")}
                class:size-selected={textSize === "large"}
                class="flex flex-col justify-center items-center px-2 rounded-lg"
            >
                <Icon class="text-9xl" icon="fluent:text-12-filled" />
                <small>large</small>
            </button>
        </div>
    </div>
    <Separator bgColor="bg-gostwhite dark:bg-darkblue" />
    <div class="flex justify-center w-full h-2/5 mt-4 gap-16">
        <div class="keyboard-settings">
            <button
                on:click={toggleSound}
                class:play={keyboardSound}
                class="flex justify-center p-2 rounded-md"
            >
                {#if keyboardSound}
                    <Icon class="text-4xl" icon="entypo:sound" />
                {:else}
                    <Icon class="text-4xl" icon="entypo:sound-mute" />
                {/if}
            </button>
            <small>keyboard sound</small>
        </div>
        <div
            class="keyboard-settings flex flex-col items-center justify-center gap-2"
        >
            <button
                on:click={toggleKeyboard}
                class:play={keyboardShow}
                class="flex justify-center p-2 rounded-md"
            >
                {#if keyboardShow}
                    <Icon class="text-4xl" icon="material-symbols:keyboard" />
                {:else}
                    <Icon
                        class="text-4xl"
                        icon="material-symbols:keyboard-off"
                    />
                {/if}
            </button>
            <small>keyboard</small>
        </div>
    </div>
</div>

<style lang="postcss">
    .text-size-settings button {
        @apply text-gostwhite dark:text-darkblue;
    }

    .keyboard-settings {
        @apply flex flex-col items-center justify-center gap-2;
    }

    .text-size-settings button.size-selected,
    .keyboard-settings button.play {
        @apply bg-gostwhite text-darkblue dark:bg-darkblue dark:text-gostwhite;
    }

    .keyboard-settings button {
        border: 1px solid;
        @apply border-gostwhite dark:border-darkblue;
    }
</style>

<script lang="ts">
    import LogoSecondary from "./navbar/LogoSecondary.svelte";
    import { langStore, type Lang, settingsStore } from "../stores/global";
    import ToggleDarkMode from "./navbar/ToggleDarkMode.svelte";
    import LogoPrimary from "./navbar/LogoPrimary.svelte";
    import active from "svelte-spa-router/active";
    import { location } from "svelte-spa-router";
    import { onMount } from "svelte";
    import { invoke } from "@tauri-apps/api/tauri";
    import language from "../language";
    import { fade } from "svelte/transition";

    let lang: Lang = $langStore;
    let loading = true;

    document.body.dataset.lang = lang;
    if (lang === "ar") {
        document.body.dir = "rtl";
    } else {
        document.body.dir = "ltr";
    }

    onMount(async () => {
        $settingsStore = await invoke("get_user_settings");

        const langStorage = localStorage.getItem("lang");
        if (langStorage) {
            $langStore = langStorage as Lang;
            lang = langStorage as Lang;
        }
        loading = false;
    });

    async function changeLang() {
        $langStore = lang;
        localStorage.setItem("lang", lang);
        loading = true;
    }
</script>

{#if !loading}
    <div id="main-layout" class="my-container layout select-none">
        <nav class="flex justify-between">
            <div class="w-full" class:left-bar={$location === "/"}>
                <div
                    class="left-bar-inner flex justify-between h-full items-center p-2 relative"
                >
                    <div class="flex gap-9">
                        <h1>
                            <a href="#/" class="flex items-center gap-2">
                                <LogoPrimary className="w-14 h-14" />
                                <LogoSecondary
                                    className="h-8 w-48 fill-darkblue dark:fill-gostwhite"
                                />
                            </a>
                        </h1>
                        <ul>
                            <li>
                                <a
                                    href="#/"
                                    use:active={{
                                        path: "/",
                                        className: "text-tomato",
                                    }}
                                >
                                    {language[lang].nav.home}
                                </a>
                            </li>

                            <li>
                                <!-- data-active={$page.url.pathname.endsWith(
                                        "levels"
                                    )} -->
                                <a
                                    href="#/levels"
                                    use:active={{
                                        path: "/levels",
                                        className: "text-tomato",
                                    }}
                                >
                                    {language[lang].nav.levels}
                                </a>
                            </li>
                            <!-- <li> -->
                            <!-- data-active={$page.url.pathname.endsWith(
                                            "add-level"
                                        )} -->
                            <!-- <a href={`/${lang}/add-level`}>
                                        Add-level
                                    </a> -->
                            <!-- </li> -->
                        </ul>
                    </div>
                    <div>
                        <ToggleDarkMode />
                    </div>
                </div>
            </div>
            <div
                class="flex justify-center items-center transition-all duration-300"
                class:right-bar={$location === "/"}
                class:w-1={$location !== "/"}
            >
                <div class="bg-tomato rounded-md py-2 text-gostwhite">
                    {#if $location === "/"}
                        <select
                            class="bg-tomato m-0 rounded-md"
                            bind:value={lang}
                            on:change={changeLang}
                            name="lang"
                            id="lang"
                        >
                            <option selected={lang === "en"} value="en">
                                {language[lang].nav.langs.en}
                            </option>
                            <option selected={lang === "ar"} value="ar">
                                {language[lang].nav.langs.ar}
                            </option>
                        </select>
                    {/if}
                </div>
            </div>
        </nav>
    </div>
{/if}

<style lang="postcss">
    :global(.layout) {
        /* height: 88px; */
        min-width: 1024px;
        display: grid;
        grid-template-rows: auto 1fr;
        /* padding: 1rem 2rem; */
        @apply pt-3;
    }

    :global(body[data-lang="ar"]) {
        direction: rtl;
        font-family: "Noto Kufi Arabic", sans-serif;
    }
    :global(body[data-lang="en"]) {
        direction: ltr;
    }

    nav ul {
        display: flex;
        gap: 2rem;
        align-items: center;
    }

    nav ul li a:hover {
        color: tomato;
    }
    :global(li a[data-active="true"]) {
        color: tomato;
    }

    nav h1 {
        font-family: "Lexend Deca", sans-serif;
        font-size: 1.8rem;
        letter-spacing: 2px;
        color: var(--fg-200);
    }

    .layout nav .right-bar {
        width: 20%;
        border-radius: 1.5rem 1.5rem 0 0;
        @apply bg-darkblue dark:bg-gostwhite w-1/5;
    }

    .left-bar {
        @apply bg-darkblue dark:bg-gostwhite;
    }

    .left-bar-inner {
        @apply bg-gostwhite text-darkblue dark:bg-darkblue dark:text-gostwhite;
    }
    :global(body[data-lang="en"]) nav .left-bar-inner {
        border-radius: 0 0 1.5rem 0;
        padding-left: 1rem;
    }
    :global(body[data-lang="ar"]) nav .left-bar-inner {
        border-radius: 0 0 0 1.5rem;
        padding-right: 1rem;
    }
</style>

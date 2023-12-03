<script lang="ts">
    // import { Link } from "svelte-routing";
    import LogoSecondary from "./navbar/LogoSecondary.svelte";
    import { langStore, type Lang } from "../stores/global";
    // import Icon from "@iconify/svelte";
    // import { fade } from "svelte/transition";
    import ToggleDarkMode from "./navbar/ToggleDarkMode.svelte";
    import LogoPrimary from "./navbar/LogoPrimary.svelte";
    import active from "svelte-spa-router/active";
    import { location } from "svelte-spa-router";

    // TODO : download fonts locally
    // export let data: LayoutData;

    let data = {
        user: {
            id: 1,
            email: "test@test.com",
        },
    };

    let lang: Lang = "en";
    let langButton: HTMLButtonElement;
    let loading = false;

    async function changeLang() {
        langButton.click();

        $langStore = lang;
        localStorage.setItem("lang", lang);
        loading = true;
        if (lang === "ar") {
            document.body.dir = "rtl";
        } else {
            document.body.dir = "ltr";
        }
    }

    // $: data, (loading = false);
</script>

<div id="main-layout" class="layout select-none" data-dir={lang}>
    <nav class="flex justify-between">
        <!-- class:left-bar={$page.url.pathname === "/en" ||
                $page.url.pathname === "/ar"} -->
        <div
            class="w-full transition-all duration-300 delay-300 left-bar"
            class:left-bar={$location === "/"}
        >
            <div
                class="left-bar-inner flex justify-between h-full items-center p-2 relative"
            >
                <div class="flex gap-9">
                    <h1>
                        <a href="/" class="flex items-center gap-2">
                            <LogoPrimary className="w-14 h-14" />
                            <LogoSecondary
                                className="h-8 w-48 fill-darkblue dark:fill-gostwhite"
                            />
                        </a>
                    </h1>
                    {#if data.user}
                        <ul>
                            <li>
                                <!-- data-active={$page.url.pathname.endsWith(
                                        lang
                                    )} -->
                                <a
                                    href="/"
                                    use:active={{
                                        path: "/",
                                        className: "text-tomato",
                                    }}
                                >
                                    Home
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
                                    Levels
                                </a>
                            </li>
                            <li>
                                <!-- data-active={$page.url.pathname.endsWith(
                                            "add-level"
                                        )} -->
                                <a href={`/${lang}/add-level`}> Add-level </a>
                            </li>
                        </ul>
                    {/if}
                </div>
                <div>
                    <ToggleDarkMode />
                </div>
            </div>
        </div>
        <!-- class:right-bar={$page.url.pathname === "/en" ||
                $page.url.pathname === "/ar"} -->
        <div
            class="flex justify-center items-center w-1/5 transition-all duration-300 delay-300 right-bar"
            class:right-bar={$location === "/"}
        >
            <div class="bg-tomato rounded-md py-2 text-gostwhite">
                {#if data.user?.id}
                    <a
                        href="/{lang}/logout"
                        data-sveltekit-preload-data="off"
                        class="signin px-4 py-1"
                        on:click={() => (loading = true)}
                    >
                        Logout
                    </a>
                {:else}
                    <a href={`/${lang}/signin`} class="signin px-4 py-1">
                        Signin
                    </a>
                {/if}
                {#if $location === "/"}
                    <form
                        action="?/changeLang"
                        method="post"
                        class="inline"
                        id="lang"
                    >
                        <select
                            class="bg-tomato m-0 rounded-md"
                            bind:value={lang}
                            on:change={changeLang}
                            name="lang"
                            id="lang"
                        >
                            <option selected={lang === "en"} value="en"
                                >en</option
                            >
                            <option selected={lang === "ar"} value="ar"
                                >ar</option
                            >
                        </select>
                        <button
                            type="submit"
                            class="opacity-0 w-0 h-0"
                            bind:this={langButton}
                        />
                    </form>
                {/if}
            </div>
        </div>
    </nav>
</div>

<style lang="postcss">
    :global(.layout) {
        height: 88px;
        min-width: 1024px;
        display: grid;
        grid-template-rows: auto 1fr;
        padding: 1rem 2rem;
    }

    :global(.layout[data-dir="ar"]) {
        direction: rtl;
        font-family: "Noto Kufi Arabic", sans-serif;
    }
    :global(.layout[data-dir="en"]) {
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
        @apply bg-darkblue dark:bg-gostwhite;
    }
    .layout[data-dir="en"] nav .right-bar div .signin {
        @apply border-r-4 border-r-darkblue dark:border-r-gostwhite;
    }
    .layout[data-dir="ar"] nav .right-bar div .signin {
        @apply border-l-4 border-l-darkblue dark:border-l-gostwhite;
    }

    .left-bar {
        @apply bg-darkblue dark:bg-gostwhite;
    }

    .left-bar-inner {
        @apply bg-gostwhite text-darkblue dark:bg-darkblue dark:text-gostwhite;
    }
    .layout[data-dir="en"] nav .left-bar-inner {
        border-radius: 0 0 1.5rem 0;
        padding-left: 1rem;
    }
    .layout[data-dir="ar"] nav .left-bar-inner {
        border-radius: 0 0 0 1.5rem;
        padding-right: 1rem;
    }
</style>

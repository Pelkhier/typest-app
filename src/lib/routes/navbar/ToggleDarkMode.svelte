<script lang="ts">
    let darkMode = true;

    function handleSwitchDarkMode() {
        darkMode = !darkMode;

        localStorage.setItem("theme", darkMode ? "dark" : "light");

        darkMode
            ? document.documentElement.classList.add("dark")
            : document.documentElement.classList.remove("dark");
    }

    if (
        localStorage.theme === "dark" ||
        (!("theme" in localStorage) &&
            window.matchMedia("(prefers-color-scheme: dark)").matches)
    ) {
        document.documentElement.classList.add("dark");
        darkMode = true;
    } else {
        document.documentElement.classList.remove("dark");
        darkMode = false;
    }
</script>

<div>
    <input
        checked={darkMode}
        on:click={handleSwitchDarkMode}
        type="checkbox"
        id="theme-toggle"
    />
    <label for="theme-toggle" />
</div>

<style lang="postcss">
    #theme-toggle {
        @apply invisible;
    }

    #theme-toggle + label {
        @apply inline-block cursor-pointer h-9 w-9 absolute top-4 rounded-full duration-300 content-[''];
    }
    :global(body[data-lang="en"] #theme-toggle + label) {
        @apply right-6;
    }
    :global(body[data-lang="ar"] #theme-toggle + label) {
        @apply left-6;
    }

    #theme-toggle:not(:checked) + label {
        @apply bg-amber-400;
    }

    #theme-toggle:checked + label {
        @apply bg-transparent;
        box-shadow: inset -18px -16px 1px 1px #ddd;
    }
</style>

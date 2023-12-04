<script lang="ts">
    export let word: string;
    export let nextWord: () => void;
    export let playerAttack: () => void;
    export let enemyAttack: () => void;
    export let addWordTime: (time: number, wrong: number) => void;

    let typedLetter = "";
    let letterIndex = 0;
    let wordStarttime = 0;
    let wordEndtime = 0;
    let wrongLetters = 0;

    let inputEl: HTMLInputElement;

    function handleKeydown(event: KeyboardEvent) {
        event.preventDefault();
        if (
            event.key === "Control" ||
            event.key === "Shift" ||
            event.key === "Alt"
        ) {
            return;
        }
        if (letterIndex === 0) {
            wordStarttime = new Date().getTime();
        }

        typedLetter = event.key;
        if (typedLetter === word[letterIndex]) {
            let wordEl = document.getElementById("word");

            let currentLetter = wordEl?.children[letterIndex];

            currentLetter?.classList.add("correct");
            playerAttack();
        } else {
            let wordEl = document.getElementById("word");
            let currentLetter = wordEl?.children[letterIndex];
            currentLetter?.classList.add("wrong");
            wrongLetters += 1;
            enemyAttack();
        }
        typedLetter = "";
        letterIndex += 1;
        if (letterIndex > word.length - 1) {
            wordEndtime = new Date().getTime();
            addWordTime((wordEndtime - wordStarttime) / 1000, wrongLetters);
            letterIndex = 0;
            wrongLetters = 0;
            nextWord();
        }
    }
</script>

<!-- TODO : get rid of "A11y: Avoid using autofocus" warning  -->
<input
    class="w-0 h-0 p-0 m-0 opacity-0"
    on:keydown={handleKeydown}
    bind:this={inputEl}
    autofocus
    on:blur={() => inputEl.focus()}
/>

{#key word}
    <div
        id="word"
        class="bg-transparent border-2 bg-gostwhite text-gostwhite mb-56 text-9xl px-4 py-4 rounded-xl"
    >
        {#each word as letter, index}
            <span class:selected={letterIndex === index}>{letter}</span>
        {/each}
    </div>
{/key}

<style lang="postcss">
    .selected {
        @apply border-2 border-gostwhite bg-gostwhite bg-opacity-40 text-darkblue;
    }
    :global(#word .correct) {
        @apply bg-green-400 border-white border-2 bg-opacity-80;
    }
    :global(#word .wrong) {
        @apply bg-tomato border-white border-2 bg-opacity-80;
    }
</style>

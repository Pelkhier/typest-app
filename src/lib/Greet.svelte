<script lang="ts">
    import { invoke } from "@tauri-apps/api/tauri";

    let result: unknown;

    async function handleOk() {
        result = await invoke("get_result");
    }
</script>

<div>
    <button on:click={handleOk}>Ok</button>
    <h2>User created</h2>
    {#if result}
        <pre>{JSON.stringify(result, null, 2)}</pre>
    {/if}
</div>

<style>
    pre {
        text-align: left;
    }
</style>

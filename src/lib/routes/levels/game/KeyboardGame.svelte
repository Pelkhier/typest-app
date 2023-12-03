<script lang="ts">
    import { location } from "svelte-spa-router";

    export let params: any;
</script>

<h2 class="text-2xl">Location</h2>
<p>{$location}</p>
<h2 class="text-2xl">Params</h2>
<p>{params?.id}</p>

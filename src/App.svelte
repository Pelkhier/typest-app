<script lang="ts">
    import Navbar from "./lib/routes/Navbar.svelte";
    import Router from "svelte-spa-router";
    import routes from "./routes";
    import { langStore } from "./lib/stores/global";
</script>

{#key $langStore}
    <Navbar />
    <Router {routes} />
{/key}

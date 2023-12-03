<script lang="ts">
    import { invoke } from "@tauri-apps/api/tauri";
    import Navbar from "./lib/routes/Navbar.svelte";
    import Router from "svelte-spa-router";
    import routes from "./routes";
    let data: any;

    // async function handlFetch() {
    //     data = await invoke("get_all_levels");
    // }
</script>

<Navbar />

<!-- <Home /> -->
<Router {routes} />

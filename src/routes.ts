import Home from "./lib/routes/home/Home.svelte";
import Levels from "./lib/routes/levels/Levels.svelte";
import KeyboardGame from "./lib/routes/levels/game/KeyboardGame.svelte";

export default {
    "/": Home,
    "/levels": Levels,
    "/levels/game/:id": KeyboardGame,
};

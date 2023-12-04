import Home from "./lib/routes/home/Home.svelte";
import Levels from "./lib/routes/levels/Levels.svelte";
import DuckHuntGame from "./lib/routes/levels/duck-hunt/DuckHuntGame.svelte";
import KeyboardGame from "./lib/routes/levels/game/KeyboardGame.svelte";
import SamuraiGame from "./lib/routes/levels/samurai-game/SamuraiGame.svelte";

export default {
    "/": Home,
    "/levels": Levels,
    "/levels/game/:id": KeyboardGame,
    "/levels/samurai-game/:id": SamuraiGame,
    "/levels/duck-hunt/:id": DuckHuntGame,
};

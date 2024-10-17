import { createBrowserRouter } from "react-router-dom";
import PokemonDetail from "./components/Pokemos/PokemonDetail.tsx";
import PokemonList from "./components/Pokemos/PokemonList.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <PokemonList />,
  },
  {
    path: "/pokemons/:id",
    element: <PokemonDetail />,
  },
]);

export default router;

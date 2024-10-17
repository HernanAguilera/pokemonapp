import { Outlet } from "react-router-dom";

function Layout() {
  return (
    <div className="layout">
      <header className="header">
        <h1>Pokedex</h1>
      </header>
      <main className="main">
        <div className="main-content">
          <div className="search-bar">
            <input type="text" placeholder="Busca un pokemon..." />
          </div>
          <div className="pokemon-list">
            <div className="pokemon-item">
              <div className="pokemon-image">
                <img
                  src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png"
                  alt="pokemon"
                />
              </div>
              <p className="pokemon-name">Bulbasaur</p>
            </div>
            <div className="pokemon-item">
              <div className="pokemon-image">
                <img
                  src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/2.png"
                  alt="pokemon"
                />
              </div>
              <p className="pokemon-name">Ivysaur</p>
            </div>
            <div className="pokemon-item">
              <div className="pokemon-image">
                <img
                  src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/3.png"
                  alt="pokemon"
                />
              </div>
              <p className="pokemon-name">Venusaur</p>
            </div>
          </div>
        </div>

        {/* Sección de lista de combate */}
        <section className="combat-list">
          <h2>Listos para el combate</h2>
          <div className="combat-ready">
            <div className="pokemon-item">
              <div className="combat-image">
                <img
                  src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png"
                  alt="pokemon"
                />
              </div>
              <p className="combat-name">Bulbasaur</p>
              <button className="remove-button">🗑</button>
            </div>
            <div className="pokemon-item">
              <div className="combat-image">
                <img
                  src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/2.png"
                  alt="pokemon"
                />
              </div>
              <p className="combat-name">Ivysaur</p>
              <button className="remove-button">🗑</button>
            </div>
            <div className="pokemon-item">
              <div className="combat-image">
                <img
                  src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/3.png"
                  alt="pokemon"
                />
              </div>
              <p className="combat-name">Venusaur</p>
              <button className="remove-button">🗑</button>
            </div>
          </div>
        </section>
        <Outlet />
      </main>
    </div>
  );
}

export default Layout;

import { Link, Outlet } from 'react-router-dom';

export function Layout() {
  return (
    <div>
      <header className="navbar">
        <h2>🏛️ Cartório Digital</h2>
        <nav className="nav-links">
          <Link to="/usuarios" className="nav-item">Usuários</Link>
          <Link to="/servicos" className="nav-item">Serviços</Link>
          <Link to="/" className="nav-item nav-item-danger">Sair</Link>
        </nav>
      </header>
      <main className="container">
        <Outlet /> 
      </main>
    </div>
  );
}
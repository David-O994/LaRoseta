import { Link, NavLink } from 'react-router-dom';

const navigation = [
  { to: '/', label: 'Inicio' },
  { to: '/catalogo', label: 'Catálogo' },
  { to: '/pedidos', label: 'Pedidos' },
  { to: '/contacto', label: 'Contacto' },
];

function Navbar() {
  return (
    <header className="site-header">
      <div className="header-inner">
        <Link className="navbar-brand" to="/" aria-label="La Roseta, inicio">
          <span className="brand-mark" aria-hidden="true">✿</span>
          <span>La Roseta</span>
        </Link>
        <nav className="main-navigation" aria-label="Navegación principal">
          {navigation.map(({ to, label }) => (
            <NavLink
              key={to}
              to={to}
              end={to === '/'}
              className={({ isActive }) => `nav-link${isActive ? ' active' : ''}`}
            >
              {label}
            </NavLink>
          ))}
        </nav>
      </div>
    </header>
  );
}

export default Navbar;

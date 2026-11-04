import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar.jsx';
import Catalogo from './pages/Catalogo.jsx';
import Contacto from './pages/Contacto.jsx';
import Home from './pages/Home.jsx';
import Pedidos from './pages/Pedidos.jsx';

function App() {
  return (
    <BrowserRouter>
      <div className="site-shell">
        <Navbar />
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/catalogo" element={<Catalogo />} />
            <Route path="/pedidos" element={<Pedidos />} />
            <Route path="/contacto" element={<Contacto />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>
        <footer className="site-footer">
          <p>La Roseta · Dulzura que llega directo a tu hogar</p>
        </footer>
      </div>
    </BrowserRouter>
  );
}

export default App;

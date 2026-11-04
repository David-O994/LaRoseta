import { Link } from 'react-router-dom';

function Contacto() {
  return (
    <section className="content-page simple-page">
      <span className="eyebrow">Estamos para ayudarte</span>
      <h1>Contacto</h1>
      <p>¿Tienes una pregunta o una idea dulce para celebrar? Queremos saber de ti.</p>
      <div className="page-actions">
        <Link className="button button-primary" to="/pedidos">Coordinar un pedido</Link>
        <Link className="button button-secondary" to="/catalogo">Ver catálogo</Link>
      </div>
    </section>
  );
}

export default Contacto;
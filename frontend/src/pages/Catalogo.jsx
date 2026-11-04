import { Link } from 'react-router-dom';
import products from '../data/products.js';

const priceFormatter = new Intl.NumberFormat('es-CL', {
  style: 'currency',
  currency: 'CLP',
  maximumFractionDigits: 0,
});

function Catalogo() {
  return (
    <section className="content-page catalog-page">
      <div className="section-heading">
        <span className="eyebrow">Preparado con cariño</span>
        <h1>Nuestro catálogo</h1>
        <p>Encuentra tu próximo sabor favorito.</p>
      </div>
      <div className="product-grid">
        {products.map((product) => (
          <article className="product-card" key={product.idProducto}>
            <img src={product.imagen} alt={product.nombre} />
            <div className="product-card-content">
              <h2>{product.nombre}</h2>
              <p>{product.descripcion}</p>
              <div className="product-card-footer">
                <strong>{priceFormatter.format(product.precio)}</strong>
                <Link className="text-link" to="/pedidos">Pedir <span aria-hidden="true">→</span></Link>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

export default Catalogo;

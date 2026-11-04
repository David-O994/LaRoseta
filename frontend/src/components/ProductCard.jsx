const priceFormatter = new Intl.NumberFormat('es-CL', {
  style: 'currency',
  currency: 'CLP',
  maximumFractionDigits: 0,
});

function ProductCard({ product, quantity, onQuantityChange }) {
  return (
    <article className="product-card order-product-card">
      <img src={product.imagen} alt={product.nombre} />
      <div className="product-card-content">
        <h2>{product.nombre}</h2>
        <p>{product.descripcion}</p>
        <ul className="product-details">
          <li>Entrega: {product.tipoEntrega}</li>
          <li>Preparación: {product.tiempoPreparacion}</li>
        </ul>
        <div className="order-product-footer">
          <strong>{priceFormatter.format(product.precio)}</strong>
          {quantity === 0 ? (
            <button
              className="button button-secondary product-add-button"
              onClick={() => onQuantityChange(1)}
              type="button"
            >
              Agregar
            </button>
          ) : (
            <div className="quantity-control" aria-label={`Cantidad de ${product.nombre}`}>
              <button
                aria-label={`Quitar una unidad de ${product.nombre}`}
                onClick={() => onQuantityChange(quantity - 1)}
                type="button"
              >
                −
              </button>
              <span aria-live="polite">{quantity}</span>
              <button
                aria-label={`Agregar una unidad de ${product.nombre}`}
                onClick={() => onQuantityChange(quantity + 1)}
                type="button"
              >
                +
              </button>
            </div>
          )}
        </div>
      </div>
    </article>
  );
}

export default ProductCard;

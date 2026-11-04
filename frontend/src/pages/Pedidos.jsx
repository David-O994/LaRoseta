import { useState } from 'react';
import ProductCard from '../components/ProductCard.jsx';
import products from '../data/products.js';

const priceFormatter = new Intl.NumberFormat('es-CL', {
  style: 'currency',
  currency: 'CLP',
  maximumFractionDigits: 0,
});

function getTodayDate() {
  const today = new Date();
  const localToday = new Date(today.getTime() - today.getTimezoneOffset() * 60000);
  return localToday.toISOString().slice(0, 10);
}

function Pedidos() {
  const [quantities, setQuantities] = useState({});
  const [confirmation, setConfirmation] = useState(null);
  const [formError, setFormError] = useState('');
  const selectedProducts = products
    .filter((product) => (quantities[product.idProducto] ?? 0) > 0)
    .map((product) => ({
      ...product,
      cantidad: quantities[product.idProducto],
      subtotal: product.precio * quantities[product.idProducto],
    }));
  const total = selectedProducts.reduce((sum, product) => sum + product.subtotal, 0);

  function updateQuantity(productId, quantity) {
    setQuantities((current) => ({ ...current, [productId]: quantity }));
    setConfirmation(null);
    setFormError('');
  }

  function handleSubmit(event) {
    event.preventDefault();
    if (selectedProducts.length === 0) {
      setFormError('Agrega al menos un producto para continuar.');
      return;
    }

    const formData = new FormData(event.currentTarget);
    const order = {
      fechaPedido: formData.get('fechaPedido'),
      estado: 'Pendiente',
      total,
      productos: selectedProducts.map(({ idProducto, nombre, cantidad, precio, subtotal }) => ({
        idProducto,
        nombre,
        cantidad,
        precio,
        subtotal,
      })),
      cliente: {
        nombre: formData.get('nombre'),
        email: formData.get('email'),
        telefono: formData.get('telefono'),
        direccionDespacho: formData.get('direccionDespacho'),
      },
      observaciones: formData.get('observaciones'),
    };

    // En la versión SQL, enviar este pedido a la API para crear el registro de Pedido
    // y asociar sus productos mediante la tabla de detalle correspondiente.
    setConfirmation(order);
    setFormError('');
  }

  return (
    <section className="content-page order-page">
      <div className="section-heading">
        <span className="eyebrow">Un momento especial merece algo rico</span>
        <h1>Arma tu pedido</h1>
        <p>Elige tus productos y déjanos los datos para coordinar la entrega.</p>
      </div>

      <form className="order-form" onSubmit={handleSubmit}>
        <fieldset className="order-section">
          <legend><span>01</span> Elige tus productos</legend>
          <div className="product-grid order-product-grid">
            {products.map((product) => (
              <ProductCard
                key={product.idProducto}
                product={product}
                quantity={quantities[product.idProducto] ?? 0}
                onQuantityChange={(quantity) => updateQuantity(product.idProducto, quantity)}
              />
            ))}
          </div>
        </fieldset>

        <div className="order-details-layout">
          <fieldset className="order-section customer-section">
            <legend><span>02</span> Datos de contacto y entrega</legend>
            <div className="form-fields">
              <label>
                Nombre completo
                <input autoComplete="name" name="nombre" required />
              </label>
              <label>
                Correo electrónico
                <input autoComplete="email" name="email" required type="email" />
              </label>
              <label>
                Teléfono
                <input autoComplete="tel" name="telefono" required type="tel" />
              </label>
              <label>
                Dirección de despacho
                <input autoComplete="street-address" name="direccionDespacho" required />
              </label>
              <label>
                Fecha deseada
                <input min={getTodayDate()} name="fechaPedido" required type="date" />
              </label>
              <label className="full-width-field">
                Observaciones <span>(opcional)</span>
                <textarea
                  name="observaciones"
                  placeholder="Cuéntanos si tienes alguna indicación especial."
                  rows="3"
                />
              </label>
            </div>
          </fieldset>

          <aside className="order-summary" aria-label="Resumen del pedido">
            <h2>Resumen</h2>
            {selectedProducts.length === 0 ? (
              <p className="empty-order">Agrega productos para ver el detalle.</p>
            ) : (
              <ul className="summary-products">
                {selectedProducts.map((product) => (
                  <li key={product.idProducto}>
                    <span>{product.nombre} × {product.cantidad}</span>
                    <strong>{priceFormatter.format(product.subtotal)}</strong>
                  </li>
                ))}
              </ul>
            )}
            <div className="summary-total">
              <span>Total</span>
              <strong>{priceFormatter.format(total)}</strong>
            </div>
            <p className="order-disclaimer">
              El envío y la disponibilidad se confirman al coordinar el pedido.
            </p>
            {formError && <p className="form-message form-error" role="alert">{formError}</p>}
            <button className="button button-primary submit-order-button" type="submit">
              Revisar pedido
            </button>
            <p className="frontend-note">Formulario de demostración: no se enviará ni guardará el pedido.</p>
          </aside>
        </div>
      </form>

      {confirmation && (
        <section className="order-confirmation" aria-live="polite">
          <h2>¡Tu pedido está listo para revisar!</h2>
          <p>
            Total: <strong>{priceFormatter.format(confirmation.total)}</strong>.
            Este resumen solo está en esta vista; todavía no se ha enviado.
          </p>
        </section>
      )}
    </section>
  );
}

export default Pedidos;

import { Link } from 'react-router-dom';
import cheesecakeImage from '../assets/Chessecake.png';
import strawberryCakeImage from '../assets/Torta_Frutilla.png';

function Home() {
  return (
    <div className="home-page">
      <section className="home-hero">
        <div className="hero-copy">
          <span className="eyebrow">Pastelería artesanal</span>
          <h1>Un pedacito de dulzura <span>hecho para ti</span></h1>
          <p>
            Tortas y cheesecakes preparados con cariño para compartir los
            momentos que más importan.
          </p>
          <div className="hero-actions">
            <Link className="button button-primary" to="/catalogo">Ver catálogo</Link>
            <Link className="button button-secondary" to="/pedidos">Hacer un pedido</Link>
          </div>
          <p className="hero-note">Sin conservantes ni colorantes · Más saludables, mejores sabores</p>
        </div>

        <div className="hero-gallery" aria-label="Tortas artesanales de La Roseta">
          <figure className="gallery-photo gallery-photo-main">
            <img src={strawberryCakeImage} alt="Porción de torta de frutilla con crema" />
          </figure>
          <figure className="gallery-photo gallery-photo-small">
            <img src={cheesecakeImage} alt="Cheesecake artesanal con frutos rojos" />
          </figure>
          <span className="gallery-sticker">Hecho con<br />mucho amor</span>
        </div>
      </section>

      <section className="home-categories" aria-labelledby="categories-heading">
        <div className="section-heading">
          <span className="eyebrow">Algo rico para cada ocasión</span>
          <h2 id="categories-heading">Nuestras especialidades</h2>
        </div>
        <div className="category-grid">
          <article className="category-card">
            <span className="category-number">01</span>
            <h3>Tortas sanas</h3>
            <p>Recetas frescas, ingredientes ricos y ese toque casero que se nota.</p>
          </article>
          <article className="category-card category-card-pink">
            <span className="category-number">02</span>
            <h3>Tortas clásicas</h3>
            <p>Sabores favoritos para celebrar, compartir y darse un gusto.</p>
          </article>
          <article className="category-card category-card-blue">
            <span className="category-number">03</span>
            <h3>Cheesecakes</h3>
            <p>Cremosos, delicados y perfectos para cerrar cualquier momento.</p>
          </article>
        </div>
        <div className="section-action">
          <Link className="text-link" to="/catalogo">Descubre todos nuestros productos <span aria-hidden="true">→</span></Link>
        </div>
      </section>

      <section className="home-contact">
        <div>
          <span className="eyebrow">Tu próxima celebración empieza aquí</span>
          <h2>¿Se te antojó algo?</h2>
          <p>Revisa el catálogo, cuéntanos qué necesitas y coordinamos tu pedido.</p>
        </div>
        <div className="contact-actions">
          <Link className="button button-primary" to="/pedidos">Ir a pedidos</Link>
          <Link className="text-link" to="/contacto">Hablemos <span aria-hidden="true">→</span></Link>
        </div>
      </section>
    </div>
  );
}

export default Home;

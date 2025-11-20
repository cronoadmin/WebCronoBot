import { useLocation, useNavigate } from 'react-router-dom';
import "./Footer.css";
import logo from '../../imagenes/logoCrono.png';

const Footer = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const handleNavigation = (path) => {
    navigate(path);
    // Scroll al top cuando se navega desde el footer
    window.scrollTo(0, 0);
  };

  const handleHomeClick = () => {
    if (location.pathname === '/') {
      // Si ya está en home, hacer scroll al top
      window.scrollTo(0, 0);
    } else {
      // Si está en otra página, navegar al home
      navigate('/');
    }
  };

  const isActiveLink = (path) => location.pathname === path;

  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-logo">
          <img 
            src={logo} 
            alt="Crono Bot Logo" 
            className="logo-image" 
            onClick={handleHomeClick}
            style={{ cursor: 'pointer' }}
          />
        </div>
        <nav className="footer-links">
          <a 
            href="/"
            onClick={(e) => {
              e.preventDefault();
              handleHomeClick();
            }}
            className={isActiveLink('/') ? 'active' : ''}
          >
            Inicio
          </a>
          <a 
            href="/about"
            onClick={(e) => {
              e.preventDefault();
              handleNavigation('/about');
            }}
            className={isActiveLink('/about') ? 'active' : ''}
          >
            Sobre nosotros
          </a>
          <a 
            href="/services"
            onClick={(e) => {
              e.preventDefault();
              handleNavigation('/services');
            }}
            className={isActiveLink('/services') ? 'active' : ''}
          >
            Servicios
          </a>
          <a 
            href="/contact"
            onClick={(e) => {
              e.preventDefault();
              handleNavigation('/contact');
            }}
            className={isActiveLink('/contact') ? 'active' : ''}
          >
            Contacto
          </a>
        </nav>
        <div className="footer-social">
          <a href="https://www.facebook.com/profile.php?id=61583167447557" target="_blank" rel="noopener noreferrer">
            <i className="fab fa-facebook-f"></i>
          </a>
          <a href="https://www.linkedin.com/in/crono-bot-a16464395/" target="_blank" rel="noopener noreferrer">
            <i className="fab fa-linkedin-in"></i>
          </a>
          <a href="https://www.tiktok.com/@crono_bot" target="_blank" rel="noopener noreferrer">
            <i className="fab fa-tiktok"></i>
          </a>
        </div>
      </div>
      <p className="footer-copy">
        &copy; {new Date().getFullYear()} CRONO BOT. Todos los derechos reservados.
      </p>
    </footer>
  );
};

export default Footer;
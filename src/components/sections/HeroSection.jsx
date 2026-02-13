import Slider from 'react-slick';
import './HeroSection.css';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Header1 from '../../imagenes/header-1.jpg';
import Header2 from '../../imagenes/header-2.jpg';
import Header3 from '../../imagenes/header-3.jpeg';

// Contenido específico para QA Testing
const sliderContent = [
  {
    image: Header1,
    title: 'Conviértete en Expreto en QA Testing',
    subtitle: 'Domina las metodologías ágiles y testing automatizado para garantizar la calidad perfecta de software en cualquier entorno.',
    buttonText: 'Más Información'
  },
  {
    image: Header2,
    title: 'Especialízate en Inteligencia Artificial',
    subtitle: 'Aprende machine learning, deep learning y desarrollo de soluciones con IA que transforman industrias y negocios.',
    buttonText: 'Más Información'
  },
  {
    image: Header3,
    title: 'Conviértete en Experto en Ciberseguridad',
    subtitle: 'Domina ethical hacking, seguridad ofensiva y protección de sistemas para defender organizaciones de amenazas digitales.',
    buttonText: 'Más Información'
  }
];

const HeroSection = ({ headerHeight }) => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 800,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 6000,
    fade: true,
    arrows: false,
    pauseOnHover: true,
    pauseOnFocus: true,
    cssEase: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)',
  };

  // Calcula la altura dinámicamente
  const heroStyle = {
    height: `calc(100vh - ${headerHeight}px)`
  };

  return (
    <section className="hero" style={heroStyle}>
      <Slider {...settings} className="hero-slider">
        {sliderContent.map((slide, index) => (
          <div key={index} className="slider-item">
            <div 
              className="slider-background"
              style={{ backgroundImage: `url(${slide.image})` }}
            >
              <div className="overlay"></div>
              <div className="content">
                <h1 className="hero-titles">{slide.title}</h1>
                <p className="hero-subtitles">{slide.subtitle}</p>
                <button className="primary-button">{slide.buttonText}</button>
              </div>
            </div>
          </div>
        ))}
      </Slider>
    </section>
  );
};

export default HeroSection;

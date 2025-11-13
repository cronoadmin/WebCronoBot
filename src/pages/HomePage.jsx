import { useState, useEffect } from 'react';
import HeroSection from '../components/sections/HeroSection';
import FeatureCard from '../components/common/FeatureCard';
import TestimonialCard from '../components/common/TestimonialCard';
import CtaSection from '../components/sections/CtaSection';
import './HomePage.css';
import logo from '../imagenes/logoCrono.png';

// Componente para la sección de certificación
const CertificationSection = () => (
  <section className="certification-section">
    <div className="section-divider"></div>
    <div className="certification-header">
      <h2 className="section-title">
        <span className="highlight-text">Certificaciones</span> que Validan tu Expertise
      </h2>
      <p className="section-subtitle">
        Al completar exitosamente nuestros programas, recibirás una doble certificación que respalda tus conocimientos:
      </p>
    </div>
    <div className="certification-grid">
      <div className="certification-card">
        <div className="card-header">
          <div className="certification-icon">
            <img 
              src={logo} 
              alt="Certificado CRONO BOT" 
              className="certification-image crono-logo" 
            />
          </div>
        </div>
        <div className="card-body">
          <h3>Certificado CRONO BOT</h3>
          <p>Certificación oficial que acredita tu dominio en QA Testing y Automatización, respaldada por nuestra empresa.</p>
        </div>
      </div>
      {/*
      <div className="certification-card">
        <div className="card-header">
          <div className="certification-icon">
            <img 
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/c1/Google_%22G%22_logo.svg/2048px-Google_%22G%22_logo.svg.png" 
              alt="GDG Ica" 
              className="certification-image" 
            />
          </div>
        </div>
        <div className="card-body">
          <h3>Certificado GDG Ica</h3>
          <p>Avalado por Google Developer Groups Ica, conectándote con la comunidad tecnológica más importante de la región.</p>
        </div>
      </div>
      */}
    </div>
    <div className="certification-footer">
      <p className="footer-text">Nuestros programas están diseñados bajo los estándares de Google, garantizando que desarrolles habilidades altamente demandadas en el mercado laboral actual.</p>
    </div>
  </section>
);

// Componente para el carrusel de cursos - CON MOVIMIENTO AUTOMÁTICO
const CoursesCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [slidesToShow, setSlidesToShow] = useState(4);
  const [totalSlides, setTotalSlides] = useState(1);
  const [isPaused, setIsPaused] = useState(false);
  
  const courses = [
    {
      title: "QA Testing Intensivo",
      description: "Domina los fundamentos del control de calidad de software y metodologías de testing desde cero.",
      price: "$199.99",
      isFeatured: true,
      imageUrl: "https://pandorafms.com/blog/wp-content/uploads/2022/02/QA-1.png"
    },
    {
      title: "Automatización de APIs con Karate",
      description: "Aprende a crear y ejecutar pruebas automatizadas para APIs REST usando el framework Karate.",
      price: "$149.99",
      isFeatured: false,
      imageUrl: "https://cdn.prod.website-files.com/5ff9f08a3928de42db400872/6390b4f99767824dce49d001_01.png"
    },
    {
      title: "Automatización Mobile con Appium",
      description: "Desarrolla scripts de automatización para aplicaciones móviles en plataformas iOS y Android.",
      price: "$179.99",
      isFeatured: false,
      imageUrl: "https://www.automatetheplanet.com/wp-content/uploads/2018/10/getting_started_appium_-android.jpg"
    },
    {
      title: "Automatización Web con Playwright",
      description: "Implementa pruebas end-to-end de alta velocidad y confiabilidad en navegadores modernos.",
      price: "$159.99",
      isFeatured: false,
      imageUrl: "https://img-c.udemycdn.com/course/750x422/5064138_5362_4.jpg"
    }
  ];

  // Determinar cuántas tarjetas mostrar según el ancho de pantalla
  useEffect(() => {
    const handleResize = () => {
      let newSlidesToShow;
      
      if (window.innerWidth >= 1900) {
        newSlidesToShow = 4; // 4 cards en desktop grande
      } else if (window.innerWidth >= 992) {
        newSlidesToShow = 3; // 3 cards en desktop
      } else if (window.innerWidth >= 768) {
        newSlidesToShow = 2; // 2 cards en tablet
      } else {
        newSlidesToShow = 1; // 1 card en mobile
      }
      
      setSlidesToShow(newSlidesToShow);
      setTotalSlides(Math.ceil(courses.length / newSlidesToShow));
      setCurrentIndex(0); // Resetear al cambiar tamaño
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [courses.length]);

  // Efecto para el movimiento automático
  useEffect(() => {
    if (totalSlides <= 1 || isPaused) return; // No hacer auto-slide si solo hay un slide o está pausado
    
    const interval = setInterval(() => {
      setCurrentIndex(prevIndex => {
        return prevIndex >= totalSlides - 1 ? 0 : prevIndex + 1;
      });
    }, 4000); // Cambia cada 4 segundos

    return () => clearInterval(interval);
  }, [totalSlides, isPaused]);

  const nextSlide = () => {
    setCurrentIndex(prevIndex => {
      return prevIndex >= totalSlides - 1 ? 0 : prevIndex + 1;
    });
  };

  const prevSlide = () => {
    setCurrentIndex(prevIndex => {
      return prevIndex <= 0 ? totalSlides - 1 : prevIndex - 1;
    });
  };

  const goToSlide = (index) => {
    setCurrentIndex(index);
  };

  // Pausar el auto-slide cuando el usuario interactúa
  const handleMouseEnter = () => {
    setIsPaused(true);
  };

  const handleMouseLeave = () => {
    setIsPaused(false);
  };

  // Calcular el ancho de cada slide
  const slideWidth = 100 / slidesToShow;

  return (
    <div 
      className="carousel-container"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <h2 className="section-title">Programas Especializados en QA Testing</h2>
      <div className="carousel-wrapper">
        <button 
          className="carousel-button prev" 
          onClick={prevSlide} 
          aria-label="Anterior"
        >
          &#10094;
        </button>
        
        <div className="carousel">
          <div 
            className="carousel-inner" 
            style={{ 
              transform: `translateX(-${currentIndex * 100}%)`,
            }}
          >
            {courses.map((course, index) => (
              <div 
                key={index} 
                className="carousel-item"
                style={{ width: `${slideWidth}%` }}
              >
                <FeatureCard
                  title={course.title}
                  description={course.description}
                  price={course.price}
                  isFeatured={course.isFeatured}
                  imageUrl={course.imageUrl}
                />
              </div>
            ))}
          </div>
        </div>
        
        <button 
          className="carousel-button next" 
          onClick={nextSlide} 
          aria-label="Siguiente"
        >
          &#10095;
        </button>
      </div>
      
      {/* Indicadores de paginación - SOLO SI HAY MÁS DE 1 SLIDE */}
      {totalSlides > 1 && (
        <div className="carousel-dots">
          {Array.from({ length: totalSlides }).map((_, index) => (
            <button
              key={index}
              className={`dot ${index === currentIndex ? 'active' : ''}`}
              onClick={() => goToSlide(index)}
              aria-label={`Ir a slide ${index + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  );
};

const HomePage = ({ headerHeight }) => {
  return (
    <div className="home-page">
      <HeroSection headerHeight={headerHeight} />

      <section className="features-section">
        <div className="section-divider"></div>
        <CoursesCarousel />
      </section>

      <CertificationSection />

      <section className="testimonials-section">
        <div className="section-divider"></div>
        <h2 className="section-title">Testimonios de Nuestros Estudiantes</h2>
        <div className="testimonials-grid">
          <TestimonialCard
            text="Los cursos me prepararon perfectamente para el mercado laboral. En menos de un mes conseguí mi primer empleo como QA Analyst."
            author="Ana G."
            image="https://randomuser.me/api/portraits/women/65.jpg"
          />
          <TestimonialCard
            text="La certificación doble fue un diferenciador clave en mi proceso de contratación. Los reclutadores valoran mucho el aval de GDG Ica."
            author="Luis M."
            image="https://randomuser.me/api/portraits/men/82.jpg"
          />
          <TestimonialCard
            text="El soporte de los instructores y la comunidad es excepcional. Siempre están disponibles para resolver dudas y guiarte."
            author="Sofía P."
            image="https://randomuser.me/api/portraits/women/44.jpg"
          />
        </div>
      </section>

      <CtaSection />
    </div>
  );
};

export default HomePage;
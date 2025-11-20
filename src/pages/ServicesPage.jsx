import React, { useState, useEffect, useRef, useMemo, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import FeatureCard from '../components/common/FeatureCard';
import CtaSection from '../components/sections/CtaSection';
import './ServicesPage.css';

// Mover datos estáticos fuera del componente
const SERVICES_DATA = [
  {
    title: "Cursos de QA Manual",
    icon: "🔍",
    description: "Aprende las técnicas fundamentales de testing manual con nuestros cursos especializados.",
    features: [
      "Diseño de casos de prueba",
      "Técnicas de reporte de bugs",
      "Pruebas de usabilidad y aceptación",
      "Creación de plan de pruebas"
    ],
    gradient: "gradient-1"
  },
  {
    title: "QA Automation",
    icon: "🤖",
    description: "Domina las herramientas más demandadas en automatización de pruebas.",
    features: [
      "Selenium WebDriver",
      "Frameworks de testing",
      "Integración continua",
      "Pruebas en múltiples navegadores"
    ],
    gradient: "gradient-2"
  },
  {
    title: "Performance Testing",
    icon: "⚡",
    description: "Aprende a medir y mejorar el rendimiento de aplicaciones y sistemas.",
    features: [
      "Pruebas de carga y estrés",
      "Herramientas como JMeter",
      "Análisis de resultados",
      "Optimización de rendimiento"
    ],
    gradient: "gradient-3"
  },
  {
    title: "Mobile Testing",
    icon: "📱",
    description: "Especialízate en testing para aplicaciones móviles en diferentes plataformas.",
    features: [
      "Testing en iOS y Android",
      "Pruebas en dispositivos reales",
      "Automation con Appium",
      "Pruebas de conectividad"
    ],
    gradient: "gradient-4"
  },
  {
    title: "Security Testing",
    icon: "🔒",
    description: "Conviértete en experto en pruebas de seguridad y vulnerabilidades.",
    features: [
      "Pruebas de penetración",
      "Análisis de vulnerabilidades",
      "OWASP Top 10",
      "Herramientas de seguridad"
    ],
    gradient: "gradient-5"
  },
  {
    title: "Metodologías Ágiles",
    icon: "🔄",
    description: "Integra el testing en entornos de desarrollo ágil y DevOps.",
    features: [
      "Testing en Scrum y Kanban",
      "Pruebas en DevOps",
      "Calidad continua",
      "Colaboración con desarrollo"
    ],
    gradient: "gradient-6"
  }
];

const COURSES_DATA = [
  {
    title: "QA Testing Intensivo",
    description: "Domina los fundamentos del control de calidad de software y metodologías de testing desde cero.",
    price: "$149.99",
    isFeatured: true,
    imageUrl: "https://pandorafms.com/blog/wp-content/uploads/2022/02/QA-1.png"
  }
];

// Componente memoizado para el contenido de pestañas
const TabContent = React.memo(({ service, isActive }) => {
  if (!isActive) return null;

  return (
    <div className={`service-detail ${service.gradient}`}>
      <div className="detail-info">
        <h3>{service.title}</h3>
        <p>{service.description}</p>
        
        <div className="features-grid">
          {service.features.map((feature, featureIndex) => (
            <div key={featureIndex} className="feature-item">
              <span className="feature-check">✓</span>
              <span>{feature}</span>
            </div>
          ))}
        </div>
        
        {/*
        <div className="action-buttons">
          <button className="btn-primary">Ver Curso Completo</button>
          <button className="btn-secondary">Descargar Temario</button>
        </div>
        */}
      </div>
      
      <div className="detail-visual">
        <div className="visual-card">
          <div className="card-glow"></div>
          <span className="visual-icon">{service.icon}</span>
        </div>
      </div>
    </div>
  );
});

// Componente memoizado para navegación de pestañas
const TabNavigation = React.memo(({ services, activeTab, onTabChange }) => {
  return (
    <div className="tabs-navigation">
      {services.map((service, index) => (
        <button
          key={index}
          className={`tab-nav ${activeTab === index ? 'active' : ''} ${service.gradient}`}
          onClick={() => onTabChange(index)}
        >
          <span className="nav-icon">{service.icon}</span>
          <span className="nav-text">{service.title}</span>
        </button>
      ))}
    </div>
  );
});

// Nuevo componente para Hero Section mejorado - CON BOTONES FUNCIONALES
const HeroSection = React.memo(({ isVisible }) => {
  const navigate = useNavigate();

  // Función para redirigir a contactos
  const redirectToContact = () => {
    navigate('/contact#contact-form');
  };

  // Función para abrir WhatsApp
  const openWhatsApp = () => {
    const phoneNumber = '+51901922306'; // Reemplaza con tu número real
    const defaultMessage = 'Hola, me interesa conocer el plan de estudios completo de los cursos de QA. ¿Podrían enviarme más información?';
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(defaultMessage)}`;
    
    window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
  };

  return (
    <section className={`services-hero ${isVisible ? 'visible' : ''}`}>
      <div className="hero-background"></div>
      <div className="hero-container">
        <div className="hero-content">
          {/* TEXTO PRIMERO - En desktop va a la izquierda, en móvil arriba */}
          <div className="hero-text">
            <h1 className="hero-title">
              Conviértete en 
              <span className="gradient-text"> QA Tester Profesional</span>
            </h1>
            <p className="hero-subtitle">
              Aprende testing manual y automation con herramientas actuales del mercado. 
              <strong> +80% de nuestros egresados aplican exitosamente a trabajos de QA.</strong>
            </p>
            
            <div className="hero-highlights">
              <div className="highlight-item">
                <span className="highlight-icon">✅</span>
                <span>Certificado de finalización</span>
              </div>
              <div className="highlight-item">
                <span className="highlight-icon">✅</span>
                <span>Clases online en vivo con expertos</span>
              </div>
              <div className="highlight-item">
                <span className="highlight-icon">✅</span>
                <span>Materiales de estudio descargables</span>
              </div>
            </div>

            <div className="hero-actions">
              <button className="hero-cta primary" onClick={redirectToContact}>
                Comenzar Ahora
                <span className="cta-arrow">→</span>
              </button>
              <button className="hero-cta secondary" onClick={openWhatsApp}>
                Solicitar Plan de Estudios
              </button>
            </div>

            <div className="hero-stats">
              <div className="stat">
                <span className="stat-number">100%</span>
                <span className="stat-label">Práctico</span>
              </div>
              <div className="stat">
                <span className="stat-number">0</span>
                <span className="stat-label">Experiencia Requerida</span>
              </div>
              <div className="stat">
                <span className="stat-number">100%</span>
                <span className="stat-label">Online</span>
              </div>
            </div>
          </div>
          
          {/* CUADRO VISUAL SEGUNDO - En desktop a la derecha, en móvil abajo */}
          <div className="hero-visual">
            <div className="main-visual">
              <div className="visual-content">
                <div className="tech-stack">
                  <span className="tech-item">Selenium</span>
                  <span className="tech-item">Playwright</span>
                  <span className="tech-item">Appium</span>
                  <span className="tech-item">JMeter</span>
                </div>
                <div className="certificate-badge">
                  <span className="certificate-icon">🏆</span>
                  <span>Certificación QA</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
});

// Componente del Carrusel adaptado del HomePage
const CoursesCarousel = React.memo(() => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [slidesToShow, setSlidesToShow] = useState(4);
  const [totalSlides, setTotalSlides] = useState(1);
  const [isPaused, setIsPaused] = useState(false);
  const [showNavigation, setShowNavigation] = useState(false);
  
  const courses = useMemo(() => COURSES_DATA, []);

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
      const calculatedTotalSlides = Math.ceil(courses.length / newSlidesToShow);
      setTotalSlides(calculatedTotalSlides);
      
      // Mostrar navegación solo si hay más de un slide
      setShowNavigation(calculatedTotalSlides > 1);
      
      setCurrentIndex(0); // Resetear al cambiar tamaño
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [courses.length]);

  // Efecto para el movimiento automático
  useEffect(() => {
    if (totalSlides <= 1 || isPaused || !showNavigation) return; // No hacer auto-slide si solo hay un slide o está pausado
    
    const interval = setInterval(() => {
      setCurrentIndex(prevIndex => {
        return prevIndex >= totalSlides - 1 ? 0 : prevIndex + 1;
      });
    }, 4000); // Cambia cada 4 segundos

    return () => clearInterval(interval);
  }, [totalSlides, isPaused, showNavigation]);

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
      <h2 className="section-title">Nuestros Cursos Disponibles</h2>
      <div className={`carousel-wrapper ${!showNavigation ? 'no-navigation' : ''}`}>
        {/* Botones de navegación - SOLO SI HAY MÁS DE 1 SLIDE */}
        {showNavigation && (
          <>
            <button 
              className="carousel-button prev" 
              onClick={prevSlide} 
              aria-label="Anterior"
            >
              &#10094;
            </button>
            
            <button 
              className="carousel-button next" 
              onClick={nextSlide} 
              aria-label="Siguiente"
            >
              &#10095;
            </button>
          </>
        )}
        
        <div className="carousel">
          <div 
            className="carousel-inner" 
            style={{ 
              transform: showNavigation ? `translateX(-${currentIndex * 100}%)` : 'none',
              justifyContent: !showNavigation ? 'center' : 'flex-start'
            }}
          >
            {courses.map((course, index) => (
              <div 
                key={index} 
                className="carousel-item"
                style={{ 
                  width: `${slideWidth}%`,
                  // Centrar cuando no hay navegación
                  margin: !showNavigation ? '0 auto' : '0'
                }}
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
      </div>
      
      {/* Indicadores de paginación - SOLO SI HAY MÁS DE 1 SLIDE */}
      {showNavigation && totalSlides > 1 && (
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
});

const ServicesPage = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);

  // Usar useMemo para datos estáticos
  const services = useMemo(() => SERVICES_DATA, []);

  // Intersection Observer optimizado
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          if (sectionRef.current) {
            observer.unobserve(sectionRef.current);
          }
        }
      },
      { 
        threshold: 0.1,
        rootMargin: '50px'
      }
    );

    const currentSection = sectionRef.current;
    if (currentSection) {
      observer.observe(currentSection);
    }

    return () => {
      if (currentSection) {
        observer.unobserve(currentSection);
      }
    };
  }, []);

  const handleTabChange = useCallback((index) => {
    setActiveTab(index);
  }, []);

  return (
    <div className="services-container" ref={sectionRef}>
      {/* Nuevo Hero Section mejorado - ORDEN CORREGIDO */}
      <HeroSection isVisible={isVisible} />

      {/* Services Tabs Section */}
      <section className="services-tabs-section">
        <div className="section-header">
          <h2>Nuestras Especialidades</h2>
          <p>Elige tu camino en el mundo del Quality Assurance</p>
        </div>

        <div className="tabs-container">
          <TabNavigation 
            services={services}
            activeTab={activeTab}
            onTabChange={handleTabChange}
          />

          <div className="tab-content-wrapper">
            {services.map((service, index) => (
              <div 
                key={index}
                className={`tab-content ${activeTab === index ? 'active' : ''}`}
              >
                <TabContent service={service} isActive={activeTab === index} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Courses Carousel Section - USANDO EL NUEVO COMPONENTE ADAPTADO */}
      <section className="courses-carousel-section">
        <div className="section-divider"></div>
        <CoursesCarousel />
      </section>

      {/* CTA Section */}
      <CtaSection />
    </div>
  );
};

export default React.memo(ServicesPage);
import { useState, useEffect, useRef } from 'react';
import './AboutPage.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import CtaSection from '../components/sections/CtaSection';

const AboutPage = () => {

  const [activeFaq, setActiveFaq] = useState(null);
  const revealRefs = useRef([]);
  
  // Datos para la línea de tiempo
  const timelineData = [
    {
      year: "2025",
      month: "Agosto",
      title: "Nacimiento de CRONO BOT como una idea",
      description: "Nace la visión de revolucionar la educación tecnológica en esta nueva era de la tecnología, democratizando el acceso a conocimientos de vanguardia en desarrollo, inteligencia artificial, ciberseguridad y transformación digital."
    },
    {
      year: "2025",
      month: "Octubre",
      title: "Formalización del centro de capacitación de tecnología",
      description: "Establecemos las bases como hub de formación integral en tecnología, lanzando programas especializados en desarrollo web, testing, data science y otras áreas clave de la industria."
    },
    {
      year: "2025",
      month: "Noviembre",
      title: "Apertura oficial de CRONO BOT",
      description: "Nos lanzamos oficialmente al mercado con un webinar online masivo que marcó nuestro debut en el ecosistema tecnológico, consolidando nuestra presencia con una comunidad de entusiastas de la tecnología."
    }
  ];

  // Datos del equipo ACTUALIZADOS con especialidades
  const teamData = [
    {
      name: "Orlando Valencia",
      role: "Co-Founder",
      image: "https://media.licdn.com/dms/image/v2/D4E03AQFDqFd7i3t9xA/profile-displayphoto-shrink_800_800/B4EZUfaFjOH0Ak-/0/1739988687540?e=1764806400&v=beta&t=jEk5uVfU1P5bB7W5T-vwcJMVtpjEDQAs1Ms9f3g3eIY",
      bio: "QA Engineer especializado en aseguramiento de calidad de software con expertise en automatización de pruebas, integración y despliegue continuo. Apasionado por implementar estrategias de testing que optimizan los procesos de desarrollo.",
      linkedin: "https://www.linkedin.com/in/orlando-valencia-giraldo-141336202/",
      specialties: ["QA Automation", "CI/CD", "Testing Estratégico", "DevOps"]
    },
    {
      name: "Carlos Aparcana",
      role: "Socio Fundador & Embajador de la Marca",
      image: "https://media.licdn.com/dms/image/v2/D4E03AQHcEKDIduaP2g/profile-displayphoto-shrink_800_800/profile-displayphoto-shrink_800_800/0/1686071562007?e=1764806400&v=beta&t=VQ-38qyFUKOurshMfLta4rByfh_f78MXfHUMLYXCucE",
      bio: "QA Engineer con mucha experiencia liderando equipos de testing y automatización. Especialista en frameworks avanzados y mentoría técnica, destacado por capacitar y formar nuevos talentos en el área de calidad de software.",
      linkedin: "https://www.linkedin.com/in/carlos-aparcana-siguas-0a57a7243/",
      specialties: ["Liderazgo Técnico", "Mentoría QA", "Frameworks", "Estrategia de Testing"]
    },
    {
      name: "Ruben Quispe",
      role: "Socio Fundador & Embajador de la Marca",
      image: "https://media.licdn.com/dms/image/v2/C4E03AQEk8W4zJMm62g/profile-displayphoto-shrink_800_800/profile-displayphoto-shrink_800_800/0/1639937048273?e=1764806400&v=beta&t=P5_o9vgSWkdigGPenwXg2v_GvdwztwdCcYkH_-RLDwU",
      bio: "Especialista en Inteligencia Artificial y arquitecto de soluciones tecnológicas. Combinando su experiencia como docente en IA con el desarrollo de arquitecturas escalables para proyectos de alta complejidad técnica.",
      linkedin: "https://www.linkedin.com/in/ruben-quispe-l/",
      specialties: ["Inteligencia Artificial", "Arquitectura de Soluciones", "Machine Learning", "Cloud Computing"]
    }
  ];

  // Valores de la empresa
  const valuesData = [
    {
      icon: "🔥",
      title: "Skills que Importan",
      description: "Olvídate de cursos aburridos. Aquí construyes portfolio con tech stack que realmente usan las empresas en 2024."
    },
    {
      icon: "⚡",
      title: "Aprendizaje Express",
      description: "De cero a developer en tiempo récord. Metodología intensiva que prioriza lo esencial para entrar al mercado YA."
    },
    {
      icon: "🤖",
      title: "Tech del Futuro",
      description: "IA, Machine Learning, Cloud Native. Preparamos para las tendencias, no para el pasado. Sé relevante hoy y mañana."
    },
    {
      icon: "💼",
      title: "Conexiones Reales",
      description: "Networking que transforma carreras. Conectamos con startups scale-ups y empresas que buscan talento como el tuyo."
    },
    {
    icon: "💡",
    title: "Innovación Constante",
    description: "Nuestros métodos evolucionan con la industria. Siempre a la vanguardia de las mejores prácticas y metodologías ágiles del sector tech."
    },
    {
      icon: "🌍",
      title: "Remote First",
      description: "Preparación 100% para trabajos remotos. Aprendes las herramientas y metodologías que usan las empresas globales para trabajo distribuido."
    }
  ];

  // Preguntas frecuentes
  const faqData = [
    {
      question: "¿Qué certificaciones obtengo al completar los cursos?",
      answer: "Recibes doble certificación: Certificado oficial de CRONO BOT que valida tus habilidades técnicas y Certificado de GDG Ica respaldado por la comunidad Google Developers, ampliamente reconocido en la industria."
    },
    {
      question: "¿Los cursos son 100% prácticos?",
      answer: "Sí, nuestro enfoque es 80% práctico y 20% teórico. Trabajarás en proyectos reales desde el primer día, simulando entornos laborales actuales con herramientas que usan las empresas líderes."
    },
    {
      question: "¿Necesito experiencia previa en programación?",
      answer: "No es necesaria. Tenemos rutas de aprendizaje diseñadas para principiantes que incluyen fundamentos de programación, hasta cursos avanzados para quienes ya tienen experiencia en testing."
    },
    {
      question: "¿Cómo me ayuda la certificación de GDG Ica?",
      answer: "La certificación GDG Ica te conecta con una red global de desarrolladores y empresas, aumenta tu credibilidad profesional y es un diferenciador clave en procesos de reclutamiento tech."
    }
  ];

  // Alternar FAQ
  const toggleFaq = (index) => {
    setActiveFaq(activeFaq === index ? null : index);
  };

  // Efecto para animación al hacer scroll - CORREGIDO
  useEffect(() => {
    const revealElements = revealRefs.current.filter(el => el !== null && el !== undefined);
    
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('active');
        }
      });
    }, { 
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    });
    
    revealElements.forEach(el => {
      if (el) observer.observe(el);
    });
    
    return () => {
      revealElements.forEach(el => {
        if (el) observer.unobserve(el);
      });
    };
  }, []);

  // Función para manejar referencias de forma segura
  const addToRefs = (el, index) => {
    if (el && !revealRefs.current.includes(el)) {
      revealRefs.current[index] = el;
    }
  };

  return (
    <div className="about-page">
      {/* Hero Section Moderna */}
      <section className="about-hero">
        <div className="floating-particles">
          <div className="particle"></div>
          <div className="particle"></div>
          <div className="particle"></div>
          <div className="particle"></div>
        </div>
        
        <div className="about-hero-content">
          <h1 className="animate-fadeInUp">Nuestra Historia</h1>
          <p className="hero-subtitles animate-fadeInUp delay-100">
            CRONOBOT nace con el propósito de impulsar el aprendizaje tecnológico accesible, dinámico, práctico y de calidad.
            Fundado por profesionales apasionados por la innovación, el centro surge como respuesta a la necesidad de formar 
            nuevos talentos digitales capaces de afrontar los retos de la transformación tecnológica.
          </p>
          
          <div className="mission-vision-grid animate-fadeInUp delay-200">
            <div className="mission-card">
              <div className="card-icon">🚀</div>
              <h3>Misión</h3>
              <p>
                Formar y certificar profesionales competentes en las principales áreas de la tecnología, 
                fomentando el aprendizaje continuo, la ética digital y la innovación aplicada al desarrollo personal y profesional.
              </p>
            </div>
            
            <div className="vision-card">
              <div className="card-icon">⭐</div>
              <h3>Visión</h3>
              <p>
                Convertirnos en un referente nacional en capacitación tecnológica, reconocidos por la 
                calidad académica, el impacto social y la formación integral de nuevos talentos profesionales.
              </p>
            </div>
          </div>

          <div className="hero-stats animate-fadeInUp delay-300">
            <div className="hero-stat">
              <div className="hero-stat-number">100%</div>
              <div className="hero-stat-label">Práctico</div>
            </div>
            <div className="hero-stat">
              <div className="hero-stat-number">1x</div>
              <div className="hero-stat-label">Certificación</div>
            </div>
            <div className="hero-stat">
              <div className="hero-stat-number">2025</div>
              <div className="hero-stat-label">Fundación</div>
            </div>
          </div>
        </div>
      </section>

      {/* Timeline Section CORREGIDA - Alternada izquierda/derecha */}
      <section className="timeline-section">
        <h2>Nuestra Trayectoria</h2>
        
        <div className="timeline">
          {timelineData.map((item, index) => (
            <div 
              className={`timeline-item ${index % 2 === 0 ? 'left' : 'right'} reveal`} 
              key={index}
              ref={el => addToRefs(el, index)}
            >
              <div className="timeline-content">
                <span className="timeline-date">{item.month} {item.year}</span>
                <h3>{item.title}</h3>
                <p>{item.description}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Team Section ACTUALIZADA */}
      <section className="team-section">
        <h2>Nuestro Equipo de Expertos</h2>
        
        <div className="team-grid">
          {teamData.map((member, index) => (
            <div 
              className="team-member reveal" 
              key={index}
              ref={el => addToRefs(el, 10 + index)}
            >
              <div className="team-member-image">
                <img src={member.image} alt={member.name} />
              </div>
              <div className="team-member-info">
                <h3>{member.name}</h3>
                <span className="role">{member.role}</span>
                <p>{member.bio}</p>
                
                {/* Especialidades del miembro */}
                <div className="member-specialties">
                  {member.specialties?.map((specialty, i) => (
                    <span key={i} className="specialty-tag">{specialty}</span>
                  ))}
                </div>
                
                <div className="social-links1">
                  <a href={member.linkedin} target="_blank" rel="noopener noreferrer">
                    <i className="fab fa-linkedin"></i>
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Values Section */}
      <section className="values-section">
        <h2>Lo que Nos Define</h2>
        
        <div className="values-grid">
          {valuesData.map((value, index) => (
            <div 
              className="value-card reveal" 
              key={index}
              ref={el => addToRefs(el, 20 + index)}
            >
              <div className="value-icon">{value.icon}</div>
              <h3>{value.title}</h3>
              <p>{value.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* FAQ Section */}
      <section className="faq-section">
        <h2>Preguntas Frecuentes</h2>
        
        <div className="faq-container">
          {faqData.map((faq, index) => (
            <div 
              className={`faq-item ${activeFaq === index ? 'active' : ''} reveal`} 
              key={index}
              ref={el => addToRefs(el, 30 + index)}
            >
              <div 
                className="faq-question" 
                onClick={() => toggleFaq(index)}
              >
                {faq.question}
              </div>
              <div className="faq-answer">
                <p>{faq.answer}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <CtaSection />
    </div>
  );
};

export default AboutPage;
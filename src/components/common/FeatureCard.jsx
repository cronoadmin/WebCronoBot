import React, { useState, useRef, useEffect } from 'react';
import Portal from './Portal';
import './FeatureCard.css';
import { useNavigate } from 'react-router-dom';

const FeatureCard = ({ title, description, price, isFeatured, imageUrl, duration, level, rating }) => {
    const [isWishlisted, setIsWishlisted] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [isModalScrolled, setIsModalScrolled] = useState(false);
    const cardRef = useRef(null);
    const modalRef = useRef(null);
    const navigate = useNavigate(); // Hook para navegación
    
    // Estados para el swipe
    const [touchStart, setTouchStart] = useState(null);
    const [touchEnd, setTouchEnd] = useState(null);

    const handleWishlistToggle = (e) => {
        e.stopPropagation();
        setIsWishlisted(!isWishlisted);
    };

    const handleInfoClick = (e) => {
        e.stopPropagation();
        setShowModal(true);
    };

    const closeModal = () => {
        setShowModal(false);
    };

    // Función para redirigir a contacto
    const redirectToContact = () => {
        closeModal(); // Cerrar modal primero
        navigate('/contact#contact-form'); // Redirigir a la página de contacto
    };

    // Función para comprar ahora (desde el card principal)
    const handleBuyNow = (e) => {
        e.stopPropagation();
        navigate('/contact#contact-form');
    };

    const handleModalScroll = (e) => {
        const scrollTop = e.target.scrollTop;
        setIsModalScrolled(scrollTop > 10);
    };

    // Handlers para swipe en móvil - CORREGIDOS
    const handleTouchStart = (e) => {
        e.stopPropagation();
        setTouchStart(e.targetTouches[0].clientX);
        setTouchEnd(null);
    };

    const handleTouchMove = (e) => {
        e.stopPropagation();
        setTouchEnd(e.targetTouches[0].clientX);
    };

    const handleTouchEnd = (e) => {
        e.stopPropagation();
        if (!touchStart || !touchEnd) return;
        
        const distance = touchStart - touchEnd;
        const absDistance = Math.abs(distance);
        const minSwipeDistance = 50;
        
        if (absDistance < minSwipeDistance) return;
        
        const isLeftSwipe = distance > 0;
        const isRightSwipe = distance < 0;
        
        console.log(`Swiped ${isLeftSwipe ? 'left' : 'right'} - Distance: ${absDistance}px`);
        
        // Acciones según el tipo de swipe
        if (showModal) {
            // Si el modal está abierto, cualquier swipe lo cierra
            closeModal();
        } else {
            // Si es un card, puedes agregar lógica aquí
            if (isLeftSwipe) {
                console.log('Swipe izquierdo en card - Navegar al siguiente');
            } else if (isRightSwipe) {
                console.log('Swipe derecho en card - Navegar al anterior');
            }
        }
        
        // Resetear estados
        setTouchStart(null);
        setTouchEnd(null);
    };

    // Datos específicos para cada curso
    const courseDetails = {
        "QA Testing Intensivo": {
            objetivos: [
                "Dominar fundamentos de testing manual",
                "Aprender diseño de casos de prueba",
                "Gestionar ciclos de testing",
                "Reportar bugs efectivamente"
            ],
            herramientas: ["JIRA", "TestRail", "Postman", "Chrome DevTools"],
            duracion: "2 semanas",
            nivel: "Principiante",
            certificacion: "Certificación de CRONO BOT",
            proyectoFinal: "Plan de pruebas completo para sistema web"
        }
    };

    // Cerrar modal al hacer click fuera
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (modalRef.current && !modalRef.current.contains(event.target)) {
                closeModal();
            }
        };

        if (showModal) {
            document.addEventListener('mousedown', handleClickOutside);
            document.body.style.overflow = 'hidden';
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
            document.body.style.overflow = 'unset';
        };
    }, [showModal]);

    // Obtener detalles del curso actual
    const currentCourseDetails = courseDetails[title] || {
        objetivos: ["Información detallada disponible pronto"],
        herramientas: ["Por definir"],
        duracion: duration || "8 semanas",
        nivel: level || "Intermedio",
        certificacion: "Doble certificación CRONO BOT + GDG Ica",
        proyectoFinal: "Proyecto práctico aplicando lo aprendido"
    };

    return (
        <>
            <div 
                ref={cardRef}
                className={`feature-card ${isFeatured ? 'featured-card' : ''}`}
                // Eventos de touch para swipe en móvil - CORREGIDOS
                onTouchStart={handleTouchStart}
                onTouchMove={handleTouchMove}
                onTouchEnd={handleTouchEnd}
            >
                {/* Header con imagen */}
                <div className="card-header">
                    <div className="image-container">
                        <img src={imageUrl} alt={title} className="card-image" />
                        
                        {isFeatured && (
                            <div className="featured-badge">
                                <span className="badge-icon">🔥</span>
                                <span className="badge-text">Popular</span>
                            </div>
                        )}
                        
                        <div className="level-badge">
                            {level || 'Principiante'}
                        </div>
                        
                        <button 
                            className={`wishlist-btn ${isWishlisted ? 'wishlisted' : ''}`}
                            onClick={handleWishlistToggle}
                        >
                            <span className="heart-icon">{isWishlisted ? '❤️' : '🤍'}</span>
                        </button>
                    </div>
                </div>

                {/* Contenido principal compacto */}
                <div className="card-content">
                    <div className="card-meta">
                        <div className="rating">
                            <span className="stars">★★★★★</span>
                            <span className="rating-text">{rating || '4.9'}/5</span>
                        </div>
                        <div className="duration">
                            <span className="clock-icon">⏱️</span>
                            {duration || '2 semanas'}
                        </div>
                    </div>

                    <h3 className="card-title">{title}</h3>
                    
                    <p className="card-description">{description}</p>

                    {/* Precio siempre visible - diseño compacto */}
                    <div className="price-section-main">
                        <div className="price-container-main">
                            <span className="price-label-main">INVERSIÓN TOTAL</span>
                            <span className="card-price-main">{price}</span>
                        </div>
                    </div>
                </div>

                {/* Footer compacto */}
                <div className="card-footer">
                    <div className="action-buttonss">
                        <button className="buy-button primary-btn" onClick={handleBuyNow}>
                            <span className="button-text">Comprar ahora</span>
                        </button>
                        
                        <button className="info-button secondary-btn" onClick={handleInfoClick}>
                            <span className="button-text">Más info</span>
                        </button>
                    </div>
                </div>

                {isFeatured && <div className="glow-effect"></div>}
                <div className="hover-effect"></div>
            </div>

            {/* Modal de información detallada - USANDO PORTAL */}
            {showModal && (
                <Portal>
                    <div 
                        className="modal-overlay"
                        // Agregar eventos de touch al overlay también
                        onTouchStart={handleTouchStart}
                        onTouchMove={handleTouchMove}
                        onTouchEnd={handleTouchEnd}
                    >
                        <div 
                            ref={modalRef} 
                            className="course-modal"
                        >
                            <div className={`modal-header sticky-header ${isModalScrolled ? 'scrolled' : ''}`}>
                                <h2 className="modal-title">{title}</h2>
                                <button className="close-button" onClick={closeModal}>
                                    ×
                                </button>
                            </div>
                            
                            <div 
                                className="modal-content"
                                onScroll={handleModalScroll}
                            >
                                <div className="modal-section">
                                    <h3>📝 Descripción del Curso</h3>
                                    <p>{description}</p>
                                </div>

                                <div className="modal-section">
                                    <h3>🎯 Objetivos de Aprendizaje</h3>
                                    <ul className="objectives-list">
                                        {currentCourseDetails.objetivos.map((objetivo, index) => (
                                            <li key={index}>{objetivo}</li>
                                        ))}
                                    </ul>
                                </div>

                                <div className="modal-section">
                                    <h3>🛠️ Herramientas que Dominarás</h3>
                                    <div className="tools-grid">
                                        {currentCourseDetails.herramientas.map((herramienta, index) => (
                                            <span key={index} className="tool-tag">{herramienta}</span>
                                        ))}
                                    </div>
                                </div>

                                <div className="modal-details-grid">
                                    <div className="detail-item">
                                        <h4>⏰ Duración</h4>
                                        <p>{currentCourseDetails.duracion}</p>
                                    </div>
                                    <div className="detail-item">
                                        <h4>📊 Nivel</h4>
                                        <p>{currentCourseDetails.nivel}</p>
                                    </div>
                                    <div className="detail-item">
                                        <h4>🏆 Certificación</h4>
                                        <p>{currentCourseDetails.certificacion}</p>
                                    </div>
                                    <div className="detail-item">
                                        <h4>💼 Proyecto Final</h4>
                                        <p>{currentCourseDetails.proyectoFinal}</p>
                                    </div>
                                </div>

                                <div className="modal-section">
                                    <h3>💰 Inversión</h3>
                                    <div className="investment-section">
                                        <div className="price-display">
                                            <span className="price-label">Precio Total:</span>
                                            <span className="modal-price">{price || '$149.99'}</span>
                                        </div>
                                        <p className="payment-info">* Opciones de pago disponibles</p>
                                    </div>
                                </div>
                            </div>

                            <div className="modal-footer">
                                <button className="modal-buy-button primary-btn" onClick={redirectToContact}>
                                    Comprar ahora
                                </button>
                                <button className="modal-close-button secondary-btn" onClick={closeModal}>
                                    Cerrar
                                </button>
                            </div>
                        </div>
                    </div>
                </Portal>
            )}
        </>
    );
};

export default FeatureCard;

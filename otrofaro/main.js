// 1. SCROLL HEADER
window.addEventListener('scroll', () => {
    const header = document.getElementById('main-nav');
    if (window.scrollY > 50) {
        document.body.classList.add('scrolled');
        header.classList.add('scrolled');
    } else {
        document.body.classList.remove('scrolled');
        header.classList.remove('scrolled');
    }
});

// DATA & GLOBAL FUNCTIONS (NOSOTROS TABS)
const contentData = {
    nosotros: {
        tag: "SOBRE NOSOTROS",
        title: "Luz en la Ciudad, esperanza en el alma.",
        html: `<p class="faro-qs-p">Somos una comunidad bautista comprometida con la <strong>verdad bíblica</strong> y el servicio al prójimo. Nuestra historia es el reflejo de la gracia de Dios actuando en cada vida que cruza nuestras puertas.</p><p class="faro-qs-p">En El Faro, crevices que cada persona tiene un propósito divino. Aquí encontrarás un lugar para crecer, servir y pertenecer.</p>`
    },
    mision: {
        tag: "NUESTRA MISIÓN",
        title: "Llevar el mensaje de fe a cada rincón.",
        html: `<p class="faro-qs-p">Nuestra misión fundamental es <strong>glorificar a Dios</strong> a través de la evangelización y el discipulado constante. Buscamos ser un puente entre la necesidad y la esperanza.</p><p class="faro-qs-p">Trabajamos activamente en programas sociales y espirituales para transformar nuestra comunidad desde adentro hacia afuera.</p>`
    },
    vision: {
        tag: "NUESTRA VISIÓN",
        title: "Ser un faro de restauración y amor.",
        html: `<p class="faro-qs-p">Proyectamos ser una iglesia <strong>multi-generacional</strong>, relevante y vibrante. Visualizamos una ciudad donde cada familia sea alcanzada por el amor de Jesús.</p><p class="faro-qs-p">Nuestra meta es crecer no solo en número, sino en profundidad espiritual y compromiso social efectivo.</p>`
    }
};

window.faroUpdate = function(btn, type) {
    document.querySelectorAll('.faro-qs-tab').forEach(t => {
        t.classList.remove('active');
        t.style.borderBottom = "none";
    });
    btn.classList.add('active');
    btn.style.borderBottom = "2px solid white";

    if (typeof gsap !== 'undefined') {
        gsap.to(["#faro-tag", "#faro-title", "#faro-text-container"], {
            opacity: 0, y: 15, duration: 0.3, stagger: 0.05,
            onComplete: () => {
                document.getElementById('faro-tag').innerText = contentData[type].tag;
                document.getElementById('faro-title').innerText = contentData[type].title;
                document.getElementById('faro-text-container').innerHTML = contentData[type].html;
                gsap.to(["#faro-tag", "#faro-title", "#faro-text-container"], {
                    opacity: 1, y: 0, duration: 0.5, stagger: 0.1, ease: "power2.out"
                });
            }
        });
    }
};

// PORTAPAPELES NATIVO
window.triggerSystemCopy = function(stringId, buttonNode) {
    if (buttonNode.classList.contains('system-copy-success')) return;

    const rawText = document.getElementById(stringId).innerText;

    navigator.clipboard.writeText(rawText).then(() => {
        buttonNode.classList.add('system-copy-success');
        setTimeout(() => {
            buttonNode.classList.remove('system-copy-success');
        }, 2000);
    }).catch(err => {
        console.error('Error de acceso al hardware de portapapeles: ', err);
    });
};

// LIGHT TABS & FORM
window.switchLightTab = function(tabType, element) {
    document.querySelectorAll('.light-card').forEach(card => card.classList.remove('active'));
    element.classList.add('active');

    document.getElementById('light_req_type').value = tabType;

    const label = document.getElementById('light-message-label');
    const textarea = document.getElementById('light_message');
    const btnText = document.getElementById('light-btn-text');

    if (tabType === 'oracion') {
        label.innerText = 'Detalle de tu petición de oración';
        textarea.placeholder = 'Escribí aquí los detalles de tu solicitud con total tranquilidad...';
        btnText.innerText = 'Enviar Petición de Oración';
    } else if (tabType === 'consejeria') {
        label.innerText = 'Motivo de la consulta pastoral';
        textarea.placeholder = 'Compartinos brevemente cuál es tu situación actual para coordinar una cita de apoyo...';
        btnText.innerText = 'Solicitar Soporte Pastoral';
    } else if (tabType === 'ayuda') {
        label.innerText = 'Descripción de la asistencia requerida';
        textarea.placeholder = 'Detallá con claridad cuál es la necesidad urgente o material para que podamos evaluarla...';
        btnText.innerText = 'Solicitar Ayuda Práctica';
    }
};

window.handleLightFormSubmit = function(event) {
    event.preventDefault();
    document.getElementById('lightChurchForm').reset();
};

// LÓGICA DE CONTROL SIUU SLIDER
const siuuOverlay = document.getElementById('siuuOverlay');
const siuuSlider = document.getElementById('siuuSlider');
const siuuDots = document.getElementById('siuuDots');
const siuuPrevArrow = document.getElementById('siuuPrevArrow');
const siuuNextArrow = document.getElementById('siuuNextArrow');
const siuuPages = document.querySelectorAll('.siuu-page');
let siuuCurrentPage = 0;

window.toggleMenuSiuu = function() {
    if (!siuuOverlay) return;
    siuuOverlay.classList.toggle('siuu-active');
    if (siuuOverlay.classList.contains('siuu-active') && siuuSlider) {
        siuuSlider.scrollLeft = 0;
        siuuCurrentPage = 0;
        updatePaginationSiuu(0);
    }
};

if (siuuPages.length > 0 && siuuDots) {
    siuuPages.forEach((_, index) => {
        const dot = document.createElement('div');
        dot.classList.add('siuu-dot');
        if (index === 0) dot.classList.add('siuu-active');

        dot.addEventListener('click', () => {
            goToPageSiuu(index);
        });

        siuuDots.appendChild(dot);
    });
}

function goToPageSiuu(index) {
    if (!siuuSlider) return;
    siuuSlider.scrollLeft = siuuSlider.clientWidth * index;
    siuuCurrentPage = index;
    updatePaginationSiuu(index);
}

window.moveSliderSiuu = function(direction) {
    if (direction === 'next' && siuuCurrentPage < siuuPages.length - 1) {
        goToPageSiuu(siuuCurrentPage + 1);
    } else if (direction === 'prev' && siuuCurrentPage > 0) {
        goToPageSiuu(siuuCurrentPage - 1);
    }
};

function updatePaginationSiuu(activeIndex) {
    const dots = document.querySelectorAll('.siuu-dot');
    dots.forEach((dot, index) => {
        dot.classList.toggle('siuu-active', index === activeIndex);
    });

    if (siuuPrevArrow) siuuPrevArrow.classList.toggle('siuu-disabled', activeIndex === 0);
    if (siuuNextArrow) siuuNextArrow.classList.toggle('siuu-disabled', activeIndex === siuuPages.length - 1);
}

if (siuuSlider) {
    siuuSlider.addEventListener('scroll', () => {
        const width = siuuSlider.clientWidth;
        if (width > 0) {
            const currentIndex = Math.round(siuuSlider.scrollLeft / width);
            siuuCurrentPage = currentIndex;
            updatePaginationSiuu(currentIndex);
        }
    });
}

// 2. DOM CONTENT LOADED INITIALIZATIONS
document.addEventListener("DOMContentLoaded", () => {
    
    // HERO SWIPER
    if (typeof Swiper !== 'undefined' && document.querySelector('.hero-swiper')) {
        new Swiper('.hero-swiper', {
            effect: 'fade',
            speed: 2000,
            autoplay: {
                delay: 5000,
                disableOnInteraction: false,
            },
            loop: true,
            fadeEffect: { crossFade: true },
            pagination: {
                el: '.swiper-pagination',
                clickable: true,
            }
        });
    }

    // CORE JS ENABLED & LUCIDE
    document.body.classList.add("js-enabled");
    if (typeof lucide !== 'undefined') {
        lucide.createIcons();
    }

    // INTERSECTION OBSERVERS
    const observerOptions = { root: null, rootMargin: "0px", threshold: 0.1 };
    const coreObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("faro-active");
            } else {
                entry.target.classList.remove("faro-active");
            }
        });
    }, observerOptions);
    document.querySelectorAll("[data-observe]").forEach(target => coreObserver.observe(target));

    // MARQUEE OBSERVATION
    const marqueeTrack = document.querySelector('.faro-qs-track');
    const marqueeSection = document.querySelector('.faro-qs-marquee-section');
    if (marqueeTrack && marqueeSection) {
        const marqueeObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    marqueeTrack.classList.add('is-animating');
                } else {
                    marqueeTrack.classList.remove('is-animating');
                }
            });
        }, { root: null, threshold: 0.05 });
        marqueeObserver.observe(marqueeSection);
    }

    // REVEAL ON SCROLL OBSERVER
    const componentTarget = document.querySelector('.reveal-on-scroll');
    if (componentTarget) {
        const layoutScrollObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('scroll-is-visible');
                } else {
                    entry.target.classList.remove('scroll-is-visible');
                }
            });
        }, { root: null, rootMargin: '-20px 0px -20px 0px', threshold: 0.01 });
        layoutScrollObserver.observe(componentTarget);
    }

    // PREMIUM REVEAL & COORDINATES
    const premiumElements = document.querySelectorAll('.reveal-premium-block, .reveal-premium-text');
    if (premiumElements.length > 0) {
        const premiumObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('is-in-view');
                } else {
                    entry.target.classList.remove('is-in-view');
                }
            });
        }, { root: null, rootMargin: '-20px 0px -20px 0px', threshold: 0.05 });
        premiumElements.forEach(el => premiumObserver.observe(el));
    }

    document.querySelectorAll('.premium-card').forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            card.style.setProperty('--x', `${x}px`);
            card.style.setProperty('--y', `${y}px`);
        });
    });

    // DYNAMIC REVEAL TEXT/CONTAINERS
    const elementsToAnimate = document.querySelectorAll('.reveal-dynamic, .reveal-dynamic-text');
    if (elementsToAnimate.length > 0) {
        const lightObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('is-in-view');
                } else {
                    entry.target.classList.remove('is-in-view');
                }
            });
        }, { root: null, rootMargin: '-30px 0px -30px 0px', threshold: 0.05 });
        elementsToAnimate.forEach(el => lightObserver.observe(el));
    }

    // EVENT CARDS OBSERVER
    const eventCards = document.querySelectorAll('.event-card');
    const eventsGrid = document.querySelector('.events-grid');
    if (eventCards.length > 0 && eventsGrid) {
        const eventsObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    eventCards.forEach(card => card.classList.add('reveal-visible'));
                } else {
                    eventCards.forEach(card => card.classList.remove('reveal-visible'));
                }
            });
        }, { root: null, threshold: 0.15 });
        eventsObserver.observe(eventsGrid);
    }

    // ACTIVITIES SCROLL TRACKER
    const track = document.getElementById("activities-track");
    const prevBtn = document.getElementById("slide-prev");
    const nextBtn = document.getElementById("slide-next");
    const cards = document.querySelectorAll(".activity-card");
    const dotsContainer = document.getElementById("slider-dots");

    if (track && prevBtn && nextBtn && cards.length > 0) {
        const getScrollAmount = () => {
            const cardWidth = cards[0].getBoundingClientRect().width;
            return cardWidth + 24;
        };
        nextBtn.addEventListener("click", () => { track.scrollLeft += getScrollAmount(); });
        prevBtn.addEventListener("click", () => { track.scrollLeft -= getScrollAmount(); });
    }

    if (track && dotsContainer && cards.length > 0) {
        const updateDots = () => {
            const cardWidth = cards[0].getBoundingClientRect().width + 24;
            const currentIndex = Math.round(track.scrollLeft / cardWidth);
            const maxScrollLeft = track.scrollWidth - track.clientWidth;
            const totalSteps = Math.round(maxScrollLeft / cardWidth) + 1;
            const dots = dotsContainer.querySelectorAll(".slider-dot");

            if (dots.length !== totalSteps && totalSteps > 0) {
                dotsContainer.innerHTML = "";
                for (let i = 0; i < totalSteps; i++) {
                    const dot = document.createElement("div");
                    dot.classList.add("slider-dot");
                    if (i === currentIndex) dot.classList.add("dot-active");
                    dotsContainer.appendChild(dot);
                }
            } else {
                dots.forEach((dot, index) => {
                    dot.classList.toggle("dot-active", index === currentIndex);
                });
            }
        };

        track.addEventListener("scroll", updateDots);
        window.addEventListener("resize", updateDots);
        updateDots();
    }

    if (cards.length > 0 && track) {
        const activitiesObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    cards.forEach(card => card.classList.add("reveal-visible"));
                } else {
                    cards.forEach(card => card.classList.remove("reveal-visible"));
                }
            });
        }, { root: null, threshold: 0.1 });
        activitiesObserver.observe(track);
    }

    // STREAMING ANIMATION OBSERVER
    const animLeft = document.querySelector('.reveal-left');
    const animRight = document.querySelector('.reveal-right');
    if (animLeft && animRight) {
        const streamObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animLeft.classList.add('active');
                    animRight.classList.add('active');
                } else {
                    animLeft.classList.remove('active');
                    animRight.classList.remove('active');
                }
            });
        }, { root: null, threshold: 0.05 });
        streamObserver.observe(animLeft);
    }

    // BACKGROUND MUSIC BANNER LÓGICA
    const banner = document.getElementById("music-cookie-banner");
    const playBtn = document.getElementById("accept-music-btn");
    const skipBtn = document.getElementById("skip-music-btn");
    const music = document.getElementById("bg-music");

    if (banner) {
        banner.classList.add("active");
    }

    const closeBanner = () => {
        if (banner) {
            banner.classList.remove("active");
            banner.classList.add("fade-out");
        }
    };

    if (playBtn && music) {
        playBtn.addEventListener("click", () => {
            closeBanner();
            music.volume = 0;
            music.play().then(() => {
                let targetVolume = 0.40;
                let fadeInInterval = setInterval(() => {
                    if (music.volume < targetVolume) {
                        music.volume = Math.min(music.volume + 0.02, targetVolume);
                    } else {
                        clearInterval(fadeInInterval);
                    }
                }, 50);
            }).catch(err => console.log("Audio play blocked:", err));
        });
    }

    if (skipBtn) {
        skipBtn.addEventListener("click", () => {
            closeBanner();
        });
    }
});
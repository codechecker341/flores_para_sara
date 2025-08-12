// Script para el Jardín Mágico de Sara
// Basado en el ejemplo original pero adaptado con nuevas funcionalidades

// Detección de dispositivo móvil
const isMobile = /Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) || window.innerWidth < 768;
const isTouch = 'ontouchstart' in window;

// Prevenir zoom en móviles
if (isMobile) {
    document.addEventListener('gesturestart', function (e) {
        e.preventDefault();
    });
    
    document.addEventListener('touchstart', function(event) {
        if (event.touches.length > 1) {
            event.preventDefault();
        }
    }, { passive: false });
    
    let lastTouchEnd = 0;
    document.addEventListener('touchend', function (event) {
        const now = (new Date()).getTime();
        if (now - lastTouchEnd <= 300) {
            event.preventDefault();
        }
        lastTouchEnd = now;
    }, false);
}

// Inicialización cuando la página carga
window.onload = function() {
    // Remover la clase container para iniciar las animaciones
    document.body.classList.remove("container");
    
    // Configurar efectos básicos siempre
    if (!isMobile) {
        // Solo en desktop: efectos más complejos
        setTimeout(initializeGardenEffects, 8000);
        setTimeout(startMagicalParticles, 6000);
        setTimeout(startButterflyEffects, 10000);
    } else {
        // En móviles: efectos simplificados
        setTimeout(initializeGardenEffectsMobile, 8000);
        setTimeout(startMagicalParticlesMobile, 6000);
        setTimeout(startButterflyEffects, 10000);
    }
    
    // Configurar interactividad
    setupInteractivity();
    
    console.log("🌸 El Jardín Mágico de Sara está creciendo...");
};

// Efectos adicionales del jardín
function initializeGardenEffects() {
    // Efecto de rocío en las hojas
    createDewDrops();
    
    // Brillo aleatorio en las flores
    startFlowerGlow();
    
    // Movimiento sutil del cielo
    animateSky();
    
    console.log("✨ Efectos mágicos activados");
}

// Efectos simplificados para móviles (mejor rendimiento)
function initializeGardenEffectsMobile() {
    // Solo brillo aleatorio simple en las flores (sin rocío ni animaciones complejas)
    startFlowerGlowMobile();
    
    console.log("✨ Efectos mágicos móviles activados");
}

// Brillo simplificado para flores en móviles
function startFlowerGlowMobile() {
    const flowers = document.querySelectorAll('.flower__leafs');
    
    setInterval(() => {
        if (Math.random() > 0.8) { // Menos frecuente
            const randomFlower = flowers[Math.floor(Math.random() * flowers.length)];
            if (randomFlower) {
                // Efecto más simple sin filtros complejos
                randomFlower.style.opacity = '1.2';
                randomFlower.style.transform = 'scale(1.03)';
                
                setTimeout(() => {
                    randomFlower.style.opacity = '';
                    randomFlower.style.transform = '';
                }, 2000);
            }
        }
    }, 8000); // Menos frecuente que en desktop
}

// Partículas mágicas optimizadas para móviles
function startMagicalParticlesMobile() {
    const colors = [
        '#ffd700',     // Dorado
        '#ff69b4',     // Rosa
        '#9370db',     // Púrpura
        '#ffffff',     // Blanco
        '#32cd32'      // Verde
    ];
    
    setInterval(() => {
        if (Math.random() > 0.8) { // Menos frecuente
            createMagicalParticleMobile(colors);
        }
    }, 4000); // Menos frecuente que en desktop
}

// Crear partícula mágica individual optimizada para móvil
function createMagicalParticleMobile(colors) {
    const particle = document.createElement('div');
    const size = Math.random() * 1.2 + 0.6; // Más pequeñas
    const color = colors[Math.floor(Math.random() * colors.length)];
    const startX = Math.random() * 100;
    const startY = Math.random() * 25 + 65; // Desde el suelo hacia arriba
    
    particle.style.cssText = `
        position: fixed;
        left: ${startX}vw;
        bottom: ${startY}vh;
        width: ${size}vmin;
        height: ${size}vmin;
        background: ${color};
        border-radius: 50%;
        pointer-events: none;
        z-index: 15;
        opacity: 0.8;
        box-shadow: 0 0 2px ${color};
        animation: magicalFloatMobile 6s ease-out forwards;
    `;
    
    // Añadir animación CSS optimizada si no existe
    if (!document.querySelector('#magicalFloatMobileStyle')) {
        const style = document.createElement('style');
        style.id = 'magicalFloatMobileStyle';
        style.textContent = `
            @keyframes magicalFloatMobile {
                0% {
                    opacity: 0;
                    transform: translateY(0) translateX(0) scale(0.3);
                }
                20% {
                    opacity: 0.9;
                    transform: translateY(-12vh) translateX(-5vw) scale(1);
                }
                50% {
                    opacity: 0.7;
                    transform: translateY(-25vh) translateX(8vw) scale(0.8);
                }
                80% {
                    opacity: 0.3;
                    transform: translateY(-40vh) translateX(-3vw) scale(0.5);
                }
                100% {
                    opacity: 0;
                    transform: translateY(-60vh) translateX(0vw) scale(0.2);
                }
            }
        `;
        document.head.appendChild(style);
    }
    
    document.body.appendChild(particle);
    
    // Limpiar partícula después de la animación
    setTimeout(() => {
        if (particle && particle.parentNode) {
            particle.parentNode.removeChild(particle);
        }
    }, 6000);
}

// Crear gotas de rocío en las hojas
function createDewDrops() {
    const leaves = document.querySelectorAll('.flower__line__leaf, .flower__g-front__leaf, .long-g .leaf');
    
    setInterval(() => {
        leaves.forEach(leaf => {
            if (Math.random() > 0.85) {
                // Crear efecto de rocío temporal
                const originalBoxShadow = leaf.style.boxShadow;
                leaf.style.boxShadow = `
                    inset 2px 2px 6px rgba(255, 255, 255, 0.8),
                    2px 2px 12px rgba(135, 206, 235, 0.6),
                    0 0 8px rgba(255, 255, 255, 0.4)
                `;
                
                setTimeout(() => {
                    leaf.style.boxShadow = originalBoxShadow;
                }, 2500);
            }
        });
    }, 4000);
}

// Efecto de brillo aleatorio en las flores
function startFlowerGlow() {
    const flowers = document.querySelectorAll('.flower__leafs');
    
    setInterval(() => {
        const randomFlower = flowers[Math.floor(Math.random() * flowers.length)];
        if (randomFlower) {
            // Aplicar brillo dorado
            randomFlower.style.filter = 'brightness(1.4) drop-shadow(0 0 15px rgba(255, 215, 0, 0.8))';
            randomFlower.style.transform = 'scale(1.05)';
            
            setTimeout(() => {
                randomFlower.style.filter = '';
                randomFlower.style.transform = '';
            }, 3000);
        }
    }, 5000);
}

// Animación sutil del cielo nocturno
function animateSky() {
    const sky = document.querySelector('.night');
    let hue = 0;
    
    setInterval(() => {
        hue = (hue + 0.5) % 360;
        const filter = `blur(0.1vmin) hue-rotate(${Math.sin(hue * Math.PI / 180) * 15}deg)`;
        sky.style.filter = filter;
    }, 50000); // Cambio muy lento y sutil
}

// Partículas mágicas flotantes
function startMagicalParticles() {
    const colors = [
        'rgba(255, 215, 0, 0.8)',     // Dorado
        'rgba(255, 105, 180, 0.8)',   // Rosa
        'rgba(147, 112, 219, 0.8)',   // Púrpura
        'rgba(255, 255, 255, 0.9)',   // Blanco
        'rgba(50, 205, 50, 0.8)'      // Verde
    ];
    
    setInterval(() => {
        if (Math.random() > 0.7) {
            createMagicalParticle(colors);
        }
    }, 2500);
}

// Crear partícula mágica individual
function createMagicalParticle(colors) {
    const particle = document.createElement('div');
    const size = Math.random() * 1.5 + 0.8; // Entre 0.8 y 2.3vmin
    const color = colors[Math.floor(Math.random() * colors.length)];
    const startX = Math.random() * 100;
    const startY = Math.random() * 30 + 60; // Desde el suelo hacia arriba
    
    particle.style.cssText = `
        position: fixed;
        left: ${startX}vw;
        bottom: ${startY}vh;
        width: ${size}vmin;
        height: ${size}vmin;
        background: radial-gradient(circle, ${color}, transparent);
        border-radius: 50%;
        pointer-events: none;
        z-index: 15;
        filter: blur(0.2vmin);
        animation: magicalFloat 8s ease-out forwards;
    `;
    
    // Añadir animación CSS dinámicamente si no existe
    if (!document.querySelector('#magicalFloatStyle')) {
        const style = document.createElement('style');
        style.id = 'magicalFloatStyle';
        style.textContent = `
            @keyframes magicalFloat {
                0% {
                    opacity: 0;
                    transform: translateY(0) translateX(0) scale(0.5) rotate(0deg);
                }
                15% {
                    opacity: 1;
                    transform: translateY(-15vh) translateX(-8vw) scale(1) rotate(45deg);
                }
                50% {
                    opacity: 0.9;
                    transform: translateY(-35vh) translateX(12vw) scale(0.8) rotate(180deg);
                    filter: blur(0.3vmin);
                }
                85% {
                    opacity: 0.4;
                    transform: translateY(-55vh) translateX(-5vw) scale(0.6) rotate(270deg);
                    filter: blur(0.5vmin);
                }
                100% {
                    opacity: 0;
                    transform: translateY(-80vh) translateX(0vw) scale(0.2) rotate(360deg);
                    filter: blur(1vmin);
                }
            }
        `;
        document.head.appendChild(style);
    }
    
    document.body.appendChild(particle);
    
    // Limpiar partícula después de la animación
    setTimeout(() => {
        if (particle && particle.parentNode) {
            particle.parentNode.removeChild(particle);
        }
    }, 8000);
}

// Configurar interactividad
function setupInteractivity() {
    let clickCount = 0;
    
    // Configurar eventos dependiendo del dispositivo
    const eventType = isTouch ? 'touchstart' : 'click';
    
    // Hacer clic/touch para efectos especiales
    document.body.addEventListener(eventType, function(event) {
        // Prevenir comportamiento por defecto en móviles
        if (isTouch && isMobile) {
            event.preventDefault();
        }
        
        clickCount++;
        
        // Obtener coordenadas correctas para touch/click
        const clientX = event.clientX || (event.touches && event.touches[0] ? event.touches[0].clientX : 0);
        const clientY = event.clientY || (event.touches && event.touches[0] ? event.touches[0].clientY : 0);
        
        if (!isMobile) {
            // Solo en desktop: efectos complejos
            createClickWave(clientX, clientY);
            createParticleBurst(clientX, clientY);
        }
        
        // En ambos dispositivos: reinicio de flores (pero menos frecuente en móvil)
        const resetFrequency = isMobile ? 5 : 3;
        if (clickCount % resetFrequency === 0) {
            restartFlowerSequence();
        }
    }, { passive: false });
    
    // Efectos hover/touch solo en desktop
    if (!isMobile) {
        // Efecto hover sutil en las flores
        const flowers = document.querySelectorAll('.flower');
        flowers.forEach(flower => {
            flower.addEventListener('mouseenter', function() {
                this.style.transform = this.style.transform + ' scale(1.02)';
                this.style.filter = 'brightness(1.1)';
            });
            
            flower.addEventListener('mouseleave', function() {
                this.style.transform = this.style.transform.replace(' scale(1.02)', '');
                this.style.filter = '';
            });
        });
        
        // Configurar interacción especial con mariposas
        setupButterflyInteraction();
    } else {
        // En móviles: interacciones táctiles simplificadas
        const flowers = document.querySelectorAll('.flower');
        flowers.forEach(flower => {
            flower.addEventListener('touchstart', function(e) {
                e.preventDefault();
                this.style.transform = this.style.transform + ' scale(1.02)';
                this.style.opacity = '1.1';
                
                setTimeout(() => {
                    this.style.transform = this.style.transform.replace(' scale(1.02)', '');
                    this.style.opacity = '';
                }, 500);
            }, { passive: false });
        });
    }
}

// Crear onda desde el punto de clic
function createClickWave(x, y) {
    const wave = document.createElement('div');
    wave.style.cssText = `
        position: fixed;
        left: ${x}px;
        top: ${y}px;
        width: 20px;
        height: 20px;
        border: 2px solid rgba(255, 215, 0, 0.8);
        border-radius: 50%;
        transform: translate(-50%, -50%);
        pointer-events: none;
        z-index: 20;
        animation: clickWaveExpand 1s ease-out forwards;
    `;
    
    // Añadir animación de onda
    if (!document.querySelector('#clickWaveStyle')) {
        const style = document.createElement('style');
        style.id = 'clickWaveStyle';
        style.textContent = `
            @keyframes clickWaveExpand {
                0% {
                    transform: translate(-50%, -50%) scale(1);
                    opacity: 0.8;
                }
                100% {
                    transform: translate(-50%, -50%) scale(15);
                    opacity: 0;
                }
            }
        `;
        document.head.appendChild(style);
    }
    
    document.body.appendChild(wave);
    
    setTimeout(() => {
        if (wave && wave.parentNode) {
            wave.parentNode.removeChild(wave);
        }
    }, 1000);
}

// Reiniciar secuencia de algunas flores
function restartFlowerSequence() {
    const flowers = document.querySelectorAll('.flower');
    const selectedFlowers = [];
    
    // Seleccionar 2-3 flores aleatoriamente
    for (let i = 0; i < Math.min(3, flowers.length); i++) {
        const randomIndex = Math.floor(Math.random() * flowers.length);
        if (!selectedFlowers.includes(flowers[randomIndex])) {
            selectedFlowers.push(flowers[randomIndex]);
        }
    }
    
    selectedFlowers.forEach((flower, index) => {
        setTimeout(() => {
            // Ocultar temporalmente
            flower.style.transition = 'all 0.8s ease-out';
            flower.style.opacity = '0';
            flower.style.transform = flower.style.transform + ' translateY(20vmin) scale(0.8)';
            
            setTimeout(() => {
                // Restaurar
                flower.style.opacity = '1';
                flower.style.transform = flower.style.transform.replace(' translateY(20vmin) scale(0.8)', '');
                
                setTimeout(() => {
                    flower.style.transition = '';
                }, 800);
            }, 800);
        }, index * 400);
    });
}

// Crear explosión de partículas en el punto de clic
function createParticleBurst(x, y) {
    const colors = ['#ffd700', '#ff69b4', '#9370db', '#ffffff', '#32cd32'];
    const particleCount = 8;
    
    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        const angle = (360 / particleCount) * i;
        const distance = Math.random() * 100 + 50;
        const size = Math.random() * 1 + 0.5;
        
        particle.style.cssText = `
            position: fixed;
            left: ${x}px;
            top: ${y}px;
            width: ${size}vmin;
            height: ${size}vmin;
            background: ${colors[Math.floor(Math.random() * colors.length)]};
            border-radius: 50%;
            pointer-events: none;
            z-index: 15;
            transform: translate(-50%, -50%);
            animation: burstParticle 1.5s ease-out forwards;
            --angle: ${angle}deg;
            --distance: ${distance}px;
        `;
        
        document.body.appendChild(particle);
        
        setTimeout(() => {
            if (particle && particle.parentNode) {
                particle.parentNode.removeChild(particle);
            }
        }, 1500);
    }
    
    // Añadir animación de burst si no existe
    if (!document.querySelector('#burstParticleStyle')) {
        const style = document.createElement('style');
        style.id = 'burstParticleStyle';
        style.textContent = `
            @keyframes burstParticle {
                0% {
                    opacity: 1;
                    transform: translate(-50%, -50%) rotate(var(--angle)) translateY(0) scale(1);
                }
                100% {
                    opacity: 0;
                    transform: translate(-50%, -50%) rotate(var(--angle)) translateY(calc(var(--distance) * -1)) scale(0.3);
                }
            }
        `;
        document.head.appendChild(style);
    }
}

// Funciones de utilidad para debugging
function pauseAnimations() {
    document.body.classList.add('container');
    console.log("⏸️ Animaciones pausadas");
}

function resumeAnimations() {
    document.body.classList.remove('container');
    console.log("▶️ Animaciones reanudadas");
}

// Función para crear efectos estacionales (bonus)
function createSeasonalEffect(season = 'spring') {
    const effects = {
        spring: () => {
            // Pétalos cayendo
            for (let i = 0; i < 15; i++) {
                setTimeout(() => createFallingPetal(), i * 200);
            }
        },
        summer: () => {
            // Luciérnagas
            for (let i = 0; i < 10; i++) {
                setTimeout(() => createFirefly(), i * 300);
            }
        },
        winter: () => {
            // Copos de nieve
            for (let i = 0; i < 20; i++) {
                setTimeout(() => createSnowflake(), i * 150);
            }
        }
    };
    
    if (effects[season]) {
        effects[season]();
        console.log(`🌸 Efecto estacional activado: ${season}`);
    }
}

function createFallingPetal() {
    const petal = document.createElement('div');
    petal.style.cssText = `
        position: fixed;
        left: ${Math.random() * 100}vw;
        top: -5vh;
        width: ${Math.random() * 1 + 0.5}vmin;
        height: ${Math.random() * 1.5 + 0.8}vmin;
        background: linear-gradient(45deg, #ffb6c1, #ff69b4);
        border-radius: 50% 50% 50% 50% / 60% 60% 40% 40%;
        pointer-events: none;
        z-index: 5;
        animation: petalFall ${Math.random() * 3 + 4}s ease-in forwards;
    `;
    
    document.body.appendChild(petal);
    
    setTimeout(() => {
        if (petal && petal.parentNode) {
            petal.parentNode.removeChild(petal);
        }
    }, 7000);
}

// Añadir estilos para pétalos cayendo
if (!document.querySelector('#petalFallStyle')) {
    const style = document.createElement('style');
    style.id = 'petalFallStyle';
    style.textContent = `
        @keyframes petalFall {
            0% {
                transform: translateY(0) rotate(0deg);
                opacity: 1;
            }
            100% {
                transform: translateY(110vh) rotate(360deg);
                opacity: 0.3;
            }
        }
    `;
    document.head.appendChild(style);
}

// Efectos específicos para mariposas
function startButterflyEffects() {
    const butterflies = document.querySelectorAll('.butterfly');
    
    if (!isMobile) {
        // Versión completa para desktop
        // Brillo intermitente en las mariposas
        setInterval(() => {
            const randomButterfly = butterflies[Math.floor(Math.random() * butterflies.length)];
            if (randomButterfly) {
                randomButterfly.style.filter = 'brightness(1.6) drop-shadow(0 0 20px rgba(255, 215, 0, 0.9))';
                randomButterfly.style.transform = randomButterfly.style.transform + ' scale(1.1)';
                
                setTimeout(() => {
                    randomButterfly.style.filter = '';
                    randomButterfly.style.transform = randomButterfly.style.transform.replace(' scale(1.1)', '');
                }, 2500);
            }
        }, 6000);
        
        // Crear partículas de polvo mágico desde las mariposas
        setInterval(() => {
            butterflies.forEach((butterfly, index) => {
                if (Math.random() > 0.8) {
                    createButterflyDust(butterfly, index);
                }
            });
        }, 3000);
    } else {
        // Versión simplificada para móviles
        setInterval(() => {
            if (Math.random() > 0.7) {
                const randomButterfly = butterflies[Math.floor(Math.random() * butterflies.length)];
                if (randomButterfly) {
                    // Efecto simple sin filtros complejos
                    randomButterfly.style.opacity = '1.3';
                    randomButterfly.style.transform = randomButterfly.style.transform + ' scale(1.05)';
                    
                    setTimeout(() => {
                        randomButterfly.style.opacity = '';
                        randomButterfly.style.transform = randomButterfly.style.transform.replace(' scale(1.05)', '');
                    }, 2000);
                }
            }
        }, 8000);
    }
    
    console.log("🦋 Mariposas mágicas activadas");
}

// Crear polvo mágico desde las mariposas
function createButterflyDust(butterfly, butterflyIndex) {
    const butterflyColors = [
        ['rgba(255, 140, 0, 0.8)', 'rgba(255, 165, 0, 0.6)'], // Monarca
        ['rgba(0, 191, 255, 0.8)', 'rgba(30, 144, 255, 0.6)'], // Morpho
        ['rgba(255, 182, 193, 0.8)', 'rgba(255, 105, 180, 0.6)'], // Sakura
        ['rgba(138, 43, 226, 0.8)', 'rgba(147, 112, 219, 0.6)'], // Mystic
        ['rgba(0, 255, 127, 0.8)', 'rgba(46, 139, 87, 0.6)'] // Emerald
    ];
    
    const colors = butterflyColors[butterflyIndex] || butterflyColors[0];
    const butterflyRect = butterfly.getBoundingClientRect();
    
    for (let i = 0; i < 5; i++) {
        const dust = document.createElement('div');
        const size = Math.random() * 0.8 + 0.3;
        const color = colors[Math.floor(Math.random() * colors.length)];
        
        dust.style.cssText = `
            position: fixed;
            left: ${butterflyRect.left + butterflyRect.width/2}px;
            top: ${butterflyRect.top + butterflyRect.height/2}px;
            width: ${size}vmin;
            height: ${size}vmin;
            background: radial-gradient(circle, ${color}, transparent);
            border-radius: 50%;
            pointer-events: none;
            z-index: 12;
            filter: blur(0.2vmin);
            animation: butterflyDustFloat 4s ease-out forwards;
        `;
        
        document.body.appendChild(dust);
        
        setTimeout(() => {
            if (dust && dust.parentNode) {
                dust.parentNode.removeChild(dust);
            }
        }, 4000);
    }
    
    // Añadir animación de polvo si no existe
    if (!document.querySelector('#butterflyDustStyle')) {
        const style = document.createElement('style');
        style.id = 'butterflyDustStyle';
        style.textContent = `
            @keyframes butterflyDustFloat {
                0% {
                    opacity: 0.8;
                    transform: translateY(0) translateX(0) scale(1) rotate(0deg);
                }
                25% {
                    opacity: 0.9;
                    transform: translateY(-10vh) translateX(-5vw) scale(0.8) rotate(90deg);
                }
                50% {
                    opacity: 0.6;
                    transform: translateY(-18vh) translateX(8vw) scale(0.6) rotate(180deg);
                    filter: blur(0.4vmin);
                }
                75% {
                    opacity: 0.3;
                    transform: translateY(-25vh) translateX(-3vw) scale(0.4) rotate(270deg);
                    filter: blur(0.6vmin);
                }
                100% {
                    opacity: 0;
                    transform: translateY(-35vh) translateX(2vw) scale(0.2) rotate(360deg);
                    filter: blur(1vmin);
                }
            }
        `;
        document.head.appendChild(style);
    }
}

// Interacción especial con mariposas
function setupButterflyInteraction() {
    const butterflies = document.querySelectorAll('.butterfly');
    
    butterflies.forEach(butterfly => {
        butterfly.addEventListener('mouseenter', function() {
            // Efecto hover más dramático para mariposas
            this.style.transform = this.style.transform + ' scale(1.15)';
            this.style.filter = 'brightness(1.3) saturate(1.2)';
            
            // Crear burst de partículas coloridas
            const rect = this.getBoundingClientRect();
            createColorfulBurst(rect.left + rect.width/2, rect.top + rect.height/2);
        });
        
        butterfly.addEventListener('mouseleave', function() {
            this.style.transform = this.style.transform.replace(' scale(1.15)', '');
            this.style.filter = '';
        });
    });
}

// Burst colorido específico para mariposas
function createColorfulBurst(x, y) {
    const colors = ['#ffd700', '#ff69b4', '#9370db', '#00bfff', '#32cd32', '#ff4500'];
    const particleCount = 12;
    
    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        const angle = (360 / particleCount) * i;
        const distance = Math.random() * 80 + 40;
        const size = Math.random() * 0.8 + 0.4;
        
        particle.style.cssText = `
            position: fixed;
            left: ${x}px;
            top: ${y}px;
            width: ${size}vmin;
            height: ${size}vmin;
            background: ${colors[Math.floor(Math.random() * colors.length)]};
            border-radius: 50%;
            pointer-events: none;
            z-index: 20;
            transform: translate(-50%, -50%);
            animation: colorfulBurst 2s ease-out forwards;
            --angle: ${angle}deg;
            --distance: ${distance}px;
        `;
        
        document.body.appendChild(particle);
        
        setTimeout(() => {
            if (particle && particle.parentNode) {
                particle.parentNode.removeChild(particle);
            }
        }, 2000);
    }
    
    // Añadir animación si no existe
    if (!document.querySelector('#colorfulBurstStyle')) {
        const style = document.createElement('style');
        style.id = 'colorfulBurstStyle';
        style.textContent = `
            @keyframes colorfulBurst {
                0% {
                    opacity: 1;
                    transform: translate(-50%, -50%) rotate(var(--angle)) translateY(0) scale(1);
                }
                100% {
                    opacity: 0;
                    transform: translate(-50%, -50%) rotate(var(--angle)) translateY(calc(var(--distance) * -1)) scale(0.2);
                }
            }
        `;
        document.head.appendChild(style);
    }
}

// Exposer funciones globales para interacción manual
window.saraGarden = {
    pauseAnimations,
    resumeAnimations,
    createSeasonalEffect,
    createMagicalParticle: () => createMagicalParticle(['rgba(255, 215, 0, 0.9)']),
    createButterflyDust: () => {
        const butterflies = document.querySelectorAll('.butterfly');
        butterflies.forEach((butterfly, index) => createButterflyDust(butterfly, index));
    },
    restartGarden: () => {
        document.body.classList.add('container');
        setTimeout(() => {
            document.body.classList.remove('container');
        }, 500);
    }
};

console.log("🌸✨ Jardín Mágico de Sara inicializado. Usa 'saraGarden' en la consola para funciones especiales.");

/* ==========================================================================
   DESPEDIDA DE SOLTERA - DANIELA
   Lógica JavaScript Principal (ES6)
   - Canvas de Partículas Brilla-Brilla
   - Contador en Tiempo Real (CountDown hacia el 01.08.2026 13:30)
   - Control de Audio de Ambiente (Play/Pause)
   - Confirmación por WhatsApp Directa a 8115340356 (Sección Centrada al Final)
   - Swiper Gallery con Fotografías Reales
   - Micro-interacciones y Scroll Suave
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {

  // --------------------------------------------------------------------------
  // 1. CONFIGURACIÓN DEL EVENTO Y FECHA OBJETIVO
  // --------------------------------------------------------------------------
  // Fecha objetivo: Sábado 01 de Agosto de 2026 a las 1:30 PM (13:30 hrs)
  const targetDate = new Date('2026-08-01T13:30:00').getTime();
  const confirmationPhoneNumber = '528180196790'; // Número de confirmación por WhatsApp (+52 818 019 6790)

  // --------------------------------------------------------------------------
  // 2. SINTETIZADOR DE SONIDO DE BURBUJAS (WEB AUDIO API CON UNLOCK AUTOMÁTICO)
  // --------------------------------------------------------------------------
  let audioCtx = null;

  function getAudioContext() {
    if (!audioCtx) {
      const AudioContextClass = window.AudioContext || window.webkitAudioContext;
      if (AudioContextClass) {
        audioCtx = new AudioContextClass();
      }
    }
    if (audioCtx && audioCtx.state === 'suspended') {
      audioCtx.resume();
    }
    return audioCtx;
  }

  // Desbloqueo proactivo de AudioContext al primer toque/clic en cualquier lugar del sitio
  const unlockAudio = () => {
    const ctx = getAudioContext();
    if (ctx && ctx.state === 'suspended') {
      ctx.resume();
    }
  };
  ['pointerdown', 'click', 'touchstart', 'keydown'].forEach(evt => {
    window.addEventListener(evt, unlockAudio, { once: true });
  });

  function playBubblePopSound(customPitch = 1) {
    try {
      const ctx = getAudioContext();
      if (!ctx) return;

      const now = ctx.currentTime;

      // Oscilador 1: Deslizamiento rápido de agudo a grave (efecto plop / pop de agua)
      const osc1 = ctx.createOscillator();
      const gain1 = ctx.createGain();

      const startFreq = (950 + Math.random() * 250) * customPitch;
      const endFreq = (180 + Math.random() * 60) * customPitch;

      osc1.type = 'sine';
      osc1.frequency.setValueAtTime(startFreq, now);
      osc1.frequency.exponentialRampToValueAtTime(endFreq, now + 0.08);

      // Envolvente de volumen clara y definida
      gain1.gain.setValueAtTime(0.75, now);
      gain1.gain.exponentialRampToValueAtTime(0.001, now + 0.09);

      osc1.connect(gain1);
      gain1.connect(ctx.destination);

      // Oscilador 2: Armónico de resonancia de jabón/cristal
      const osc2 = ctx.createOscillator();
      const gain2 = ctx.createGain();

      osc2.type = 'triangle';
      osc2.frequency.setValueAtTime(startFreq * 1.4, now);
      osc2.frequency.exponentialRampToValueAtTime(endFreq * 1.1, now + 0.06);

      gain2.gain.setValueAtTime(0.35, now);
      gain2.gain.exponentialRampToValueAtTime(0.001, now + 0.06);

      osc2.connect(gain2);
      gain2.connect(ctx.destination);

      osc1.start(now);
      osc2.start(now);
      osc1.stop(now + 0.095);
      osc2.stop(now + 0.065);
    } catch (e) {
      console.log('AudioContext bubble sound error:', e);
    }
  }

  // --------------------------------------------------------------------------
  // 3. CANVAS DE BURBUJAS Y CORAZONES INTERACTIVOS (HERO ANIMATION)
  // --------------------------------------------------------------------------
  const canvas = document.getElementById('particles-canvas');
  const heroSection = document.getElementById('hero');

  if (canvas) {
    const ctx = canvas.getContext('2d');
    let itemsArray = [];
    let sparklesArray = [];
    
    function resizeCanvas() {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    }
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    class FloatingItem {
      constructor() {
        this.reset();
        this.y = Math.random() * canvas.height; // Inicializar dispersos
      }

      reset() {
        this.x = Math.random() * canvas.width;
        this.y = canvas.height + Math.random() * 50;
        this.type = Math.random() > 0.45 ? 'heart' : 'bubble'; // 55% Corazones, 45% Burbujas
        this.size = this.type === 'heart' ? Math.random() * 14 + 10 : Math.random() * 16 + 8;
        this.speedY = Math.random() * 0.8 + 0.4;
        this.swaySpeed = Math.random() * 0.02 + 0.01;
        this.swayAmount = Math.random() * 1.5 + 0.5;
        this.angle = Math.random() * Math.PI * 2;
        this.alpha = Math.random() * 0.55 + 0.25;
        
        // Tonos de rosa y oro
        const pinkColors = [
          'rgba(244, 194, 201, ',
          'rgba(228, 165, 169, ',
          'rgba(212, 163, 168, ',
          'rgba(242, 214, 216, ',
          'rgba(255, 182, 193, ',
          'rgba(212, 175, 55, '
        ];
        this.colorPrefix = pinkColors[Math.floor(Math.random() * pinkColors.length)];
      }

      update() {
        this.y -= this.speedY;
        this.angle += this.swaySpeed;
        this.x += Math.sin(this.angle) * this.swayAmount;

        if (this.y < -30) {
          this.reset();
        }
      }

      draw() {
        ctx.save();
        ctx.globalAlpha = this.alpha;

        if (this.type === 'heart') {
          // Dibujar Corazón Rosa
          const x = this.x;
          const y = this.y;
          const s = this.size;
          ctx.fillStyle = this.colorPrefix + '1)';
          ctx.beginPath();
          ctx.moveTo(x, y);
          ctx.bezierCurveTo(x - s / 2, y - s / 2, x - s, y + s / 3, x, y + s);
          ctx.bezierCurveTo(x + s, y + s / 3, x + s / 2, y - s / 2, x, y);
          ctx.closePath();
          ctx.fill();
        } else {
          // Dibujar Burbuja Rosa con Reflejo
          const x = this.x;
          const y = this.y;
          const r = this.size / 2;

          ctx.beginPath();
          ctx.arc(x, y, r, 0, Math.PI * 2);
          ctx.fillStyle = this.colorPrefix + '0.4)';
          ctx.fill();
          ctx.strokeStyle = 'rgba(255, 255, 255, 0.7)';
          ctx.lineWidth = 1;
          ctx.stroke();

          // Reflejo blanco de la burbuja
          ctx.beginPath();
          ctx.arc(x - r * 0.3, y - r * 0.3, r * 0.25, Math.PI * 1.2, Math.PI * 1.8);
          ctx.strokeStyle = 'rgba(255, 255, 255, 0.85)';
          ctx.lineWidth = 1.5;
          ctx.stroke();
        }

        ctx.restore();
      }
    }

    class PopSparkle {
      constructor(x, y, colorPrefix) {
        this.x = x;
        this.y = y;
        this.size = Math.random() * 5 + 2;
        this.speedX = (Math.random() - 0.5) * 8;
        this.speedY = (Math.random() - 0.5) * 8;
        this.alpha = 1;
        this.colorPrefix = colorPrefix;
      }

      update() {
        this.x += this.speedX;
        this.y += this.speedY;
        this.alpha -= 0.04;
      }

      draw() {
        if (this.alpha <= 0) return;
        ctx.save();
        ctx.globalAlpha = Math.max(0, this.alpha);
        ctx.fillStyle = this.colorPrefix + '1)';
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }
    }

    function initFloatingItems() {
      itemsArray = [];
      const numberOfItems = Math.min(Math.floor(window.innerWidth / 20), 45);
      for (let i = 0; i < numberOfItems; i++) {
        itemsArray.push(new FloatingItem());
      }
    }
    initFloatingItems();

    function handleCanvasInteraction(clientX, clientY) {
      unlockAudio();

      const rect = canvas.getBoundingClientRect();
      const clickX = clientX - rect.left;
      const clickY = clientY - rect.top;

      let poppedCount = 0;
      itemsArray.forEach(item => {
        const dx = clickX - item.x;
        const dy = clickY - item.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        
        // Área de colisión ampliada para facilidad de toque
        if (dist < Math.max(item.size * 2.2, 40)) {
          poppedCount++;
          for (let i = 0; i < 10; i++) {
            sparklesArray.push(new PopSparkle(item.x, item.y, item.colorPrefix));
          }
          const pitch = 0.85 + (1 - Math.min(item.size, 25) / 25);
          playBubblePopSound(pitch);
          item.reset();
        }
      });

      // Si no tocó directamente una burbuja, igual genera sonido de explosión de burbuja y destellos en el punto tocado
      if (poppedCount === 0) {
        playBubblePopSound(1.1);
        for (let i = 0; i < 8; i++) {
          sparklesArray.push(new PopSparkle(clickX, clickY, 'rgba(244, 194, 201, '));
        }
      }
    }

    // Escuchar interacción tanto en Canvas como en toda la Sección Hero
    const triggerInteraction = (e) => {
      let clientX, clientY;
      if (e.touches && e.touches.length > 0) {
        clientX = e.touches[0].clientX;
        clientY = e.touches[0].clientY;
      } else {
        clientX = e.clientX;
        clientY = e.clientY;
      }
      if (clientX !== undefined && clientY !== undefined) {
        handleCanvasInteraction(clientX, clientY);
      }
    };

    canvas.addEventListener('click', triggerInteraction);
    canvas.addEventListener('touchstart', triggerInteraction, { passive: true });
    
    if (heroSection) {
      heroSection.addEventListener('click', (e) => {
        // Evitar duplicar si se hizo clic directamente en un botón interactivo como WhatsApp
        if (e.target.closest('a, button, #music-toggle')) return;
        triggerInteraction(e);
      });
    }

    function animateFloatingItems() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      itemsArray.forEach(item => {
        item.update();
        item.draw();
      });

      // Animar y dibujar chispas de estallido
      sparklesArray = sparklesArray.filter(sparkle => sparkle.alpha > 0);
      sparklesArray.forEach(sparkle => {
        sparkle.update();
        sparkle.draw();
      });

      requestAnimationFrame(animateFloatingItems);
    }
    animateFloatingItems();
  }

  // --------------------------------------------------------------------------
  // 3. CONTROL DE AUDIO AMBIENTAL
  // --------------------------------------------------------------------------
  const bgAudio = document.getElementById('bg-audio');
  const musicToggle = document.getElementById('music-toggle');
  const musicIcon = document.getElementById('music-icon');
  const musicStateText = document.getElementById('music-state');

  let isPlaying = false;

  if (musicToggle && bgAudio) {
    musicToggle.addEventListener('click', () => {
      if (isPlaying) {
        bgAudio.pause();
        musicIcon.className = 'fas fa-music';
        musicStateText.textContent = 'Música: Off';
        isPlaying = false;
      } else {
        bgAudio.play().then(() => {
          musicIcon.className = 'fas fa-pause';
          musicStateText.textContent = 'Música: On';
          isPlaying = true;
        }).catch(err => {
          console.log('Autoplay bloqueado por el navegador', err);
        });
      }
    });
  }

  // --------------------------------------------------------------------------
  // 4. INTERACCIÓN Y APERTURA ANIMADA DEL SOBRE DE BIENVENIDA
  // --------------------------------------------------------------------------
  const envelopeOverlay = document.getElementById('envelope-overlay');
  const envelopeBox = document.getElementById('envelope-box');
  const openEnvelopeBtn = document.getElementById('open-envelope-btn');

  let envelopeOpened = false;

  function openEnvelope() {
    if (envelopeOpened) return;
    envelopeOpened = true;

    unlockAudio();

    // Reproducir sonido festivo de burbuja
    playBubblePopSound(1.35);

    // Animación 3D del sobre
    if (envelopeBox) {
      envelopeBox.classList.add('is-opening');
    }

    // Lluvia de confeti rosa/oro al abrir la invitación
    if (typeof confetti === 'function') {
      confetti({
        particleCount: 85,
        spread: 90,
        origin: { y: 0.6 },
        colors: ['#F4C2C9', '#E4A5A9', '#D4AF37', '#FAF6F1']
      });
    }

    // Iniciar reproducción de música de fondo al abrir el sobre
    if (bgAudio) {
      bgAudio.play().then(() => {
        if (musicIcon) musicIcon.className = 'fas fa-pause';
        if (musicStateText) musicStateText.textContent = 'Música: On';
        isPlaying = true;
      }).catch(err => {
        console.log('Autoplay bloqueado por navegador:', err);
      });
    }

    // Desvanecer el sobre tras la animación y mostrar la página completa
    setTimeout(() => {
      if (envelopeOverlay) {
        envelopeOverlay.classList.add('opened');
      }
    }, 950);
  }

  if (openEnvelopeBtn) {
    openEnvelopeBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      openEnvelope();
    });
  }

  if (envelopeBox) {
    envelopeBox.addEventListener('click', openEnvelope);
  }

  // --------------------------------------------------------------------------
  // 4. CUENTA REGRESIVA EN TIEMPO REAL
  // --------------------------------------------------------------------------
  const daysEl = document.getElementById('days');
  const hoursEl = document.getElementById('hours');
  const minutesEl = document.getElementById('minutes');
  const secondsEl = document.getElementById('seconds');

  function updateCountdown() {
    const now = new Date().getTime();
    const distance = targetDate - now;

    if (distance < 0) {
      if (daysEl) daysEl.textContent = '00';
      if (hoursEl) hoursEl.textContent = '00';
      if (minutesEl) minutesEl.textContent = '00';
      if (secondsEl) secondsEl.textContent = '00';
      return;
    }

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    if (daysEl) daysEl.textContent = String(days).padStart(2, '0');
    if (hoursEl) hoursEl.textContent = String(hours).padStart(2, '0');
    if (minutesEl) minutesEl.textContent = String(minutes).padStart(2, '0');
    if (secondsEl) secondsEl.textContent = String(seconds).padStart(2, '0');
  }

  setInterval(updateCountdown, 1000);
  updateCountdown();

  // --------------------------------------------------------------------------
  // 6. FORMULARIO RSVP & WHATSAPP DIRECTO (AL FINAL DE LA PÁGINA)
  // --------------------------------------------------------------------------
  let selectedAttendance = 'Sí asistiré';
  const toggleOptions = document.querySelectorAll('.btn-toggle-option');
  
  toggleOptions.forEach(btn => {
    btn.addEventListener('click', () => {
      toggleOptions.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      selectedAttendance = btn.getAttribute('data-value');
    });
  });

  const rsvpForm = document.getElementById('rsvp-form');
  if (rsvpForm) {
    rsvpForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const name = document.getElementById('guest-name').value.trim();
      const phone = document.getElementById('guest-phone').value.trim();
      const guestsCount = document.getElementById('guest-count').value;
      const comments = document.getElementById('guest-comments').value.trim();

      if (!name || !phone) {
        alert('Por favor, ingresa tu nombre y número de teléfono.');
        return;
      }

      // Confeti de celebración
      if (typeof confetti === 'function') {
        confetti({
          particleCount: 150,
          spread: 90,
          origin: { y: 0.7 }
        });
      }

      // Crear mensaje personalizado para WhatsApp
      let whatsappMessage = `*¡Hola Daniela!* ✨\n\n`;
      whatsappMessage += `Confirmación de Asistencia a tu *Despedida de Soltera* 🎉\n\n`;
      whatsappMessage += `👤 *Nombre*: ${name}\n`;
      whatsappMessage += `📱 *Teléfono*: ${phone}\n`;
      whatsappMessage += `✅ *Asistencia*: ${selectedAttendance}\n`;
      whatsappMessage += `👥 *Acompañantes*: ${guestsCount}\n`;
      if (comments) {
        whatsappMessage += `💌 *Comentarios/Mensaje*: ${comments}\n`;
      }
      whatsappMessage += `\n¡Felicidades y nos vemos pronto! 🥂💖`;

      const encodedMessage = encodeURIComponent(whatsappMessage);
      const whatsappURL = `https://api.whatsapp.com/send?phone=${confirmationPhoneNumber}&text=${encodedMessage}`;

      // Abrir WhatsApp en una nueva pestaña
      window.open(whatsappURL, '_blank');
    });
  }

  // --------------------------------------------------------------------------
  // 7. BOTÓN COPIAR DATOS BANCARIOS (MESA DE REGALOS)
  // --------------------------------------------------------------------------
  const btnCopyCard = document.getElementById('btn-copy-card');
  const copyBtnText = document.getElementById('copy-btn-text');
  if (btnCopyCard) {
    btnCopyCard.addEventListener('click', () => {
      const cardNumber = '4152314648017989';
      navigator.clipboard.writeText(cardNumber).then(() => {
        if (copyBtnText) copyBtnText.textContent = '¡Copiado!';
        btnCopyCard.style.background = '#25D366';
        setTimeout(() => {
          if (copyBtnText) copyBtnText.textContent = 'Copiar';
          btnCopyCard.style.background = 'var(--rose-gold-gradient)';
        }, 2500);
      }).catch(err => {
        console.error('Error al copiar número de tarjeta', err);
      });
    });
  }

  // --------------------------------------------------------------------------
  // 8. BOTÓN VOLVER ARRIBA & SCROLL ANIMATIONS
  // --------------------------------------------------------------------------
  const backToTopBtn = document.getElementById('back-to-top');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 400) {
      backToTopBtn.classList.add('show');
    } else {
      backToTopBtn.classList.remove('show');
    }
  });

  if (backToTopBtn) {
    backToTopBtn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  // Inicializar AOS
  if (typeof AOS !== 'undefined') {
    AOS.init({
      duration: 900,
      once: true,
      offset: 80
    });
  }
});

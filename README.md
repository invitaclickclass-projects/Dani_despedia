# 💍 Despedida de Soltera de Daniela - Invitación Virtual Premium

Sitio web interactivo y responsivo de lujo diseñado como invitación digital para la **Despedida de Soltera de Daniela**. Creado con estándares de diseño UX/UI de alta gama, animaciones fluidas, partículas brillantes, confirmación directa por WhatsApp, reproductor musical ambiental y mapa de navegación.

---

## ✨ Características Principales

1. **Apertura de Sobre Virtual 3D**: Experiencia de bienvenida con sobre esmerilado, sello de cera en oro pulido e impulsos de confeti dorado y rosa.
2. **Fondo de Partículas Animadas**: Efecto de destellos (*sparkles*) flotantes en canvas.
3. **Cuenta Regresiva en Tiempo Real**: Reloj digital calculando Días, Horas, Minutos y Segundos hasta el **01 de Agosto de 2026 a las 1:30 PM**.
4. **Confirmación RSVP por WhatsApp Directa**:
   - Envía automáticamente un mensaje formateado al número **8115340356** (`+52 811 534 0356`).
   - Incluye Nombre, Teléfono, Asistencia (Sí/No), Acompañantes y Mensaje personal.
5. **Control de Música de Ambiente**: Botón flotante discreto de reproducción y pausa (sin autoplay intrusivo).
6. **Galería de Fotos (Slider SwiperJS)**: Carrusel interactivo con fotografías en alta resolución de la novia y Save the Date.
7. **Ubicación Interactiva (Google Maps & Waze)**: Mapa interactivo del salón **Belanz Eventos** en San Nicolás de los Garza, N.L.
8. **Diseño 100% Responsivo**: Adaptación fluida para smartphones (iOS/Android), Tablets y pantallas Desktop.

---

## 🛠️ Tecnologías Utilizadas

- **HTML5 Semántico**: Con etiquetas de estructura moderna y metadatos SEO/OpenGraph para WhatsApp.
- **CSS3 Personalizado**: Variables de diseño, efecto Glassmorphism, degradados metálicos de oro rosado y media queries.
- **JavaScript ES6**: Lógica modular e interactiva.
- **GSAP (GreenSock)**: Transiciones suaves y apertura del sobre.
- **AOS (Animate On Scroll)**: Revelado progresivo de secciones al desplazarse.
- **Canvas-Confetti**: Efectos de confeti en la apertura y al confirmar asistencia.
- **SwiperJS**: Slider táctil de alta definición.
- **Font Awesome 6 & Google Fonts**: Tipografías `Cormorant Garamond`, `Great Vibes` y `Montserrat`.

---

## 📁 Estructura del Proyecto

```
despedida-soltera-web/
├── index.html                # Estructura principal de la invitación
├── css/
│   └── styles.css            # Hoja de estilos principal y paleta de colores
├── js/
│   └── main.js               # Lógica interactiva y conexión de WhatsApp
├── assets/
│   ├── images/               # Fotografía de portada, novia, pareja y salón
│   │   ├── hero_background.jpg
│   │   ├── bride_portrait.jpg
│   │   ├── couple_photo.jpg
│   │   └── venue_belanz.jpg
│   └── music/
│       └── ambient.mp3       # Canción de fondo instrumental
└── README.md                 # Documentación del proyecto
```

---

## 📝 Guía de Edición y Personalización

### 1. ¿Cómo cambiar la fecha, hora o nombre de la novia?
Abre `js/main.js` y modifica las primeras líneas:
```javascript
// Cambiar fecha objetivo (Año-Mes-DíaTHora:Minuto:Segundo)
const targetDate = new Date('2026-08-01T13:30:00').getTime();

// Cambiar número de confirmación de WhatsApp (Código de país + LADA + Número)
const confirmationPhoneNumber = '528115340356';
```

Para actualizar los textos visibles (nombres, lugar, dirección), edita las etiquetas correspondientes en `index.html`.

### 2. ¿Cómo cambiar el número de WhatsApp?
En `js/main.js`, ajusta la variable `confirmationPhoneNumber`:
```javascript
const confirmationPhoneNumber = '528115340356'; // Formato sin espacios ni guiones
```

### 3. ¿Cómo cambiar la música de fondo?
Reemplaza el archivo `assets/music/ambient.mp3` con la canción en formato `.mp3` de tu preferencia.

### 4. ¿Cómo cambiar las fotografías?
Sustituye las imágenes en la carpeta `assets/images/`:
- `hero_background.jpg`: Fondo principal de portada.
- `bride_portrait.jpg`: Foto de la novia en el slider.
- `couple_photo.jpg`: Foto de Save the Date de la pareja.
- `venue_belanz.jpg`: Foto del salón o locación.

---

## 🚀 Cómo Publicar el Sitio Web en GitHub Pages

1. Inicializa el repositorio local si aún no lo has hecho:
   ```bash
   git init
   git add .
   git commit -m "Initial commit: Invitación Virtual Despedida de Soltera Daniela"
   ```
2. Crea el repositorio en GitHub llamado **`despedida-soltera-web`**.
3. Conecta el repositorio local con GitHub:
   ```bash
   git remote add origin https://github.com/TU_USUARIO/despedida-soltera-web.git
   git branch -M main
   git push -u origin main
   ```
4. En GitHub, ve a **Settings > Pages** y en **Branch** selecciona `main` / `root`. Guarda los cambios y obtendrás la URL pública lista para enviar a tus invitados.

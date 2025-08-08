# Asociación Gremial de Técnicos Jurídicos y Afines de Chile A.G.

## Descripción

Sitio web oficial de la Asociación Gremial de Técnicos Jurídicos y Afines de Chile A.G. (AGTJACH), una organización con 20 años de trayectoria dedicada a construir el futuro y la dignidad de la profesión técnico-jurídica en Chile.

## Características

### 🎨 Diseño
- **Diseño responsivo** que se adapta a todos los dispositivos
- **Paleta de colores profesional** (azul marino y dorado)
- **Tipografía moderna** con Google Fonts (Inter y Playfair Display)
- **Iconografía SVG** para mejor rendimiento
- **Animaciones suaves** con ScrollReveal

### 📱 Funcionalidades
- **Navegación móvil** con menú hamburguesa
- **Scroll suave** entre secciones
- **Formularios interactivos** para membresía y contacto
- **Sistema de notificaciones** para feedback del usuario
- **Botón de scroll to top**
- **Lazy loading** para imágenes
- **Búsqueda en tiempo real** (preparado para implementación)

### 🔧 Tecnologías
- **HTML5** semántico y accesible
- **CSS3** con variables personalizadas y Grid/Flexbox
- **JavaScript ES6+** vanilla (sin frameworks)
- **ScrollReveal** para animaciones
- **Live Server** para desarrollo

## Estructura del Proyecto

```
web2a/
├── assets/
│   ├── css/
│   │   └── styles.css          # Estilos principales
│   ├── js/
│   │   └── main.js             # JavaScript principal
│   └── images/                 # Imágenes del sitio
├── index.html                  # Página principal
├── package.json               # Configuración del proyecto
└── README.md                  # Documentación
```

## Instalación y Uso

### Prerrequisitos
- Node.js (versión 16 o superior)
- npm (versión 8 o superior)

### Instalación

1. **Clonar o descargar el proyecto**
   ```bash
   cd web2a
   ```

2. **Instalar dependencias**
   ```bash
   npm install
   ```

3. **Iniciar servidor de desarrollo**
   ```bash
   npm run dev
   ```

4. **Abrir en el navegador**
   - El sitio estará disponible en: `http://localhost:3000`
   - Se abrirá automáticamente en tu navegador predeterminado

### Scripts Disponibles

- `npm run dev` - Inicia el servidor de desarrollo en puerto 3000
- `npm start` - Alias para `npm run dev`
- `npm run preview` - Inicia el servidor en puerto 3001 para vista previa
- `npm run build` - Comando de construcción (placeholder)

## Secciones del Sitio

### 🏠 Inicio (Hero)
- Presentación principal de la asociación
- Call-to-action para conocer más

### 👥 Quiénes Somos
- Historia y propósito de la asociación
- Información sobre la trayectoria de 20 años

### 📰 Noticias
- Últimas noticias y actualizaciones
- Enlaces a fuentes externas

### 📋 Directorio
- Directorio actual de la asociación
- Información de contacto de los miembros

### 🤝 Membresía
- Formulario de solicitud de membresía
- Beneficios de ser socio
- Proceso de afiliación

### 📚 Recursos
- Documentos legales
- Plantillas y formularios
- Acceso diferenciado (público/socios)

### 📞 Contacto
- Información de contacto
- Formulario de contacto
- Ubicación (próximamente)

## Personalización

### Colores
Los colores principales se definen en las variables CSS en `assets/css/styles.css`:

```css
:root {
    --primary-color: #1a365d;      /* Azul marino */
    --secondary-color: #b8860b;    /* Dorado */
    --accent-color: #2c5282;       /* Azul acento */
    /* ... más variables */
}
```

### Tipografía
- **Títulos**: Playfair Display (serif)
- **Texto**: Inter (sans-serif)

### Responsive Design
El sitio está optimizado para:
- 📱 Móviles (320px+)
- 📱 Tablets (768px+)
- 💻 Laptops (1024px+)
- 🖥️ Escritorio (1440px+)

## Funcionalidades JavaScript

### Navegación
- Menú móvil con animaciones
- Scroll activo en navegación
- Smooth scrolling entre secciones

### Formularios
- Validación en tiempo real
- Sistema de notificaciones
- Manejo de archivos

### Animaciones
- ScrollReveal para elementos
- Transiciones CSS suaves
- Efectos hover interactivos

### Accesibilidad
- Navegación por teclado
- Soporte para lectores de pantalla
- Contraste adecuado
- Focus management

## Optimizaciones

### Rendimiento
- **Lazy loading** para imágenes
- **Throttling** en eventos de scroll
- **CSS optimizado** con variables
- **JavaScript modular**

### SEO
- **HTML semántico**
- **Meta tags** apropiados
- **Estructura de headings** correcta
- **Alt text** en imágenes

## Navegadores Soportados

- ✅ Chrome (últimas 2 versiones)
- ✅ Firefox (últimas 2 versiones)
- ✅ Safari (últimas 2 versiones)
- ✅ Edge (últimas 2 versiones)
- ✅ Móviles iOS/Android

## Contribución

Para contribuir al proyecto:

1. Fork del repositorio
2. Crear una rama para tu feature (`git checkout -b feature/nueva-funcionalidad`)
3. Commit de tus cambios (`git commit -am 'Agregar nueva funcionalidad'`)
4. Push a la rama (`git push origin feature/nueva-funcionalidad`)
5. Crear un Pull Request

## Licencia

Este proyecto está bajo la Licencia MIT. Ver el archivo `LICENSE` para más detalles.

## Contacto

**Asociación Gremial de Técnicos Jurídicos y Afines de Chile A.G.**
- 📧 Email: contacto@juridicosag.cl
- 🌐 Web: [En desarrollo]

---

*Desarrollado con ❤️ para la comunidad de técnicos jurídicos de Chile*

## Changelog

### v1.0.0 (2025-01-07)
- ✨ Lanzamiento inicial del sitio web
- 🎨 Diseño responsivo completo
- 📱 Funcionalidades móviles
- 📝 Formularios interactivos
- 🔍 Preparación para búsqueda
- ♿ Mejoras de accesibilidad
- 🚀 Optimizaciones de rendimiento

## Próximas Funcionalidades

- [ ] Sistema de autenticación para socios
- [ ] Panel de administración
- [ ] Blog/noticias dinámico
- [ ] Galería de eventos
- [ ] Sistema de pagos en línea
- [ ] API REST para contenido dinámico
- [ ] PWA (Progressive Web App)
- [ ] Integración con redes sociales
- [ ] Sistema de notificaciones push
- [ ] Multiidioma (español/inglés)

---

**¡Gracias por visitar nuestro sitio web!**
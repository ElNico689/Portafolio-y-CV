# Nicolas Figueroa · Portafolio Profesional 🚀

Portafolio profesional online desarrollado con HTML5, CSS3 y JavaScript puro.
Diseñado para subirse a **GitHub Pages** sin configuración adicional.

## 📁 Estructura del proyecto

```
nicolas-portfolio/
├── index.html          ← Página principal (toda la estructura)
├── style.css           ← Estilos y animaciones
├── script.js           ← Interactividad y efectos
├── README.md           ← Este archivo
└── assets/
    └── cv-nicolas-figueroa.pdf   ← ⚠️ REEMPLAZAR con el CV real
```

## 🚀 Cómo subir a GitHub Pages

1. Crear un repositorio en GitHub (ej: `mi-portafolio` o `tu-usuario.github.io`)
2. Subir todos los archivos al repositorio
3. Ir a **Settings → Pages**
4. En **Branch**, seleccionar `main` y carpeta `/ (root)`
5. Guardar — ¡listo! El sitio estará en `https://tu-usuario.github.io/tu-repo`

## ✅ Pendientes para personalizar

### 1. Foto de perfil real
- Guardar la foto como `assets/foto-nicolas.jpg`
- En `index.html`, reemplazar el bloque `.avatar-img` por:
  ```html
  <div class="avatar-img">
    <img src="assets/foto-nicolas.jpg" alt="Nicolas Figueroa" />
  </div>
  ```

### 2. Hoja de vida en PDF
- Guardar como `assets/cv-nicolas-figueroa.pdf`
- El botón de descarga ya apunta a esa ruta
- En el área de CV del HTML, reemplazar `.cv-placeholder` por:
  ```html
  <iframe src="assets/cv-nicolas-figueroa.pdf"
          title="CV Nicolas Figueroa"
          width="100%"
          height="600px"
          loading="lazy">
  </iframe>
  ```

### 3. Formulario de contacto funcional
Para enviar emails reales, conectar con **Formspree**:
1. Crear cuenta en https://formspree.io
2. Crear un endpoint
3. En `index.html`, cambiar el `<form>` a:
   ```html
   <form action="https://formspree.io/f/TU_ID" method="POST">
   ```
4. Eliminar el `id="contactForm"` y el preventDefault en script.js

## 🎨 Paleta de colores

| Variable          | Valor       | Uso               |
|-------------------|-------------|-------------------|
| `--bg`            | `#0a0b0f`   | Fondo principal   |
| `--accent`        | `#00e5ff`   | Color cian/accent |
| `--text-primary`  | `#f0f2f7`   | Texto principal   |
| `--text-secondary`| `#8892a4`   | Texto secundario  |

## 🛠️ Tecnologías usadas

- HTML5 semántico
- CSS3 (Grid, Flexbox, Custom Properties, Animations)
- JavaScript ES6+ vanilla
- Font Awesome 6.5
- Google Fonts (Syne + DM Sans + JetBrains Mono)
- Canvas API (partículas del hero)
- IntersectionObserver API (animaciones scroll)

---

Desarrollado para el curso **Introducción a los Lenguajes de Internet** · 2026

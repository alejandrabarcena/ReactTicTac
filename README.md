# 🎮 TicTacToe React.js

Un juego de TicTacToe completamente funcional construido con React.js, siguiendo un flujo de desarrollo estructurado y educativo.

![TicTacToe Game](https://img.shields.io/badge/React-18+-blue?style=for-the-badge&logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5+-blue?style=for-the-badge&logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-3+-blue?style=for-the-badge&logo=tailwindcss)

## ✨ Características

- 🎯 **Juego Completamente Funcional**: Tablero 3x3 con detección de ganador y empates
- 🎨 **Diseño Vibrante**: Interfaz con colores puros (rojo, azul, amarillo, verde)
- 🔊 **Efectos de Sonido**: Audio interactivo con Web Audio API
- 📊 **Sistema de Puntuación**: Seguimiento de victorias y empates en tiempo real
- 🔄 **Reinicio Rápido**: Botón para empezar nuevas partidas instantáneamente
- 📱 **Responsive**: Funciona perfectamente en desktop y móvil
- 🎓 **Educativo**: Panel lateral con explicaciones de conceptos React y tecnologías

## 🚀 Demo en Vivo

[Ver Demo](https://tu-proyecto.replit.app) *(Actualiza con tu URL de deploy)*

## 🛠️ Stack Tecnológico

### Frontend
- **⚛️ React 18** - Librería de JavaScript para interfaces de usuario
- **🔷 TypeScript** - Superset de JavaScript con tipado estático
- **🎨 Tailwind CSS** - Framework de CSS utility-first
- **⚡ Vite** - Build tool y servidor de desarrollo ultra-rápido
- **🔗 Wouter** - Router minimalista para React
- **📱 Lucide React** - Iconos SVG modernos

### Backend
- **Express.js** - Framework web para Node.js
- **TypeScript** - Desarrollo backend con tipado estático
- **Drizzle ORM** - ORM moderno para TypeScript
- **PostgreSQL** - Base de datos relacional (configurada)

### Desarrollo y Build
- **Node.js** - Entorno de ejecución para JavaScript
- **esbuild** - Bundler ultra-rápido para JavaScript/TypeScript
- **PostCSS** - Herramienta para transformar CSS
- **Autoprefixer** - Plugin para añadir prefijos CSS automáticamente

### UI/UX
- **Radix UI** - Componentes primitivos accesibles
- **shadcn/ui** - Biblioteca de componentes reutilizables
- **Framer Motion** - Librería de animaciones para React
- **TanStack Query** - Manejo de estado del servidor

### Audio
- **Web Audio API** - API nativa para efectos de sonido
- **AudioContext** - Generación de sonidos sintéticos

### Validación y Esquemas
- **Zod** - Validación de esquemas TypeScript-first
- **React Hook Form** - Manejo eficiente de formularios
- **@hookform/resolvers** - Integración de validadores con React Hook Form

## 📦 Instalación y Uso

### Prerrequisitos
- Node.js 18+ 
- npm o yarn

### Instalación
```bash
# Clonar el repositorio
git clone https://github.com/tu-usuario/tictactoe-react.git
cd tictactoe-react

# Instalar dependencias
npm install

# Ejecutar en modo desarrollo
npm run dev
```

### Comandos Disponibles
- `npm run dev` - Ejecutar en modo desarrollo
- `npm run build` - Construir para producción
- `npm run start` - Ejecutar servidor de producción

## 🎯 Cómo Jugar

1. **Empieza el Jugador X** - El juego siempre comienza con X
2. **Haz Clic** - Selecciona una casilla vacía para colocar tu símbolo
3. **Consigue 3 en Línea** - Horizontal, vertical o diagonal
4. **¡Gana!** - El primer jugador en alinear 3 símbolos gana
5. **Reinicia** - Usa el botón "Reiniciar Juego" para una nueva partida

## 🏗️ Estructura del Proyecto

```
├── client/                 # Frontend React
│   ├── src/
│   │   ├── pages/
│   │   │   └── tictactoe.tsx    # Componente principal del juego
│   │   ├── components/          # Componentes reutilizables
│   │   └── lib/                 # Utilidades y configuración
├── server/                 # Backend Express
├── shared/                 # Tipos y esquemas compartidos
└── README.md
```

## 🎓 Conceptos React Implementados

Este proyecto demuestra conceptos clave de React:

- **useState Hook** - Manejo de estado del tablero y puntuación
- **Event Handlers** - Manejo de clics y interacciones del usuario
- **Conditional Rendering** - Mostrar estados de juego dinámicamente
- **Array Methods** - Uso de `.map()` para renderizar casillas
- **Algoritmo de Victoria** - Lógica para detectar patrones ganadores

## 🎨 Características de Diseño

- **Colores Puros Vibrantes** - Paleta de rojo, azul, amarillo y verde intensos
- **Sin Gradientes** - Diseño minimalista con colores sólidos
- **Animaciones Suaves** - Transiciones y efectos hover
- **Iconografía Moderna** - Símbolos ✕ y ○ estilizados
- **Layout Responsive** - Adaptado para todos los tamaños de pantalla
- **Color Coding** - Azul para X, Rojo para O, con indicadores visuales claros

## 📈 Flujo de Desarrollo Seguido

1. ✅ **Diseñar Sitemap** - Páginas y vistas definidas
2. ✅ **Estructura (Wireframe)** - Componentes ubicados
3. ✅ **"Hola Mundo"** - Verificar componentes
4. ✅ **Mapear Interacciones** - Eventos de usuario
5. ✅ **Funciones de Evento** - Handlers con console.log
6. ✅ **Testing Console.log** - Verificar llamadas
7. ✅ **Implementar Lógica** - State, Props, Rendering

## 🤝 Contribuciones

¡Las contribuciones son bienvenidas! Si tienes ideas para mejorar el juego:

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/nueva-caracteristica`)
3. Commit tus cambios (`git commit -m 'Agregar nueva característica'`)
4. Push a la rama (`git push origin feature/nueva-caracteristica`)
5. Abre un Pull Request



## 👨‍💻 Autor

**Patsy The Pug Dev**
- Proyecto educativo desarrollado con React.js y TypeScript
- Enfoque en aprendizaje de conceptos fundamentales de React

---

⭐ **¡No olvides dar una estrella si te gustó el proyecto!**
# 🎮 TicTacToe React.js

Un juego de TicTacToe completamente funcional construido con React.js, siguiendo un flujo de desarrollo estructurado y educativo.

![TicTacToe Game](https://img.shields.io/badge/React-18+-blue?style=for-the-badge&logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5+-blue?style=for-the-badge&logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-3+-blue?style=for-the-badge&logo=tailwindcss)

## ✨ Características

- 🎯 **Juego Completamente Funcional**: Tablero 3x3 con detección de ganador y empates
- 🎨 **Diseño Moderno**: Interfaz colorida con gradientes y animaciones suaves
- 📊 **Sistema de Puntuación**: Seguimiento de victorias y empates en tiempo real
- 🔄 **Reinicio Rápido**: Botón para empezar nuevas partidas instantáneamente
- 📱 **Responsive**: Funciona perfectamente en desktop y móvil
- 🎓 **Educativo**: Panel lateral con explicaciones de conceptos React

## 🚀 Demo en Vivo

[Ver Demo](https://tu-proyecto.replit.app) *(Actualiza con tu URL de deploy)*

## 🛠️ Tecnologías Utilizadas

- **React.js 18** - Biblioteca de UI con hooks modernos
- **TypeScript** - Tipado estático para mayor robustez
- **Tailwind CSS** - Framework de CSS utilitario
- **Vite** - Build tool rápido y moderno
- **Express.js** - Servidor backend simple

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

- **Gradientes Coloridos** - Uso extensivo de gradientes CSS
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

## 📝 Licencia

Este proyecto está bajo la Licencia MIT. Ver `LICENSE` para más detalles.

## 👨‍💻 Autor

**Tu Nombre**
- GitHub: [@tu-usuario](https://github.com/tu-usuario)
- LinkedIn: [Tu Perfil](https://linkedin.com/in/tu-perfil)

---

⭐ **¡No olvides dar una estrella si te gustó el proyecto!**
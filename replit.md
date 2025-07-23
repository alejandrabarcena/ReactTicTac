# TicTacToe Game Application

## Overview

This is a React.js TicTacToe game built following structured development workflow. The application is designed as an educational project demonstrating React concepts, state management, and algorithm implementation. It features a clean, simple interface perfect for learning purposes and easy deployment to GitHub.

## User Preferences

Preferred communication style: Simple, everyday language.
Project goals: Create a simple, functional TicTacToe game for easy GitHub deployment.
Deploy timeline: Ready for deployment within 1 hour.
Design preference: Vibrant interface with pure colors (red, yellow, blue, green) - no gradients.
Color palette: Pure primary colors matching provided color wheel image.
Audio: Sound effects for enhanced user experience.
Documentation: Comprehensive technology stack documentation with custom icons integrated.
Visual branding: Patsy The Pug Dev signature added to footer.

## System Architecture

The application follows a monorepo structure with separate client and server directories, sharing common schemas and utilities. It uses a traditional client-server architecture with the frontend making API calls to the backend.

### Directory Structure
- `client/` - React frontend application
- `server/` - Express.js backend API
- `shared/` - Common schemas and types shared between client and server
- `migrations/` - Database migration files

## Key Components

### Frontend Architecture
- **Framework**: React 18 with TypeScript
- **Styling**: Tailwind CSS with shadcn/ui component library
- **State Management**: React hooks with TanStack Query for server state
- **Routing**: Wouter for client-side routing
- **Build Tool**: Vite for development and production builds
- **UI Components**: Radix UI primitives with custom styling

### Backend Architecture
- **Framework**: Express.js with TypeScript
- **Database ORM**: Drizzle ORM for type-safe database operations
- **Database**: PostgreSQL (configured but using in-memory storage currently)
- **Session Management**: Prepared for PostgreSQL session storage
- **API Structure**: RESTful endpoints with `/api` prefix

### Database Schema
- **Users Table**: Basic user structure with id, username, and password fields
- **ORM**: Drizzle with Zod validation for type safety
- **Migrations**: Automated migration system with drizzle-kit

## Data Flow

1. **Client Requests**: React components make API calls using TanStack Query
2. **API Processing**: Express routes handle requests and interact with storage layer
3. **Data Storage**: Currently uses in-memory storage (MemStorage class) with interface for easy database migration
4. **Response Handling**: Type-safe responses with proper error handling

## External Dependencies

### Frontend
- **UI Library**: shadcn/ui with Radix UI primitives
- **Icons**: Lucide React icons
- **Date Handling**: date-fns for date operations
- **Form Handling**: React Hook Form with Zod resolvers

### Backend
- **Database**: Neon Database serverless PostgreSQL
- **Session Store**: PostgreSQL session storage ready for implementation
- **Development**: tsx for TypeScript execution

### Build & Development
- **Build**: esbuild for server bundling, Vite for client
- **TypeScript**: Shared configuration across client and server
- **CSS**: PostCSS with Tailwind CSS and Autoprefixer

## Deployment Strategy

- **Development**: Runs both client and server with hot reloading
- **Production Build**: 
  - Client builds to `dist/public` directory
  - Server bundles to `dist/index.js` with external packages
- **Database**: Configured for PostgreSQL but currently using in-memory storage
- **Environment**: Uses DATABASE_URL environment variable for database connection

### Build Commands
- `dev`: Development mode with tsx
- `build`: Production build for both client and server
- `start`: Production server startup
- `db:push`: Database schema synchronization

The application is structured to easily transition from in-memory storage to PostgreSQL database by switching the storage implementation in the server layer.

## Recent Updates (January 2025)

- **Pure Color Redesign**: Completely converted from gradients to pure vibrant colors (red #DC2626, blue #3B82F6, yellow #EAB308, green #22C55E)
- **Technology Icons Integration**: Added custom icons for React, TypeScript, Vite, GitHub, and development tools in Stack Tecnológico panel
- **Brand Integration**: Integrated Patsy The Pug Dev signature and branding in footer
- **Enhanced Documentation**: Updated README.md with visual icons and accurate color scheme description
- **Audio Implementation**: Complete Web Audio API integration for moves, wins, draws, and reset actions
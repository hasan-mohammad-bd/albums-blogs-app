# Blog & Albums Application

A modern React-based web application for browsing blog posts and photo albums with user filtering and pagination capabilities.

## Project Overview

This application provides a clean interface for users to:
- Browse blog posts with author filtering and pagination
- View photo albums with modal previews
- Like/unlike blog posts with persistent storage
- Navigate between different sections seamlessly

## Technologies Used

### Core Framework
- **React 19** - Component-based UI library
- **TypeScript** - Type-safe JavaScript
- **Vite** - Fast build tool and development server

### Styling & UI
- **Tailwind CSS** - Utility-first CSS framework
- **Custom UI Components** - Built from scratch without external UI libraries
- **Responsive Design** - Mobile-first approach

### State Management & Data Fetching
- **React Hooks** - Built-in state management (useState, useEffect, useMemo)
- **Custom Hooks** - Reusable logic for posts, albums, and likes
- **Local Storage** - Persistent like functionality

### Routing
- **React Router DOM** - Client-side routing

### External APIs
- **JSONPlaceholder API** - Mock REST API for posts, albums, users, and photos

### Development Tools
- **ESLint** - Code linting
- **PostCSS** - CSS processing

## Key Assumptions

### Data Structure
- Posts are fetched from JSONPlaceholder API with user information merged
- Albums contain photos with thumbnail and full-size URLs
- Users have unique IDs that link to posts and albums
- All external images may fail to load (placeholder handling implemented)

### User Experience
- 5 posts per page for optimal reading experience
- 10 albums per page for gallery browsing
- Like functionality persists across browser sessions
- Author filtering resets pagination to page 1
- Modal shows first 5 photos of each album for quick preview

### Technical Decisions
- No external UI library dependencies (custom components built with Tailwind)
- Client-side filtering and pagination for better performance
- Error boundaries for graceful failure handling
- Responsive design supporting mobile, tablet, and desktop views

### API Limitations
- JSONPlaceholder is a mock API with limited real-world data
- Some image URLs may not resolve (handled with placeholder fallbacks)
- No real authentication or user management
- Data is read-only (likes stored locally only)

## Project Structure

```
src/
├── components/ui/     # Custom UI components (Button, Card, Select, etc.)
├── hooks/            # Custom React hooks for data fetching
├── pages/            # Page components (Blogs, Albums, etc.)
├── services/         # API service functions
├── types/            # TypeScript type definitions
└── lib/              # Utility functions
```

## Getting Started

1. Clone the repository
2. Install dependencies: `npm install`
3. Start development server: `npm run dev`
4. Open http://localhost:5173 in your browser

## 🚀 Live Preview

👉 [Click here to view the live site]()

## Browser Support

- Modern browsers with ES6+ support
- Mobile browsers (iOS Safari, Android Chrome)
- Desktop browsers (Chrome, Firefox, Safari, Edge)
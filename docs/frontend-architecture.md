# DIY Visual Finder - Frontend Architecture

## Overview

The frontend is a modern React application built with TypeScript, providing an intuitive interface for managing DIY inventory through AI-powered image analysis and natural language search. The application uses a component-based architecture with clear separation of concerns.

## Technology Stack

- **React 18** - Component-based UI framework
- **TypeScript** - Type-safe development
- **Vite** - Fast build tool and dev server
- **Tailwind CSS** - Utility-first styling
- **Radix UI** - Accessible component primitives
- **Axios** - HTTP client for API communication
- **Lucide React** - Icon library

## Project Structure

```
frontend/
├── src/
│   ├── components/
│   │   ├── layout/
│   │   │   └── Sidebar.tsx          # Navigation sidebar
│   │   ├── ui/                      # Reusable UI components
│   │   │   ├── avatar.tsx
│   │   │   ├── badge.tsx
│   │   │   ├── button.tsx
│   │   │   ├── card.tsx
│   │   │   ├── input.tsx
│   │   │   ├── label.tsx
│   │   │   └── tabs.tsx
│   │   └── views/                   # Main application views
│   │       ├── AddItemView.tsx      # Item upload and AI analysis
│   │       ├── ChatView.tsx         # Natural language chat interface
│   │       ├── DashboardView.tsx    # Main dashboard with item overview
│   │       ├── LoginView.tsx        # User authentication
│   │       └── SearchView.tsx       # Visual search interface
│   ├── lib/
│   │   ├── api.ts                   # API client and endpoints
│   │   └── utils.ts                 # Utility functions
│   ├── App.tsx                      # Main application component
│   ├── index.css                    # Global styles
│   └── main.tsx                     # Application entry point
├── package.json
├── tailwind.config.js
├── tsconfig.json
└── vite.config.ts
```

## Component Architecture

### Layout Components

#### Sidebar.tsx
- **Purpose**: Main navigation component
- **Features**: 
  - Responsive navigation menu
  - Active state management
  - User profile section
- **Props**: None (uses internal state)

### View Components

#### LoginView.tsx
- **Purpose**: User authentication interface
- **Features**:
  - Login and registration forms
  - Form validation
  - Error handling
  - Token management
- **State Management**: Local component state with useState

#### DashboardView.tsx
- **Purpose**: Main application dashboard
- **Features**:
  - Item overview cards
  - Quick statistics
  - Recent activity
  - Quick action buttons
- **Data Flow**: Fetches user items via API

#### AddItemView.tsx
- **Purpose**: Item upload and AI analysis
- **Features**:
  - Drag-and-drop image upload
  - Base64 encoding
  - AI analysis progress
  - Form for manual item details
- **API Integration**: POST /api/items/add

#### SearchView.tsx
- **Purpose**: Visual similarity search
- **Features**:
  - Image upload for search
  - Search results display
  - Similarity scores
  - Item details modal
- **API Integration**: POST /api/search

#### ChatView.tsx
- **Purpose**: Natural language chat interface
- **Features**:
  - Chat message history
  - Suggested questions
  - Real-time responses
  - Function calling integration
- **API Integration**: POST /api/chat

### UI Components

The application uses a consistent set of reusable UI components built on Radix UI primitives:

- **Button**: Consistent button styling and variants
- **Card**: Content containers with consistent spacing
- **Input**: Form input fields with validation states
- **Label**: Accessible form labels
- **Avatar**: User profile images
- **Badge**: Status indicators and tags
- **Tabs**: Tabbed interface components

## State Management

### Local State
- **useState**: Component-level state for forms, UI interactions
- **useEffect**: Side effects, API calls, lifecycle management

### Global State
- **Context API**: User authentication state
- **localStorage**: Persistent user session data

### Data Flow
1. User interactions trigger component state updates
2. API calls are made through the centralized API client
3. Responses update component state and trigger re-renders
4. Error states are handled at the component level

## API Integration

### API Client (lib/api.ts)
Centralized HTTP client using Axios with:
- Base URL configuration
- Request/response interceptors
- Error handling
- Authentication token management

### Endpoints
- **Authentication**: `/api/login`, `/api/register`
- **Items**: `/api/items/add`, `/api/items/{user_id}`
- **Search**: `/api/search`
- **Chat**: `/api/chat`

## Styling Architecture

### Tailwind CSS
- Utility-first approach
- Consistent design system
- Responsive design patterns
- Dark/light mode support (configurable)

### Component Styling
- CSS-in-JS with Tailwind classes
- Conditional styling based on state
- Consistent spacing and typography
- Accessible color contrast

## Performance Considerations

### Code Splitting
- Route-based code splitting with React.lazy
- Component-level lazy loading for heavy components

### Image Handling
- Base64 encoding for small images
- Compression for large uploads
- Lazy loading for search results

### State Optimization
- Memoization with useMemo and useCallback
- Efficient re-rendering patterns
- Debounced search inputs

## Accessibility

### ARIA Support
- Proper ARIA labels and roles
- Keyboard navigation support
- Screen reader compatibility

### Semantic HTML
- Proper heading hierarchy
- Form labels and descriptions
- Focus management

## Error Handling

### API Errors
- Centralized error handling in API client
- User-friendly error messages
- Retry mechanisms for failed requests

### Form Validation
- Client-side validation with TypeScript
- Real-time feedback
- Accessibility-compliant error announcements

## Development Workflow

### TypeScript Configuration
- Strict type checking
- Path mapping for clean imports
- Interface definitions for API responses

### Build Process
- Vite for fast development and building
- TypeScript compilation
- CSS processing with PostCSS
- Asset optimization

### Code Quality
- ESLint configuration
- Prettier formatting
- TypeScript strict mode
- Component prop validation

## Testing Strategy

### Unit Testing
- Component testing with React Testing Library
- API client testing
- Utility function testing

### Integration Testing
- User flow testing
- API integration testing
- Cross-browser compatibility

## Deployment

### Build Process
```bash
npm run build
```

### Environment Configuration
- Development: `npm run dev`
- Production: Optimized build with minification
- Environment variables for API endpoints

## Future Enhancements

### Planned Features
- Offline support with service workers
- Progressive Web App capabilities
- Advanced search filters
- Bulk item operations
- Export/import functionality

### Performance Improvements
- Virtual scrolling for large item lists
- Image caching and optimization
- Background sync for offline operations
- WebSocket integration for real-time updates

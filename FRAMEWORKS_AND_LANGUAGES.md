# EchoWatt - Complete Framework, Architecture & Language List

## 📚 Table of Contents
1. [Programming Languages](#programming-languages)
2. [Frontend Frameworks & Libraries](#frontend-frameworks--libraries)
3. [Backend & Database](#backend--database)
4. [Development Tools & Build Systems](#development-tools--build-systems)
5. [Styling & UI](#styling--ui)
6. [Data Visualization](#data-visualization)
7. [State Management](#state-management)
8. [Routing](#routing)
9. [Data Export & Processing](#data-export--processing)
10. [Package Management](#package-management)
11. [Testing & Quality Assurance](#testing--quality-assurance)
12. [Deployment & Hosting](#deployment--hosting)
13. [Version Control](#version-control)
14. [Architecture Patterns](#architecture-patterns)
15. [Design Patterns](#design-patterns)

---

## Programming Languages

### 1. **TypeScript** (5.8.3)
- **Type**: Superset of JavaScript
- **Purpose**: Type-safe development, compile-time error checking
- **Files**: `.ts`, `.tsx` (React components with TypeScript)
- **Usage**: 
  - All component files
  - Context files
  - Hook definitions
  - Type definitions
- **Key Features Used**:
  - Interfaces (Device, Room, BillHistory)
  - Types
  - Generics
  - Union types
  - Optional properties

### 2. **JavaScript (ES2020+)**
- **Type**: Runtime language for browsers
- **Purpose**: Dynamic behavior, DOM manipulation
- **Transpiled From**: TypeScript
- **Runtime Environment**: Browser (Chrome, Firefox, Safari, Edge)
- **Key Features**:
  - Arrow functions
  - Destructuring
  - Spread operator
  - Async/await
  - Template literals

### 3. **JSX/TSX**
- **Type**: Syntax extension for JavaScript/TypeScript
- **Purpose**: Write HTML-like syntax in JavaScript
- **Files**: `.tsx` files in React components
- **Example**:
  ```tsx
  const Component = () => (
    <div className="container">
      <h1>Title</h1>
    </div>
  );
  ```

### 4. **HTML5**
- **Type**: Markup language
- **Purpose**: Document structure
- **File**: `index.html` (single entry point for SPA)
- **Key Elements**:
  - Semantic HTML5 tags
  - Meta tags for SEO
  - Manifest for PWA support

### 5. **CSS3**
- **Type**: Styling language
- **Purpose**: Visual presentation
- **Usage**:
  - Tailwind CSS (utility classes)
  - CSS-in-JS (inline styles in React)
  - Animation classes
- **Features**:
  - Flexbox
  - Grid
  - CSS variables
  - Media queries
  - Transitions & animations

### 6. **SQL (PostgreSQL)**
- **Type**: Database query language
- **Purpose**: Database operations
- **Hosted On**: Supabase (managed PostgreSQL)
- **Usage**:
  - CREATE TABLE (rooms, devices, bill_history)
  - SELECT, INSERT, UPDATE, DELETE queries
  - Row Level Security (RLS) policies
  - Foreign key relationships

### 7. **JSON**
- **Type**: Data interchange format
- **Purpose**: Configuration, data storage
- **Files**:
  - `package.json` (dependencies & scripts)
  - `vercel.json` (deployment config)
  - `tsconfig.json` (TypeScript config)
  - Supabase responses (API data)
- **Usage**: API responses, localStorage data, config files

### 8. **YAML**
- **Type**: Data serialization language
- **Purpose**: Configuration (implicit, used in some build configs)

---

## Frontend Frameworks & Libraries

### 1. **React** (18.3.1)
- **Type**: JavaScript library for UI
- **Purpose**: Component-based UI development
- **Key Concepts Used**:
  - Functional components
  - Hooks (useState, useContext, useEffect, useMemo)
  - Props
  - Controlled components
  - Event handling
  - Conditional rendering
  - List rendering (map)
- **Core Files**: All `.tsx` files in `src/components/` and `src/pages/`
- **Lifecycle**:
  - Component mounting
  - State updates
  - Re-rendering
  - Effects (useEffect)

### 2. **React DOM** (18.3.1)
- **Type**: React package for browser
- **Purpose**: Render React components to DOM
- **Usage**: `ReactDOM.createRoot()` in `main.tsx`

### 3. **React Router DOM** (6.30.2)
- **Type**: Client-side routing library
- **Purpose**: Navigate between pages without page reload
- **Key Features Used**:
  - `<BrowserRouter>` - Wrapper
  - `<Routes>` - Route container
  - `<Route>` - Route definition
  - `<Link>` - Navigation links
  - `useLocation()` - Get current route
  - Dynamic route parameters
- **Routes in Project**:
  - `/` - HomePage
  - `/calculator` - CalculatorPage
  - `/about` - AboutPage

### 4. **Context API**
- **Type**: Built-in React state management
- **Purpose**: Global state without external libraries
- **Contexts**:
  - `CalculatorContext` - Global calculator state
  - `ThemeContext` - Dark/light theme state
- **Pattern**: Provider → Consumer/Hook pattern

---

## Backend & Database

### 1. **Supabase** (2.86.0)
- **Type**: Open-source Firebase alternative
- **Purpose**: Backend-as-a-Service (BaaS)
- **Components Used**:
  - PostgreSQL database
  - Authentication (optional for future)
  - Real-time subscriptions (optional for future)
  - Row Level Security (RLS)
- **JavaScript Client**: `@supabase/supabase-js`

### 2. **PostgreSQL**
- **Type**: Relational database management system
- **Hosted On**: Supabase cloud
- **Project ID**: ksilqbnsyeqkcbcijein
- **Tables Created**:
  - `rooms` (user rooms)
  - `devices` (appliances in rooms)
  - `bill_history` (saved bill snapshots)
- **Features Used**:
  - Tables & columns
  - Primary keys (id)
  - Foreign keys (room_id)
  - Data types (uuid, string, integer, float, boolean, jsonb)
  - Constraints & indexes
  - Row Level Security (RLS)

### 3. **REST API** (via Supabase)
- **Type**: RESTful API
- **Purpose**: HTTP requests to database
- **Methods Used**:
  - GET (SELECT) - `supabase.from('rooms').select('*')`
  - POST (INSERT) - `supabase.from('rooms').insert({...})`
  - PUT/PATCH (UPDATE) - `supabase.from('rooms').update({...})`
  - DELETE - `supabase.from('rooms').delete()`
- **Authentication**: Anon key (public, read-only by RLS)

---

## Development Tools & Build Systems

### 1. **Vite** (5.4.19)
- **Type**: Build tool & dev server
- **Purpose**: Fast development and optimized production builds
- **Key Features Used**:
  - Hot Module Replacement (HMR)
  - Instant server start
  - Lightning-fast rebuilds
  - Optimized build output
- **Config File**: `vite.config.ts`
- **Commands**:
  - `npm run dev` - Start dev server
  - `npm run build` - Production build
  - `npm run preview` - Preview build locally

### 2. **TypeScript Compiler**
- **Type**: Language compiler
- **Purpose**: Transpile TypeScript to JavaScript
- **Config File**: `tsconfig.json`, `tsconfig.app.json`, `tsconfig.node.json`
- **Options**:
  - Target: ES2020
  - Module: ESNext
  - Strict mode enabled

### 3. **PostCSS** (8.5.6)
- **Type**: CSS transformation tool
- **Purpose**: Process CSS with JavaScript plugins
- **Config File**: `postcss.config.js`
- **Plugins Used**:
  - Tailwind CSS
  - Autoprefixer

### 4. **Autoprefixer** (10.4.21)
- **Type**: PostCSS plugin
- **Purpose**: Add vendor prefixes to CSS for browser compatibility
- **Usage**: Automatic, integrated with PostCSS

### 5. **ESLint** (9.32.0)
- **Type**: JavaScript/TypeScript linter
- **Purpose**: Code quality, style enforcement
- **Config File**: `eslint.config.js`
- **Rules Enforced**:
  - Unused variables
  - Type correctness
  - Best practices
  - React hooks rules

### 6. **Node.js** (18+)
- **Type**: JavaScript runtime
- **Purpose**: Run development tools and build process
- **Usage**: Running npm scripts, building with Vite

### 7. **npm/Bun**
- **Type**: Package manager
- **Purpose**: Install and manage dependencies
- **Lock File**: `package-lock.json` or `bun.lockb`

---

## Styling & UI

### 1. **Tailwind CSS** (3.4.17)
- **Type**: Utility-first CSS framework
- **Purpose**: Rapid UI development with pre-built classes
- **Config File**: `tailwind.config.ts`
- **Key Features Used**:
  - Utility classes (bg-, text-, p-, m-, etc.)
  - Responsive design (md:, lg:, etc.)
  - Dark mode support
  - Custom colors & spacing
  - Animation utilities
- **Classes Used**: ~500+ throughout project
- **Example**: `className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg"`

### 2. **Radix UI** (Component Library)
- **Type**: Unstyled, accessible component library
- **Purpose**: Pre-built accessible components
- **Components Used**:
  - Alerts, dialogs, dropdowns
  - Form inputs
  - Tabs, accordions
  - Tooltips
- **Installation**: Multiple @radix-ui packages

### 3. **ShadCN UI** (Built on Radix UI + Tailwind)
- **Type**: High-level component library
- **Purpose**: Styled, accessible components
- **Components**: Card, Button, Input, Select, etc.

### 4. **CSS Modules** (Optional)
- **Type**: Scoped CSS
- **Usage**: Import CSS files as modules (if used)

---

## Data Visualization

### 1. **Recharts** (2.15.4)
- **Type**: React charting library built on D3.js
- **Purpose**: Create interactive data visualizations
- **Chart Types Used**:
  - **Pie Chart** - Cost by category
  - **Bar Chart** - Top 10 devices by cost, Energy & emissions comparison
  - **Line Chart** - Monthly bill trend
- **Components Used**:
  - `<PieChart>`, `<Pie>`
  - `<BarChart>`, `<Bar>`
  - `<LineChart>`, `<Line>`
  - `<XAxis>`, `<YAxis>`
  - `<CartesianGrid>`, `<Tooltip>`, `<Legend>`
  - `<ResponsiveContainer>` - Responsive sizing
- **Files**: `BillSummary.tsx`, `CarbonFootprint.tsx`, `BillComparison.tsx`

### 2. **D3.js** (Indirect)
- **Type**: Data-driven documents library
- **Purpose**: Low-level visualization
- **Usage**: Underlying engine for Recharts

---

## State Management

### 1. **React Context API**
- **Type**: Built-in state management
- **Purpose**: Global state without external libraries
- **Implementation**:
  - `createContext()` - Create context
  - `<Provider>` - Wrap app with provider
  - `useContext()` - Consume context in components
- **Contexts**:
  - `CalculatorContext` - 2000+ lines, handles all calculator state
  - `ThemeContext` - Theme toggle state
- **File**: `src/contexts/CalculatorContext.tsx`, `src/contexts/ThemeContext.tsx`

### 2. **useState Hook**
- **Type**: React hook for local component state
- **Usage**: Form inputs, UI toggles, local component state
- **Example**: `const [step, setStep] = useState(1)`

### 3. **useEffect Hook**
- **Type**: React hook for side effects
- **Usage**:
  - Load data from Supabase on mount
  - Save to localStorage on state change
  - Update theme classes
  - Subscribe to events
- **Dependencies**: Proper dependency arrays to prevent infinite loops

### 4. **useMemo Hook**
- **Type**: React hook for memoization
- **Usage**:
  - Expensive calculations (totals, comparisons)
  - Chart data generation
  - Prevent unnecessary re-renders
- **Example**: `const totalCost = useMemo(() => {...}, [devices])`

### 5. **useCallback Hook** (Optional)
- **Type**: React hook for memoized callbacks
- **Usage**: Prevent recreating functions on every render

### 6. **localStorage API**
- **Type**: Browser API for persistent storage
- **Purpose**: Client-side data persistence
- **Data Stored**:
  - `energyUserId` - Browser-unique user ID
  - `energyBillHistory` - Backup bill history
  - `theme` - Dark/light preference
- **Fallback**: Used if Supabase fails

---

## Routing

### 1. **React Router** (6.30.2)
- **Type**: Client-side routing library
- **Pattern**: Hash-based or History API based
- **Routes Configuration**:
  ```
  / → HomePage
  /calculator → CalculatorPage
  /about → AboutPage
  ```
- **Components**:
  - `<BrowserRouter>` - Main router wrapper
  - `<Routes>` - Route container
  - `<Route>` - Individual route
  - `<Link>` / `<NavLink>` - Navigation
- **Hooks**:
  - `useLocation()` - Get current route
  - `useNavigate()` - Programmatic navigation
  - `useParams()` - URL parameters

### 2. **SPA (Single Page Application)**
- **Type**: Architectural pattern
- **Usage**: Only one HTML file (`index.html`), navigation handled by JavaScript
- **Benefits**:
  - Fast navigation (no page reload)
  - Smooth UX
  - Better state management

### 3. **Vercel Rewrites** (vercel.json)
- **Type**: Server-side routing configuration
- **Purpose**: Route all requests to `index.html` for SPA routing
- **Config**: Catch 404s and serve `/index.html`

---

## Data Export & Processing

### 1. **XLSX** (0.18.5)
- **Type**: Excel file generation library
- **Purpose**: Export data to Excel format
- **Usage**: `exportToExcel()` function in BillSummary
- **Components Used**:
  - `XLSX.utils.json_to_sheet()` - Convert JSON to sheet
  - `XLSX.utils.book_new()` - Create workbook
  - `XLSX.utils.book_append_sheet()` - Add sheet
  - `XLSX.writeFile()` - Download file
- **Output File**: `energy-report.xlsx` with 2 sheets:
  - Device list with calculations
  - Summary statistics

### 2. **Date-fns** (3.6.0)
- **Type**: Date manipulation library
- **Purpose**: Format dates, handle date logic
- **Usage**:
  - Format month/year strings
  - Get current date
  - Date calculations

---

## Package Management

### 1. **npm** (Node Package Manager)
- **Type**: JavaScript package manager
- **Purpose**: Install and manage dependencies
- **File**: `package.json`
- **Version Management**: `package-lock.json`
- **Commands**:
  - `npm install` - Install dependencies
  - `npm run dev` - Start dev server
  - `npm run build` - Build for production
  - `npm run lint` - Run linter

### 2. **Bun** (Alternative)
- **Type**: Fast JavaScript runtime & package manager
- **File**: `bun.lockb` (lock file)
- **Speed**: Faster than npm for installation

---

## Testing & Quality Assurance

### 1. **ESLint** (9.32.0)
- **Type**: Static analysis tool
- **Purpose**: Find and fix code quality issues
- **Rules**:
  - TypeScript strict mode
  - React hooks rules
  - Unused variables
  - Code style

### 2. **TypeScript Strict Mode**
- **Type**: Type checking
- **Purpose**: Catch type errors at compile time
- **Settings**:
  - `"strict": true`
  - `"noImplicitAny": true`
  - `"noImplicitThis": true`
  - `"noUnusedLocals": true`

### 3. **Browser DevTools** (Manual Testing)
- **Type**: Browser debugging tools
- **Purpose**: 
  - Console logging
  - Network inspection
  - Performance profiling
  - Error tracking

### 4. **ErrorBoundary Component**
- **Type**: React error handling
- **Purpose**: Catch runtime errors and prevent white screens
- **Implementation**: Class component with `getDerivedStateFromError()`

---

## Deployment & Hosting

### 1. **Vercel** (https://echowatt.vercel.app)
- **Type**: Cloud platform for Next.js & static sites
- **Purpose**: Host & deploy frontend
- **Features Used**:
  - Automatic deployments from GitHub
  - Edge network (global CDN)
  - Serverless functions (if needed)
  - Environment variables
- **Config File**: `vercel.json`

### 2. **Vercel Rewrites**
- **Type**: Server-side routing configuration
- **Purpose**: Handle SPA client-side routing
- **Config**: Redirect all routes to `/index.html`

### 3. **Environment Variables**
- **Type**: Configuration management
- **Purpose**: Store secrets, API keys, config
- **Files**: `.env.local` (local), Vercel dashboard (production)
- **Variables Used**:
  - Supabase URL
  - Supabase Anon Key

---

## Version Control

### 1. **Git**
- **Type**: Version control system
- **Purpose**: Track code changes, collaboration
- **Hosting**: GitHub repository
- **Repository**: github.com/MAY-DAY-419/SMART_ENERGY

### 2. **GitHub**
- **Type**: Git hosting platform
- **Purpose**: Repository hosting, collaboration
- **Branch**: `main` (production branch)
- **Features Used**:
  - Commits
  - Push/pull
  - Branch management

### 3. **GitHub Actions** (Optional)
- **Type**: CI/CD automation
- **Purpose**: Automatic testing, linting, deployment (if configured)

---

## Architecture Patterns

### 1. **Model-View-Controller (MVC) - Adapted**
```
Model → Context (CalculatorContext)
View  → Components (React)
Controller → Event handlers (onClick, onChange)
```

### 2. **Component-Based Architecture**
- **Granular Components**: Small, reusable UI pieces
- **Container Components**: Smart components with logic
- **Presentational Components**: Dumb components (UI only)
- **Custom Hooks**: Logic extraction (useCalculator)

### 3. **Provider Pattern**
- `CalculatorProvider` wraps app
- Child components consume context via `useCalculator()` hook
- Centralized state management

### 4. **Compound Components**
- Example: `<BrowserRouter>` wraps `<Routes>` wraps `<Route>`
- Nested component hierarchy

### 5. **Separation of Concerns**
- **Contexts**: State logic
- **Components**: UI logic
- **Hooks**: Reusable logic
- **Data files**: Constants (deviceDatabase, stateElectricityRates)

### 6. **Three-Tier Application Architecture**
```
┌─────────────────────┐
│   Presentation      │ (React components, Tailwind CSS)
├─────────────────────┤
│   Business Logic    │ (Calculations, state management)
├─────────────────────┤
│   Data Layer        │ (Supabase, localStorage)
└─────────────────────┘
```

### 7. **MVC-like Data Flow**
```
User Input → Event Handler → Context Update → 
Re-render Component → UI Update
```

### 8. **Repository Pattern** (Implicit)
- `CalculatorContext` acts as repository
- Abstracts data source (Supabase vs localStorage)
- All data access through context methods

---

## Design Patterns

### 1. **Observer Pattern**
- React state management
- Components observe context changes
- Auto-rerender on state update

### 2. **Singleton Pattern**
- `CalculatorContext` - Single instance for entire app
- `ThemeContext` - Single theme instance

### 3. **Provider Pattern**
- Wrap app with `CalculatorProvider`
- Make state accessible to all descendants
- Uses React Context

### 4. **Custom Hooks Pattern**
- `useCalculator()` - Custom hook to access context
- Reusable logic extraction

### 5. **HOC (Higher-Order Components)** (Optional)
- Not heavily used, but possible pattern

### 6. **Render Props** (Optional)
- Not used in current implementation

### 7. **Composition Over Inheritance**
- React components composed together
- No class inheritance

### 8. **Container/Presentational Components**
- **Container**: CalculatorPage (logic)
- **Presentational**: HomePage (display only)

### 9. **Error Boundary Pattern**
- Catch errors in component tree
- Prevent entire app crash
- Display fallback UI

### 10. **Async/Await Pattern**
- Supabase API calls use async/await
- Clean async code handling

### 11. **Fallback Pattern**
- Try Supabase → If fails → Use localStorage
- Graceful degradation

### 12. **Lazy Loading** (Implicit)
- Code splitting by Vite
- Dynamic imports for optional features

---

## Supporting Libraries & Utilities

### 1. **Lucide React** (0.462.0)
- **Type**: Icon library
- **Purpose**: SVG icons for UI
- **Icons Used**: Zap, Download, Trash2, Plus, Settings, etc.
- **Count**: 50+ icons throughout project

### 2. **Embla Carousel** (8.6.0)
- **Type**: Carousel/slider library
- **Purpose**: Image galleries, carousels (if used)

### 3. **Cmdk** (1.1.1)
- **Type**: Command palette library
- **Purpose**: Keyboard shortcuts, command menu

### 4. **Sonner** (1.7.4)
- **Type**: Toast notification library
- **Purpose**: Show user notifications
- **Not Heavily Used**: But available

### 5. **Zod** (3.25.76)
- **Type**: Schema validation library
- **Purpose**: Validate data schemas
- **Usage**: Type-safe form validation (if used)

### 6. **Clsx** (2.1.1)
- **Type**: Utility for conditionally joining classnames
- **Purpose**: Dynamic CSS class combination
- **Example**: `clsx('base-class', condition && 'conditional-class')`

### 7. **Tailwind Merge** (2.6.0)
- **Type**: Utility for merging Tailwind classes
- **Purpose**: Resolve conflicting Tailwind classes

### 8. **Class Variance Authority** (0.7.1)
- **Type**: Component variant management
- **Purpose**: Define component style variations

### 9. **React Hook Form** (7.61.1)
- **Type**: Form state management
- **Purpose**: Efficient form handling
- **Not Heavily Used**: But available for forms

### 10. **Input OTP** (1.4.2)
- **Type**: OTP input component
- **Purpose**: One-time password inputs (future auth)

---

## File Format Summary

| Extension | Purpose | Count |
|---|---|---|
| `.tsx` | React components with TypeScript | 15+ |
| `.ts` | TypeScript files | 5+ |
| `.json` | Configuration files | 5+ |
| `.css` | Global styles | 1+ |
| `.md` | Documentation | 2+ |
| `.html` | HTML entry point | 1 |

---

## Complete Tech Stack Summary

### **Frontend Stack**
- React 18 + TypeScript
- React Router for SPA navigation
- Tailwind CSS + Radix UI for styling
- Recharts for data visualization
- Lucide React for icons
- XLSX for Excel export

### **State Management**
- React Context API
- React Hooks (useState, useEffect, useMemo)
- localStorage for persistence

### **Backend Stack**
- Supabase (PostgreSQL hosted)
- REST API via Supabase JS client

### **Build & Development**
- Vite (build tool)
- TypeScript (type safety)
- ESLint (code quality)
- PostCSS + Autoprefixer (CSS processing)

### **Deployment**
- Vercel (hosting)
- GitHub (version control)
- Vercel.json for routing

### **Data Processing**
- XLSX for Excel generation
- Date-fns for date handling
- JSON for data storage

---

## Architecture Overview Diagram

```
┌──────────────────────────────────────────────────────────────┐
│                    EchoWatt Full Stack                        │
├──────────────────────────────────────────────────────────────┤
│                                                                │
│  ┌────────────────────────────────────────────────────────┐  │
│  │                FRONTEND LAYER                           │  │
│  ├────────────────────────────────────────────────────────┤  │
│  │ React 18 + TypeScript + JSX/TSX                        │  │
│  │ ├── Components (15+)                                   │  │
│  │ ├── Hooks (useCalculator, useEffect, useState)         │  │
│  │ ├── React Router (SPA routing)                         │  │
│  │ └── Context API (Global state)                         │  │
│  │                                                         │  │
│  │ UI Libraries:                                          │  │
│  │ ├── Tailwind CSS (Styling)                             │  │
│  │ ├── Recharts (Charts)                                  │  │
│  │ ├── Lucide React (Icons)                               │  │
│  │ ├── Radix UI (Components)                              │  │
│  │ └── ShadCN UI (Styled components)                      │  │
│  │                                                         │  │
│  │ Export & Processing:                                   │  │
│  │ ├── XLSX (Excel)                                       │  │
│  │ └── Date-fns (Date handling)                           │  │
│  └────────────────────────────────────────────────────────┘  │
│                          ▼                                      │
│  ┌────────────────────────────────────────────────────────┐  │
│  │              STATE MANAGEMENT LAYER                    │  │
│  ├────────────────────────────────────────────────────────┤  │
│  │ React Context API                                      │  │
│  │ ├── CalculatorContext (Global calc state)             │  │
│  │ └── ThemeContext (Dark/light mode)                    │  │
│  │                                                         │  │
│  │ localStorage (Persistence)                             │  │
│  │ └── Fallback if Supabase fails                         │  │
│  └────────────────────────────────────────────────────────┘  │
│                          ▼                                      │
│  ┌────────────────────────────────────────────────────────┐  │
│  │              API & DATA LAYER                          │  │
│  ├────────────────────────────────────────────────────────┤  │
│  │ Supabase JS Client (REST API)                          │  │
│  │ ├── HTTP requests (GET, POST, DELETE)                 │  │
│  │ ├── Real-time subscriptions (optional)                │  │
│  │ └── Authentication (optional)                         │  │
│  └────────────────────────────────────────────────────────┘  │
│                          ▼                                      │
│  ┌────────────────────────────────────────────────────────┐  │
│  │            DATABASE LAYER                              │  │
│  ├────────────────────────────────────────────────────────┤  │
│  │ PostgreSQL (on Supabase cloud)                         │  │
│  │ ├── Table: rooms                                       │  │
│  │ ├── Table: devices                                     │  │
│  │ ├── Table: bill_history                                │  │
│  │ ├── Row Level Security (RLS)                          │  │
│  │ └── Foreign key relationships                          │  │
│  └────────────────────────────────────────────────────────┘  │
│                                                                │
├──────────────────────────────────────────────────────────────┤
│                   BUILD & DEPLOYMENT                          │
├──────────────────────────────────────────────────────────────┤
│ Build Tool: Vite (TypeScript → JavaScript)                   │
│ Linting: ESLint                                              │
│ Hosting: Vercel (Global CDN)                                 │
│ Git: GitHub (Version control)                                │
└──────────────────────────────────────────────────────────────┘
```

---

## Language Distribution

```
TypeScript/TSX:      ~60% (Component logic, types)
JavaScript (ES6+):   ~20% (Browser runtime, compiled from TS)
CSS (Tailwind):      ~10% (Styling via utility classes)
HTML:                ~5% (Markup, index.html)
JSON:                ~3% (Config files)
SQL:                 ~2% (Database schema, RLS policies)
```

---

## Conclusion

**EchoWatt** uses a modern, full-stack architecture combining:
- ✅ **Frontend**: React 18 with TypeScript
- ✅ **Styling**: Tailwind CSS + UI libraries
- ✅ **State**: React Context API
- ✅ **Backend**: Supabase (PostgreSQL)
- ✅ **Build**: Vite
- ✅ **Deployment**: Vercel
- ✅ **Data Export**: XLSX for Excel
- ✅ **Visualization**: Recharts for charts

This creates a robust, scalable, and maintainable application following industry best practices.

---

**Generated**: November 30, 2025
**Project**: EchoWatt - Smart Energy Calculator
**Domain**: https://echowatt.vercel.app

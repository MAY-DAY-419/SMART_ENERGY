# EchoWatt - Technical Stack Report

## Executive Summary
EchoWatt is a full-stack web application designed to help Indian homeowners calculate electricity consumption, track bills, monitor carbon emissions, and optimize energy usage. The application uses modern React technologies, cloud infrastructure, and real-time data synchronization.

---

## Table of Contents
1. [Technology Stack Overview](#technology-stack-overview)
2. [Frontend Architecture](#frontend-architecture)
3. [Backend & Database](#backend--database)
4. [Data Flow & Architecture](#data-flow--architecture)
5. [Component Breakdown](#component-breakdown)
6. [State Management](#state-management)
7. [Key Features & Implementation](#key-features--implementation)
8. [Deployment](#deployment)

---

## Technology Stack Overview

### Frontend Technologies
| Technology | Version | Purpose |
|---|---|---|
| **React** | 18.3.1 | UI component framework |
| **TypeScript** | 5.8.3 | Type-safe JavaScript |
| **Vite** | 5.4.19 | Build tool & dev server |
| **React Router DOM** | 6.30.2 | Client-side routing |
| **Tailwind CSS** | 3.4.17 | Utility-first CSS styling |
| **Recharts** | 2.15.4 | Data visualization (charts) |
| **Lucide React** | 0.462.0 | Icon library |
| **XLSX** | 0.18.5 | Excel file generation |

### Backend & Database
| Technology | Purpose |
|---|---|
| **Supabase** | PostgreSQL database + authentication |
| **Supabase JS Client** | Real-time database operations |
| **PostgreSQL** | Relational database (hosted on Supabase) |

### Development & Build Tools
| Technology | Purpose |
|---|---|
| **ESLint** | Code linting & quality |
| **PostCSS** | CSS preprocessing |
| **Autoprefixer** | Browser-compatible CSS |
| **Bun/NPM** | Package manager |

### Deployment
| Service | Purpose |
|---|---|
| **Vercel** | Hosting & deployment platform |
| **GitHub** | Version control & source repository |
| **Vercel.json** | Client-side routing configuration |

---

## Frontend Architecture

### Technology Stack Diagram
```
┌─────────────────────────────────────────────────────────────┐
│                    EchoWatt Frontend                         │
├─────────────────────────────────────────────────────────────┤
│  React 18.3.1 + TypeScript                                  │
│  ├── React Router (Client-side Routing)                     │
│  ├── Context API (Global State Management)                  │
│  └── Hooks (useState, useContext, useEffect, useMemo)       │
├─────────────────────────────────────────────────────────────┤
│  UI Components                                              │
│  ├── Recharts (Line, Bar, Pie Charts)                      │
│  ├── Lucide Icons                                           │
│  ├── Tailwind CSS (Styling)                                 │
│  └── ShadCN UI Components (Dialog, Tabs, Accordion)         │
├─────────────────────────────────────────────────────────────┤
│  Utilities & Libraries                                      │
│  ├── XLSX (Excel Export)                                    │
│  ├── Date-fns (Date Handling)                               │
│  └── Zod (Type Validation)                                  │
├─────────────────────────────────────────────────────────────┤
│  Build & Dev Tools                                          │
│  └── Vite 5.4.19 (Build, Dev Server, HMR)                  │
└─────────────────────────────────────────────────────────────┘
```

### Frontend Folder Structure
```
src/
├── components/
│   ├── calculator/
│   │   ├── LocationSelector.tsx      # State/rate selection
│   │   ├── RoomManager.tsx           # Room CRUD
│   │   ├── DeviceManager.tsx         # Device CRUD
│   │   ├── BillSummary.tsx           # Summary & Excel export
│   │   ├── CarbonFootprint.tsx       # CO2 tracking visualization
│   │   ├── BillComparison.tsx        # Historical comparison & charts
│   │   ├── AIOptimization.tsx        # Energy-saving recommendations
│   │   └── IoTIntegration.tsx        # Smart home integration info
│   ├── Header.tsx                    # Navigation header
│   ├── Footer.tsx                    # Footer with links
│   └── ErrorBoundary.tsx             # Error handling wrapper
├── contexts/
│   ├── CalculatorContext.tsx         # Global state + Supabase sync
│   └── ThemeContext.tsx              # Dark/light theme
├── hooks/
│   └── useCalculator.ts              # Hook to access CalculatorContext
├── pages/
│   ├── HomePage.tsx                  # Landing page
│   ├── CalculatorPage.tsx            # 3-step calculator workflow
│   └── AboutPage.tsx                 # About & features
├── lib/
│   └── supabase.ts                   # Supabase client config
├── data/
│   ├── deviceDatabase.ts             # Pre-loaded device catalog
│   ├── roomTemplates.ts              # Room templates
│   └── stateElectricityRates.ts      # State-wise electricity rates
├── types/
│   └── index.ts                      # TypeScript interfaces
├── App.tsx                           # Main app wrapper
└── main.tsx                          # React entry point
```

---

## Backend & Database

### Supabase Architecture
```
┌──────────────────────────────────────────────────┐
│         Supabase Cloud Infrastructure            │
├──────────────────────────────────────────────────┤
│  PostgreSQL Database (ksilqbnsyeqkcbcijein)     │
│  ├── Table: rooms                                │
│  │   ├── id (UUID, Primary Key)                  │
│  │   ├── user_id (String)                        │
│  │   ├── name (String)                           │
│  │   └── icon (String)                           │
│  │                                                │
│  ├── Table: devices                              │
│  │   ├── id (UUID, Primary Key)                  │
│  │   ├── room_id (Foreign Key → rooms.id)        │
│  │   ├── name (String)                           │
│  │   ├── brand (String)                          │
│  │   ├── wattage (Integer)                       │
│  │   ├── hours_per_day (Float)                   │
│  │   ├── category (String)                       │
│  │   └── is_custom (Boolean)                     │
│  │                                                │
│  └── Table: bill_history                         │
│      ├── id (UUID, Primary Key)                  │
│      ├── user_id (Foreign Key)                   │
│      ├── timestamp (Bigint)                      │
│      ├── month (String)                          │
│      ├── total_cost (Float)                      │
│      ├── total_units (Float)                     │
│      ├── total_co2 (Float)                       │
│      ├── device_count (Integer)                  │
│      ├── rooms (JSON)                            │
│      ├── state (String)                          │
│      └── rate_per_unit (Float)                   │
│                                                   │
│  Row Level Security (RLS) Policies:             │
│  └── All data filtered by user_id               │
└──────────────────────────────────────────────────┘
```

### Database Relationships
```
users (implicit, stored in browser localStorage)
    │
    ├─── 1:N ────────── rooms
    │                      │
    │                      └─── 1:N ────────── devices
    │
    └─── 1:N ────────── bill_history
                           │
                           └─── contains snapshot of rooms & devices
```

---

## Data Flow & Architecture

### User Journey & Data Flow
```
┌────────────────────────────────────────────────────────────────┐
│                     User Interaction Flow                       │
└────────────────────────────────────────────────────────────────┘

STEP 1: LOCATION SELECTION
┌─────────────────┐
│  Select State   │
│  & Rate/Unit    │
└────────┬────────┘
         │
         ▼
    CalculatorContext
    ├── setSelectedState(state)
    ├── setRatePerUnit(rate)
    └── State saved to localStorage

STEP 2: ROOM & DEVICE MANAGEMENT
┌──────────────────┐
│  Create Rooms    │  ────┐
│  Add Devices     │      │
└──────────────────┘      │
                          │ addRoom() / addDeviceToRoom()
                          ▼
                    CalculatorContext
                    (state update)
                          │
                          ├─► localStorage (backup)
                          │
                          └─► Supabase
                              ├── INSERT into rooms table
                              ├── INSERT into devices table
                              └── RLS filters by user_id

STEP 3: CALCULATION & VISUALIZATION
┌──────────────────────┐
│  Bill Summary        │
│  Carbon Footprint    │
│  Bill Comparison     │  ◄─── READ from CalculatorContext
│  AI Recommendations  │
└──────────────────────┘
         │
         ▼
    Charts (Recharts)
    ├── Pie Chart (Cost by Category)
    ├── Bar Chart (Top 10 Devices)
    ├── Line Chart (Monthly Trend)
    └── Bar Chart (Energy & Emissions)

STEP 4: EXPORT
┌──────────────────┐
│  Export to Excel │  ───► XLSX Library
└──────────────────┘       ───► .xlsx file download
```

### Component Communication Diagram
```
┌─────────────────────────────────────────────────────────────┐
│                      App.tsx (Root)                          │
├─────────────────────────────────────────────────────────────┤
│  ErrorBoundary                                              │
│  └── ThemeProvider                                          │
│      └── CalculatorProvider                                 │
│          └── Router                                         │
│              ├── Header (Navigation)                        │
│              ├── MainRoutes                                 │
│              │   ├── HomePage                               │
│              │   ├── CalculatorPage                         │
│              │   │   ├── LocationSelector (useCalculator)   │
│              │   │   ├── RoomManager (useCalculator)        │
│              │   │   ├── DeviceManager (useCalculator)      │
│              │   │   ├── BillSummary (useCalculator)        │
│              │   │   ├── CarbonFootprint (useCalculator)    │
│              │   │   ├── BillComparison (useCalculator)     │
│              │   │   ├── AIOptimization (useCalculator)     │
│              │   │   └── IoTIntegration (useCalculator)     │
│              │   └── AboutPage                              │
│              └── Footer                                     │
└─────────────────────────────────────────────────────────────┘

All calculator components consume CalculatorContext via useCalculator()
```

---

## Component Breakdown

### 1. **HomePage.tsx**
**Purpose**: Landing page with hero section and feature highlights

**Features**:
- Hero section with EchoWatt branding
- Feature cards (6 key features)
- Call-to-action buttons
- Responsive design

**Key Props/State**: None (static content + React Router links)

**Tech Used**: React, React Router, Lucide Icons, Tailwind CSS

---

### 2. **CalculatorPage.tsx**
**Purpose**: 3-step calculator workflow

**Steps**:
1. **Location Selection** → Select state and electricity rate
2. **Room & Device Management** → Create rooms and add devices
3. **Results** → View calculations, charts, recommendations

**Features**:
- Progress indicator
- Step navigation
- Quick Summary sidebar
- Full-width results on Step 3

**Key State**: 
- `step` (1, 2, or 3)
- Uses `useCalculator()` for rooms, devices, selectedState, etc.

**Tech Used**: React, React Router, useCalculator hook, CalculatorContext

---

### 3. **LocationSelector.tsx**
**Purpose**: Select state and set electricity rate

**Features**:
- Dropdown to select Indian states
- Automatic rate lookup from database
- Manual rate override option

**Key State**:
- Uses `useCalculator()` to read/set `selectedState` and `ratePerUnit`

**Tech Used**: React, CalculatorContext, Lucide Icons, Tailwind CSS

---

### 4. **RoomManager.tsx**
**Purpose**: Create, view, and delete rooms

**Features**:
- Room templates (Bedroom, Kitchen, Bathroom, etc.)
- Custom room creation
- Room icon assignment
- Device count display

**Key State**:
- `rooms` from CalculatorContext
- `addRoom()` / `removeRoom()` functions
- `setCurrentRoomId()` to select room for device management

**Tech Used**: React, CalculatorContext, Lucide Icons, Tailwind CSS

---

### 5. **DeviceManager.tsx**
**Purpose**: Add, view, and delete devices within a selected room

**Features**:
- Pre-loaded device database (50+ devices)
- Category-based device grouping
- Custom device creation
- Hours-per-day configuration
- Cost calculation per device

**Key State**:
- `currentRoomId` (selected room)
- `rooms` (includes devices)
- `addDeviceToRoom()` / `removeDeviceFromRoom()` functions
- Form state for custom devices

**Tech Used**: React, CalculatorContext, Device Database, Lucide Icons, Tailwind CSS

---

### 6. **BillSummary.tsx**
**Purpose**: Display total consumption, costs, and CO₂ emissions with export

**Features**:
- Summary cards (Cost, Units, CO₂)
- Pie chart (Cost by Category)
- Bar chart (Top 10 devices by cost)
- Excel export functionality

**Key State**:
- Calculates totals from `rooms` and `devices`
- `exportToExcel()` generates XLSX file

**Tech Used**: React, Recharts, XLSX, Lucide Icons, Tailwind CSS

**Excel Export Structure**:
```
Sheet 1 "Energy Report":
  Device | Brand | Category | Wattage | Hours/Day | Monthly Units | Monthly Cost

Sheet 2 "Summary":
  State | Rate per Unit | Total Monthly Units | Total Monthly Bill
```

---

### 7. **CarbonFootprint.tsx**
**Purpose**: Track and visualize CO₂ emissions

**Features**:
- CO₂ emissions calculation (0.82 kg CO₂/kWh for India)
- Comparison with national average
- Monthly CO₂ breakdown
- Environmental impact insights

**Tech Used**: React, Recharts, Lucide Icons, Tailwind CSS

---

### 8. **BillComparison.tsx**
**Purpose**: Compare current bills with historical data

**Features**:
- "Save Current Bill" button (snapshot)
- Historical chart trends (up to 12 months)
- Month-over-month comparison
- Cost/Units/CO₂ trending
- "Save Current Bill" persists to Supabase

**Key State**:
- `billHistory` from CalculatorContext
- `saveBillSnapshot()` function
- `deleteBillHistory()` function

**Tech Used**: React, Recharts, CalculatorContext, Tailwind CSS

---

### 9. **AIOptimization.tsx**
**Purpose**: AI-powered energy-saving recommendations

**Features**:
- Smart recommendations based on usage
- Cost-saving predictions
- Top energy-consuming devices highlighted
- Actionable tips

**Tech Used**: React, Tailwind CSS

---

### 10. **IoTIntegration.tsx**
**Purpose**: Information about smart home integration

**Features**:
- Future IoT integration roadmap
- Smart device compatibility info

**Tech Used**: React, Tailwind CSS

---

### 11. **ErrorBoundary.tsx**
**Purpose**: Catch runtime errors and prevent white screens

**Features**:
- Displays user-friendly error message
- Shows error details in expandable section
- Logs errors to console for debugging

**Tech Used**: React Error Boundaries, Class Components

---

### 12. **CalculatorContext.tsx**
**Purpose**: Global state management + Supabase synchronization

**Key State Variables**:
```typescript
rooms: Room[]                    // All rooms for current user
selectedState: string            // Selected Indian state
ratePerUnit: number              // Electricity rate (₹/kWh)
currentRoomId: string | null     // Currently selected room
billHistory: BillHistory[]       // Saved bill snapshots (up to 12 months)
userId: string                   // Browser-unique user ID (localStorage)
```

**Key Functions**:
- `addRoom(room)` → adds room + syncs to Supabase
- `removeRoom(id)` → deletes room + syncs to Supabase
- `updateRoom(id, room)` → updates room
- `addDeviceToRoom(roomId, device)` → adds device + syncs to Supabase
- `removeDeviceFromRoom(roomId, deviceId)` → deletes device + syncs to Supabase
- `getAllDevices()` → returns all devices across all rooms
- `saveBillSnapshot()` → saves current bill state to Supabase
- `deleteBillHistory(id)` → deletes historical bill entry
- `loadFromSupabase()` → fetches user data on app load
- `clearAll()` → resets local state

**Tech Used**: React Context API, Supabase JS Client, localStorage

**Supabase Sync Flow**:
```
User Action (add/delete room/device)
    │
    ▼
Update Local State (React)
    │
    ├─► localStorage (backup)
    │
    └─► Supabase.insert/delete (async)
        ├── On success: log to console
        └── On error: log error, keep localStorage backup
```

---

### 13. **ThemeContext.tsx**
**Purpose**: Dark/Light theme management

**Features**:
- System preference detection
- User preference persistence (localStorage)
- Global theme toggle

**Tech Used**: React Context API, localStorage

---

---

## State Management

### Architecture Diagram
```
┌─────────────────────────────────────────────────┐
│          State Management Architecture           │
├─────────────────────────────────────────────────┤
│                                                   │
│  Global State (React Context)                    │
│  ├── CalculatorContext                           │
│  │   ├── rooms: Room[]                           │
│  │   ├── devices: Device[] (nested)              │
│  │   ├── billHistory: BillHistory[]              │
│  │   ├── selectedState: string                   │
│  │   ├── ratePerUnit: number                     │
│  │   └── [CRUD Functions]                        │
│  │                                                │
│  └── ThemeContext                                │
│      ├── isDark: boolean                         │
│      └── toggleTheme(): void                     │
│                                                   │
│  ┌──────────────────────────────────────────┐   │
│  │         Local Storage (Persistence)      │   │
│  ├──────────────────────────────────────────┤   │
│  │ • energyUserId (browser session ID)      │   │
│  │ • energyBillHistory (bill snapshots)     │   │
│  │ • theme (dark/light)                     │   │
│  └──────────────────────────────────────────┘   │
│                                                   │
│  ┌──────────────────────────────────────────┐   │
│  │     Remote State (Supabase Database)     │   │
│  ├──────────────────────────────────────────┤   │
│  │ • rooms (user_id filtered)               │   │
│  │ • devices (room_id linked)               │   │
│  │ • bill_history (user_id filtered)        │   │
│  └──────────────────────────────────────────┘   │
│                                                   │
└─────────────────────────────────────────────────┘
```

### State Flow Diagram
```
┌─────────────────────┐
│   Component Mount   │
└────────────┬────────┘
             │
             ▼
   ┌─────────────────────────────────┐
   │  useEffect in CalculatorProvider │
   │  loadFromSupabase()              │
   └────────────┬────────────────────┘
                │
                ├─► Success: setRooms(), setBillHistory()
                │
                └─► Error: Fall back to localStorage
                
   ┌─────────────────────────────────┐
   │  Component Renders               │
   │  (from CalculatorContext)        │
   └────────────┬────────────────────┘
                │
    ┌───────────┴────────────┐
    │                        │
    ▼                        ▼
┌─────────────┐     ┌──────────────┐
│  Read State │     │  Call Action │
│ (read-only) │     │ (add/delete)  │
└─────────────┘     └──────┬───────┘
                           │
                    ┌──────┴──────┐
                    │             │
                    ▼             ▼
              ┌─────────┐  ┌──────────────┐
              │ useState │  │ Supabase API │
              └─────────┘  └──────────────┘
                    │             │
                    └──────┬──────┘
                           │
                           ▼
                   ┌────────────────┐
                   │  Re-render UI   │
                   │  (with new data)│
                   └────────────────┘
```

---

## Key Features & Implementation

### 1. **Multi-Step Calculator Workflow**
```
User Input Flow:
Step 1: Select Location & Rate
    ├─► StateElectricityRates.ts (pre-loaded)
    └─► CalculatorContext: setSelectedState(), setRatePerUnit()

Step 2: Create Rooms & Add Devices
    ├─► RoomTemplates.ts (room presets)
    ├─► DeviceDatabase.ts (50+ devices pre-loaded)
    └─► CalculatorContext: addRoom(), addDeviceToRoom()

Step 3: View Results & Export
    ├─► Calculate totals (cost, units, CO₂)
    ├─► Generate charts (Recharts)
    └─► Export to Excel (XLSX)
```

### 2. **Electricity Consumption Calculation**
```
Formula:
  Monthly Units (kWh) = (Wattage × Hours/Day × 30 days) / 1000
  Monthly Cost (₹) = Monthly Units × Rate per Unit
  Monthly CO₂ (kg) = Monthly Units × 0.82 (India factor)

Example:
  Device: AC (1500W, 8 hours/day, Rate: ₹8/kWh)
  Monthly Units = (1500 × 8 × 30) / 1000 = 360 kWh
  Monthly Cost = 360 × 8 = ₹2,880
  Monthly CO₂ = 360 × 0.82 = 295.2 kg
```

### 3. **Data Persistence Strategy**
```
Priority Chain:
1. User Action (add/delete)
    ↓
2. Update React State immediately (instant UI update)
    ↓
3. Save to localStorage (fallback if Supabase fails)
    ↓
4. Sync to Supabase (async, background)
    ↓
5. On next page load:
    ├─► Try to load from Supabase
    ├─► If success: populate from DB
    └─► If fail: populate from localStorage
```

### 4. **Bill Snapshot & Comparison**
```
On "Save Current Bill" click:
  ├─► Calculate current month totals
  ├─► Create snapshot object with:
  │   ├── timestamp (Date.now())
  │   ├── month (e.g., "November 2025")
  │   ├── totalCost, totalUnits, totalCO2
  │   ├── rooms (deep copy of current state)
  │   └── deviceCount
  ├─► Save to billHistory array (max 12 entries)
  └─► Sync to Supabase bill_history table

On Page Load:
  ├─► Load billHistory from Supabase
  └─► Display historical trends (charts)
```

### 5. **User Isolation (Security)**
```
Each user identified by:
  ├─► Browser-unique ID: user_id (stored in localStorage)
  │   Format: "user_{timestamp}_{random_string}"
  │
  └─► Supabase Row Level Security (RLS):
      ├── All queries filter by user_id
      ├── Example: SELECT * FROM rooms WHERE user_id = $1
      └── Users can only see their own data
```

---

## Deployment

### Vercel Configuration
**File**: `vercel.json`
```json
{
  "rewrites": [
    {
      "source": "/(.*)",
      "destination": "/index.html"
    }
  ]
}
```
**Purpose**: Routes all requests to `/index.html` for client-side routing (SPA)

### Deployment Flow
```
┌──────────────────────────────────────┐
│   Push to GitHub (main branch)       │
└───────────────┬──────────────────────┘
                │
                ▼
        ┌──────────────────┐
        │ Vercel Detects   │
        │ New Commit       │
        └────────┬─────────┘
                 │
                 ▼
        ┌──────────────────┐
        │ Build Trigger    │
        │ • npm install    │
        │ • npm run build  │
        └────────┬─────────┘
                 │
                 ▼
        ┌──────────────────┐
        │ Vite Build       │
        │ • Bundles JS/CSS │
        │ • Minifies code  │
        │ • Generates dist/│
        └────────┬─────────┘
                 │
                 ▼
        ┌──────────────────┐
        │ Deploy to CDN    │
        │ • Global edge    │
        │   network        │
        └────────┬─────────┘
                 │
                 ▼
        ┌──────────────────┐
        │ Live at:         │
        │ echowatt.vercel  │
        │ .app             │
        └──────────────────┘
```

### Environment Configuration
**Build Environment**:
- Node.js 18+
- Dependencies: React, TypeScript, Vite, Tailwind, etc.
- Static export with HMR (Hot Module Replacement) in dev

**Runtime Environment**:
- Browser: Chrome, Firefox, Safari (modern versions)
- JavaScript enabled required
- LocalStorage enabled required (for user_id persistence)

---

## Workflow Architecture

### Complete Application Workflow
```
┌─────────────────────────────────────────────────────────────┐
│                  EchoWatt Complete Workflow                  │
└─────────────────────────────────────────────────────────────┘

1️⃣ USER ARRIVES AT echowatt.vercel.app
   │
   ├─► Browser loads index.html
   ├─► React app initializes
   ├─► CalculatorContext loads from Supabase (or localStorage fallback)
   └─► Renders HomePage with navigation

2️⃣ USER CLICKS "START CALCULATION"
   │
   ├─► React Router navigates to /calculator
   ├─► CalculatorPage mounts (3-step workflow)
   └─► Step 1: LocationSelector renders

3️⃣ USER SELECTS STATE & RATE (Step 1)
   │
   ├─► LocationSelector reads StateElectricityRates.ts
   ├─► User selects state (e.g., "Maharashtra")
   ├─► setSelectedState("Maharashtra") called
   ├─► setRatePerUnit(8.5) called
   ├─► CalculatorContext updates
   └─► Step 2 unlocked: "Add Devices →" button enabled

4️⃣ USER CREATES ROOMS (Step 2)
   │
   ├─► RoomManager component renders
   ├─► User clicks "Add Room"
   ├─► Selects template (Bedroom, Kitchen, etc.)
   ├─► addRoom(newRoom) called
   │   ├─► setRooms([...rooms, newRoom]) (local update)
   │   ├─► localStorage.setItem (backup)
   │   └─► Supabase.insert INTO rooms (async)
   └─► New room appears in UI

5️⃣ USER ADDS DEVICES TO ROOM (Step 2)
   │
   ├─► User selects room: setCurrentRoomId(roomId)
   ├─► DeviceManager renders for selected room
   ├─► User selects device from dropdown:
   │   ├─► Reads from DeviceDatabase.ts (pre-loaded)
   │   ├─► Sets hours per day
   │   └─► Clicks "Add Device"
   ├─► addDeviceToRoom(roomId, device) called
   │   ├─► setRooms ([...update devices array...])
   │   ├─► localStorage.setItem (backup)
   │   └─► Supabase.insert INTO devices (async)
   └─► Device added to room UI

6️⃣ USER CLICKS "CALCULATE BILL →" (Step 3)
   │
   ├─► BillSummary component mounts
   ├─► calculateTotals() iterates all devices:
   │   ├─► For each device:
   │   │   ├── Monthly Units = (Watts × Hours × 30) / 1000
   │   │   ├── Monthly Cost = Units × Rate
   │   │   └── CO₂ = Units × 0.82
   │   ├── Sum totals across all devices
   │   └── Group by category
   ├─► Render summary cards (Cost, Units, CO₂)
   ├─► Generate chart data
   └─► Render Recharts visualizations

7️⃣ USER EXPORTS TO EXCEL
   │
   ├─► BillSummary "Export to Excel" button clicked
   ├─► exportToExcel() called:
   │   ├─► Create XLSX workbook
   │   ├─► Sheet 1: Device list with calculations
   │   ├─► Sheet 2: Summary statistics
   │   └─► Download as energy-report.xlsx
   └─► Browser downloads file

8️⃣ USER SAVES BILL SNAPSHOT (for comparison)
   │
   ├─► BillComparison "Save Current Bill" clicked
   ├─► saveBillSnapshot() called:
   │   ├─► Calculate current totals
   │   ├─► Create snapshot object
   │   ├─► Add to billHistory array (max 12)
   │   ├─► localStorage.setItem (backup)
   │   └─► Supabase.insert INTO bill_history (async)
   ├─► Render historical trends
   └─► Show month-over-month comparison

9️⃣ USER REFRESHES PAGE
   │
   ├─► Browser reloads
   ├─► React app reinitializes
   ├─► CalculatorContext useEffect runs loadFromSupabase()
   ├─► Try Supabase query (filters by userId)
   ├─► On success: Populate state from DB
   ├─► On error: Fall back to localStorage
   └─► UI renders with persisted data

🔟 USER NAVIGATES TO /about
   │
   ├─► React Router navigates without page reload
   ├─► AboutPage component renders
   ├─► No data fetch needed (static content)
   └─► Instant navigation

1️⃣1️⃣ USER REFRESHES ON /calculator
   │
   ├─► vercel.json rewrite rule catches route
   ├─► Serves /index.html instead of 404
   ├─► React Router handles /calculator route
   ├─► CalculatorPage component renders
   └─► No 404 error (SPA routing works)
```

---

## Technology Relationships

### Dependency Graph
```
echowatt (root)
│
├─── Frontend Layer
│    ├── React 18.3.1
│    │   ├── React Router 6.30.2 (routing)
│    │   ├── React Context (state)
│    │   └── Hooks (component logic)
│    │
│    ├── UI Libraries
│    │   ├── Tailwind CSS 3.4.17 (styling)
│    │   ├── Recharts 2.15.4 (charts)
│    │   └── Lucide React 0.462.0 (icons)
│    │
│    ├── Build Tools
│    │   ├── Vite 5.4.19
│    │   │   ├── TypeScript 5.8.3 (transpile)
│    │   │   ├── PostCSS (CSS processing)
│    │   │   └── Autoprefixer (browser compat)
│    │   │
│    │   └── ESLint (linting)
│    │
│    └── Data Export
│        └── XLSX 0.18.5 (Excel generation)
│
├─── Backend/Database Layer
│    └── Supabase
│        ├── PostgreSQL (database)
│        └── @supabase/supabase-js (client)
│
├─── Deployment
│    ├── Vercel (hosting)
│    ├── GitHub (source control)
│    └── vercel.json (SPA config)
│
└─── Local Storage
     └── Browser localStorage (user_id, theme, backup data)
```

---

## Summary Table

| Layer | Technology | Version | Purpose |
|---|---|---|---|
| **Frontend Framework** | React | 18.3.1 | UI components & state |
| **Language** | TypeScript | 5.8.3 | Type-safe JavaScript |
| **Routing** | React Router DOM | 6.30.2 | Client-side navigation |
| **Styling** | Tailwind CSS | 3.4.17 | Utility-first CSS |
| **Charting** | Recharts | 2.15.4 | Data visualization |
| **Icons** | Lucide React | 0.462.0 | SVG icon library |
| **Build Tool** | Vite | 5.4.19 | Build & dev server |
| **Data Export** | XLSX | 0.18.5 | Excel file generation |
| **Database** | Supabase / PostgreSQL | Latest | Cloud DB + API |
| **DB Client** | @supabase/supabase-js | 2.86.0 | Database operations |
| **Deployment** | Vercel | - | Hosting & CDN |
| **Version Control** | GitHub | - | Source repository |
| **Code Quality** | ESLint | 9.32.0 | Linting & style checking |

---

## Key Metrics & Performance Considerations

### Bundle Size (Production Build)
- Main JS: ~150 KB (gzipped: ~51 KB)
- HTML2Canvas: ~201 KB (removed, now only Excel export)
- CSS: ~38 KB (gzipped: ~7 KB)
- **Total**: ~2.4 MB uncompressed (reasonable for a feature-rich SPA)

### Load Performance
- **First Load**: ~2-3 seconds (depends on Supabase latency)
- **Subsequent Loads**: ~500ms (cached assets + local state)
- **Chart Rendering**: <100ms (Recharts optimized)

### Data Sync
- **Add Device**: ~500ms-2s (local instant, Supabase async)
- **Save Bill Snapshot**: ~1-3s (localStorage instant, DB async)
- **Page Refresh Data Load**: ~1-2s (Supabase query + parsing)

---

## Future Enhancement Opportunities

1. **Real-time Collaboration**
   - WebSockets for live updates
   - Multi-user households

2. **Mobile App**
   - React Native version
   - Offline-first architecture

3. **Smart Home Integration**
   - IoT device API connections
   - Real-time consumption tracking

4. **Predictive Analytics**
   - ML-based consumption forecasting
   - Personalized recommendations

5. **Government Integration**
   - DISCOM (electricity board) data
   - Subsidy eligibility checker

6. **Gamification**
   - Energy-saving challenges
   - Community leaderboards

---

## Conclusion

EchoWatt is a modern, full-stack web application built with React, TypeScript, and Supabase. It demonstrates:

✅ **Advanced React Patterns**: Context API, Error Boundaries, Custom Hooks
✅ **Full-Stack Integration**: Frontend ↔ Backend synchronization
✅ **Data Visualization**: Complex charts and real-time calculations
✅ **Cloud Infrastructure**: Supabase for scalable backend
✅ **Production-Ready**: Error handling, caching, fallbacks
✅ **User-Centric Design**: Responsive UI with dark mode support
✅ **Environmental Impact**: CO₂ tracking for sustainability

The architecture is designed for scalability and future enhancements while maintaining code quality and performance.

---

**Document Generated**: November 30, 2025
**Project**: EchoWatt - Smart Energy Calculator for Indian Homes
**Domain**: https://echowatt.vercel.app

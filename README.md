# Smart Home Energy Calculator

A comprehensive Progressive Web App (PWA) for calculating smart home energy consumption and electricity costs. Users can create house projects, add rooms, manage appliances, and get detailed energy consumption breakdowns with cost estimates.

## Project Overview

This application helps homeowners and energy enthusiasts calculate their household energy consumption by organizing appliances room-by-room and providing detailed cost analysis based on local electricity rates.

### Key Features

- **House Project Management**: Create and manage multiple house projects
- **Room-based Organization**: Add and organize rooms within each house
- **Smart Appliance Database**: Pre-loaded appliance templates with automatic wattage detection
- **Manual Appliance Entry**: Full flexibility to add custom appliances with manual specifications
- **Location-based Pricing**: Automatic electricity rate detection by state/region with manual override
- **Comprehensive Analytics**: 
  - Total monthly consumption (kWh)
  - Estimated electricity costs
  - Room-wise breakdown
  - Appliance-wise consumption analysis
  - Visual charts and graphs
- **PWA Features**: Offline support, installable app, responsive design
- **Export Functionality**: Generate reports for energy consumption data

## Tech Stack

### Frontend
- **React 18.3.1** - Modern React with hooks and functional components
- **TypeScript** - Type-safe development with full type coverage
- **Vite** - Fast build tool and development server
- **Tailwind CSS** - Utility-first CSS framework with custom design system
- **shadcn/ui** - Modern, accessible UI component library built on Radix UI

### UI Components & Libraries
- **Radix UI** - Headless, accessible component primitives
- **Lucide React** - Beautiful, customizable icons
- **Recharts** - Responsive chart library for data visualization
- **React Hook Form** - Performant forms with easy validation
- **Sonner** - Toast notifications for user feedback

### PWA Features
- **Service Worker** - Offline caching and app-like experience
- **Web App Manifest** - Installable PWA with custom branding
- **Responsive Design** - Mobile-first, works across all devices

### Development Tools
- **ESLint** - Code linting and quality assurance
- **PostCSS** - CSS processing and optimization
- **Git** - Version control and deployment integration

## Architecture

The application follows a modern React architecture with:

- **Component-based Design**: Modular, reusable components
- **Type-safe Development**: Full TypeScript coverage
- **Custom Design System**: Semantic color tokens and consistent theming
- **Progressive Enhancement**: Works offline and can be installed as an app
- **Responsive Layout**: Optimized for desktop, tablet, and mobile devices

## Data Management

- **Local State Management**: React hooks for component state
- **Predefined Templates**: Curated database of common appliances with specifications
- **Flexible Input System**: Supports both template selection and manual entry
- **Location-based Rates**: Regional electricity pricing with manual override options

**Project URL**: https://lovable.dev/projects/7b7e8d84-7b5b-48d8-a7d6-6dedbe701982

## How can I edit this code?

There are several ways of editing your application.

**Use Lovable**

Simply visit the [Lovable Project](https://lovable.dev/projects/7b7e8d84-7b5b-48d8-a7d6-6dedbe701982) and start prompting.

Changes made via Lovable will be committed automatically to this repo.

**Use your preferred IDE**

If you want to work locally using your own IDE, you can clone this repo and push changes. Pushed changes will also be reflected in Lovable.

The only requirement is having Node.js & npm installed - [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating)

Follow these steps:

```sh
# Step 1: Clone the repository using the project's Git URL.
git clone <YOUR_GIT_URL>

# Step 2: Navigate to the project directory.
cd <YOUR_PROJECT_NAME>

# Step 3: Install the necessary dependencies.
npm i

# Step 4: Start the development server with auto-reloading and an instant preview.
npm run dev
```

**Edit a file directly in GitHub**

- Navigate to the desired file(s).
- Click the "Edit" button (pencil icon) at the top right of the file view.
- Make your changes and commit the changes.

**Use GitHub Codespaces**

- Navigate to the main page of your repository.
- Click on the "Code" button (green button) near the top right.
- Select the "Codespaces" tab.
- Click on "New codespace" to launch a new Codespace environment.
- Edit files directly within the Codespace and commit and push your changes once you're done.

## What technologies are used for this project?

This project is built with:

- Vite
- TypeScript
- React
- shadcn-ui
- Tailwind CSS

## How can I deploy this project?

Simply open [Lovable](https://lovable.dev/projects/7b7e8d84-7b5b-48d8-a7d6-6dedbe701982) and click on Share -> Publish.

## Can I connect a custom domain to my Lovable project?

Yes, you can!

To connect a domain, navigate to Project > Settings > Domains and click Connect Domain.

Read more here: [Setting up a custom domain](https://docs.lovable.dev/tips-tricks/custom-domain#step-by-step-guide)

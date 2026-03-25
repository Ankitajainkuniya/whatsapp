# ModernX Customer Dashboard

A modern customer management dashboard built with Next.js, TypeScript, and Tailwind CSS, replicating the design of the ModernX platform.

## Features

- **Live Customer Monitoring**: Real-time customer analytics dashboard
- **Responsive Sidebar Navigation**: Clean and intuitive navigation menu
- **Statistics Cards**: Display customer metrics for different time periods
- **Search Functionality**: Customer search and filtering capabilities
- **Modern UI**: Clean, professional design with blue theme

## Tech Stack

- **Framework**: Next.js 14.1.0
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Development**: React 18

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn package manager

### Installation

1. Clone the repository or navigate to the project directory
2. Install dependencies:
   ```bash
   npm install
   ```

### Development

Start the development server:
```bash
npm run dev
# or use the VS Code task
```

The application will be available at [http://localhost:3000](http://localhost:3000) (or the next available port).

### Build

To build the application for production:
```bash
npm run build
```

## Project Structure

```
src/
├── app/
│   ├── globals.css      # Global styles and Tailwind imports
│   ├── layout.tsx       # Root layout component
│   └── page.tsx         # Main dashboard page
```

## Features Overview

### Dashboard Layout
- **Sidebar Navigation**: Left navigation panel with menu items
- **Header**: Top navigation with branding, location selector, and search
- **Main Content**: Customer analytics and search interface

### Components
- **Navigation Items**: Home, Brand Management, Rewards, QR Codes, Analytics, etc.
- **Statistics Cards**: Live customers, 12-hour, 24-hour, and weekly metrics
- **Search Interface**: Customer search dropdown with filtering

## Design System

The application follows the ModernX design language:
- **Primary Color**: Blue (#2563eb)
- **Typography**: Inter font family
- **Layout**: Modern sidebar + main content layout
- **Components**: Card-based interface with clean shadows

## Development Notes

- Uses Next.js App Router
- TypeScript for type safety
- Tailwind CSS for utility-first styling
- Responsive design principles
- Component-based architecture

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build production version
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

## Demo Features

This dashboard serves as a foundation for building customer management features. The current implementation includes:

- Static dashboard layout
- Interactive navigation
- Responsive design
- Placeholder data structure

You can extend this by adding:
- Real data integration
- Customer management functionality
- Analytics features
- Authentication system
- Additional dashboard views
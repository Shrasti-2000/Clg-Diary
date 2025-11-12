# CampusPortal - College Student Portal

A modern, UI-only React application for college students to buy/sell items and discover campus events.

## Features

- 🛍️ **Marketplace** - Browse and filter products from fellow students
- 🎉 **Events** - Stay updated with campus events and activities
- 💬 **Comments** - Engage with the community on events
- 🔐 **Login System** - Student and Admin login interface (UI only)
- 👨‍💼 **Admin Dashboard** - Comprehensive admin panel for managing products, events, and users

## Tech Stack

- **React 18** - Modern React with hooks
- **React Router DOM** - Client-side routing
- **Tailwind CSS** - Utility-first styling (no custom CSS classes)
- **Vite** - Fast build tool and dev server

## Installation & Setup

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## Project Structure

```
src/
├── assets/          # SVG illustrations and shapes
├── components/      # Reusable UI components
│   ├── Header.jsx
│   ├── Footer.jsx
│   ├── ProductCard.jsx
│   ├── EventCard.jsx
│   ├── FilterPanel.jsx
│   ├── CommentList.jsx
│   ├── CommentForm.jsx
│   ├── SidebarAdmin.jsx
│   └── StatsCard.jsx
├── data/            # Mock data files
│   ├── mockProducts.js
│   └── mockEvents.js
├── pages/           # Page components
│   ├── Landing.jsx
│   ├── Marketplace.jsx
│   ├── ProductDetail.jsx
│   ├── Events.jsx
│   ├── EventDetail.jsx
│   ├── Login.jsx
│   └── Admin.jsx
├── utils/           # Utility functions
│   └── format.js
├── App.jsx          # Main app with routing
├── main.jsx         # Entry point
└── index.css        # Tailwind imports
```

## Routes

- `/` - Landing page
- `/marketplace` - Product marketplace
- `/product/:id` - Product detail page
- `/events` - Events listing
- `/event/:id` - Event detail page with comments
- `/login` - Login page (student/admin toggle)
- `/admin` - Admin dashboard

## Design Features

- 🎨 Bold GenZ-inspired design with vibrant gradients
- 📱 Fully responsive (mobile, tablet, desktop)
- ✨ Smooth transitions and micro-animations using Tailwind
- 🎯 Clean, modern UI with excellent whitespace
- ♿ Accessible with ARIA labels and keyboard navigation

## Important Notes

⚠️ **This is a UI-only application** - No backend, no real authentication, no database. All data is mocked and interactions are simulated.

- Login forms display alerts instead of actual authentication
- Comments don't persist
- Admin actions show success messages but don't modify data
- Filtering and sorting work on the frontend mock data only

## Color Palette

- Primary Gradient: Purple (#7C4DFF) → Pink (#FF6FD8) → Cyan (#00E1FF)
- Accent Yellow: #FFD166
- Accent Mint: #06D6A0
- Base: White/Slate tones

## Browser Support

Modern browsers with ES6+ support (Chrome, Firefox, Safari, Edge)

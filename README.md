# Frontend Dashboard Application

A modern, responsive React-based dashboard application with authentication, master data management, and comprehensive analytics.

## Features

- 🔐 **Authentication System** - Secure login with protected routes
- 📊 **Dashboard** - Interactive charts and statistics
- 📋 **Master Data Management** - CRUD operations for data entities
- 🎨 **Modern UI** - Built with Tailwind CSS and Lucide icons
- 📱 **Responsive Design** - Works on desktop, tablet, and mobile
- ⚡ **Fast Development** - Built with Vite for rapid development
- 🔒 **Protected Routes** - Automatic redirection for unauthenticated users
- 📈 **Charts & Analytics** - Beautiful data visualization with Recharts
- ✅ **Form Validation** - Robust form handling with React Hook Form and Zod

## Tech Stack

- **Frontend Framework**: React 18 with TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS
- **State Management**: Zustand
- **Routing**: React Router DOM
- **Forms**: React Hook Form with Zod validation
- **Charts**: Recharts
- **Icons**: Lucide React
- **Notifications**: React Hot Toast
- **HTTP Client**: Axios (ready for API integration)

## Prerequisites

- Node.js 16+ 
- npm or yarn

## Installation

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd frontend-dashboard-app
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Start development server**
   ```bash
   npm run dev
   # or
   yarn dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:3000`

## Demo Credentials

For testing purposes, use these credentials:
- **Email**: `admin@example.com`
- **Password**: `password`

## Project Structure

```
src/
├── components/          # Reusable UI components
│   └── ProtectedRoute.tsx
├── layouts/            # Layout components
│   └── DashboardLayout.tsx
├── pages/              # Page components
│   ├── Dashboard.tsx
│   ├── LoginPage.tsx
│   └── MasterData.tsx
├── stores/             # State management
│   └── authStore.ts
├── App.tsx             # Main app component
├── main.tsx            # App entry point
└── index.css           # Global styles
```

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## Key Components

### Authentication Store (`authStore.ts`)
- Manages user authentication state
- Handles login/logout operations
- Persists authentication data

### Dashboard Layout (`DashboardLayout.tsx`)
- Responsive sidebar navigation
- Header with search and user menu
- Mobile-friendly design

### Dashboard (`Dashboard.tsx`)
- Statistics cards
- Interactive charts (Bar, Line, Pie)
- Recent activity feed
- Time range filtering

### Master Data (`MasterData.tsx`)
- Data table with sorting/filtering
- Add/Edit/Delete operations
- Search functionality
- Form validation

## Customization

### Adding New Pages
1. Create a new component in `src/pages/`
2. Add the route to `src/App.tsx`
3. Update navigation in `src/layouts/DashboardLayout.tsx`

### Styling
- Custom CSS classes are defined in `src/index.css`
- Use Tailwind CSS utilities for styling
- Custom color scheme defined in `tailwind.config.js`

### State Management
- Add new stores in `src/stores/` directory
- Use Zustand for simple state management
- Consider React Query for server state

## API Integration

The application is ready for API integration:

1. **Replace mock data** in components with actual API calls
2. **Use Axios** for HTTP requests (already configured)
3. **Update authentication** in `authStore.ts` to use real endpoints
4. **Add React Query** for server state management

## Deployment

### Build for Production
```bash
npm run build
```

### Deploy to Vercel/Netlify
1. Push your code to GitHub
2. Connect your repository to Vercel/Netlify
3. Deploy automatically on push

### Environment Variables
Create a `.env` file for environment-specific configuration:
```env
VITE_API_URL=your-api-url
VITE_APP_NAME=Dashboard App
```

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

This project is licensed under the MIT License.

## Support

For support and questions, please open an issue in the repository.


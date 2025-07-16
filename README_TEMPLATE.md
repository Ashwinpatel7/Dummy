# 🚀 HR Pro Dashboard

> **A modern, feature-rich HR management dashboard built with Next.js 15, TypeScript, and Tailwind CSS**

**Made by Ashwin Patel** ✨

![HR Dashboard Preview](https://via.placeholder.com/800x400/6366f1/ffffff?text=HR+Pro+Dashboard)

## 🌟 Features

### ✅ **Core Features**
- 🏠 **Dashboard Homepage** - Employee cards with performance ratings
- 🔍 **Advanced Search & Filtering** - Multi-select filters and real-time search
- 👤 **Employee Details** - Comprehensive profiles with tabbed interface
- 📌 **Bookmark Management** - Save and organize favorite employees
- 📊 **Analytics Dashboard** - Interactive charts and performance insights

### ✅ **Bonus Features**
- 🔐 **Authentication System** - Mock login with role-based access
- ➕ **User Management** - Create new employees with form validation
- 📄 **Pagination & Infinite Scroll** - Toggle between viewing modes
- 🎭 **Smooth Animations** - Framer Motion throughout the app
- 🌙 **Dark/Light Mode** - Seamless theme switching
- 📱 **Fully Responsive** - Mobile-first design

## 🛠️ Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **Charts**: Chart.js + react-chartjs-2
- **State Management**: React Context API
- **Icons**: Heroicons
- **Deployment**: Vercel

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation

1. **Clone the repository**
```bash
git clone https://github.com/ashwinpatel/hr-dashboard.git
cd hr-dashboard
```

2. **Install dependencies**
```bash
npm install
# or
yarn install
```

3. **Run the development server**
```bash
npm run dev
# or
yarn dev
```

4. **Open your browser**
Navigate to [http://localhost:3000](http://localhost:3000)

## 🔐 Demo Credentials

| Role | Email | Password |
|------|-------|----------|
| **Admin** | `admin@hrpro.com` | `SecureAdmin@2024!` |
| **HR Manager** | `hr@hrpro.com` | `HRManager#2024$` |
| **Team Manager** | `manager@hrpro.com` | `TeamLead&2024%` |

## 📱 Screenshots

### Dashboard
![Dashboard](https://via.placeholder.com/600x400/6366f1/ffffff?text=Dashboard+View)

### Employee Details
![Employee Details](https://via.placeholder.com/600x400/8b5cf6/ffffff?text=Employee+Details)

### Analytics
![Analytics](https://via.placeholder.com/600x400/06b6d4/ffffff?text=Analytics+Dashboard)

### Mobile View
![Mobile](https://via.placeholder.com/300x600/ec4899/ffffff?text=Mobile+Responsive)

## 🏗️ Project Structure

```
hr-dashboard/
├── src/
│   ├── app/                    # Next.js App Router
│   │   ├── dashboard/          # Main dashboard page
│   │   ├── employee/[id]/      # Dynamic employee details
│   │   ├── bookmarks/          # Bookmarks management
│   │   ├── analytics/          # Analytics dashboard
│   │   └── login/              # Authentication
│   ├── components/
│   │   ├── ui/                 # Reusable UI components
│   │   └── layout/             # Layout components
│   ├── contexts/               # React contexts
│   ├── hooks/                  # Custom hooks
│   ├── lib/                    # Utility functions
│   └── types/                  # TypeScript definitions
├── public/                     # Static assets
└── tailwind.config.js          # Tailwind configuration
```

## 🎯 Key Components

### Custom Hooks
- `useAuth` - Authentication management
- `useBookmarks` - Bookmark state management
- `useSearch` - Search and filtering logic
- `usePagination` - Pagination controls
- `useInfiniteScroll` - Infinite scroll functionality
- `useTheme` - Dark/light mode toggle

### UI Components
- `UserCard` - Employee display cards
- `SearchAndFilters` - Advanced filtering
- `CreateUserModal` - User creation form
- `StarRating` - Performance rating display
- `Pagination` - Page navigation
- `LoadMoreButton` - Infinite scroll trigger

## 🔧 Configuration

### Environment Variables
Create a `.env.local` file:
```env
NEXT_PUBLIC_APP_NAME="HR Pro Dashboard"
NEXT_PUBLIC_APP_VERSION="1.0.0"
```

### Tailwind Configuration
The project uses a custom Tailwind configuration with:
- Custom color palette
- Dark mode support
- Custom animations
- Responsive breakpoints

## 📊 Features Deep Dive

### Authentication
- Mock authentication system
- Role-based access control
- Protected routes with middleware
- Persistent login state

### Employee Management
- Fetch data from DummyJSON API
- Create new employees
- Performance rating system
- Comprehensive employee profiles

### Search & Filtering
- Real-time search across multiple fields
- Multi-select department filtering
- Performance rating range filters
- Clear filters functionality

### Analytics
- Department-wise performance charts
- Bookmark trends visualization
- Interactive Chart.js components
- Responsive chart layouts

## 🚀 Deployment

### Vercel (Recommended)
1. Push to GitHub
2. Connect repository to Vercel
3. Deploy automatically

### Manual Deployment
```bash
npm run build
npm start
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License.

## 👨‍💻 Author

**Ashwin Patel**
- GitHub: [@ashwinpatel](https://github.com/ashwinpatel)
- LinkedIn: [Ashwin Patel](https://linkedin.com/in/ashwinpatel)

---

⭐ **If you found this project helpful, please give it a star!** ⭐

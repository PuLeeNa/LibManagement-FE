# 📚 LibraFlow - Library Management System (Frontend)

## 🌐 Live Demo

**Experience the application live!** 🚀

🔗 **[LibraFlow Live](https://libraflowmgmt.netlify.app/)** - Deployed on Netlify

Link to Back-End - https://github.com/PuLeeNa/Library-Management-System

A modern, responsive React-based frontend application for managing library operations including books, members, staff, and book lendings with JWT authentication.

## 🚀 Features

- **Authentication & Authorization**: Secure JWT-based login system with protected routes
- **Modern Dashboard UI**: Dashboard-style design with statistics cards and list views for all modules
- **Toast Notifications**: Real-time user feedback for all CRUD operations using react-toastify
- **Book Management**: Add, edit, delete, and search books with modern card-based UI
- **Member Management**: Manage library members with full CRUD operations
- **Staff Management**: Handle staff records with comprehensive details
- **Lending Management**:
  - Track book lendings, returns, and fines
  - Filter by status (All, Active, Returned)
  - Display book names and member names (not just IDs)
  - Dropdown selects for easy book and member selection when adding lendings
- **Search & Filter**: Quick search functionality across all modules with status filtering
- **Pagination**: Efficient data display with paginated lists (5 items per page)
- **Responsive Design**: Modern UI with Bootstrap components, hover effects, and rounded corners
- **Loading Indicators**: Smooth loading experience with modern spinners

## 🛠️ Tech Stack

- **React** 18 with TypeScript
- **React Router** 7 for navigation
- **React Bootstrap** 2 for UI components
- **Bootstrap** 5 for styling
- **Axios** for API calls with JWT interceptors
- **React Toastify** for toast notifications
- **Local Storage** for token management

## 📋 Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- Backend API running on `http://localhost:8081`

## ⚙️ Installation

1. Clone the repository:

```bash
git clone https://github.com/PuLeeNa/LibManagement-FE.git
cd LibManagement-FE
```

2. Install dependencies:

```bash
npm install
```

3. Configure environment variables:
   - Create a `.env` file in the root directory
   - Add: `REACT_APP_API_URL=http://localhost:8081/booklib/api`
   - **Important**: In React, environment variables must be prefixed with `REACT_APP_`

## 🚀 Running the Application

### Development Mode

```bash
npm start
```

Runs the app at [http://localhost:3000](http://localhost:3000)

### Production Build

```bash
npm run build
```

Builds the app for production in the `build` folder.

### Run Tests

```bash
npm test
```

## 🚢 Deployment

### Netlify Deployment (Production)

This application is deployed and hosted on **Netlify** with continuous deployment enabled.

#### Deployment Features:

- ✅ **Build Optimization**: Optimized production builds with code splitting
- ✅ **HTTPS**: Secure SSL certificate automatically provisioned
- ✅ **CDN Distribution**: Global CDN for fast content delivery
- ✅ **Environment Variables**: Configured in Netlify dashboard for secure API endpoints

#### Manual Deployment Steps:

1. **Build the production bundle:**

   ```bash
   npm run build
   ```

2. **Deploy to Netlify:**

   - Option A: **Drag & Drop** - Upload the `build` folder to Netlify dashboard
   - Option B: **Netlify CLI**
     ```bash
     npm install -g netlify-cli
     netlify login
     netlify deploy --prod
     ```
   - Option C: **GitHub Integration** (Recommended)
     - Connect repository to Netlify
     - Configure build settings:
       - Build command: `npm run build`
       - Publish directory: `build`
     - Set environment variables in Netlify dashboard

3. **Configure Environment Variables in Netlify:**
   - Go to Site Settings → Build & Deploy → Environment
   - Add: `REACT_APP_API_URL` with your production backend URL

#### Deployment Configuration:

Create `netlify.toml` in root directory:

```toml
[build]
  command = "npm run build"
  publish = "build"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
```

### Other Deployment Options:

- **Vercel**: `npm install -g vercel && vercel`
- **GitHub Pages**: Configure in `package.json` with `gh-pages`
- **AWS S3 + CloudFront**: For enterprise-scale deployments
- **Docker**: Containerized deployment with Nginx

## 📁 Project Structure

```
src/
├── components/
│   ├── book/          # Book management components
│   ├── member/        # Member management components
│   ├── staff/         # Staff management components
│   ├── lending/       # Lending management components
│   ├── Dashboard.tsx  # Main dashboard
│   ├── Login.tsx      # Login page
│   ├── NavB.tsx       # Navigation bar
│   ├── NotFound.tsx   # 404 page
│   └── ProtectedRoute.tsx  # Route protection
├── service/
│   ├── authService/   # Authentication services
│   ├── BookData.ts    # Book API calls
│   ├── MemberData.ts  # Member API calls
│   ├── StaffData.ts   # Staff API calls
│   └── LendingData.ts # Lending API calls
├── App.tsx           # Main app component
└── index.tsx         # Entry point
```

## 🔐 Authentication

The application uses JWT tokens for authentication:

- Login at `/login`
- Token stored in localStorage
- Automatic token attachment to API requests
- Auto-redirect to login on 401 errors
- Protected routes require valid authentication

## 🌐 API Endpoints

All endpoints require authentication (except `/auth/login`):

- **Auth**: `/api/auth/login`, `/api/auth/validate`
- **Books**: `/api/v1/books/*`
- **Members**: `/api/v1/members/*`
- **Staff**: `/api/v1/staffs/*`
- **Lendings**: `/api/v1/lendings/*`

## 🎨 Features by Module

### Dashboard

- Modern card-based statistics layout
- Total counts for books, members, staff, and active lendings
- Available books count
- Recent lendings table with status badges
- Smooth loading indicators

### Book Management

- Dashboard-style UI with statistics cards:
  - Total Books
  - Available Books
  - Total Quantity
- Modern list view with hover effects
- Add/Edit/Delete books with toast notifications
- Search by ID, name, author, publisher, ISBN
- Pagination (5 items per page)
- Track total and available quantities
- Price tracking and display

### Member Management

- Dashboard-style UI with statistics cards:
  - Total Members
  - Active Members
  - New This Month
- Modern list view layout
- Full CRUD operations with toast notifications
- Search functionality
- Membership date tracking

### Staff Management

- Dashboard-style UI with statistics cards:
  - Total Staff
  - Active Staff
  - Departments Count
- Modern list view with role badges
- Complete staff information management
- Toast notifications for all operations
- Role-based organization
- Last update tracking

### Lending Management

- Dashboard-style UI with statistics cards:
  - Total Lendings
  - Active Lendings
  - Overdue Count
  - Total Fines
- **Status Filter Dropdown**: Filter by All/Active/Returned
- **Smart Book & Member Display**: Shows names instead of just IDs
- **Dropdown Selects for Adding**: Choose books and members from dropdown lists showing names with IDs
- Modern list view with status badges (Active/Returned/Overdue)
- Track book lendings and returns
- Calculate and display fines for overdue books
- Status-based actions (Book Returned button only for active lendings)
- Toast notifications for all operations
- Search by lending ID, book, or member

## 🔧 Configuration

### Environment Variables

Create `.env` file for custom configuration:

```
REACT_APP_API_URL=http://localhost:8081/booklib/api
```

## 📦 Dependencies

Key dependencies:

- `react`: ^19.2.0
- `react-dom`: ^19.2.0
- `react-router`: ^7.9.5
- `react-router-dom`: ^7.9.6
- `react-bootstrap`: ^2.10.10
- `bootstrap`: ^5.3.8
- `react-toastify`: ^10.x (for toast notifications)
- `axios`: ^1.12.2
- `typescript`: ^4.9.5

Dev dependencies:

- `@testing-library/react`: ^16.3.0
- `@testing-library/jest-dom`: ^6.9.1
- `react-scripts`: 5.0.1

## 👥 Author

**PuLeeNa**

- GitHub: [@PuLeeNa](https://github.com/PuLeeNa)

## 🎨 UI/UX Highlights

- **Modern Dashboard Design**: Statistics cards with color-coded left borders (blue, green, yellow, red, navy)
- **Card-Based Layouts**: Clean, modern list views with hover effects replacing traditional tables
- **Rounded Corners**: 15px border radius for a softer, modern look
- **Shadow Effects**: Subtle shadows on cards for depth
- **Responsive Grid Layout**: Information organized in responsive columns
- **Color Coding**:
  - Navy theme throughout the application
  - Success green for positive actions
  - Danger red for delete operations
  - Warning yellow for important metrics
- **Toast Notifications**:
  - Success toasts (green) for completed operations
  - Error toasts (red) for failures
  - Auto-dismiss after 3 seconds
  - Top-right position
- **Loading States**: Modern navy-themed spinner with descriptive text

## 🔄 Recent Updates

- ✅ Migrated to dashboard-style UI for all console pages
- ✅ Added react-toastify for user feedback on all CRUD operations
- ✅ Implemented status filtering for lendings (All/Active/Returned)
- ✅ Enhanced lending forms with book and member name dropdowns
- ✅ Replaced table structures with modern list views
- ✅ Added statistics cards to all management pages
- ✅ Implemented proper environment variable handling with REACT*APP* prefix
- ✅ Added modern loading indicators for authentication

## 🙏 Acknowledgments

- React Bootstrap for UI components
- React Toastify for notification system
- Create React App for project bootstrapping
- Spring Boot backend integration
- TypeScript for type safety

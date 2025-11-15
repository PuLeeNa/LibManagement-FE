# 📚 LibraFlow - Library Management System (Frontend)

Link to Back-End - https://github.com/PuLeeNa/Library-Management-System

A modern, responsive React-based frontend application for managing library operations including books, members, staff, and book lendings with JWT authentication.

## 🚀 Features

- **Authentication & Authorization**: Secure JWT-based login system with protected routes
- **Dashboard**: Real-time statistics and recent lending information
- **Book Management**: Add, edit, delete, and search books with pagination
- **Member Management**: Manage library members with full CRUD operations
- **Staff Management**: Handle staff records with comprehensive details
- **Lending Management**: Track book lendings, returns, and fines
- **Search & Filter**: Quick search functionality across all modules
- **Pagination**: Efficient data display with paginated tables
- **Responsive Design**: Modern UI with Bootstrap components

## 🛠️ Tech Stack

- **React** 18 with TypeScript
- **React Router** for navigation
- **React Bootstrap** for UI components
- **Axios** for API calls with JWT interceptors
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

3. Configure API endpoint (if different from default):
   - Update `baseURL` in `src/service/authService/AxiosConfig.ts`

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

- Total counts for books, members, staff, and active lendings
- Available books count
- Recent lendings table with status badges

### Book Management

- Add/Edit/Delete books
- Search by ID, name, author, publisher, ISBN
- Pagination (5 items per page)
- Track total and available quantities

### Member Management

- Manage member records
- Search functionality
- Membership date tracking

### Staff Management

- Complete staff information management
- Role-based organization
- Last update tracking

### Lending Management

- Track book lendings and returns
- Calculate fines for overdue books
- Status-based actions (only show "Book Returned" button for active lendings)
- Overdue status monitoring

## 🔧 Configuration

### Environment Variables

Create `.env` file for custom configuration:

```
REACT_APP_API_URL=http://localhost:8081/booklib/api
```

## 📦 Dependencies

Key dependencies:

- `react`: ^18.x
- `react-router-dom`: ^6.x
- `react-bootstrap`: ^2.x
- `bootstrap`: ^5.x
- `axios`: ^1.x
- `typescript`: ^4.x

## 👥 Author

**PuLeeNa**

- GitHub: [@PuLeeNa](https://github.com/PuLeeNa)

## 🙏 Acknowledgments

- React Bootstrap for UI components
- Create React App for project bootstrapping
- Spring Boot backend integration

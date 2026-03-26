# ECommerceApp - Full Stack React Application

A complete eCommerce application built with React, React Router DOM, and Context API for state management. This project demonstrates modern React patterns with functional components, hooks, and authentication.

## 📁 Project Structure

```
src/
├── components/
│   ├── Navbar.jsx
│   ├── Navbar.css
│   └── ProtectedRoute.jsx
├── pages/
│   ├── Landing.jsx
│   ├── Landing.css
│   ├── Signup.jsx
│   ├── Login.jsx
│   └── Auth.css
├── context/
│   └── AuthContext.jsx
├── services/
│   └── authService.js
├── App.jsx
├── App.css
├── index.js
└── index.css
```

## 🚀 Features

### Authentication System
- User registration (Signup) with form validation
- User login with credential verification
- localStorage-based user management
- Protected routes for authenticated users
- Global auth state with React Context API

### Pages & Components
- **Landing Page**: Homepage with product showcase and navbar
- **Signup Page**: User registration form with validation
- **Login Page**: Login form with error handling
- **Navbar Component**: Dynamic navigation bar that shows different content based on auth state
- **ProtectedRoute Component**: Higher-order component for protecting authenticated routes

### Services
- **AuthService**: Centralized authentication logic for signup, login, and validation

### Styling
- Modern, responsive CSS
- Mobile-friendly design
- Gradient backgrounds and smooth transitions
- Professional color scheme

## 🛠️ Installation & Setup

1. **Install dependencies:**
   ```bash
   npm install
   npm install react-router-dom
   ```

2. **Start the development server:**
   ```bash
   npm start
   ```
   The app will open at [http://localhost:3000](http://localhost:3000)

3. **Build for production:**
   ```bash
   npm run build
   ```

## 🔍 Usage Guide

### Navigation
- Click on the ECommerceApp logo to return to the home page
- Use the navbar links to navigate between pages
- Authenticated users see a "Logout" button and welcome message
- Unauthenticated users see "Login" and "Signup" buttons

### Signup
1. Click "Signup" in the navbar
2. Fill in your name, email, and password (min 6 characters)
3. Confirm your password and submit
4. You'll be redirected to the login page

### Login
1. Click "Login" in the navbar
2. Enter your email and password
3. Upon successful login, you'll be redirected to the home page
4. Your name will be displayed in the navbar

### Logout
- Authenticated users can click "Logout" in the navbar
- This clears the session and returns you to the landing page

## 📊 State Management

The app uses **React Context API** for global state management:

```javascript
const { user, loading, login, signup, logout, isLoggedIn } = useAuth();
```

- `user`: Current logged-in user object
- `isLoggedIn`: Boolean indicating authentication status
- `loading`: Loading state during auth initialization
- `login()`: Function to log in a user
- `signup()`: Function to register a new user
- `logout()`: Function to log out

## 💾 Data Storage

All user data is stored in browser's `localStorage`:
- `users`: Array of all registered users
- `currentUser`: Currently logged-in user object

**Note**: This is for demo purposes. In production, use a backend database and secure authentication (JWT tokens, hashed passwords, etc.).

## 📱 Responsive Design

The application is fully responsive and works well on:
- Desktop browsers (1200px and above)
- Tablets (768px to 1199px)
- Mobile phones (below 768px)

## 🔐 Security Features (Demo)

- Basic email validation
- Password length validation (minimum 6 characters)
- Separate user object stored (password excluded) to prevent accidental exposure
- Protected routes that redirect to login if not authenticated

**⚠️ Important**: This is a demonstration project. For production:
- Never store plain text passwords
- Use server-side authentication
- Implement JWT or session-based authentication
- Use HTTPS for all communications
- Implement proper password hashing (bcrypt, etc.)

## 📦 Dependencies

- **react**: ^19.2.4
- **react-dom**: ^19.2.4
- **react-router-dom**: ^6.x
- **react-scripts**: 5.0.1

## 🚦 Available Scripts

```bash
npm start       # Run development server
npm build      # Build for production
npm test       # Run tests
npm run eject  # Eject from create-react-app (irreversible)
```

## 🎨 Styling Highlights

- **Gradient backgrounds** for modern look
- **Smooth transitions** on hover effects
- **Card-based layout** for products
- **Professional color palette**:
  - Primary: #3498db (Blue)
  - Dark: #2c3e50 (Dark Blue)
  - Success: #27ae60 (Green)
  - Error: #e74c3c (Red)

## 📝 Example Product Display

The Landing page displays 6 sample products with:
- Product emoji icon
- Product name and description
- Price display
- "Add to Cart" button (placeholder for future functionality)

## 🔌 Extensibility

Easy to extend with:
- Add shopping cart functionality
- Integrate with a backend API
- Add product detail pages
- Implement payment processing
- Add product filtering and search
- User profile management

## 📄 License

This project is open source and available under the MIT License.

## 🤝 Contributing

Feel free to fork, modify, and use this project for learning purposes!

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)

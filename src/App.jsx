import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import ProtectedRoute from './components/ProtectedRoute';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import UserDashboard from './pages/UserDashboard';
import SubmitGrievance from './pages/SubmitGrievance';
import MyGrievances from './pages/MyGrievances';
import GrievanceDetails from './pages/GrievanceDetails';
import AdminDashboard from './pages/AdminDashboard';
import AdminGrievanceDetails from './pages/AdminGrievanceDetails';
import './index.css';

function App() {
  return (
    <Router>
      <Navbar />
      <div className="container">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* User Routes */}
          <Route path="/user/dashboard" element={<ProtectedRoute role="user"><UserDashboard /></ProtectedRoute>} />
          <Route path="/user/submit" element={<ProtectedRoute role="user"><SubmitGrievance /></ProtectedRoute>} />
          <Route path="/user/grievances" element={<ProtectedRoute role="user"><MyGrievances /></ProtectedRoute>} />
          <Route path="/user/grievances/:id" element={<ProtectedRoute role="user"><GrievanceDetails /></ProtectedRoute>} />

          {/* Admin Routes */}
          <Route path="/admin/dashboard" element={<ProtectedRoute role="admin"><AdminDashboard /></ProtectedRoute>} />
          <Route path="/admin/grievances/:id" element={<ProtectedRoute role="admin"><AdminGrievanceDetails /></ProtectedRoute>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;

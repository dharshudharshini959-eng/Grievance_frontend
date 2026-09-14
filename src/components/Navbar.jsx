import { Link, useNavigate } from 'react-router-dom';

const Navbar = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem('token');
  const user = JSON.parse(localStorage.getItem('user'));

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/login');
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-logo">Grievance Portal</Link>
        <div className="navbar-links">
          {token ? (
            <>
              {user?.role === 'admin' ? (
                <Link to="/admin/dashboard" className="nav-link">Dashboard</Link>
              ) : (
                <>
                  <Link to="/user/dashboard" className="nav-link">Dashboard</Link>
                  <Link to="/user/submit" className="nav-link">Submit</Link>
                </>
              )}
              <span className="nav-user">Hi, {user?.name}</span>
              <button onClick={handleLogout} className="btn btn-logout">Logout</button>
            </>
          ) : (
            <>
              <Link to="/login" className="nav-link">Login</Link>
              <Link to="/register" className="nav-link">Register</Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

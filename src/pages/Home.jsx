import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="home-container">
      <div className="hero">
        <h1>Online <span>Grievance</span> Redressal Portal</h1>
        <p>A simple and transparent way to submit and track your college grievances.</p>
        <div className="hero-buttons">
          <Link to="/login" className="btn btn-primary">Login</Link>
          <Link to="/register" className="btn btn-secondary">Register</Link>
        </div>
      </div>
    </div>
  );
};

export default Home;

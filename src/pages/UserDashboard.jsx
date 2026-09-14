import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../services/api';

const UserDashboard = () => {
  const [grievances, setGrievances] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchGrievances = async () => {
      try {
        const response = await api.get('/grievances/my');
        setGrievances(response.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchGrievances();
  }, []);

  const total = grievances.length;
  const pending = grievances.filter(g => g.status === 'Pending').length;
  const inProgress = grievances.filter(g => g.status === 'In Progress').length;
  const resolved = grievances.filter(g => g.status === 'Resolved').length;

  if (loading) return <div>Loading...</div>;

  return (
    <div className="dashboard">
      <h2>User Dashboard</h2>
      <div className="summary-cards mt-4">
        <div className="card text-center stat-card total">
          <h3>Total</h3>
          <div className="text-2xl">{total}</div>
        </div>
        <div className="card text-center stat-card pending">
          <h3>Pending</h3>
          <div className="text-2xl">{pending}</div>
        </div>
        <div className="card text-center stat-card progress">
          <h3>In Progress</h3>
          <div className="text-2xl">{inProgress}</div>
        </div>
        <div className="card text-center stat-card resolved">
          <h3>Resolved</h3>
          <div className="text-2xl">{resolved}</div>
        </div>
      </div>
      <div className="mt-4 flex gap-4">
        <Link to="/user/submit" className="btn btn-primary">Submit Complaint</Link>
        <Link to="/user/grievances" className="btn btn-secondary">My Complaints</Link>
      </div>
    </div>
  );
};

export default UserDashboard;

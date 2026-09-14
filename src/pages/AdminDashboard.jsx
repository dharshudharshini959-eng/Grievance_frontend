import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../services/api';
import StatusBadge from '../components/StatusBadge';

const AdminDashboard = () => {
  const [grievances, setGrievances] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchGrievances = async () => {
      try {
        const response = await api.get('/admin/grievances');
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
      <h2>Admin Dashboard</h2>
      <div className="summary-cards">
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
      
      <div className="table-container mt-4">
        <h3>All Complaints</h3>
        <table className="table">
          <thead>
            <tr>
              <th>ID</th>
              <th>User</th>
              <th>Subject</th>
              <th>Category</th>
              <th>Status</th>
              <th>Date</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {grievances.length === 0 ? (
              <tr><td colSpan="7" className="text-center">No complaints found</td></tr>
            ) : grievances.map(g => (
              <tr key={g._id}>
                <td>{g.grievanceId}</td>
                <td>{g.userId?.name || 'Unknown'}</td>
                <td>{g.subject}</td>
                <td>{g.category}</td>
                <td><StatusBadge status={g.status} /></td>
                <td>{new Date(g.createdAt).toLocaleDateString()}</td>
                <td>
                  <Link to={`/admin/grievances/${g._id}`} className="btn btn-sm btn-secondary">Manage</Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminDashboard;

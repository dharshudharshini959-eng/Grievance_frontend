import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../services/api';
import StatusBadge from '../components/StatusBadge';

const MyGrievances = () => {
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

  if (loading) return <div>Loading...</div>;

  return (
    <div className="table-container">
      <div className="flex-between mb-4">
        <h2>My Complaints</h2>
        <Link to="/user/submit" className="btn btn-primary">Submit New</Link>
      </div>
      <table className="table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Subject</th>
            <th>Category</th>
            <th>Status</th>
            <th>Date</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {grievances.length === 0 ? (
            <tr><td colSpan="6" className="text-center">No complaints found</td></tr>
          ) : grievances.map(g => (
            <tr key={g._id}>
              <td>{g.grievanceId}</td>
              <td>{g.subject}</td>
              <td>{g.category}</td>
              <td><StatusBadge status={g.status} /></td>
              <td>{new Date(g.createdAt).toLocaleDateString()}</td>
              <td>
                <Link to={`/user/grievances/${g._id}`} className="btn btn-sm btn-secondary">View</Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default MyGrievances;

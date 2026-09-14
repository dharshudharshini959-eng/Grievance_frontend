import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import api from '../services/api';
import StatusBadge from '../components/StatusBadge';

const GrievanceDetails = () => {
  const { id } = useParams();
  const [grievance, setGrievance] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchGrievance = async () => {
      try {
        const response = await api.get(`/grievances/${id}`);
        setGrievance(response.data);
      } catch (err) {
        setError('Grievance not found');
      } finally {
        setLoading(false);
      }
    };
    fetchGrievance();
  }, [id]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div className="error-message">{error}</div>;
  if (!grievance) return <div>Not found</div>;

  return (
    <div className="details-container">
      <div className="card">
        <div className="flex-between">
          <h2>Grievance Details</h2>
          <StatusBadge status={grievance.status} />
        </div>
        <hr />
        <div className="details-grid">
          <div><strong>ID:</strong><br/>{grievance.grievanceId}</div>
          <div><strong>Category:</strong><br/>{grievance.category}</div>
          <div><strong>Submitted:</strong><br/>{new Date(grievance.createdAt).toLocaleString()}</div>
          <div><strong>Updated:</strong><br/>{new Date(grievance.updatedAt).toLocaleString()}</div>
        </div>
        <div className="mt-4">
          <strong>Subject:</strong>
          <p className="mt-2">{grievance.subject}</p>
        </div>
        <div className="mt-4">
          <strong>Description:</strong>
          <p className="bg-light p-3 mt-2">{grievance.description}</p>
        </div>
        {grievance.adminRemark && (
          <div className="mt-4">
            <strong>Admin Remark:</strong>
            <p className="bg-warning-light p-3 mt-2">{grievance.adminRemark}</p>
          </div>
        )}
        <div className="mt-4">
          <Link to="/user/grievances" className="btn btn-secondary">Back to List</Link>
        </div>
      </div>
    </div>
  );
};

export default GrievanceDetails;

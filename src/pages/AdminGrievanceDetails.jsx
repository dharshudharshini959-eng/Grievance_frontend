import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import api from '../services/api';
import StatusBadge from '../components/StatusBadge';

const AdminGrievanceDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [grievance, setGrievance] = useState(null);
  const [status, setStatus] = useState('');
  const [adminRemark, setAdminRemark] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchGrievance = async () => {
      try {
        const response = await api.get(`/admin/grievances/${id}`);
        setGrievance(response.data);
        setStatus(response.data.status);
        setAdminRemark(response.data.adminRemark || '');
      } catch (err) {
        setError('Grievance not found');
      } finally {
        setLoading(false);
      }
    };
    fetchGrievance();
  }, [id]);

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      await api.put(`/admin/grievances/${id}`, { status, adminRemark });
      navigate('/admin/dashboard');
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to update');
    }
  };

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this grievance?')) {
      try {
        await api.delete(`/admin/grievances/${id}`);
        navigate('/admin/dashboard');
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to delete');
      }
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div className="error-message">{error}</div>;
  if (!grievance) return <div>Not found</div>;

  return (
    <div className="details-container">
      <div className="card">
        <div className="flex-between">
          <h2>Manage Grievance</h2>
          <StatusBadge status={grievance.status} />
        </div>
        <hr />
        
        <div className="details-grid">
          <div><strong>ID:</strong><br/>{grievance.grievanceId}</div>
          <div><strong>User:</strong><br/>{grievance.userId?.name} ({grievance.userId?.email})</div>
          <div><strong>Category:</strong><br/>{grievance.category}</div>
          <div><strong>Submitted:</strong><br/>{new Date(grievance.createdAt).toLocaleString()}</div>
        </div>

        <div className="mt-4">
          <strong>Subject:</strong>
          <p className="mt-2">{grievance.subject}</p>
        </div>
        
        <div className="mt-4 mb-4">
          <strong>Description:</strong>
          <p className="bg-light p-3 mt-2">{grievance.description}</p>
        </div>

        <form onSubmit={handleUpdate} className="admin-update-form">
          <div className="form-group">
            <label>Update Status</label>
            <select value={status} onChange={(e) => setStatus(e.target.value)}>
              <option value="Pending">Pending</option>
              <option value="In Progress">In Progress</option>
              <option value="Resolved">Resolved</option>
            </select>
          </div>
          
          <div className="form-group">
            <label>Admin Remark</label>
            <textarea 
              rows="4" 
              value={adminRemark} 
              onChange={(e) => setAdminRemark(e.target.value)}
              placeholder="Add your remarks here..."
            ></textarea>
          </div>

          <div className="flex gap-4 mt-4">
            <button type="submit" className="btn btn-primary">Update Complaint</button>
            <button type="button" onClick={handleDelete} className="btn btn-danger">Delete</button>
            <Link to="/admin/dashboard" className="btn btn-secondary">Cancel</Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AdminGrievanceDetails;

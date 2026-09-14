import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';

const SubmitGrievance = () => {
  const [subject, setSubject] = useState('');
  const [category, setCategory] = useState('Academic');
  const [description, setDescription] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const categories = ['Academic', 'Hostel', 'Fees', 'Library', 'Infrastructure', 'Transport', 'Other'];

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post('/grievances', { subject, category, description });
      navigate('/user/grievances');
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to submit grievance');
    }
  };

  return (
    <div className="form-container">
      <div className="card form-card">
        <h2>Submit Grievance</h2>
        {error && <div className="error-message">{error}</div>}
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Subject</label>
            <input type="text" required value={subject} onChange={(e) => setSubject(e.target.value)} />
          </div>
          <div className="form-group">
            <label>Category</label>
            <select value={category} onChange={(e) => setCategory(e.target.value)}>
              {categories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
            </select>
          </div>
          <div className="form-group">
            <label>Description</label>
            <textarea rows="5" required value={description} onChange={(e) => setDescription(e.target.value)}></textarea>
          </div>
          <button type="submit" className="btn btn-primary w-100 mt-2">Submit</button>
        </form>
      </div>
    </div>
  );
};

export default SubmitGrievance;

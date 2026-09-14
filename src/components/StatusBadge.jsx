const StatusBadge = ({ status }) => {
  let badgeClass = 'badge';
  
  if (status === 'Pending') badgeClass += ' badge-warning';
  if (status === 'In Progress') badgeClass += ' badge-info';
  if (status === 'Resolved') badgeClass += ' badge-success';

  return (
    <span className={badgeClass}>{status}</span>
  );
};

export default StatusBadge;

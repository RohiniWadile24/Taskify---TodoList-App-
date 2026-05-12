import { Clock, Edit3, Trash2 } from 'lucide-react';
// Using native JS for date formatting.
// Actually I will write a simple date formatter.

const TaskCard = ({ task, onEdit, onDelete, onStatusChange }) => {
  const getStatusBadge = (status) => {
    switch (status) {
      case 'Pending':
        return <span className="badge badge-pending">Pending</span>;
      case 'In-Progress':
        return <span className="badge badge-inprogress">In Progress</span>;
      case 'Completed':
        return <span className="badge badge-completed">Completed</span>;
      default:
        return null;
    }
  };

  const getPriorityBadge = (priority) => {
    switch (priority) {
      case 'Low':
        return <span className="badge badge-priority-low">Low</span>;
      case 'Medium':
        return <span className="badge badge-priority-medium">Medium</span>;
      case 'High':
        return <span className="badge badge-priority-high">High</span>;
      default:
        return null;
    }
  };

  const formatDate = (dateString) => {
    const options = { month: 'short', day: 'numeric', year: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };

  return (
    <div className="glass-panel" style={{ padding: '1.5rem', transition: 'all var(--transition-normal)' }} onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-4px)'} onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}>
      <div className="flex justify-between items-start mb-3">
        <h3 style={{ fontSize: '1.1rem', margin: 0, paddingRight: '1rem', flex: 1, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{task.title}</h3>
        <div className="flex gap-2">
          <button onClick={() => onEdit(task)} style={{ background: 'transparent', border: 'none', color: 'var(--text-secondary)', cursor: 'pointer', padding: '4px' }} title="Edit">
            <Edit3 size={16} />
          </button>
          <button onClick={() => onDelete(task._id)} style={{ background: 'transparent', border: 'none', color: 'var(--danger)', cursor: 'pointer', padding: '4px' }} title="Delete">
            <Trash2 size={16} />
          </button>
        </div>
      </div>
      
      <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', marginBottom: '1.5rem', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
        {task.description}
      </p>

      <div className="flex justify-between items-center mt-auto">
        <div className="flex gap-2">
          {getStatusBadge(task.status)}
          {getPriorityBadge(task.priority)}
        </div>
        <div className="flex items-center gap-1" style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
          <Clock size={12} />
          <span>{formatDate(task.createdAt)}</span>
        </div>
      </div>

      <div style={{ marginTop: '1rem', paddingTop: '1rem', borderTop: '1px solid var(--border-color)', display: 'flex', gap: '0.5rem' }}>
        <select 
          className="form-control" 
          style={{ padding: '0.25rem 0.5rem', fontSize: '0.8rem', height: 'auto', background: 'var(--bg-secondary)' }}
          value={task.status}
          onChange={(e) => onStatusChange(task._id, e.target.value)}
        >
          <option value="Pending">Pending</option>
          <option value="In-Progress">In Progress</option>
          <option value="Completed">Completed</option>
        </select>
      </div>
    </div>
  );
};

export default TaskCard;

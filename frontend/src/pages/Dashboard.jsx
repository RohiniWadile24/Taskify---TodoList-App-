import { useState, useEffect, useCallback } from 'react';
import api from '../services/api';
import TaskCard from '../components/TaskCard';
import TaskForm from '../components/TaskForm';
import { toast } from 'react-toastify';
import { Plus, Search, Filter, RefreshCw, ChevronLeft, ChevronRight } from 'lucide-react';

const Dashboard = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [pagination, setPagination] = useState({ page: 1, pages: 1, total: 0 });
  
  // Filters & Search
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [priorityFilter, setPriorityFilter] = useState('');
  const [sortBy, setSortBy] = useState('createdAt:desc');
  
  // Modal state
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingTask, setEditingTask] = useState(null);

  const fetchTasks = useCallback(async (page = 1) => {
    try {
      setLoading(true);
      let query = `/tasks?page=${page}&limit=9`;
      
      if (search) query += `&search=${search}`;
      if (statusFilter) query += `&status=${statusFilter}`;
      if (priorityFilter) query += `&priority=${priorityFilter}`;
      if (sortBy) query += `&sort=${sortBy}`;

      const res = await api.get(query);
      setTasks(res.data.tasks);
      setPagination(res.data.pagination);
    } catch (err) {
      toast.error('Failed to load tasks');
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, [search, statusFilter, priorityFilter, sortBy]);

  useEffect(() => {
    // Debounce search
    const timer = setTimeout(() => {
      fetchTasks(1);
    }, 500);
    return () => clearTimeout(timer);
  }, [search, statusFilter, priorityFilter, sortBy, fetchTasks]);

  const handleCreateTask = async (taskData) => {
    try {
      await api.post('/tasks', taskData);
      toast.success('Task created successfully');
      setIsFormOpen(false);
      fetchTasks(1);
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to create task');
    }
  };

  const handleUpdateTask = async (taskData) => {
    try {
      await api.put(`/tasks/${editingTask._id}`, taskData);
      toast.success('Task updated successfully');
      setIsFormOpen(false);
      setEditingTask(null);
      fetchTasks(pagination.page);
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to update task');
    }
  };

  const handleDeleteTask = async (id) => {
    if (window.confirm('Are you sure you want to delete this task?')) {
      try {
        await api.delete(`/tasks/${id}`);
        toast.success('Task deleted');
        fetchTasks(pagination.page);
      } catch (err) {
        toast.error('Failed to delete task');
      }
    }
  };

  const handleStatusChange = async (id, newStatus) => {
    try {
      await api.put(`/tasks/${id}`, { status: newStatus });
      toast.success('Status updated');
      fetchTasks(pagination.page);
    } catch (err) {
      toast.error('Failed to update status');
    }
  };

  const openEditModal = (task) => {
    setEditingTask(task);
    setIsFormOpen(true);
  };

  const openCreateModal = () => {
    setEditingTask(null);
    setIsFormOpen(true);
  };

  return (
    <div className="animate-fade-in">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h1 style={{ marginBottom: '0.5rem' }}>My Tasks</h1>
          <p>Manage your tasks, priorities, and progress.</p>
        </div>
        <button className="btn btn-primary" onClick={openCreateModal}>
          <Plus size={20} />
          New Task
        </button>
      </div>

      {/* Filters and Controls */}
      <div className="glass-panel mb-8" style={{ padding: '1rem' }}>
        <div className="flex flex-col md:flex-row gap-4">
          <div className="form-group" style={{ marginBottom: 0, flex: 2, position: 'relative' }}>
            <div style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }}>
              <Search size={18} />
            </div>
            <input
              type="text"
              className="form-control"
              placeholder="Search tasks..."
              style={{ paddingLeft: '2.5rem' }}
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          <div className="flex gap-4 flex-1">
            <div className="form-group" style={{ marginBottom: 0, flex: 1 }}>
              <select className="form-control" value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
                <option value="">All Status</option>
                <option value="Pending">Pending</option>
                <option value="In-Progress">In Progress</option>
                <option value="Completed">Completed</option>
              </select>
            </div>

            <div className="form-group" style={{ marginBottom: 0, flex: 1 }}>
              <select className="form-control" value={priorityFilter} onChange={(e) => setPriorityFilter(e.target.value)}>
                <option value="">All Priorities</option>
                <option value="Low">Low</option>
                <option value="Medium">Medium</option>
                <option value="High">High</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Task Grid */}
      {loading && tasks.length === 0 ? (
        <div className="flex justify-center items-center py-12">
          <div className="spinner"></div>
        </div>
      ) : tasks.length === 0 ? (
        <div className="glass-panel flex flex-col items-center justify-center py-12 text-center">
          <div style={{ background: 'rgba(99, 102, 241, 0.1)', padding: '1rem', borderRadius: '50%', marginBottom: '1rem' }}>
            <Filter size={32} color="var(--accent-primary)" />
          </div>
          <h3 style={{ marginBottom: '0.5rem' }}>No tasks found</h3>
          <p style={{ maxWidth: '400px', margin: '0 auto 1.5rem' }}>
            {search || statusFilter || priorityFilter 
              ? "We couldn't find any tasks matching your current filters."
              : "You don't have any tasks yet. Create one to get started!"}
          </p>
          {(search || statusFilter || priorityFilter) && (
            <button className="btn btn-secondary" onClick={() => {
              setSearch(''); setStatusFilter(''); setPriorityFilter('');
            }}>
              <RefreshCw size={18} />
              Clear Filters
            </button>
          )}
        </div>
      ) : (
        <>
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', 
            gap: '1.5rem' 
          }}>
            {tasks.map(task => (
              <TaskCard 
                key={task._id} 
                task={task} 
                onEdit={openEditModal}
                onDelete={handleDeleteTask}
                onStatusChange={handleStatusChange}
              />
            ))}
          </div>

          {/* Pagination */}
          {pagination.pages > 1 && (
            <div className="pagination">
              <button 
                className="page-btn" 
                disabled={pagination.page === 1}
                onClick={() => fetchTasks(pagination.page - 1)}
              >
                <ChevronLeft size={18} />
              </button>
              
              {Array.from({ length: pagination.pages }).map((_, idx) => (
                <button 
                  key={idx + 1} 
                  className={`page-btn ${pagination.page === idx + 1 ? 'active' : ''}`}
                  onClick={() => fetchTasks(idx + 1)}
                >
                  {idx + 1}
                </button>
              ))}
              
              <button 
                className="page-btn" 
                disabled={pagination.page === pagination.pages}
                onClick={() => fetchTasks(pagination.page + 1)}
              >
                <ChevronRight size={18} />
              </button>
            </div>
          )}
        </>
      )}

      {/* Task Form Modal */}
      <TaskForm 
        isOpen={isFormOpen} 
        onClose={() => setIsFormOpen(false)}
        onSave={editingTask ? handleUpdateTask : handleCreateTask}
        editingTask={editingTask}
      />
    </div>
  );
};

export default Dashboard;

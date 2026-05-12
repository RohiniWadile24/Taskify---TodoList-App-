import { useAuth } from '../context/AuthContext';
import { LogOut, CheckCircle } from 'lucide-react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const { user, logout } = useAuth();

  return (
    <nav style={{ background: 'var(--glass-bg)', backdropFilter: 'blur(10px)', borderBottom: '1px solid var(--border-color)' }}>
      <div className="container flex justify-between items-center" style={{ height: '70px' }}>
        <Link to="/" className="flex items-center gap-2">
          <div style={{ background: 'linear-gradient(135deg, var(--accent-primary), var(--accent-hover))', padding: '8px', borderRadius: '8px', display: 'flex' }}>
            <CheckCircle size={24} color="white" />
          </div>
          <span style={{ fontSize: '1.25rem', fontWeight: '700', color: 'white', letterSpacing: '-0.5px' }}>Taskify<span style={{ color: 'var(--accent-primary)' }}>.</span></span>
        </Link>

        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2">
            <div style={{ width: '36px', height: '36px', borderRadius: '50%', background: 'var(--bg-tertiary)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: '600', border: '1px solid var(--border-color)' }}>
              {user?.name?.charAt(0).toUpperCase()}
            </div>
            <span style={{ fontWeight: '500' }} className="hidden sm:block">{user?.name}</span>
          </div>
          <button onClick={logout} className="btn btn-secondary" style={{ padding: '0.5rem 1rem' }}>
            <LogOut size={18} />
            <span className="hidden sm:block">Logout</span>
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

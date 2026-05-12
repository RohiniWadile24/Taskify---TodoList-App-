import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { LogIn, Mail, Lock, CheckCircle } from 'lucide-react';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { login } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    await login(email, password);
    setIsSubmitting(false);
  };

  return (
    <div className="flex items-center justify-center" style={{ minHeight: '100vh', padding: '1.5rem', position: 'relative', overflow: 'hidden' }}>
      
      {/* Background decoration elements */}
      <div style={{ position: 'absolute', top: '-10%', left: '-10%', width: '500px', height: '500px', background: 'radial-gradient(circle, var(--accent-glow) 0%, transparent 70%)', filter: 'blur(60px)', zIndex: 0 }}></div>
      <div style={{ position: 'absolute', bottom: '-10%', right: '-10%', width: '500px', height: '500px', background: 'radial-gradient(circle, rgba(16, 185, 129, 0.15) 0%, transparent 70%)', filter: 'blur(60px)', zIndex: 0 }}></div>

      <div className="glass-panel animate-fade-in" style={{ width: '100%', maxWidth: '440px', padding: '3rem', position: 'relative', zIndex: 1 }}>
        <div className="flex flex-col items-center mb-8">
          <div style={{ background: 'linear-gradient(135deg, var(--accent-primary), var(--accent-hover))', padding: '12px', borderRadius: '12px', marginBottom: '1.5rem', display: 'inline-flex', boxShadow: 'var(--shadow-glow)' }}>
            <CheckCircle size={32} color="white" />
          </div>
          <h1 style={{ fontSize: '1.75rem', marginBottom: '0.5rem', textAlign: 'center' }}>Welcome back</h1>
          <p style={{ textAlign: 'center' }}>Enter your credentials to access your account</p>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div className="form-group" style={{ marginBottom: '0' }}>
            <label className="form-label">Email</label>
            <div style={{ position: 'relative' }}>
              <div style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }}>
                <Mail size={18} />
              </div>
              <input
                type="email"
                className="form-control"
                placeholder="rohini.wadile@example.in"
                style={{ paddingLeft: '2.75rem' }}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
          </div>

          <div className="form-group" style={{ marginBottom: '1rem' }}>
            <label className="form-label flex justify-between">
              Password
              <a href="#" style={{ fontSize: '0.85rem' }}>Forgot password?</a>
            </label>
            <div style={{ position: 'relative' }}>
              <div style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }}>
                <Lock size={18} />
              </div>
              <input
                type="password"
                className="form-control"
                placeholder="••••••••"
                style={{ paddingLeft: '2.75rem' }}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                minLength={6}
              />
            </div>
          </div>

          <button type="submit" className="btn btn-primary" disabled={isSubmitting} style={{ width: '100%', marginTop: '0.5rem', padding: '0.875rem' }}>
            {isSubmitting ? <div className="spinner" style={{ width: '20px', height: '20px', borderTopColor: 'white' }}></div> : (
              <>
                <LogIn size={20} />
                Sign In
              </>
            )}
          </button>
        </form>

        <div style={{ marginTop: '2rem', textAlign: 'center', fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
          Don't have an account? <Link to="/register" style={{ fontWeight: '500' }}>Sign up</Link>
        </div>
      </div>
    </div>
  );
};

export default Login;

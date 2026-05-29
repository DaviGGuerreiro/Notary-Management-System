// frontend/src/pages/Login.tsx
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export function Login() {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const navigate = useNavigate(); // Ferramenta mágica para trocar de página via código

  const handleLogin = (e: React.SyntheticEvent) => {
    e.preventDefault();
    // ainda não existe bloqueio no login de algum usuario.
    navigate('/usuarios');
  };

  return (
  <div style={{ 
    display: 'flex', 
    justifyContent: 'center', 
    alignItems: 'center', 
    minHeight: '100vh',
    background: 'linear-gradient(135deg, #eff6ff 0%, #f8fafc 60%, #f0fdf4 100%)',
  }}>
    <div className="card" style={{ width: '100%', maxWidth: '420px', padding: '48px' }}>
      {/* Cabeçalho com linha */}
      <div style={{ textAlign: 'center', marginBottom: '36px' }}>
        <div style={{ fontSize: '48px', marginBottom: '12px' }}>🏛️</div>
        <h2 style={{ margin: 0, color: 'var(--text-main)', fontWeight: 700, fontSize: '22px' }}>
          Cartório Digital
        </h2>
        <p style={{ margin: '8px 0 0', color: '#94a3b8', fontSize: '14px' }}>
          Faça login para continuar
        </p>
      </div>
        
      <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
          <label style={{ fontSize: '13px', fontWeight: 600, color: 'var(--text-main)' }}>
            E-mail
          </label>
          <input 
            required 
            type="email" 
            value={email} 
            onChange={(e) => setEmail(e.target.value)} 
            className="input-field"
            style={{ width: '100%', boxSizing: 'border-box' }}
            placeholder="admin@cartorio.com"
          />
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
          <label style={{ fontSize: '13px', fontWeight: 600, color: 'var(--text-main)' }}>
            Senha
          </label>
          <input 
            required 
            type="password" 
            value={senha} 
            onChange={(e) => setSenha(e.target.value)} 
            className="input-field"
            style={{ width: '100%', boxSizing: 'border-box' }}
            placeholder="••••••••"
          />
        </div>

        <button 
          type="submit" 
          className="btn btn-primary"
          style={{ width: '100%', padding: '13px', fontSize: '15px', marginTop: '8px' }}>
          Entrar no Sistema
        </button>
      </form>
    </div>
  </div>
  );
}
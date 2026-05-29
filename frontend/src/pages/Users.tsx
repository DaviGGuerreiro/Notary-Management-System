// frontend/src/pages/Users.tsx
import { useEffect, useState } from 'react';
import { api } from '../services/api';
import type { User } from '../types';

export function Users() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [viewingUser, setViewingUser] = useState<User | null>(null);
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [senhaPlana, setSenhaPlana] = useState(''); // usesState para criar conjunto variavel - construtor que mude ela, para mapear os estados do sistema.

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const response = await api.get('/users');
      setUsers(response.data);
    } catch (error) {
      console.error('Erro ao buscar usuários:', error);
      alert('Erro ao carregar os usuários do servidor.');
    } finally {
      setLoading(false);
    }
  };

  // Handles para processar eventos feitos pela interação com o frontend.
  const handleCreateUser = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    try {
      await api.post('/users', { nome, email, senhaPlana });
      alert('Usuário criado com sucesso!');
      setNome(''); 
      setEmail(''); 
      setSenhaPlana('');
      fetchUsers();
    } catch (error) {
      console.error('Erro ao criar usuário:', error);
      alert('Erro ao criar usuário. Verifique os dados.');
    }
  };

  const handleUpdateUser = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    if (!editingUser) return;

    try {
      await api.put(`/users/${editingUser.id}`, {
        nome: editingUser.nome,
        email: editingUser.email
      });
      alert('Usuário atualizado!');
      setEditingUser(null);
      fetchUsers();
    } catch (error) {
      console.error('Erro ao atualizar usuário:', error);
      alert('Erro ao atualizar o usuário.');
    }
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm('Tem certeza que deseja apagar este usuário?')) return;
    try {
      await api.delete(`/users/${id}`);
      fetchUsers();
    } catch (error) {
      console.error('Erro ao deletar usuário:', error);
      alert('Erro ao excluir o usuário.');
    }
  };

  // retorno jsx, compilado para js e entregue ao browser.
  return (
    <div>
      <div style={{ marginBottom: '28px' }}>
        <h2 style={{ margin: 0, fontSize: '22px', fontWeight: 700, color: 'var(--text-main)' }}>
          Gestão de Usuários
        </h2>
        <p style={{ margin: '4px 0 0', color: '#94a3b8', fontSize: '14px' }}>
          {users.length} usuário{users.length !== 1 ? 's' : ''} cadastrado{users.length !== 1 ? 's' : ''}
        </p>
      </div>
      {/* Painel para Detalhar User */}
      {viewingUser && (
        <div className="card" style={{ borderColor: '#bae6fd', backgroundColor: '#f0f9ff', marginBottom: '24px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
            <div>
              <h3 style={{ marginTop: 0, color: '#0369a1', marginBottom: '16px' }}>
                ℹ️ Detalhes do Usuário
              </h3>
              <div style={{ display: 'grid', gridTemplateColumns: 'auto 1fr', gap: '8px 16px', fontSize: '14px', color: '#334155' }}>
                <strong>Nome:</strong> <span>{viewingUser.nome}</span>
                <strong>E-mail:</strong> <span>{viewingUser.email}</span>
                <strong>Perfil:</strong> <span>{viewingUser.perfil}</span>
                <strong>Criado em:</strong> 
                <span>
                  {viewingUser.createdAt 
                    ? new Date(viewingUser.createdAt).toLocaleString('pt-BR') 
                    : 'Data não disponível'}
                </span>
                <strong>Última atualização:</strong> 
                <span>
                  {viewingUser.updatedAt 
                    ? new Date(viewingUser.updatedAt).toLocaleString('pt-BR') 
                    : 'Data não disponível'}
                </span>
              </div>
            </div>
            <button 
              onClick={() => setViewingUser(null)} 
              className="btn" 
              style={{ background: '#e2e8f0', color: '#475569' }}
            >
              Fechar
            </button>
          </div>
        </div>
      )}
      {/* Painel para Editar User */}
      {editingUser && (
        <div className="card" style={{ borderColor: '#fde68a', backgroundColor: '#fffbeb', marginBottom: '24px' }}>
          <h3 style={{ marginTop: 0, color: '#92400e' }}>Editando: {editingUser.nome}</h3>
          <form onSubmit={handleUpdateUser} className="flex-gap">
            <input 
              className="input-field"
              placeholder="Nome"
              value={editingUser.nome} 
              onChange={e => setEditingUser({...editingUser, nome: e.target.value})} 
            />
            <input 
              className="input-field"
              placeholder="E-mail"
              type="email"
              value={editingUser.email} 
              onChange={e => setEditingUser({...editingUser, email: e.target.value})} 
            />
            <button type="submit" className="btn btn-warning">Salvar Alterações</button>
            <button type="button" onClick={() => setEditingUser(null)} className="btn" style={{ background: '#e2e8f0' }}>Cancelar</button>
          </form>
        </div>
      )}

      {/* Criar user */}
      <div className="card" style={{ marginBottom: '32px' }}>
        <h3 style={{ marginTop: 0, marginBottom: '16px' }}>Cadastrar Novo Usuário</h3>
        <form onSubmit={handleCreateUser} className="flex-gap" style={{ alignItems: 'flex-end', flexWrap: 'wrap' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', flex: 1, minWidth: '200px' }}>
            <label style={{ fontSize: '14px', fontWeight: 500 }}>Nome</label>
            <input required className="input-field" value={nome} onChange={(e) => setNome(e.target.value)} placeholder="Ex: Davi" />
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', flex: 1, minWidth: '200px' }}>
            <label style={{ fontSize: '14px', fontWeight: 500 }}>E-mail</label>
            <input required type="email" className="input-field" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="exemplo@cartorio.com" />
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', flex: 1, minWidth: '200px' }}>
            <label style={{ fontSize: '14px', fontWeight: 500 }}>Senha</label>
            <input required type="password" className="input-field" value={senhaPlana} onChange={(e) => setSenhaPlana(e.target.value)} placeholder="••••••••" />
          </div>

          <button type="submit" className="btn btn-primary" style={{ height: '40px' }}>
            Cadastrar
          </button>
        </form>
      </div>

      {/* Listagem */}
      {loading ? (
        <p>Carregando registros do banco de dados...</p>
      ) : (
        <div className="table-wrapper">
          <table>
            <thead>
              <tr>
                <th>Nome</th>
                <th>E-mail</th>
                <th>Perfil</th>
                <th>Ações</th>
              </tr>
            </thead>
            <tbody>
              {users.length === 0 ? (
              <tr>
                <td colSpan={4} style={{ 
                  textAlign: 'center', padding: '48px', 
                  color: '#94a3b8', fontSize: '14px' 
                }}>
                  <div style={{ fontSize: '32px', marginBottom: '8px' }}>👤</div>
                  Nenhum usuário cadastrado ainda.
                </td>
              </tr>
            ) :users.map((user) => (
                <tr key={user.id}>
                  <td>{user.nome}</td>
                  <td>{user.email}</td>
                  <td>
                    <span style={{ 
                      fontWeight: 600, 
                      fontSize: '12px', 
                      padding: '4px 8px', 
                      borderRadius: '12px',
                      backgroundColor: user.perfil === 'ADMINISTRADOR' ? '#fee2e2' : '#e0f2fe', 
                      color: user.perfil === 'ADMINISTRADOR' ? '#991b1b' : '#0369a1'
                    }}>
                      {user.perfil}
                    </span>
                  </td>
                  <td>
                    <div className="flex-gap">
                      <button onClick={() => {setViewingUser(user);setEditingUser(null);}} className="btn btn-primary">Detalhes</button>
                      <button onClick={() => {setEditingUser(user); setViewingUser(null);}} className="btn btn-warning">Editar</button>
                      <button onClick={() => handleDelete(user.id)} className="btn btn-danger">Remover</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
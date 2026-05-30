import { Alerta } from '../components/Alerta';
import { useMensagem } from '../hooks/useMensagem';
import { useEffect, useState } from 'react';
import { api } from '../services/api';
import type { Service } from '../types';

const StatusBadge = ({ status }: { status: string }) => {
    const styles: Record<string, { bg: string; color: string; label: string }> = {
        CONCLUIDO:    { bg: '#dcfce7', color: '#15803d', label: '✓ Concluído' },
        EM_ANDAMENTO: { bg: '#fef9c3', color: '#a16207', label: '⟳ Em Andamento' },
        AGUARDANDO:   { bg: '#f1f5f9', color: '#475569', label: '◷ Aguardando' },
    };
    const s = styles[status] ?? styles.AGUARDANDO;
    
    return (
        <span style={{
        fontWeight: 600, fontSize: '11px', padding: '4px 10px',
        borderRadius: '9999px',       // Pílula perfeita
        backgroundColor: s.bg,
        color: s.color,
        whiteSpace: 'nowrap',
        letterSpacing: '0.03em',
        }}>
        {s.label}
        </span>
    );
};

const tipoLabels: Record<Service['tipo'], string> = {
  CERTIDAO_NASCIMENTO: 'Certidão de Nascimento',
  RECONHECIMENTO_FIRMA: 'Reconhecimento de Firma',
  AUTENTICACAO: 'Autenticação',
  ESCRITURA: 'Escritura',
  OUTRO: 'Outro'
};

export function ServicesList() {
  const [services, setServices] = useState<Service[]>([]);
  const [statusFilter, setStatusFilter] = useState('');
  const [typeFilter, setTypeFilter] = useState('');
  const [editingService, setEditingService] = useState<Service | null>(null);
  const [deletingService, setDeletingService] = useState<Service | null>(null);
  const [viewingService, setViewingService] = useState<Service | null>(null);
  const [novoNome, setNovoNome] = useState('');
  const [novoCpf, setNovoCpf] = useState('');
  const [novoTipo, setNovoTipo] = useState<Service['tipo']>('CERTIDAO_NASCIMENTO');
  const [novaDescricao, setNovaDescricao] = useState('');
  const [novaObservacao, setNovaObservacao] = useState('');
  const {mensagem, mostrarMensagem } = useMensagem();

    const handleUpdateService = async (e: React.SyntheticEvent) => {
        e.preventDefault();
        if (!editingService) return;

        try {
            // Usando o verbo PATCH para atualização parcial
            await api.patch(`/services/${editingService.id}`, {
                solicitanteNome: editingService.solicitanteNome,
                solicitanteCpf: editingService.solicitanteCpf,
                tipo: editingService.tipo,
                descricao: editingService.descricao,
                observacoes: editingService.observacoes
            });
            mostrarMensagem('sucesso', 'Usuário criado!');

            setEditingService(null);
            loadServices(); // Atualiza a lista
        } catch (error : any) {
            const texto = error?.response?.data?.erro || 'Erro ao atualizar o serviço.';
            mostrarMensagem('erro', texto);
        }
    };

    const handleCreateService = async (e: React.SyntheticEvent) => {
        e.preventDefault();
        try {
        await api.post('/services', {
            solicitanteNome: novoNome,
            solicitanteCpf: novoCpf,
            tipo: novoTipo,
            descricao: novaDescricao,
            observacoes: novaObservacao
            // O status geralmente não é enviado na criação, o backend deve setar 'AGUARDANDO' por padrão
        });
        
        mostrarMensagem('sucesso', 'Serviço criado!');
        // Limpa os campos
        setNovoNome('');
        setNovoCpf('');
        setNovaDescricao('');
        setNovaObservacao('');
        setNovoTipo('CERTIDAO_NASCIMENTO');
        
        loadServices(); //atualiza tabela de listagem.
        } catch (error: any) {
            const texto = error?.response?.data?.erro || 'Erro ao criar o serviço.';
            mostrarMensagem('erro', texto);
        }
    };

    const handleConfirmDelete = async () => {
        if (!deletingService) return;
        
        try {
        await api.delete(`/services/${deletingService.id}`);
        
        mostrarMensagem('sucesso', 'Serviço deletado com sucesso!');

        setDeletingService(null); // Esconde a div de confirmação
        loadServices(); // Recarrega a tabela
        } catch (error: any) {
            const texto = error?.response?.data?.erro || 'Erro ao deletar o serviço.';
            mostrarMensagem('erro', texto);
        }
    };

    useEffect(() => {
        loadServices();
    }, [statusFilter, typeFilter]); // Recarrega sempre que o filtro mudar!

    const loadServices = async () => {
        try {
          const params: any = {};
          if (statusFilter) params.status = statusFilter;
          if (typeFilter) params.tipo = typeFilter;
          const response = await api.get('/services', {params});
        setServices(response.data);
        } catch (error) {
        console.error('Erro ao buscar serviços:', error);
        }
    };

    return (
    <div>
        <div style={{ marginBottom: '28px' }}>
        <h2 style={{ margin: 0, fontSize: '22px', fontWeight: 700, color: 'var(--text-main)' }}>
            Gestão de Serviços
        </h2>
        <p style={{ margin: '4px 0 0', color: '#94a3b8', fontSize: '14px' }}>
            {services.length} serviço{services.length !== 1 ? 's' : ''} encontrado{services.length !== 1 ? 's' : ''}
        </p>
        {/* ↑ Contador dinâmico dá feedback instantâneo ao filtrar */}
        </div>
      {/* Caixa de Confirmação de Deleção (Usando a classe .card que já criamos!) */}

      <Alerta mensagem={mensagem} />

      {deletingService && (
        <div className="card" style={{ borderColor: '#f5c6cb', backgroundColor: '#fdf3f4', marginBottom: '24px' }}>
          <h3 style={{ color: '#721c24', marginTop: 0 }}>⚠️ Confirmar Exclusão</h3>
          <p style={{ color: '#721c24' }}>Tem certeza que deseja apagar o serviço de <strong>{deletingService.solicitanteNome}</strong>?</p>
          <div className="flex-gap">
            <button onClick={handleConfirmDelete} className="btn btn-danger">Sim, Apagar</button>
            <button onClick={() => setDeletingService(null)} className="btn" style={{ background: '#e2e8f0' }}>Cancelar</button>
          </div>
        </div>
      )}
      {/* Card de Cadastro de Novo Serviço */}
    <div className="card" style={{ marginBottom: '32px' }}>
    <h3 style={{ marginTop: 0, marginBottom: '20px' }}>Cadastrar Novo Serviço</h3>
    <form onSubmit={handleCreateService}> 
        {/* Nome e CPF */}
        <div className="flex-gap" style={{ marginBottom: '16px', flexWrap: 'wrap' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', flex: 2, minWidth: '200px' }}>
                <label style={{ fontSize: '13px', fontWeight: 600, color: 'var(--text-main)' }}>
                Nome do Solicitante
                </label>
                <input
                required
                className="input-field"
                value={novoNome}
                onChange={(e) => setNovoNome(e.target.value)}
                placeholder="Ex: Maria Silva"
                />
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', flex: 1, minWidth: '150px' }}>
                <label style={{ fontSize: '13px', fontWeight: 600, color: 'var(--text-main)' }}>
                CPF
                </label>
                <input
                required
                className="input-field"
                value={novoCpf}
                onChange={(e) => setNovoCpf(e.target.value)}
                placeholder="000.000.000-00"
                />
            </div>
        </div>

        {/*  Tipo e Descrição */}
        <div className="flex-gap" style={{ marginBottom: '20px', flexWrap: 'wrap' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', flex: 1, minWidth: '200px' }}>
                <label style={{ fontSize: '13px', fontWeight: 600, color: 'var(--text-main)' }}>
                Tipo de Serviço
                </label>
                <select
                className="input-field"
                value={novoTipo}
                onChange={e => setNovoTipo(e.target.value as Service['tipo'])}
                >
                <option value="CERTIDAO_NASCIMENTO">Certidão de Nascimento</option>
                <option value="RECONHECIMENTO_FIRMA">Reconhecimento de Firma</option>
                <option value="AUTENTICACAO">Autenticação</option>
                <option value="ESCRITURA">Escritura</option>
                <option value="OUTRO">Outro</option>
                </select>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', flex: 2, minWidth: '250px' }}>
                <label style={{ fontSize: '13px', fontWeight: 600, color: 'var(--text-main)' }}>
                Descrição
                </label>
                <input
                required
                className="input-field"
                value={novaDescricao}
                onChange={(e) => setNovaDescricao(e.target.value)}
                placeholder="Detalhes do serviço..."
                />
            </div>
        </div>
        {/* Observações opcional */}
        <div className="flex-gap" style={{ marginBottom: '20px' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', flex: 1 }}>
                <label style={{ fontSize: '13px', fontWeight: 600, color: 'var(--text-main)' }}>
                    Observações <span style={{ color: '#94a3b8', fontWeight: 400 }}>(Opcional)</span>
                </label>
                <input
                    className="input-field"
                    value={novaObservacao}
                    onChange={(e) => setNovaObservacao(e.target.value)}
                    placeholder="Informações adicionais irrelevantes para a descrição principal..."
                />
            </div>
        </div>
        {/* Botão de cadastro */}
        <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
            <button type="submit" className="btn btn-primary" style={{ padding: '10px 28px' }}>
                + Cadastrar Serviço
            </button>
        </div>
    </form>
    </div>
    {/* Painel de Detalhes do Serviço */}
      {viewingService && (
        <div className="card" style={{ borderColor: '#bae6fd', backgroundColor: '#f0f9ff', marginBottom: '24px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
            <div style={{ flex: 1 }}>
              <h3 style={{ marginTop: 0, color: '#0369a1', marginBottom: '16px' }}>
                ℹ️ Detalhes do Serviço
              </h3>
              <div style={{ display: 'grid', gridTemplateColumns: 'auto 1fr', gap: '8px 16px', fontSize: '14px', color: '#334155' }}>
                <strong>Solicitante:</strong> <span>{viewingService.solicitanteNome}</span>
                <strong>CPF:</strong> <span>{viewingService.solicitanteCpf}</span>
                <strong>Tipo:</strong> <span>{viewingService.tipo}</span>
                <strong>Status:</strong> <span><StatusBadge status={viewingService.status} /></span>
                <strong>Data de Solicitação:</strong> 
                <span>
                  {viewingService.createdAt 
                    ? new Date(viewingService.createdAt).toLocaleString('pt-BR') 
                    : 'Data não disponível'}
                </span>
                
                {/* Linha separadora sutil para os textos longos */}
                <div style={{ gridColumn: '1 / -1', height: '1px', background: '#bae6fd', margin: '8px 0' }}></div>
                
                <strong>Descrição:</strong> <span>{viewingService.descricao}</span>
                <strong>Observações:</strong> 
                <span>
                  {viewingService.observacoes ? (
                    viewingService.observacoes
                  ) : (
                    <em style={{ color: '#94a3b8' }}>Nenhuma observação registrada.</em>
                  )}
                </span>
              </div>
            </div>
            <button 
              onClick={() => setViewingService(null)} 
              className="btn" 
              style={{ background: '#e2e8f0', color: '#475569', marginLeft: '16px' }}
            >
              Fechar
            </button>
          </div>
        </div>
      )}
      {/* Caixa de Edição com todos os campos */}
      {editingService && (
        <div className="card" style={{ borderColor: '#fde68a', backgroundColor: '#fffbeb', marginBottom: '24px' }}>
          <h3 style={{ marginTop: 0, color: '#92400e', marginBottom: '20px' }}>Editando Serviço</h3>
          <form onSubmit={handleUpdateService}>
            
            {/* Linha de Solicitante, Cpf e Tipo */}
            <div className="flex-gap" style={{ marginBottom: '16px', flexWrap: 'wrap' }}>
                <div style={{ flex: 1, minWidth: '200px' }}>
                    <label style={{ fontSize: '12px', fontWeight: 600, color: '#92400e' }}>Solicitante</label>
                    <input 
                        className="input-field" style={{ width: '100%', boxSizing: 'border-box' }}
                        value={editingService.solicitanteNome} 
                        onChange={e => setEditingService({...editingService, solicitanteNome: e.target.value})} 
                    />
                </div>
                <div style={{ flex: 1, minWidth: '150px' }}>
                    <label style={{ fontSize: '12px', fontWeight: 600, color: '#92400e' }}>CPF</label>
                    <input 
                        className="input-field" style={{ width: '100%', boxSizing: 'border-box' }}
                        value={editingService.solicitanteCpf} 
                        onChange={e => setEditingService({...editingService, solicitanteCpf: e.target.value})} 
                    />
                </div>
                <div style={{ flex: 1, minWidth: '200px' }}>
                    <label style={{ fontSize: '12px', fontWeight: 600, color: '#92400e' }}>Tipo</label>
                    <select 
                        className="input-field" style={{ width: '100%', boxSizing: 'border-box' }}
                        value={editingService.tipo} 
                        onChange={e => setEditingService({...editingService, tipo: e.target.value as Service['tipo']})} 
                    >
                        <option value="CERTIDAO_NASCIMENTO">Certidão de Nascimento</option>
                        <option value="RECONHECIMENTO_FIRMA">Reconhecimento de Firma</option>
                        <option value="AUTENTICACAO">Autenticação</option>
                        <option value="ESCRITURA">Escritura</option>
                        <option value="OUTRO">Outro</option>
                    </select>
                </div>
            </div>

            {/* Linha de Descrição + Observações */}
            <div className="flex-gap" style={{ marginBottom: '20px', flexWrap: 'wrap' }}>
                <div style={{ flex: 2, minWidth: '200px' }}>
                    <label style={{ fontSize: '12px', fontWeight: 600, color: '#92400e' }}>Descrição</label>
                    <input 
                        className="input-field" style={{ width: '100%', boxSizing: 'border-box' }}
                        value={editingService.descricao} 
                        onChange={e => setEditingService({...editingService, descricao: e.target.value})} 
                    />
                </div>
                <div style={{ flex: 2, minWidth: '200px' }}>
                    <label style={{ fontSize: '12px', fontWeight: 600, color: '#92400e' }}>Observações</label>
                    <input 
                        className="input-field" style={{ width: '100%', boxSizing: 'border-box' }}
                        value={editingService.observacoes || ''} 
                        onChange={e => setEditingService({...editingService, observacoes: e.target.value})} 
                    />
                </div>
            </div>

            {/* Botões do Editar */}
            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px' }}>
                <button type="submit" className="btn btn-warning">Salvar Alterações</button>
                <button type="button" onClick={() => setEditingService(null)} className="btn" style={{ background: '#e2e8f0', color: '#475569' }}>Cancelar</button>
            </div>
          </form>
        </div>
      )}

      {/* Filtros */}
      <div className="flex-gap">
        <select className="input-field" onChange={(e) => setStatusFilter(e.target.value)}>
          <option value="">Todos os Status</option>
          <option value="AGUARDANDO">Aguardando</option>
          <option value="EM_ANDAMENTO">Em Andamento</option>
          <option value="CONCLUIDO">Concluído</option>
        </select>
        <select className="input-field" onChange={(e) => setTypeFilter(e.target.value)}>
          <option value="">Todos os Tipos</option>
          <option value="CERTIDAO_NASCIMENTO">Certidão de Nascimento</option>
          <option value="RECONHECIMENTO_FIRMA">Reconhecimento de Firma</option>
          <option value="AUTENTICACAO">Autenticação</option>
          <option value="ESCRITURA">Escritura</option>
          <option value="OUTRO">Outro</option>
        </select>
      </div>

      {/* Listagem */}
      <div className="table-wrapper">
        <table>
          <thead>
            <tr>
              <th>Solicitante</th>
              <th>Tipo</th>
              <th>Status</th>
              <th>Data</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {services.map(s => (
              <tr key={s.id}>
                <td style={{ fontWeight: 500 }}>{s.solicitanteNome}</td>
                <td>{tipoLabels[s.tipo]}</td>
                <td style={{ fontSize: '13px', color: '#64748b' }}>
                  <StatusBadge status={s.status} />
                </td>
                <td style={{ fontSize: '13px', color: '#64748b' }}>{s.createdAt ? new Date(s.createdAt).toLocaleDateString('pt-BR') : 'Sem data'}</td>
                <td>
                  <div className="flex-gap">
                    <button onClick={() => {setViewingService(s);setEditingService(null);setDeletingService(null);}}className="btn btn-primary">Detalhes</button>
                    <button onClick={() => setEditingService(s)} className="btn btn-warning">Editar</button>
                    <button onClick={() => setDeletingService(s)} className="btn btn-danger">Deletar</button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
    );
}
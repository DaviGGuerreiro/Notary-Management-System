export interface User {
  id: string;
  nome: string;
  email: string;
  perfil: 'ATENDENTE' | 'ADMINISTRADOR';
  createdAt: string;
  updatedAt: string;
}

export interface Service {
  id: string;
  solicitanteNome: string;
  solicitanteCpf: string;
  tipo: 'Certidão de Nascimento' | 'Reconhecimento de Firma' | 'Autenticação' | 'Escritura' | 'Outro';
  descricao: string;
  observacoes?: string;
  status: 'AGUARDANDO' | 'EM_ANDAMENTO' | 'CONCLUIDO';
  createdAt: string;
}
import { NotaryService, TipoServico, StatusServico } from '@prisma/client';

export interface CreateNotaryserviceDTO {
    tipo?: TipoServico;
    solicitanteNome: string;
    solicitanteCpf: string;
    descricao?: string;
    observacoes?: string;
}

export type UpdateNotaryserviceDTO = Partial<CreateNotaryserviceDTO>;

export interface UpdateNotaryserviceStatusDTO {
    status: StatusServico; // Aceita: "AGUARDANDO", "EM_ANDAMENTO", "CONCLUIDO"
}

export type NotaryserviceResponse = NotaryService;
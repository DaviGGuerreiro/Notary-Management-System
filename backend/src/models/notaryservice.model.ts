export type NotaryserviceType =
    | "Certidão de Nascimento"
    | "Reconhecimento de Firma"
    | "Autenticação"
    | "Escritura"
    | "Outro";

export type NotaryserviceStatus =
    | "Aguardando"
    | "Em andamento"
    | "Concluído";

export interface NotaryserviceBase { //Serviço base
    type: NotaryserviceType;
    requester_name: string;
    requester_CPF: string;
    description?: string;
    status: NotaryserviceStatus;
    request_date: Date;
    observations?: string;
}

export type CreateNotaryservideDTO = NotaryserviceBase; //type alias

export interface NotaryserviceEntity extends NotaryserviceBase{
    _id: number;
}

export type NotaryserviceResponse = Omit<NotaryserviceEntity, '_id'>;
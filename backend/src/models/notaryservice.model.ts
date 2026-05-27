import mongoose, { Schema, Document } from 'mongoose';
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
    servicetype: NotaryserviceType;
    requester_name: string;
    requester_CPF: string;
    description?: string;
    status: NotaryserviceStatus;
    observations?: string;
}

export type CreateNotaryservideDTO = Omit<NotaryserviceBase, 'status' >; //type alias

export interface NotaryserviceEntity extends NotaryserviceBase{
    _id: string;
    createdAt: Date;
    updatedAt: Date;
}

export type NotaryserviceResponse = Omit<NotaryserviceEntity, '_id'>;

// DB, regras de negócio
export interface NotaryserviceDocument extends Omit<NotaryserviceEntity, '_id'>, Document {}
const NotaryserviceSchema = new Schema({
    servicetype: { type: String, enum: ['Certidão de Nascimento'
    , 'Reconhecimento de Firma'
    , 'Autenticação'
    , 'Escritura'
    , 'Outro'], default: 'Outro'},
    requester_name: { type: String, required: true },
    requester_CPF: { type: String, required: true },
    description: { type: String },
    status: { type: String, enum: ['Aguardando'
    , 'Em andamento'
    , 'Concluído'], default: 'Aguardando' },
    request_date: { type: Date, required: true },
    observations: { type: String }
}, { 
    timestamps: true // Isso cria automaticamente os campos createdAt e updatedAt!
});

export const NotaryserviceModel = mongoose.model<NotaryserviceDocument>('NotaryService', NotaryserviceSchema);
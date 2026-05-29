import { User } from '@prisma/client';

export interface CreateUserDTO {
    nome: string;
    email: string;
    senhaPlana: string;
    perfil?: "ATENDENTE" | "ADMINISTRADOR"; 
}

export type UpdateUserPutDTO = Omit<CreateUserDTO, 'senhaPlana'>;
export type UpdateUserPatchDTO = Partial<UpdateUserPutDTO>;

export type SaveUserDbDTO = Omit<CreateUserDTO, 'senhaPlana'> & {senhaHash: string};

export type UserResponse = Omit<User, 'senhaHash'>;
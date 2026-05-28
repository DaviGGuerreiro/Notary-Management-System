import { User } from '@prisma/client';

export interface CreateUserDTO {
    nome: string;
    email: string;
    senhaPlana: string;
    perfil?: "ATENDENTE" | "ADMINISTRADOR"; 
}

export type UpdateUserDTO = Partial<Omit<CreateUserDTO, 'senhaPlana'>>;

export type UserResponse = Omit<User, 'senhaHash'>;
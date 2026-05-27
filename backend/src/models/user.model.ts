export type userRole = "Atendente" | "Administrador";

export interface UserBase { //modelo base do usuario
    name: string;
    email: string;
    role: userRole;
}

export interface CreateUserDTO extends UserBase {
    senhaPlana: string;
}

export interface UserEntity extends UserBase {
    _id: number;
    senhaHash: string;
}

export type UserResponse = Omit<UserEntity, '_id' | 'senhaHash'>;
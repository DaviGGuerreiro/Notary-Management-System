import mongoose, { Schema, Document } from 'mongoose';
export type UserRole = "Atendente" | "Administrador";

export interface UserBase { //modelo base do usuario
    name: string;
    email: string;
    role: UserRole;
}

export interface CreateUserDTO extends UserBase {
    planePassword: string;
}

export interface UserEntity extends UserBase {
    _id: string;
    hashPassword: string;
    createdAt?: Date;
    updatedAt?: Date;
}

export type UserResponse = Omit<UserEntity, '_id' | 'hashPassword'>;

// DB
export interface UserDocument extends Omit<UserEntity, '_id'>, Document {}

const UserSchema = new Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    hashPassword: { type: String, required: true },
    role: { type: String, enum: ['Atendente', 'Administrador'], default: 'Atendente' }
}, { 
    timestamps: true
});

export const UserModel = mongoose.model<UserDocument>('User', UserSchema);

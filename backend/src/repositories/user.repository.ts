// src/repositories/user.repository.ts
import { prisma } from '../config/db';
import { Role } from '@prisma/client';

export class UserRepository {
    
    // 1. Criar um novo usuário
    // O controller já vai mandar a senha com Hash para cá, nunca a senha plana!
    async create(dados: { nome: string; email: string; senhaHash: string; perfil?: Role }) {
        const novoUsuario = await prisma.user.create({
            data: dados
        });
        return novoUsuario;
    }

    async findAll() {
        return await prisma.user.findMany({
             orderBy: { nome: 'desc' },
            select: {
                id: true,
                nome: true,
                email: true,
                perfil: true,
                createdAt: true,
                updatedAt: true
            }
        });
    }

    async findById(id: string) {
        return await prisma.user.findUnique({
            where: { id },
            select: {
                id: true,
                nome: true,
                email: true,
                perfil: true,
                createdAt: true
            }
        });
    }

    async findByEmail(email: string) {
        return await prisma.user.findUnique({
            where: { email }
        });
    }

    async delete(id: string) {
        return await prisma.user.delete({
            where: { id }
        });
    }
}
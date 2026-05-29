// src/repositories/user.repository.ts
import { prisma } from '../config/db';
import { SaveUserDbDTO, UpdateUserPatchDTO, UserResponse } from '../dtos/user.dto'

export class UserRepository {
    
    async create(dados: SaveUserDbDTO): Promise<UserResponse> { //nesse caso no service eu retiro a senha para passar ao controler, entao tudo bem.
        const novoUsuario = await prisma.user.create({
            data: dados,
            omit: { senhaHash: true }
        });
        return novoUsuario;
    }

    async findAll(): Promise<UserResponse[]> { // em vez de um select gigante usar o omit.
        return await prisma.user.findMany({
            orderBy: { nome: 'desc' },
            omit: {
                senhaHash: true
            }
        });
    }

    async findById(id: string): Promise<UserResponse | null>{ // tipagem estrutural (apelidada de duck typing) faz com que o omit nao seja necessario
        return await prisma.user.findUnique({ // ou seja, o codigo nao vai apitar erro, mas passar senhaHash para vai ser um erro de seguranca.
            where: { id },
            omit: {
                senhaHash: true
            }
        });
    }

    async findByEmail(email: string):  Promise<UserResponse | null>{
        return await prisma.user.findUnique({
            where: { email },
            omit: {
                senhaHash: true
            }
        });
    }

    async updateUser(id: string, dados: UpdateUserPatchDTO) : Promise<UserResponse>{
        return await prisma.user.update({
            where: { id },
            data: dados,
            omit: {
                senhaHash: true
            }
        });
    }

    async delete(id: string) : Promise<UserResponse>{
        return await prisma.user.delete({
            where: { id },
            omit: {
                senhaHash: true
            }
        });
    }
}
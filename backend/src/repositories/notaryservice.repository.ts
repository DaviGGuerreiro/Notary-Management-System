// src/repositories/notaryservice.repository.ts
import { prisma } from '../config/db';
import { TipoServico, StatusServico } from '@prisma/client';

export class NotaryserviceRepository {
    
    async create(dados: {
        tipo?: TipoServico;
        solicitanteNome: string;
        solicitanteCpf: string;
        descricao?: string;
        observacoes?: string;
    }) {
        const novoServico = await prisma.notaryService.create({
            data: dados
        });
        return novoServico;
    }

    async findAll() {
        // No Postgres, é legal ordenar para os mais recentes aparecerem primeiro
        return await prisma.notaryService.findMany({
            orderBy: { createdAt: 'desc' }
        });
    }

    async findById(id: string) {
        return await prisma.notaryService.findUnique({
            where: { id }
        });
    }

    async findByCpf(cpf: string) {
        return await prisma.notaryService.findMany({
            where: { solicitanteCpf: cpf },
            orderBy: { createdAt: 'desc' }
        });
    }

    async updateStatus(id: string, novoStatus: StatusServico) {
        return await prisma.notaryService.update({
            where: { id },
            data: { status: novoStatus }
        });
    }

    async delete(id: string) {
        return await prisma.notaryService.delete({
            where: { id }
        });
    }
}
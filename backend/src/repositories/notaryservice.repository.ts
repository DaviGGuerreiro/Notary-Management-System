// src/repositories/notaryservice.repository.ts
import { prisma } from '../config/db';
import { UpdateNotaryserviceDTO, CreateNotaryserviceDTO, UpdateNotaryserviceStatusDTO, NotaryserviceResponse } from '../dtos/notaryservice.dto';

export class NotaryserviceRepository {
    
    async create(dados: CreateNotaryserviceDTO): Promise<NotaryserviceResponse> {
        const novoServico = await prisma.notaryService.create({
            data: dados
        });
        return novoServico;
    }

    async findAll(): Promise<NotaryserviceResponse[]> {
        return await prisma.notaryService.findMany({
            orderBy: { createdAt: 'desc' }
        });
    }

    async findById(id: string): Promise<NotaryserviceResponse | null> {
        return await prisma.notaryService.findUnique({
            where: { id }
        });
    }

    async findByCpf(cpf: string): Promise<NotaryserviceResponse[]>{
        return await prisma.notaryService.findMany({
            where: { solicitanteCpf: cpf },
            orderBy: { createdAt: 'desc' }
        });
    }

    async updateStatus(id: string, novoStatus: UpdateNotaryserviceStatusDTO): Promise<NotaryserviceResponse> {
        return await prisma.notaryService.update({
            where: { id },
            data: novoStatus
        });
    }

    async updateService(id: string, novo: UpdateNotaryserviceDTO): Promise<NotaryserviceResponse> {
        return await prisma.notaryService.update({
            where: { id },
            data: novo
        });
    }

    async delete(id: string): Promise<NotaryserviceResponse>{
        return await prisma.notaryService.delete({
            where: { id }
        });
    }
}
// src/repositories/notaryservice.repository.ts
import { prisma } from '../config/db';
import { UpdateNotaryservicePatchDTO, CreateNotaryserviceDTO, UpdateNotaryserviceStatusDTO, NotaryserviceResponse } from '../dtos/notaryservice.dto';
import { TipoServico, StatusServico } from '@prisma/client';

export class NotaryserviceRepository {
    
    async create(dados: CreateNotaryserviceDTO): Promise<NotaryserviceResponse> {
        const novoServico = await prisma.notaryService.create({
            data: dados
        });
        return novoServico;
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

    async updateService(id: string, novo: UpdateNotaryservicePatchDTO): Promise<NotaryserviceResponse> {
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

    async getAllServices(filtros: { tipo?: TipoServico, status?: StatusServico }) {
        return await prisma.notaryService.findMany({
            where: {
                tipo: filtros.tipo || undefined,
                status: filtros.status || undefined,
            },
            orderBy: {
                createdAt: 'desc'
            }
        });
    }
}
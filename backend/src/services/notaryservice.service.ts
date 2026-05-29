import { NotaryserviceRepository } from '../repositories/notaryservice.repository';
import { CreateNotaryserviceDTO, UpdateNotaryservicePatchDTO, UpdateNotaryserviceStatusDTO, UpdateNotaryservicePutDTO } from '../dtos/notaryservice.dto'; 

export class NotaryserviceService {
    private repository: NotaryserviceRepository;

    constructor() {
        this.repository = new NotaryserviceRepository();
    }

    async createService(dados: CreateNotaryserviceDTO) {
        // adicionar regra de negocios?
        return await this.repository.create(dados);
    }

    async getAllServices(filtros: { tipo?: any, status?: any }) {
        // Você pode colocar lógicas de negócio aqui no futuro, se necessário.
        return await this.repository.getAllServices(filtros);
    }

    async getServiceById(id: string) {
        const servico = await this.repository.findById(id);
        if (!servico) {
            throw new Error('Serviço cartorário não encontrado.'); 
        }
        return servico;
    }

    async getServicesByCpf(cpf: string) {
        return await this.repository.findByCpf(cpf);
    }

    async updateServiceStatus(id: string, novoStatus: UpdateNotaryserviceStatusDTO) {
        await this.getServiceById(id); 
        return await this.repository.updateStatus(id, novoStatus);
    }

    async updateService(id: string, dados: UpdateNotaryservicePatchDTO) {
        await this.getServiceById(id);
        return await this.repository.updateService(id, dados);
    }

    async replaceService(id: string, dados: UpdateNotaryservicePutDTO) {
        await this.getServiceById(id);
        return await this.repository.updateService(id, dados);
    }

    async deleteService(id: string) {
        await this.getServiceById(id); 
        return await this.repository.delete(id);
    }
}
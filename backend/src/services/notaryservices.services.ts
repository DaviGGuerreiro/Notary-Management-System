import { NotaryserviceRepository } from '../repositories/notaryservice.repository';
import { CreateNotaryserviceDTO, UpdateNotaryserviceDTO, UpdateNotaryserviceStatusDTO } from '../dtos/notaryservice.dto'; 

export class NotaryserviceService {
    private repository: NotaryserviceRepository;

    constructor() {
        this.repository = new NotaryserviceRepository();
    }

    async createService(dados: CreateNotaryserviceDTO) {
        // adicionar regra de negocios?
        return await this.repository.create(dados);
    }

    async getAllServices() {
        return await this.repository.findAll();
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

    async updateService(id: string, dados: UpdateNotaryserviceDTO) {
        await this.getServiceById(id);
        return await this.repository.updateService(id, dados);
    }

    async deleteService(id: string) {
        await this.getServiceById(id); 
        return await this.repository.delete(id);
    }
}
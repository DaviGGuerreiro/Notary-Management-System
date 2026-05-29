import { Request, Response } from 'express';
import { NotaryserviceService } from '../services/notaryservice.service';
import { CreateNotaryserviceDTO , UpdateNotaryservicePutDTO } from '../dtos/notaryservice.dto';
import { TipoServico, StatusServico } from '@prisma/client';

export class NotaryserviceController {
    private notaryService: NotaryserviceService;
    constructor() {
        this.notaryService = new NotaryserviceService();
    }

    create = async (req: Request, res: Response): Promise<Response> => {
        try {
            const dados: CreateNotaryserviceDTO = req.body;
            if (!dados.solicitanteNome || !dados.solicitanteCpf || !dados.descricao) {
                return res.status(400).json({ erro: 'Faltam dados obrigatórios para criar o serviço cartorário.' });
            }
            const novoServico = await this.notaryService.createService(dados);
            return res.status(201).json(novoServico);

        } catch (error) { 
            console.error(error);
            return res.status(500).json({ erro: 'Erro interno do servidor.' });
        } //depois eu tenho que ajustar se adicionar uma regra de negocios
    }

    getAll = async (req: Request, res: Response): Promise<Response> => {
        try {
            const { tipo, status } = req.query;
            const filtros = {
                tipo: tipo as TipoServico | undefined,
                status: status as StatusServico | undefined
            };
            const servicos = await this.notaryService.getAllServices(filtros);
            
            return res.status(200).json(servicos);
        } catch (error) {
            console.error(error);
            return res.status(500).json({ erro: 'Erro interno do servidor.' });
        }
    }

    getById = async (req: Request<{ id: string }>, res: Response): Promise<Response> => {
        try {
            const { id } = req.params;
            const servico = await this.notaryService.getServiceById(id);
            return res.status(200).json(servico);
            
        } catch (error: any) {
            if (error.message === 'Serviço cartorário não encontrado.') {
                return res.status(404).json({ erro: error.message });
            }
            console.error(error);
            return res.status(500).json({ erro: 'Erro interno do servidor.' });
        }
    }

    // Busca por CPF
    getByCpf = async (req: Request<{ cpf: string }>, res: Response): Promise<Response> => {
        try {
            const { cpf } = req.params;
            const servicos = await this.notaryService.getServicesByCpf(cpf);
            return res.status(200).json(servicos);
            
        } catch (error) {
            console.error(error);
            return res.status(500).json({ erro: 'Erro interno do servidor.' });
        }
    }

    patch = async (req: Request<{ id: string }>, res: Response): Promise<Response> => {
        try {
            const { id } = req.params;
            const {status, ...dadosSeguros} = req.body;
            if (Object.keys(dadosSeguros).length === 0) {
                return res.status(400).json({ erro: 'Nenhum dado foi fornecido para atualização.' });
            }
            const servicoAtualizado = await this.notaryService.updateService(id, dadosSeguros);
            return res.status(200).json(servicoAtualizado);

        } catch (error: any) {
            if (error.message === 'Serviço cartorário não encontrado.') {
                return res.status(404).json({ erro: error.message });
            }
            console.error(error);
            return res.status(500).json({ erro: 'Erro interno do servidor.' });
        }
    }

    updateStatus = async (req: Request<{ id: string }>, res: Response): Promise<Response> => {
        try {
            const { id } = req.params;
            const { status } = req.body;

            if (!status) {
                return res.status(400).json({ erro: 'O campo status é obrigatório.' });
            }

            const servicoAtualizado = await this.notaryService.updateServiceStatus(id, { status });
            return res.status(200).json(servicoAtualizado);

        } catch (error: any) {
            if (error.message === 'Serviço cartorário não encontrado.') {
                return res.status(404).json({ erro: error.message });
            }
            console.error(error);
            return res.status(500).json({ erro: 'Erro interno do servidor.' });
        }
    }

    replace = async (req: Request<{ id: string }>, res: Response): Promise<Response> => {
        try {
            const { id } = req.params;
            const { status, ...dadosSeguros } = req.body;

            if (!dadosSeguros.solicitanteNome || !dadosSeguros.solicitanteCpf || !dadosSeguros.descricao || !dadosSeguros.tipo) {
                return res.status(400).json({ erro: 'Campos obrigatórios ausentes para substituição total.' });
            }
            const dadosParaSubstituicao: UpdateNotaryservicePutDTO = {
                solicitanteNome: dadosSeguros.solicitanteNome,
                solicitanteCpf: dadosSeguros.solicitanteCpf,
                tipo: dadosSeguros.tipo,
                descricao: dadosSeguros.descricao,
                observacoes: dadosSeguros.observacoes || null 
            };
            const servicoSubstituido = await this.notaryService.replaceService(id, dadosParaSubstituicao);
            return res.status(200).json(servicoSubstituido);

        } catch (error: any) {
            if (error.message === 'Serviço cartorário não encontrado.') {
                return res.status(404).json({ erro: error.message });
            }
            console.error(error);
            return res.status(500).json({ erro: 'Erro interno do servidor.' });
        }
    }

    delete = async (req: Request<{ id: string }>, res: Response): Promise<Response> => {
        try {
            const { id } = req.params;
            await this.notaryService.deleteService(id);
            return res.status(204).send(); 
            
        } catch (error: any) {
            if (error.message === 'Serviço cartorário não encontrado.') {
                return res.status(404).json({ erro: error.message });
            }
            console.error(error);
            return res.status(500).json({ erro: 'Erro interno do servidor.' });
        }
    }

}
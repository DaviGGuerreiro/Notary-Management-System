// src/controllers/user.controller.ts
import { Request, Response } from 'express';
import { UserService } from '../services/user.service';
import { CreateUserDTO, UpdateUserPutDTO, UpdateUserPatchDTO } from '../dtos/user.dto';

export class UserController {
    private userService: UserService;

    constructor() {
        this.userService = new UserService();
    }

    // Arrow functions (=>) para indicar que o this ao usar esse metodo e definido por onde ele foi escrito
    create = async (req: Request, res: Response): Promise<Response> => {
        try {
            const dados: CreateUserDTO = req.body; //apenas da contexto para o vscode 
            
            if (!dados.nome || !dados.email || !dados.senhaPlana) {
                return res.status(400).json({ erro: 'Faltam dados obrigatórios para criar o utilizador.' });
            } // fail fast.
            const novoUsuario = await this.userService.createUser(dados);
            return res.status(201).json(novoUsuario);
        } catch (error: any) {
            if (error.message === 'Este e-mail já está em uso.') {
                return res.status(409).json({ erro: error.message });
            }
            console.error(error);
            return res.status(500).json({ erro: 'Erro interno do servidor.' });
        }
    }

    getAll = async (req: Request, res: Response): Promise<Response> => {
        try {
            const usuarios = await this.userService.getAllUsers();
            return res.status(200).json(usuarios);
        } catch (error) {
            console.error(error);
            return res.status(500).json({ erro: 'Erro interno do servidor.' });
        }
    }

    getById = async (req: Request<{ id: string }>, res: Response): Promise<Response> => {
        try {
            const { id } = req.params; // Pega o ID da URL (ex: /usuarios/123)
            const usuario = await this.userService.getUserById(id);
            return res.status(200).json(usuario);
        } catch (error: any) {
            if (error.message === 'Usuário não encontrado.') {
                return res.status(404).json({ erro: error.message });
            }
            console.error(error);
            return res.status(500).json({ erro: 'Erro interno do servidor.' });
        }
    }

    update = async (req: Request<{ id: string }>, res: Response): Promise<Response> => {
        try {
            const { id } = req.params;
            const { senhaPlana, ...dadosSeguros } = req.body;

            if (Object.keys(dadosSeguros).length === 0) {
                return res.status(400).json({ erro: 'Nenhum dado foi fornecido para atualização.' });
            }
            const usuarioAtualizado = await this.userService.updateUser(id, dadosSeguros);
            return res.status(200).json(usuarioAtualizado);

        } catch (error: any) {
            if (error.message === 'Usuário não encontrado.') {
                return res.status(404).json({ erro: error.message });
            }
            console.error(error);
            return res.status(500).json({ erro: 'Erro interno do servidor.' });
        }
    }

    replace = async (req: Request<{ id: string }>, res: Response): Promise<Response> => {
        try {
            const { id } = req.params;
            const { senhaPlana, ...dadosSeguros } = req.body;
            if (!dadosSeguros.nome || !dadosSeguros.email || !dadosSeguros.perfil) {
                return res.status(400).json({ 
                    erro: 'Campos obrigatórios ausentes para substituição total.' 
                });
            }

            const dadosParaSubstituicao: UpdateUserPutDTO = {
                nome: dadosSeguros.nome,
                email: dadosSeguros.email,
                perfil: dadosSeguros.perfil
            };

            const usuarioSubstituido = await this.userService.replaceUser(id, dadosParaSubstituicao);
            return res.status(200).json(usuarioSubstituido);

        } catch (error: any) {
            if (error.message === 'Usuário não encontrado.') {
                return res.status(404).json({ erro: error.message });
            }
            console.error(error);
            return res.status(500).json({ erro: 'Erro interno do servidor.' });
        }
    }

    delete = async (req: Request<{ id: string }>, res: Response): Promise<Response> => {
        try {
            const { id } = req.params;
            await this.userService.deleteUser(id);
            return res.status(204).send(); 
            
        } catch (error: any) {
            if (error.message === 'Usuário não encontrado.') {
                return res.status(404).json({ erro: error.message });
            }
            console.error(error);
            return res.status(500).json({ erro: 'Erro interno do servidor.' });
        }
    }
}
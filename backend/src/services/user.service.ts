import { UserRepository } from '../repositories/user.repository';
import bcrypt from 'bcrypt';
import { CreateUserDTO, UpdateUserDTO } from '../dtos/user.dto'; 

export class UserService {
    private repository: UserRepository;
    constructor() {
        this.repository = new UserRepository();
    }

    async createUser(dados: CreateUserDTO) {
        const usuarioExistente = await this.repository.findByEmail(dados.email); //ver se ja existe (coloquei email como unique).
        if (usuarioExistente) {
            throw new Error('Este e-mail já está em uso.');
        }

        const salt = await bcrypt.genSalt(10); //gerar senhaHash
        const senhaHash = await bcrypt.hash(dados.senhaPlana, salt);

        const { senhaPlana, ...dadosLimpos } = dados; // ... -> spread operator, abre objeto.
        const novoUsuario = await this.repository.create({
            ...dadosLimpos, senhaHash
        });

        return novoUsuario;
    }

    async getAllUsers() {
        return await this.repository.findAll();
    }

    async getUserById(id: string) {
        const usuario = await this.repository.findById(id);
        if (!usuario) throw new Error('Usuário não encontrado.');
        return usuario;
    }

    async updateUser(id: string, dados: UpdateUserDTO) {
        await this.getUserById(id);
        return await this.repository.updateUser(id, dados);
    }

    async deleteUser(id: string) {
        await this.getUserById(id);
        return await this.repository.delete(id);
    }
}
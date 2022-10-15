import { Repository } from "typeorm";

import { Cliente } from "../../entity/cliente";
import { EncryptService } from "../../utils/encrypt.service";
import {
  CreateClienteDto,
  DestroyClienteDto,
  FindClienteDto,
  ListClienteDto,
  UpdateClienteDto,
} from "./cliente.dto";

export class ClienteService {
  constructor(private readonly repo: Repository<Cliente>) {}

  async create(cliente: CreateClienteDto) {
    try {
      const alreadyExists = await this.repo.findOne({
        where: {
          pessoa: { email: cliente.pessoa.email },
        },
        relations: ["pessoa"],
      });

      if (alreadyExists) {
        throw new Error("Email já cadastrado");
      }

      cliente.pessoa.senha = await EncryptService.encryptPassword(
        cliente.pessoa.senha
      );

      const newCliente = this.repo.create({
        pessoa: {
          nome: cliente.pessoa.nome,
          cpf: cliente.pessoa.cpf,
          email: cliente.pessoa.email,
          telefone: cliente.pessoa.telefone,
          senha: cliente.pessoa.senha,
          dataNasc: cliente.pessoa.dataNasc,
          celular: cliente.pessoa.celular,
          tipoUsuario: {
            id: cliente.pessoa.tipoUsuario.id,
          },
        },
      });

      if (cliente.pessoa.endereco) {
        newCliente.pessoa.endereco = {
          cep: cliente.pessoa.endereco.cep,
          rua: cliente.pessoa.endereco.rua,
          num: cliente.pessoa.endereco.num,
          complemento: cliente.pessoa.endereco.complemento || "",
          bairro: cliente.pessoa.endereco.bairro,
          cidade: cliente.pessoa.endereco.cidade,
          estado: cliente.pessoa.endereco.estado,
        } as any;
      }

      return await this.repo.save(newCliente);
    } catch (error) {
      throw error;
    }
  }

  async update(cliente: UpdateClienteDto) {
    try {
      const clienteExists = await this.repo.findOneOrFail({
        where: {
          id: cliente.id,
        },
        relations: ["pessoa", "pessoa.endereco", "pessoa.tipoUsuario"],
      });

      const isSamePassword = await EncryptService.comparePassword(
        cliente.pessoa.senha,
        clienteExists.pessoa.senha
      );

      if (!isSamePassword) {
        cliente.pessoa.senha = await EncryptService.encryptPassword(
          cliente.pessoa.senha
        );
      } else {
        cliente.pessoa.senha = clienteExists.pessoa.senha
      }

      const newCliente = this.repo.create({
        id: clienteExists.id,
        pessoa: {
          id: clienteExists.pessoa.id,
          nome: cliente.pessoa.nome,
          cpf: cliente.pessoa.cpf,
          email: cliente.pessoa.email,
          telefone: cliente.pessoa.telefone,
          senha: cliente.pessoa.senha,
          dataNasc: cliente.pessoa.dataNasc,
          celular: cliente.pessoa.celular,
          tipoUsuario: {
            id: cliente.pessoa.tipoUsuario.id,
          },
        },
      });

      if (cliente.pessoa.endereco) {
        newCliente.pessoa.endereco = {
          id: clienteExists.pessoa.endereco.id,
          cep: cliente.pessoa.endereco.cep,
          rua: cliente.pessoa.endereco.rua,
          num: cliente.pessoa.endereco.num,
          complemento: cliente.pessoa.endereco.complemento || "",
          bairro: cliente.pessoa.endereco.bairro,
          cidade: cliente.pessoa.endereco.cidade,
          estado: cliente.pessoa.endereco.estado,
        } as any;
      }

      return await this.repo.save(newCliente);
    } catch (error) {
      throw error;
    }
  }

  async findAll(dto: ListClienteDto) {
    try {
      return await this.repo.find({
        take: dto.take || 10,
        skip: dto.skip || 0,
        order: {
          id: "DESC",
        },
        relations: ["pessoa", "pessoa.endereco", "pessoa.tipoUsuario"],
      });
    } catch (error) {
      throw error;
    }
  }

  async find(dto: FindClienteDto) {
    try {
      return await this.repo.findOneOrFail({
        where: {
          id: dto.id,
        },
        relations: ["pessoa", "pessoa.endereco", "pessoa.tipoUsuario"],
      });
    } catch (error) {
      throw error;
    }
  }

  async destroy(dto: DestroyClienteDto) {
    try {
      return await this.repo.delete(dto.id);
    } catch (error) {
      throw error;
    }
  }
}

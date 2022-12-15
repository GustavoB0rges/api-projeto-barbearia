import { Repository } from "typeorm";

import { Funcionario } from "../../entity/funcionario";
import { EncryptService } from "../../utils/encrypt.service";
import {
  CreateFuncionarioDto,
  DestroyFuncionarioDto,
  FindFuncionarioDto,
  ListFuncionarioDto,
  UpdateFuncionarioDto,
} from "./funcionario.dto";

export class FuncionarioService {
  constructor(private readonly repo: Repository<Funcionario>) {}

  async create(funcionario: CreateFuncionarioDto) {
    try {
      const alreadyExists = await this.repo.findOne({
        where: {
          pessoa: { email: funcionario.pessoa.email },
        },
        relations: ["pessoa"],
      });

      if (alreadyExists) {
        throw new Error("Email já cadastrado");
      }

      funcionario.pessoa.senha = await EncryptService.encryptPassword(
        funcionario.pessoa.senha
      );

      const newFuncionario = this.repo.create({
        pessoa: {
          nome: funcionario.pessoa.nome,
          cpf: funcionario.pessoa.cpf,
          email: funcionario.pessoa.email,
          telefone: funcionario.pessoa.telefone,
          senha: funcionario.pessoa.senha,
          dataNasc: funcionario.pessoa.dataNasc,
          celular: funcionario.pessoa.celular,
          tipoUsuario: {
            id: funcionario.pessoa.tipoUsuario.id,
          },
        },
      });

      if (funcionario.pessoa.endereco) {
        newFuncionario.pessoa.endereco = {
          cep: funcionario.pessoa.endereco.cep,
          rua: funcionario.pessoa.endereco.rua,
          num: funcionario.pessoa.endereco.num,
          complemento: funcionario.pessoa.endereco.complemento || "",
          bairro: funcionario.pessoa.endereco.bairro,
          cidade: funcionario.pessoa.endereco.cidade,
          estado: funcionario.pessoa.endereco.estado,
        } as any;
      }

      return await this.repo.save(newFuncionario);
    } catch (error) {
      throw error;
    }
  }

  async update(funcionario: UpdateFuncionarioDto) {
    try {
      const funcionarioExists = await this.repo.findOneOrFail({
        where: {
          id: funcionario.id,
        },
        relations: ["pessoa", "pessoa.endereco", "pessoa.tipoUsuario"],
      });

      const isSamePassword = await EncryptService.comparePassword(
        funcionario.pessoa.senha,
        funcionarioExists.pessoa.senha
      );

      if (!isSamePassword) {
        funcionario.pessoa.senha = await EncryptService.encryptPassword(
          funcionario.pessoa.senha
        );
      } else {
        funcionario.pessoa.senha = funcionarioExists.pessoa.senha
      }

      const newFuncionario = this.repo.create({
        id: funcionarioExists.id,
        pessoa: {
          id: funcionarioExists.pessoa.id,
          nome: funcionario.pessoa.nome,
          cpf: funcionario.pessoa.cpf,
          email: funcionario.pessoa.email,
          telefone: funcionario.pessoa.telefone,
          senha: funcionario.pessoa.senha,
          dataNasc: funcionario.pessoa.dataNasc,
          celular: funcionario.pessoa.celular,
          tipoUsuario: {
            id: funcionario.pessoa.tipoUsuario.id,
          },
        },
      });

      console.log(newFuncionario);
      

      if (funcionario.pessoa.endereco) {
        newFuncionario.pessoa.endereco = {
          id: funcionarioExists.pessoa.endereco.id,
          cep: funcionario.pessoa.endereco.cep,
          rua: funcionario.pessoa.endereco.rua,
          num: funcionario.pessoa.endereco.num,
          complemento: funcionario.pessoa.endereco.complemento || "",
          bairro: funcionario.pessoa.endereco.bairro,
          cidade: funcionario.pessoa.endereco.cidade,
          estado: funcionario.pessoa.endereco.estado,
        } as any;
      }

      return await this.repo.save(newFuncionario);
    } catch (error) {
      throw error;
    }
  }

  async findAll(dto: ListFuncionarioDto) {
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

  async find(dto: FindFuncionarioDto) {
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

  async destroy(dto: DestroyFuncionarioDto) {
    try {
      return await this.repo.delete(dto.id);
    } catch (error) {
      throw error;
    }
  }
}

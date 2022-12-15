import { Repository } from "typeorm";

import { Administrador } from "../../entity/administrador";
import { EncryptService } from "../../utils/encrypt.service";
import {
  CreateAdministradorDto,
  DestroyAdministradorDto,
  FindAdministradorDto,
  ListAdministradorDto,
  UpdateAdministradorDto,
} from "./administrador.dto";

export class AdministradorService {
  constructor(private readonly repo: Repository<Administrador>) {}

  async create(administrador: CreateAdministradorDto) {
    try {
      const alreadyExists = await this.repo.findOne({
        where: {
          pessoa: { email: administrador.pessoa.email },
        },
        relations: ["pessoa"],
      });

      if (alreadyExists) {
        throw new Error("Email já cadastrado");
      }

      administrador.pessoa.senha = await EncryptService.encryptPassword(
        administrador.pessoa.senha
      );

      const newAdministrador = this.repo.create({
        pessoa: {
          nome: administrador.pessoa.nome,
          cpf: administrador.pessoa.cpf,
          email: administrador.pessoa.email,
          telefone: administrador.pessoa.telefone,
          senha: administrador.pessoa.senha,
          dataNasc: administrador.pessoa.dataNasc,
          celular: administrador.pessoa.celular,
          tipoUsuario: {
            id: administrador.pessoa.tipoUsuario.id,
          },
        },
      });

      if (administrador.pessoa.endereco) {
        newAdministrador.pessoa.endereco = {
          cep: administrador.pessoa.endereco.cep,
          rua: administrador.pessoa.endereco.rua,
          num: administrador.pessoa.endereco.num,
          complemento: administrador.pessoa.endereco.complemento || "",
          bairro: administrador.pessoa.endereco.bairro,
          cidade: administrador.pessoa.endereco.cidade,
          estado: administrador.pessoa.endereco.estado,
        } as any;
      }

      return await this.repo.save(newAdministrador);
    } catch (error) {
      throw error;
    }
  }

  async update(administrador: UpdateAdministradorDto) {
    try {
      const administradorExists = await this.repo.findOneOrFail({
        where: {
          id: administrador.id,
        },
        relations: ["pessoa", "pessoa.endereco", "pessoa.tipoUsuario"],
      });

      const isSamePassword = await EncryptService.comparePassword(
        administrador.pessoa.senha,
        administradorExists.pessoa.senha
      );

      if (!isSamePassword) {
        administrador.pessoa.senha = await EncryptService.encryptPassword(
          administrador.pessoa.senha
        );
      } else {
        administrador.pessoa.senha = administradorExists.pessoa.senha
      }

      const newAdministrador = this.repo.create({
        id: administradorExists.id,
        pessoa: {
          id: administradorExists.pessoa.id,
          nome: administrador.pessoa.nome,
          cpf: administrador.pessoa.cpf,
          email: administrador.pessoa.email,
          telefone: administrador.pessoa.telefone,
          senha: administrador.pessoa.senha,
          dataNasc: administrador.pessoa.dataNasc,
          celular: administrador.pessoa.celular,
          tipoUsuario: {
            id: administrador.pessoa.tipoUsuario.id,
          },
        },
      });

      console.log(newAdministrador);
      

      if (administrador.pessoa.endereco) {
        newAdministrador.pessoa.endereco = {
          id: administradorExists.pessoa.endereco.id,
          cep: administrador.pessoa.endereco.cep,
          rua: administrador.pessoa.endereco.rua,
          num: administrador.pessoa.endereco.num,
          complemento: administrador.pessoa.endereco.complemento || "",
          bairro: administrador.pessoa.endereco.bairro,
          cidade: administrador.pessoa.endereco.cidade,
          estado: administrador.pessoa.endereco.estado,
        } as any;
      }

      return await this.repo.save(newAdministrador);
    } catch (error) {
      throw error;
    }
  }

  async findAll(dto: ListAdministradorDto) {
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

  async find(dto: FindAdministradorDto) {
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

  async destroy(dto: DestroyAdministradorDto) {
    try {
      return await this.repo.delete(dto.id);
    } catch (error) {
      throw error;
    }
  }
}

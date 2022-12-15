import { Repository } from "typeorm";
import { Servico } from "../../entity/servico";
import {
  CreateServicoDto,
  DestroyServicoDto,
  FindServicoDto,
  ListServicoDto,
  UpdateServicoDto,
} from "./servico.dto";

export class ServicoService {
  constructor(private readonly repo: Repository<Servico>) {}

  async create(servico: CreateServicoDto) {
    try {
      const newServico = this.repo.create({
        descricao: servico.descricao,
        valor: servico.valor
      });

      return await this.repo.save(newServico);
    } catch (error) {
      throw error;
    }
  }

  async update(servico: UpdateServicoDto) {
    try {
      const servicoExists = await this.repo.findOneOrFail({
        where: {
          id: servico.id,
        },
        relations: ["funcionario", "cliente", "administrador"],
      });
      const newServico = this.repo.create({
        id: servicoExists.id,
        descricao: servico.descricao,
        valor: servico.valor
      });
      return await this.repo.save(newServico);
    } catch (error) {
      throw error;
    }
  }

  async findAll(dto: ListServicoDto) {
    try {
      return await this.repo.find({
        take: dto.take || 10,
        skip: dto.skip || 0,
        order: {
          id: "DESC",
        },
        // relations: ["pessoa", "pessoa.endereco", "pessoa.tipoUsuario"],
      });
    } catch (error) {
      throw error;
    }
  }

  async find(dto: FindServicoDto) {
    try {
      return await this.repo.findOneOrFail({
        where: {
          id: dto.id,
        },
        // relations: ["pessoa", "pessoa.endereco", "pessoa.tipoUsuario"],
      });
    } catch (error) {
      throw error;
    }
  }

  async destroy(dto: DestroyServicoDto) {
    try {
      return await this.repo.delete(dto.id);
    } catch (error) {
      throw error;
    }
  }
}

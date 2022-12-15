import { Repository } from "typeorm";
import { Agendamento } from "../../entity/agendamento";
import {
  CreateAgendamentoDto,
  DestroyAgendamentoDto,
  FindAgendamentoDto,
  ListAgendamentoDto,
  UpdateAgendamentoDto,
} from "./agendamento.dto";

export class AgendamentoService {
  constructor(private readonly repo: Repository<Agendamento>) {}

  async create(agendamento: CreateAgendamentoDto) {
    try {
      const newAgendamento = this.repo.create({
        // dt_cadastro: agendamento.dt_cadastro,
        // dt_ini: agendamento.dt_ini,
        // dt_fim: agendamento.dt_fim,
        // status: agendamento.status,
        // valor: agendamento.valor,
        // histServicos: agendamento.histServicos,
        // funcionario: agendamento.funcionario.id,
        // cliente: agendamento.cliente.id,
        // administrador: agendamento.administrador.id,
        // servico: agendamento.servico.id,
      });

      return await this.repo.save(newAgendamento);
    } catch (error) {
      throw error;
    }
  }

  async update(agendamento: UpdateAgendamentoDto) {
    try {
      const agendamentoExists = await this.repo.findOneOrFail({
        where: {
          id: agendamento.id,
        },
        relations: ["funcionario", "cliente", "administrador", "servico"],
      });
      const newAgendamento = this.repo.create({
        // id: agendamentoExists.id,
        // descricao: agendamento.descricao,
        // valor: agendamento.valor
      });
      return await this.repo.save(newAgendamento);
    } catch (error) {
      throw error;
    }
  }

  async findAll(dto: ListAgendamentoDto) {
    try {
      return await this.repo.find({
        take: dto.take || 10,
        skip: dto.skip || 0,
        order: {
          id: "DESC",
        },
        relations: ["funcionario", "cliente", "administrador", "servico"],
      });
    } catch (error) {
      throw error;
    }
  }

  async find(dto: FindAgendamentoDto) {
    try {
      return await this.repo.findOneOrFail({
        where: {
          id: dto.id,
        },
        relations: ["funcionario", "cliente", "administrador", "servico"],
      });
    } catch (error) {
      throw error;
    }
  }

  async destroy(dto: DestroyAgendamentoDto) {
    try {
      return await this.repo.delete(dto.id);
    } catch (error) {
      throw error;
    }
  }
}

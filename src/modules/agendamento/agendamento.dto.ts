import { Cliente } from './../../entity/cliente';
import { Funcionario } from './../../entity/funcionario';
import { Servico } from "../../entity/servico";
import { Administrador } from '../../entity/administrador';

export interface ListAgendamentoDto {
  skip?: number;
  take?: number;
  search?: string;
}

export interface FindAgendamentoDto {
  id: number;
}

export interface DestroyAgendamentoDto {
  id: number;
}

export interface CreateAgendamentoDto {
  dt_cadastro?: string,
  dt_ini?: string,
  dt_fim?: string,
  histServicos: string,
  valor: number,
  status: string,
  servico: Servico,
  funcionario: Funcionario,
  administrador: Administrador,
  cliente: Cliente
}

export interface UpdateAgendamentoDto {
  id: number;
  dt_cadastro?: string,
  dt_ini?: string,
  dt_fim?: string,
  histServicos: string,
  valor: number,
  status: string,
  servico: Servico,
  funcionario: Funcionario,
  cliente: Cliente
}

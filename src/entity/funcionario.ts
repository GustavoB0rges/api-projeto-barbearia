import { Column, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Agendamento } from './agendamento';

import { Pessoa } from './pessoa';

@Entity({ name: "funcionarios" })
export class Funcionario {
  @PrimaryGeneratedColumn({ name: "id_funcionario" })
  id: number;

  @OneToOne(() => Pessoa, (pessoa) => pessoa.funcionario, { cascade: true })
  @JoinColumn({ name: "id_pessoa" })
  pessoa: Pessoa;

  @OneToMany(() => Agendamento, (agendamento) => agendamento.funcionario)
  agendamento: Agendamento;

}

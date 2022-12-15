import { Column, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn } from 'typeorm';

import { Pessoa } from './pessoa';

@Entity({ name: "funcionarios" })
export class Funcionario {
  @PrimaryGeneratedColumn({ name: "id_funcionario" })
  id: number;

  @OneToOne(() => Pessoa, (pessoa) => pessoa.funcionario, { cascade: true })
  @JoinColumn({ name: "id_pessoa" })
  pessoa: Pessoa;

}

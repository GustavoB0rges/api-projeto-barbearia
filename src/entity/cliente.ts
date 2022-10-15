import { Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from 'typeorm';

import { Pessoa } from './pessoa';

@Entity({ name: "clientes" })
export class Cliente {
  @PrimaryGeneratedColumn({ name: "id_cliente" })
  id: number;

  @OneToOne(() => Pessoa, (pessoa) => pessoa.cliente, { cascade: true })
  @JoinColumn({ name: "id_pessoa" })
  pessoa: Pessoa;
}

import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from 'typeorm';

import { Pessoa } from './pessoa';

@Entity({ name: "administradores" })
export class Administrador {
  @PrimaryGeneratedColumn({ name: "id_administrador" })
  id: number;

  @OneToOne(() => Pessoa, (pessoa) => pessoa.administrador, { cascade: true })
  @JoinColumn({ name: "id_pessoa" })
  pessoa: Pessoa;
}

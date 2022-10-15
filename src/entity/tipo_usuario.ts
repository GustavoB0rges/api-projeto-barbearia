import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

import { Pessoa } from './pessoa';

@Entity({ name: "tipos_usuario" })
export class TipoUsuario {
  @PrimaryGeneratedColumn({ name: "id_tipo_usuario" })
  id: number;

  @Column()
  descricao: string;

  @OneToMany(() => Pessoa, (pessoa) => pessoa.cliente)
  pessoa: Pessoa[];
}

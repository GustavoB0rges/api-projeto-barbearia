import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToOne,
  OneToMany,
  ManyToOne,
  JoinColumn,
} from "typeorm";
import { Cliente } from "./cliente";
import { Endereco } from "./endereco";
import { TipoUsuario } from "./tipo_usuario";

@Entity({ name: "pessoas" })
export class Pessoa {
  @PrimaryGeneratedColumn({ name: "id_pessoa" })
  id: number;

  @Column({ nullable: true})
  cpf: string;

  @Column()
  nome: string;

  @Column({ type: "date" })
  dataNasc: Date;

  @Column()
  telefone: string;

  @Column({ nullable: true })
  celular: string;

  @Column()
  email: string;

  @Column()
  senha: string;

  @OneToOne(() => Cliente, (cliente) => cliente.pessoa)
  cliente: Cliente;

  @ManyToOne(() => TipoUsuario, (tipoUsuario) => tipoUsuario.pessoa, { cascade: true })
  @JoinColumn({ name: "id_tipo_usuario" })
  tipoUsuario: TipoUsuario;

  @OneToOne(() => Endereco, (endereco) => endereco.pessoa, { cascade: true })
  endereco: Endereco;
}

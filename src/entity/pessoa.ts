import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToOne,
  OneToMany,
  ManyToOne,
  JoinColumn,
} from "typeorm";
import { Administrador } from "./administrador";
import { Cliente } from "./cliente";
import { Endereco } from "./endereco";
import { Funcionario } from "./funcionario";
import { TipoUsuario } from "./tipo_usuario";

@Entity({ name: "pessoas" })
export class Pessoa {
  @PrimaryGeneratedColumn({ name: "id_pessoa" })
  id: number;

  @Column({ nullable: true})
  cpf: string;

  @Column()
  nome: string;

  @Column({ type: "date", nullable: true })
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

  @OneToOne(() => Funcionario, (funcionario) => funcionario.pessoa)
  funcionario: Funcionario;

  @OneToOne(() => Administrador, (administrador) => administrador.pessoa)
  administrador: Administrador;

  @ManyToOne(() => TipoUsuario, (tipoUsuario) => tipoUsuario.pessoa, { cascade: true })
  @JoinColumn({ name: "id_tipo_usuario" })
  tipoUsuario: TipoUsuario;

  @OneToOne(() => Endereco, (endereco) => endereco.pessoa, { cascade: true })
  endereco: Endereco;
}

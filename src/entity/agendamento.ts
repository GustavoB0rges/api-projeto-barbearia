import { Administrador } from './administrador';
import { Servico } from './servico';
import { Funcionario } from './funcionario';
import { Column, Entity, JoinColumn, ManyToMany, ManyToOne, OneToOne, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Cliente } from './cliente';

@Entity({ name: "agendamentos" })
export class Agendamento {
  @PrimaryGeneratedColumn({ name: "id_servico" })
  id: number;

  @Column({ type: "date" })
  dt_cadastro: Date;

  @Column({ type: "date", nullable: true })
  dt_ini: Date;

  @Column({ type: "date", nullable: true })
  dt_fim: Date;

  @Column()
  status: string;

  @Column({ type: 'decimal', nullable: true })
  valor: number;

  @Column()
  histServicos: string;

  @ManyToOne(() => Funcionario, (funcionario) => funcionario.id, { cascade: true })
  @JoinColumn({ name: "id_funcionario" })
  funcionario: Funcionario;

  @ManyToOne(() => Cliente, (cliente) => cliente.id, { cascade: true })
  @JoinColumn({ name: "id_cliente" })
  cliente: Cliente;

  @ManyToOne(() => Administrador, (administrador) => administrador.id, { cascade: true })
  @JoinColumn({ name: "id_administrador" })
  administrador: Administrador;

  @OneToMany(() => Servico, (servico) => servico.id, { cascade: true })
  @JoinColumn({ name: "id_servico" })
  servico: Cliente;

}

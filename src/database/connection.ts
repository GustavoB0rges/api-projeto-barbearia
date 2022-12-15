import { Agendamento } from './../entity/agendamento';
import "reflect-metadata";
import { DataSource } from "typeorm";
import { Administrador } from "../entity/administrador";
import { Cliente } from "../entity/cliente";
import { Endereco } from "../entity/endereco";
import { Funcionario } from "../entity/funcionario";
import { Pessoa } from "../entity/pessoa";
import { Servico } from "../entity/servico";
import { TipoUsuario } from "../entity/tipo_usuario";

const dbConfig: any = {
  type: "postgres",
  name: "default",
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  username: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  entities: [Pessoa, Cliente, Servico, Funcionario, Administrador, TipoUsuario, Endereco, Agendamento],
  synchronize: true,
  logging: false,
  ssl: { rejectUnauthorized: false },
};

export const connToDS = async () => {
  const dataSourceConn = new DataSource(dbConfig);
  try {
    await dataSourceConn.initialize();
    return dataSourceConn;
  } catch (err) {
    throw err;
  }
};

export const dataSource = connToDS();

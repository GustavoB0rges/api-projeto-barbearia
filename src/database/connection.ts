import "reflect-metadata";
import { DataSource } from "typeorm";
import { Cliente } from "../entity/cliente";
import { Endereco } from "../entity/endereco";
import { Pessoa } from "../entity/pessoa";
import { TipoUsuario } from "../entity/tipo_usuario";

const dbConfig: any = {
  type: "postgres",
  name: "default",
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  username: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  entities: [Pessoa, Cliente, TipoUsuario, Endereco],
  synchronize: true,
  logging: false,
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

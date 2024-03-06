import dotenv from "dotenv";
import { Signale } from "signale";
import  {Sequelize}  from "sequelize-typescript";

import UsuarioModel from "../Publicacion/infraestructure/model/UsuarioModel";
import PublicacionModel from "../Publicacion/infraestructure/model/PublicacionModel";
import EventoWebhookModel from "../Publicacion/infraestructure/model/EventosWebhook";

dotenv.config();
const signale = new Signale();

export const sequelize = new Sequelize({
  dialect :"mysql",
  host: process.env.HOST,
  username: process.env.DB_USER,
  database: process.env.DB_DATABASE,
  password: process.env.DB_PASSWORD,
  port : 3306,
  models:[UsuarioModel,PublicacionModel,EventoWebhookModel]
})


export async function iniciarBaseDeDatos() {
   try {
    await sequelize.authenticate();
    signale.success("Conectado");
    await sequelize.sync({force:false})
   } catch (error) {
    signale.error("Error al conectar" , error)
   }
  }
  
import express from "express";
import morgan from "morgan";
import signale, { Signale } from "signale";
import * as dotenv from "dotenv";
import helmet from "helmet";
import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import { iniciarBaseDeDatos } from "./database/mysql";
import { typeDefs } from "./Publicacion/infraestructure/Graphql/Schemas";
import { resolver } from "./Publicacion/infraestructure/Dependencies";

const app = express();
app.use(helmet.hidePoweredBy());
dotenv.config();
app.use(morgan("dev"));
app.use(express.json());

const options = {
  secrets: ["([0-9]{4}-?)+"],
};

const logger = new Signale(options);

let resolvers = resolver.resolvers;
interface Mycontext{
  authScope?:String;
}

const server = new ApolloServer({
  typeDefs,
  resolvers,
});


(async () => {
  try {
    await iniciarBaseDeDatos();
    const { url } = await startStandaloneServer(server, {
      listen: { port: 4000 },
      context: async ({req , res})=>({
        authScope:(req.headers.authorization)?.toString(),
      })
    });
    signale.success(`servidor corriendo en ${url}`);
  } catch (error) {
    signale.error("Error al iniciar el servidor", error);
  }
})();
import { CreateUserUseCase } from "../aplication/usuario/CreateUserUseCase";
import { DeleteUserUseCase } from "../aplication/usuario/DeleteUserUseCase";
import { GetAllUserUseCase } from "../aplication/usuario/GetAllUserUseCase";
import { GetUserUseCase } from "../aplication/usuario/GetUserUseCase";
import { UpdateUserCorreoUseCase } from "../aplication/usuario/updateUserCorreoUseCase";

import { CreatePublicacionCasoUso } from "../aplication/publicacion/addPublicacion-CasoUso";
import { DeletePublicacionCasoUso } from "../aplication/publicacion/deletePublicacion-CasoUso";
import { GetAllPublicacionCasoUso } from "../aplication/publicacion/getAllPublicaciones-CasoUso";
import { GetPublicacionByDescripcionUseCase } from "../aplication/publicacion/getPublicacionByDescripcion-CasoUso";
import { GetPublicacionByLikes } from "../aplication/publicacion/getPublicacionByLikes-CasoUso";
import { UpdatePublicacionCasoUso } from "../aplication/publicacion/updatePublicacion-CasoUso";

import { ServicesTokensUser } from "../aplication/services/ServicesTokens";

import { EncryptServices } from "./helpers/EncriptServices";
import { ServicesTokens } from "./helpers/ServicesTokens";

import { Resolvers } from "./Graphql/Resolvers";
import { ServicesAuth } from "../aplication/services/ServicesAuth";

import { MysqlUserReporitory } from "./MysqlUserRepository";
import { MysqlPublicacionRepository } from "./MysqlPublicacionRepository";
import { MysqlWebhookRepository } from "./MysqlWebhook";

import { ServicesCreateWebhook } from "../aplication/services/ServiceWebhook";
import { ServicesSendWebhook } from "../aplication/services/ServicesSendWebhook";
import { ServicesSearchWebhook } from "../aplication/services/ServicesSearchWebhook";

const mysqlPublicacionRepository = new MysqlPublicacionRepository();
const mysqlUserRepository = new MysqlUserReporitory();
const mysqlWebhookRepository = new MysqlWebhookRepository()

const encryptServices = new EncryptServices();
const servicesTokens = new ServicesTokens();
const servicesAuth = new ServicesAuth(servicesTokens);

const serviceTokens = new ServicesTokensUser(servicesTokens);

const createUser = new CreateUserUseCase(mysqlUserRepository, encryptServices);
const getAllUsers = new GetAllUserUseCase(mysqlUserRepository);
const getUser = new GetUserUseCase(mysqlUserRepository, serviceTokens, encryptServices);
const deleteUser = new DeleteUserUseCase(mysqlUserRepository);
const updateUser = new UpdateUserCorreoUseCase(mysqlUserRepository);

const addPublicacion = new CreatePublicacionCasoUso(mysqlPublicacionRepository, encryptServices);
const deletePublicacion = new DeletePublicacionCasoUso(mysqlPublicacionRepository);
const getAllPublicaciones = new GetAllPublicacionCasoUso(mysqlPublicacionRepository);
const getPublicacionbyDescripcionUseCase = new GetPublicacionByDescripcionUseCase(mysqlPublicacionRepository);
const getPublicacionbyLikesUseCase = new GetPublicacionByLikes(mysqlPublicacionRepository);
const updatePublicacionUseCase = new UpdatePublicacionCasoUso(mysqlPublicacionRepository);

const servicesCreateWebhook = new ServicesCreateWebhook(mysqlWebhookRepository);
const servicesSearchWebhook = new ServicesSearchWebhook(mysqlWebhookRepository);
const servicesSendWebhook = new ServicesSendWebhook(mysqlWebhookRepository);


export const resolver = new Resolvers(
  createUser,
  deleteUser,
  getAllUsers,
  getUser,
  updateUser,
  getAllPublicaciones,
  getPublicacionbyDescripcionUseCase,
  getPublicacionbyLikesUseCase,
  updatePublicacionUseCase,
  addPublicacion,
  deletePublicacion,
  servicesAuth,
  servicesCreateWebhook,
  servicesSearchWebhook,
  servicesSendWebhook
);






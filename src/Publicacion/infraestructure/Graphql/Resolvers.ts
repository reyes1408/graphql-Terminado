import { CreateUserUseCase } from "../../aplication/usuario/CreateUserUseCase";
import { DeleteUserUseCase } from "../../aplication/usuario/DeleteUserUseCase";
import { GetAllUserUseCase } from "../../aplication/usuario/GetAllUserUseCase";
import { GetUserUseCase } from "../../aplication/usuario/GetUserUseCase";
import { UpdateUserCorreoUseCase } from "../../aplication/usuario/updateUserCorreoUseCase";

import { CreatePublicacionCasoUso } from "../../aplication/publicacion/addPublicacion-CasoUso";
import { DeletePublicacionCasoUso } from "../../aplication/publicacion/deletePublicacion-CasoUso";
import { GetAllPublicacionCasoUso } from "../../aplication/publicacion/getAllPublicaciones-CasoUso";
import { GetPublicacionByDescripcionUseCase } from "../../aplication/publicacion/getPublicacionByDescripcion-CasoUso";
import { GetPublicacionByLikes } from "../../aplication/publicacion/getPublicacionByLikes-CasoUso";
import { UpdatePublicacionCasoUso } from "../../aplication/publicacion/updatePublicacion-CasoUso";

import { ServicesAuth } from "../../aplication/services/ServicesAuth";
import { GraphQLError } from "graphql";

import { ServicesCreateWebhook } from "../../aplication/services/ServiceWebhook";
import { ServicesSearchWebhook } from "../../aplication/services/ServicesSearchWebhook";
import { ServicesSendWebhook } from "../../aplication/services/ServicesSendWebhook";

export class Resolvers {
  constructor(
    //Usuario
    readonly createUserUseCase: CreateUserUseCase,
    readonly deleteUserUseCase: DeleteUserUseCase,
    readonly getAllUserUseCase: GetAllUserUseCase,
    readonly getUserUseCase: GetUserUseCase,
    readonly updateUserCorreoUseCase: UpdateUserCorreoUseCase,
    //Publicaciones

    readonly getAllPublicaciones: GetAllPublicacionCasoUso,
    readonly getPublicacionbyDescripcionUseCase: GetPublicacionByDescripcionUseCase,
    readonly getPublicacionbyLikesUseCase: GetPublicacionByLikes,
    readonly updatePublicacionUseCase: UpdatePublicacionCasoUso,
    readonly addPublicacion: CreatePublicacionCasoUso,
    readonly deletePublicacion: DeletePublicacionCasoUso,

    readonly servicesAuth: ServicesAuth,

    //webHook
    readonly servicesCreateWebhook: ServicesCreateWebhook,
    readonly servicesSearchWebhook: ServicesSearchWebhook,
    readonly servicesSendWebhook: ServicesSendWebhook
  ) {}
  
  resolvers: any = {
    Query: {
      usuario: async (_: void, args: any) => {
        const Usuario: any = await this.getUserUseCase.run(
          args.usuario,
          args.password
        ) 
      return {user:Usuario[0],token:Usuario[1]};
    },

      usuarios: async (_: void, args: any, context: any) => {
        let key = await this.servicesAuth.run(context.authScope);

        if (key) {
          const usuarios: any = await this.getAllUserUseCase.run();
          console.log(usuarios);
          return usuarios;
        } else {
          throw (
            (new GraphQLError("Acceso denegado"),
            {
              extensions: { code: "UNAUTHENTICATE" },
            })
          );
        }
      },

      //METODO PARA CONSEGURI LA PUBLICACION POR LA DESCRIPCION
      publicacionByDescripcion: async (_: void, args: any, context: any) => {
        let key = await this.servicesAuth.run(context.authScope);
        if (key) {
          const publicacion: any = this.getPublicacionbyDescripcionUseCase.run(
            args.descripcion
          );
          console.log(publicacion);
          return publicacion;
        } else {
          throw (
            (new GraphQLError("Acceso denegado"),
            {
              extensions: { code: "UNAUTHENTICATE" },
            })
          );
        }
      },

      //METODO PARA CONSEGURI TODAS LAS PUBLICACIONES
      publicaciones: async (_: void, args: any, context: any) => {
        let key = await this.servicesAuth.run(context.authScope);

        if (key) {
          const publicaciones: any = await this.getAllPublicaciones.run();
          console.log(publicaciones);
          return publicaciones;
        } else {
          throw (
            (new GraphQLError("Acceso denegado"),
            {
              extensions: { code: "UNAUTHENTICATE" },
            })
          );
        }
      },

      //METODO PARA CONSEGURI LA PUBLICACION POR SUS LIKES
      publicacionByLikes: async (_: void, args: any, context: any) => {
        let key = await this.servicesAuth.run(context.authScope);

        if (key) {
          const publicacion: any = this.getPublicacionbyLikesUseCase.run(
            args.likes
          );
          console.log(publicacion);
          return publicacion
        } else {
          throw (
            (new GraphQLError("Acceso denegado"),
            {
              extensions: { code: "UNAUTHENTICATE" },
            })
          );
        }
      },
    },

    Mutation: {
      createUser: async (_: void, args: any) => {
        console.log(args);
        
        const usuario = await this.createUserUseCase.run(
          args.usuario.nombre,
          args.usuario.password,
          args.usuario.usuario,
          args.usuario.correo
        );
        console.log(usuario);
        return usuario;
      },

      deleteUser: async (_: void, args: any, context: any) => {
        let key = await this.servicesAuth.run(context.authScope);

        if (key) {
          const usuario = await this.deleteUserUseCase.run(args.usuario.nombre);
          console.log(usuario);
          return (usuario);
        } else {
          throw (
            (new GraphQLError("Acceso denegado"),
            {
              extensions: { code: "UNAUTHENTICATE" },
            })
          );
        }
      },
      updateUserCorreo: async (_: void, args: any, context: any) => {
        let key = await this.servicesAuth.run(context.authScope);

        if (key) {
          const usuario = await this.updateUserCorreoUseCase.run(
            args.usuario.id,
            args.usuario.correo
          );
          console.log(usuario);
          return usuario;
        } else {
          throw (
            (new GraphQLError("Acceso denegado"),
            {
              extensions: { code: "UNAUTHENTICATE" },
            })
          );
        }
      },
      addPublicacion: async (_: void, args: any, context: any) => {
        let key = await this.servicesAuth.run(context.authScope);
        if (key) {
          console.log(args.publicacion.descripcion);
          console.log(args.publicacion.createDate);
          console.log(args.publicacion.likes);
          console.log(args.publicacion.userId);
          
          const publicacion = await this.addPublicacion.run(
            args.publicacion.descripcion,
            args.publicacion.createDate,
            args.publicacion.likes,
            args.publicacion.userId
          );
          console.log("publicacion ->", publicacion);
          return publicacion
        } else {
          throw (
            (new GraphQLError("Acceso denegado"),
            {
              extensions: { code: "UNAUTHENTICATE" },
            })
          );
        }
      },
      deletePublicacion: async (_: void, args: any, context: any) => {
        let key = await this.servicesAuth.run(context);

        if (key) {
          const publicacion = await this.deletePublicacion.run(args.id);
          console.log(publicacion);
        } else {
          throw (
            (new GraphQLError("Acceso denegado"),
            {
              extensions: { code: "UNAUTHENTICATE" },
            })
          );
        }
      },
      updatePublicacionUseCase: async (_: void, args: any, context: any) => {
        let key = await this.servicesAuth.run(context);

        if (key) {
          const publicacion = await this.updatePublicacionUseCase.run(
            args.id, args.descripcion
          );
          console.log(publicacion);
        } else {
          throw (
            (new GraphQLError("Acceso denegado"),
            {
              extensions: { code: "UNAUTHENTICATE" },
            })
          );
        }
      }, 

      createWebhook: async (__: void, args: any) => {
        const data = await this.servicesCreateWebhook.run(
          args.url,
          args.events
        );
        return data;
      },
    },
  };
}
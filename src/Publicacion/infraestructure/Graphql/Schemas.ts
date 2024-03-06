import { gql } from "apollo-server-express";

export const typeDefs = gql`
  type Usuario{
    id:Int
    nombre: String
    password: String
    usuario:String
    correo:String
    urlhook:String
  }

  type Publicacion {
    id: Int
    descripcion: String
    createDate: String
    likes: String
    userId: String
  }

  type Login {
    user:Usuario
    token:String
  }

  type Query {
    usuario(usuario:String, password:String):Login
    usuarios:[Usuario]
    publicaciones: [Publicacion]
    publicacionByLikes(likes: String): Publicacion
    publicacionByNombre(nombre: String): Publicacion
    publicacionByDescripcion(descripcion: String): Publicacion
  }

  input publicacionInput {
    id: Int
    descripcion: String
    createDate: String
    likes: String
    userId: String
  }

  input usuarioInput {
    id: Int
    nombre: String
    password: String
    usuario: String
    correo: String
  }

  type Mutation {
    addPublicacion(publicacion: publicacionInput): Publicacion
    deletePublicacion(publicacion: publicacionInput): Publicacion
    updatePublicacionUseCase(descripcion: String): Publicacion
    updatePublicacionbyDescripcion(publicacion: publicacionInput): Publicacion

    deleteUser(usuario: usuarioInput): Usuario
    updateUserCorreo(usuario: usuarioInput): Usuario
    createUser(usuario: usuarioInput): Usuario
    createWebhook(url: String, events: String): String
  }
`;

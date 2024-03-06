import { Publicacion } from "../domain/entities/publicacion";
import { PublicacionRepository } from "../domain/repository/PublicacionRepository";
import PublicacionModel from "./model/PublicacionModel";

export class MysqlPublicacionRepository implements PublicacionRepository {
  async addPublicacion(descripcion: string, createDate: string, likes: string, userId: string):Promise<Publicacion | null> {
      try {
        const crearPublicacion = await PublicacionModel.create({
          descripcion,
          createDate,
          likes,
          userId
        });
        console.log(crearPublicacion);
        return new Publicacion(
          crearPublicacion.id,
          crearPublicacion.descripcion,
          crearPublicacion.createDate,
          crearPublicacion.likes,
          crearPublicacion.userId
          );
        } catch (error) {
          console.log("Error en MysqlPublicacionRepository en addPublicacion", error);
          return null;
      }
  }

  async deletePublicacion(id: number): Promise<Publicacion | null> {
    try {
      const publicacionBorrada = await PublicacionModel.findOne({where:{id:id}});
      if (publicacionBorrada) {
        await publicacionBorrada.destroy();
        return new Publicacion(publicacionBorrada.id , publicacionBorrada.descripcion , publicacionBorrada.createDate , publicacionBorrada.likes , publicacionBorrada.userId)
      } else {
        return null;
      }
    } catch (error) {
      console.log("Error en MysqlPublicacionRepository en deletePublicacion", error);
      return null;
    }
  }
  
  async updatePublicacion(id: number, descripcion: string): Promise<Publicacion | null> {
    try {
      const updatePublicacionDescripcion = await PublicacionModel.findByPk(id);
      if (updatePublicacionDescripcion) {
        await updatePublicacionDescripcion.update({descripcion});
        return updatePublicacionDescripcion;
      }else{
        return null;
      }
    } catch (error) {
      console.log("Error en MysqlPublicacionRepository en updatePublicacion", error);
      return null;
    }
  }

  async getAllPublicaciones(): Promise<Publicacion[] | null> {
    try {
      const publicacion = await PublicacionModel.findAll();
      console.log(publicacion);

      return publicacion.map((publi) => ({
        id : publi.id,
        descripcion: publi.descripcion,
        createDate: publi.createDate,
        likes: publi.likes,
        userId: publi.userId
      }));
    } catch (error) {
      console.log(
        "Error en MysqlPublicacionRepository en getAllPublicaciones",
        error
      );
      return null;
    }
  }

  async getPublicacionByLikes(likes: string): Promise<Publicacion | null> {
    try {
      const publicacion = await PublicacionModel.findOne({
        where: { likes: likes },
      });
      if (publicacion) {
        return new Publicacion(
          publicacion.id,
          publicacion.descripcion,
          publicacion.createDate,
          publicacion.likes,
          publicacion.userId
        );
      } else {
        return null;
      }
    } catch (error) {
      console.log(
        "Error en MysqlPublicacionRepository en getPublicacionByLikes",
        error
      );
      return null;
    }
  }

  async getPublicacionByDescripcion(descripcion: string): Promise<Publicacion | null> {
    try {
      const getPublidescripcion = await PublicacionModel.findOne({
        where: { descripcion: descripcion },
      });
      if (getPublidescripcion) {
        return new Publicacion(
          getPublidescripcion.id,
          getPublidescripcion.descripcion,
          getPublidescripcion.createDate,
          getPublidescripcion.likes,
          getPublidescripcion.userId
        );
      } else {
        return null;
      }
    } catch (error) {
      console.log(
        "Error en MysqlPublicacionRepository en getPublicacionByDescripcion",
        error
      );
      return null;
    }
  }
}

import signale from "signale";
import { Publicacion } from "../../domain/entities/publicacion";
import { PublicacionRepository } from "../../domain/repository/PublicacionRepository";
import { IEncryptServices } from "../services/IEncrypt";

export class CreatePublicacionCasoUso {
    constructor(
      readonly publicacionRepository: PublicacionRepository,
      readonly options: IEncryptServices
    ) {}
    async run(
      descripcion: string,
      createDate: string,
      likes: string,
      userId:string 
        ): Promise<Publicacion | null> {
      try {
        const newLikes = await this.options.encodePassword(likes);
        const publicacion = await this.publicacionRepository.addPublicacion(
          descripcion,
          createDate,
          newLikes,
          userId
        );   
        signale.info(publicacion)
        return publicacion;

      } catch (error) {
        console.error("Error en CreatePublicacionCasoUso",error);
        return null;
      }
    }
  }
  
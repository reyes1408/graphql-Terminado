import { Publicacion } from "../../domain/entities/publicacion";
import { PublicacionRepository } from "../../domain/repository/PublicacionRepository";

export class GetAllPublicacionCasoUso {
    constructor(readonly publicacionRepository: PublicacionRepository) {}
    async run(): Promise<Publicacion[] | null> {
      try {
        const todasPublicaciones = await this.publicacionRepository.getAllPublicaciones();
        return todasPublicaciones;
      } catch (error) {
        console.error(error);
        return null;
      }
    }
  }
  
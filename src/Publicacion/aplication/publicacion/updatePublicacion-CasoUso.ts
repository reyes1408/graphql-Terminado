import { Publicacion } from "../../domain/entities/publicacion";
import { PublicacionRepository } from "../../domain/repository/PublicacionRepository";

export class UpdatePublicacionCasoUso{
    constructor(readonly publicacionRepository:PublicacionRepository){}
    async run(id:number, descripcion: string):Promise <Publicacion | null>{
        try {
            const UpdatePublicacion = await this.publicacionRepository.updatePublicacion(id, descripcion);
            return UpdatePublicacion;
        } catch (error) {
            console.error("Error en UpdatePublicacionCasoUso",error);
            return null;
        }
    }
}
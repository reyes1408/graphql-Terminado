import { Publicacion } from "../../domain/entities/publicacion";
import { PublicacionRepository } from "../../domain/repository/PublicacionRepository";

export class GetPublicacionByLikes{
    constructor(readonly publicacionRepository:PublicacionRepository){}
    async run(likes:string):Promise <Publicacion | null>{
        try {
            const publicacionBylikes = await this.publicacionRepository.getPublicacionByLikes(likes);
            return publicacionBylikes;
        } catch (error) {
            console.error("Error en GetPublicacionByLikes",error);
            return null;
        }
    }
}
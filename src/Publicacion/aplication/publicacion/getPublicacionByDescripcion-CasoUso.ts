import { Publicacion } from "../../domain/entities/publicacion";
import { PublicacionRepository } from "../../domain/repository/PublicacionRepository";

export class GetPublicacionByDescripcionUseCase{
    constructor(readonly publicacionRepository:PublicacionRepository){}
    async run(descripcion:string):Promise<Publicacion | null>{
        try {
            const publicacionByDescripcion = await this.publicacionRepository.getPublicacionByDescripcion(descripcion);
            return publicacionByDescripcion;
        } catch (error) {
            console.error("Error en GetPublicacionByDescripUseCase",error);
            return null;
        }
    }
}
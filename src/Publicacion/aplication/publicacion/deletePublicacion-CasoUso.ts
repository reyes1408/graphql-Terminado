import { PublicacionRepository } from "../../domain/repository/PublicacionRepository";

export class DeletePublicacionCasoUso{
    constructor(readonly publicacionRepository:PublicacionRepository){}

    async run(id:number):Promise<string | null>{
        try {
            const publicacionBorrada = await this.publicacionRepository.deletePublicacion(id);
            if(publicacionBorrada){
                return "Publicacion Borrada";
            }else{
                return "publicacion no se pudo borrar"
            }
        } catch (error) {
            console.log("Error en DeletePublicacionCasoUso",error);
            return null;
        }
    }
}
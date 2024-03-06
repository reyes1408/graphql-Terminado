import {Usuario} from '../../domain/entities/User'
import { UserRepository } from '../../domain/repository/UserRepository';

export class UpdateUserCorreoUseCase{
    constructor(readonly userRepository:UserRepository){}
    async run(id:number , correo:string):Promise <Usuario | null>{
        try {
            const usuario = await this.userRepository.updateUserCorreo(
                id,
                correo
            );
            return usuario;
        } catch (error) {
            console.error("Error en PutCapituloCasoUso",error);
            return null;
        }
    }
}
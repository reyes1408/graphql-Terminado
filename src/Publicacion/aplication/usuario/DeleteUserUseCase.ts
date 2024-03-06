import { UserRepository } from "../../domain/repository/UserRepository";

export class DeleteUserUseCase{
    constructor(readonly userRepository:UserRepository){}

    async run(nombre:string):Promise<string | null>{
        try {
            const usuario = await this.userRepository.deleteUser(nombre);
            if(usuario){
                return "Usuario eliminado";
            }else{
                return "Usuario no se pudo eliminar"
            }
        } catch (error) {
            console.log("Error en DeleteUsuario",error);
            return null;
        }
    }
}
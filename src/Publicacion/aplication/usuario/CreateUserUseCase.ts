import { Usuario } from "../../domain/entities/User";
import { UserRepository } from "../../domain/repository/UserRepository";
import { IEncryptServices } from "../services/IEncrypt";

export class CreateUserUseCase {
  constructor(
    readonly userRepository: UserRepository,
    readonly options: IEncryptServices
  ) {}
  async run(
    nombre: string,
    password: string,
    usuario: string,
    correo:string 
      ): Promise<Usuario | null> {
    try {
      const newPassword = await this.options.encodePassword(password);
      const usuario1 = await this.userRepository.createUser(
        nombre,
        newPassword,
        usuario,
        correo
      );   
      return usuario1;
    } catch (error) {
      console.error(error);
      return null;
    }
  }
}

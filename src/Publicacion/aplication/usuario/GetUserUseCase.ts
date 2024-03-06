import { Usuario } from "../../domain/entities/User";
import { UserRepository } from "../../domain/repository/UserRepository";
import { IEncryptServices } from "../services/IEncrypt";
import { ServicesTokensUser } from "../services/ServicesTokens";

export class GetUserUseCase {
  constructor(
    readonly userRepository: UserRepository,
    readonly webToken: ServicesTokensUser,
    readonly options: IEncryptServices
  ) {}
  async run(
    usuario: string,
    password: string
  ): Promise<[Usuario[], string] | null> {
    try {
      const user = await this.userRepository.getUser(usuario, password);
      if (user != null) {
        let user1: Object = user[0];
        console.log(user1,"sdf");
        console.log(user, "userCasoUso");
        
        if ("password" in user1) {
          let password2 = user1.password;
          if (typeof password2 == "string") {
            const pass = await this.options.compareTo(password, password2);
            if (pass) {
              let tokenNew = await this.webToken.run(
                usuario,
                String(process.env.SECRET_TOKEN),
                100 * 100
              );
              console.log(user);
              
              const data: any = [user1, tokenNew];
              return data;
            } else {
              return null;
            }
          } else {
            return null;
          }
        } else {
          return null;
        }
      } else {
        return null;
      }
    } catch (error) {
      console.error(error);
      return null;
    }
  }
}

import { Usuario } from "../entities/User";

export interface UserRepository {
  getUser( usuario: string, password: string ): Promise<[Usuario , string] | null>;

  getAllUser(): Promise<Usuario[] | null>;
  
  deleteUser(nombre: string):Promise<Usuario| null>;
  
  updateUserCorreo(id: number ,correo: string): Promise <Usuario|null>;

  createUser( nombre: string, password: string, usuario: string, correo: string ): Promise<Usuario | null>;
}





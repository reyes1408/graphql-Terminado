import { Usuario } from "../domain/entities/User";
import { UserRepository } from "../domain/repository/UserRepository";
import UsuarioModel from "./model/UsuarioModel";

export class MysqlUserReporitory implements UserRepository {
  async createUser(
    nombre: string,
    password: string,
    usuario: string,
    correo: string
  ): Promise<Usuario | null> {
    try {
      const createUsuario = await UsuarioModel.create({
        nombre,
        password,
        usuario,
        correo
      });
      console.log(createUsuario);
      
      return new Usuario(
      createUsuario.id,
       createUsuario.nombre,
       createUsuario.password,
       createUsuario.usuario,
       createUsuario.correo
      );
    } catch (error) {
      console.log("Error en sqlPersonaje.repositorio en addPersonaje", error);
      return null;
    }
  }

  //AQUI EN EL RETORNO EL STRING SE ESTA MANDANDO VACIO PERO DEBE DE ENVIARSE EL TOKEN EN ESE STRING
  async getUser(
    usuario: string,
    password: string
  ): Promise<[Usuario, string] | null> {
    try {
      const getSignUsuario = await UsuarioModel.findOne({
        where: { usuario: usuario},
      });
      console.log(getSignUsuario,"loginMYSRepo");
      
      
      if (getSignUsuario) {
        await getSignUsuario.get()
        return [
          new Usuario(
            getSignUsuario.id,
            getSignUsuario.nombre,
            getSignUsuario.password,
            getSignUsuario.usuario,
            getSignUsuario.correo
          ),
          "",
        ];
      } else {
        return null;
      }
    } catch (error) {
      console.log("Error en sqlPersonaje.repositorio en getPersonaje", error);
      return null;
    }
  }

  async getAllUser(): Promise<Usuario[] | null> {
    try {
      const usuario = await UsuarioModel.findAll();
      console.log(usuario);

      return usuario.map((user) => ({
        id : user.id,
        nombre: user.nombre,
        password: user.password,
        usuario: user.usuario,
        correo: user.correo
      }));
    } catch (error) {
      console.log(
        "Error en sqlPersonaje.repositorio en getAllPersonajes",
        error
      );
      return null;
    }
  }


  async deleteUser(nombre: string): Promise<Usuario | null> {
    try {
      const usuarioEliminado = await UsuarioModel.findOne({where:{nombre:nombre}});
      if (usuarioEliminado) {
        await usuarioEliminado.destroy();
        return new Usuario(usuarioEliminado.id , usuarioEliminado.nombre , usuarioEliminado.password , usuarioEliminado.usuario , usuarioEliminado.correo)
      } else {
        return null;
      }
    } catch (error) {
      console.log("Error en sqlCapitulo.repositorio en deleteCapitulo", error);
      return null;
    }
    
  }

  async updateUserCorreo(id:number , correo: string): Promise<Usuario | null> {
    try {
      const updateUserCorreo = await UsuarioModel.findByPk(id);
      if (updateUserCorreo) {
        await updateUserCorreo.update({correo});
        return updateUserCorreo;
        
      }else{
        return null;
      }
    } catch (error) {
      console.log("Error en sqlCapitulo.repositorio en putCapitulopersonajePrin", error);
      return null;
    }
  }


}

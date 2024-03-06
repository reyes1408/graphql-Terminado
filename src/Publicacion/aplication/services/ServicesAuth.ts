import { JwtPayload } from "jsonwebtoken";
import { ServicesTokens } from "../../infraestructure/helpers/ServicesTokens";

export class ServicesAuth{
    constructor(readonly serviceHelper : ServicesTokens){
    }
    async run(usuario:string):Promise<string | JwtPayload | null>{
        try {
            const token = await this.serviceHelper.verifyToken(usuario);
            return token
        } catch (error) {
            console.log(error);
            return null
        }
    }
  
}
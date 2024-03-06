
//import { IWebhhok } from "../../domain/services/IWebhook";  
import { IWebhook } from "../../domain/services/IWebhook";  

export class ServicesCreateWebhook{
    constructor(readonly iWebhook: IWebhook){}
    async run(url:string, events: string){
        try {
            const data = await this.iWebhook.receive(url, events)
            return data
        } catch (error) {
            return null
        }
    }
}
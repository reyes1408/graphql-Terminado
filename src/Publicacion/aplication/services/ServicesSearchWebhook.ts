
import { IWebhook } from "../../domain/services/IWebhook";

export class ServicesSearchWebhook {

  constructor(readonly iWebhook: IWebhook) {}
  async run(event: string) {
    
    try {
      const data = await this.iWebhook.search(event);
      return data;
    } catch (error) {
      console.error(error);
      return null;
    }
  }
}
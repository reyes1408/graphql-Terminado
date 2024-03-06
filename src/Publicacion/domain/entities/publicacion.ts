export class Publicacion{
  constructor(
      public readonly id:number,
      public readonly descripcion:string,
      public readonly createDate:string,
      public readonly likes:string,
      public readonly userId:string,
  ){}
}
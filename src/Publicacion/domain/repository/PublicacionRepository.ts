import { Publicacion } from "../entities/publicacion";

export interface PublicacionRepository {
  addPublicacion( descripcion: string, createDate: string, likes: string, userId: string ): Promise<Publicacion | null>;

  deletePublicacion(id: number): Promise<Publicacion | null>;
  updatePublicacion(id: number, descripcion: string): Promise<Publicacion | null>;

  getAllPublicaciones(): Promise<Publicacion[] | null>;
  getPublicacionByLikes(likes: string): Promise<Publicacion | null>;

  getPublicacionByDescripcion(descripcion: string): Promise<Publicacion | null>;
}

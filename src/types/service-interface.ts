export interface Service<T, InsertType = T, UpdateType = T> {
  getAll: () => Promise<T[]>;
  getOne: (id: number) => Promise<T>;
  create: (entity: InsertType) => Promise<T>;
  update: (id: number, entity: T) => Promise<UpdateType>;
  deleteOne: (id: number) => Promise<T>;
  getOneByEmail?: (email: string) => Promise<T>;
}

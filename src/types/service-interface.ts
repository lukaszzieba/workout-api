export interface Service<T, InsertType = T, UpdateType = T> {
  getAll: () => Promise<T[]>;
  getOne: (id: number) => Promise<T | undefined>;
  create: (entity: InsertType) => Promise<T | undefined>;
  update: (id: number, entity: UpdateType) => Promise<T | undefined>;
  deleteOne: (id: number) => Promise<any>;
  getOneByEmail?: (email: string) => Promise<any>;
}

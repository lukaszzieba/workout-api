export interface Service<T> {
  getAll: () => Promise<T[]>;
  getOne: (id: number) => Promise<T>;
  create: (entity: T) => Promise<T>;
  update: (id: number, entity: T) => Promise<T>;
  deleteOne: (id: number) => Promise<T>;
}

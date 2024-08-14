import {Person} from "@/app/crud/Person";

export interface PersonsRepository {
  getAll: () => Promise<Person[]>;
  create: (name: string, surname: string) => Promise<Person>;
  update: (id: number, name: string, surname: string) => Promise<Person>;
  delete: (id: number) => Promise<void>;
}

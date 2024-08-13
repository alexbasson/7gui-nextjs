import {Person} from "@/app/crud/Person";

export interface PersonsRepository {
  getAll: () => Person[];
  create: (first: string, last: string) => Person[];
  update: (id: number, newFirst: string, newLast: string) => Person[];
  delete: (id: number) => Person[];
}

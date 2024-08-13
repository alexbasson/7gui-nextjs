import {Person} from "@/app/crud/Person";
import {PersonsRepository} from "@/app/crud/PersonsRepository";

export default class LocalPersonsRepository implements PersonsRepository {
  private id: number = 1
  private persons: Person[] = []

  getAll(): Person[] {
    return this.persons
  }

  create(first: string, last: string): Person[] {
    this.persons.push({
      id: this.id,
      name: first,
      surname: last,
    })
    this.id++
    return this.persons
  }

  update(id: number, newFirst: string, newLast: string): Person[] {
    this.persons.splice(this.indexOf(id), 1, {id: id, name: newFirst, surname: newLast})
    return this.persons
  }

  delete(id: number): Person[] {
    this.persons.splice(this.indexOf(id), 1)
    return this.persons
  }

  private indexOf(id: number): number {
    return this.persons.findIndex(person => id === person.id)
  }
}

import {Person} from "@/app/crud/Person";
import {PersonsRepository} from "@/app/crud/PersonsRepository";

export default class LocalPersonsRepository implements PersonsRepository {
  private id: number = 1
  private persons: Person[] = []

  getAll(): Promise<Person[]> {
    return new Promise((resolve) => {
      resolve(this.persons)
    })
  }

  create(name: string, surname: string): Promise<Person> {
    return new Promise((resolve) => {
      const newPerson = {id: this.id, name, surname}
      this.persons.push(newPerson)
      this.id++
      resolve(newPerson)
    })
  }

  update(id: number, name: string, surname: string): Promise<Person> {
    return new Promise((resolve) => {
      const person = {id: id, name, surname};
      this.persons.splice(this.indexOf(id), 1, person)
      resolve(person)
    })
  }

  delete(id: number): Promise<void> {
    return new Promise((resolve) => {
      this.persons.splice(this.indexOf(id), 1)
      resolve()
    })
  }

  private indexOf(id: number): number {
    return this.persons.findIndex(person => id === person.id)
  }
}

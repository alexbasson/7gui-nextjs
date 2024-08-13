import {Person} from "@/app/crud/Person";

export default class NameRepository {
  private id: number = 1
  private persons: Person[] = []

  public allNames(): Person[] {
    return this.persons
  }

  public create(first: string, last: string): Person[] {
    this.persons.push({
      id: this.id,
      name: first,
      surname: last,
    })
    this.id++
    return this.persons
  }

  public update(id: number, newFirst: string, newLast: string): Person[] {
    this.persons.splice(this.indexOf(id), 1, {id: id, name: newFirst, surname: newLast})
    return this.persons
  }

  public delete(id: number): Person[] {
    this.persons.splice(this.indexOf(id), 1)
    return this.persons
  }

  private indexOf(id: number): number {
    return this.persons.findIndex(person => id === person.id)
  }
}

import {Name} from "@/app/crud/name";

export default class NameRepository {
  private names: Name[] = []

  public allNames(): Name[] {
    return this.names
  }

  public create(first: string, last: string): Name[] {
    this.names.push({
      first: first,
      last: last,
    })
    return this.names
  }

  public update(name: Name, newFirst: string, newLast: string): Name[] {
    this.names.splice(this.indexOf(name), 1, {first: newFirst, last: newLast})
    return this.names
  }

  public delete(name: Name): Name[] {
    this.names.splice(this.indexOf(name), 1)
    return this.names
  }

  private indexOf(name: Name): number {
    return this.names.findIndex(n => n.first === name.first && n.last === name.last)
  }
}

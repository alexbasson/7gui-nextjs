import PersonsRepository from "@/app/crud/PersonsRepository";

describe('PersonsRepository', () => {
  let repository: PersonsRepository;

  beforeEach(() => {
    repository = new PersonsRepository();
  })

  it('performs CRUD operations on names', () => {
    expect(repository.allNames()).toStrictEqual([]);

    repository.create("Alice", "Awesome")
    expect(repository.allNames()).toStrictEqual([
      {id: 1, name: "Alice", surname: "Awesome"},
    ])

    repository.create("Bob", "Builder")
    expect(repository.allNames()).toStrictEqual([
      {id: 1, name: "Alice", surname: "Awesome"},
      {id: 2, name: "Bob", surname: "Builder"},
    ])

    repository.create("Carlos", "Cool")
    expect(repository.allNames()).toStrictEqual([
      {id: 1, name: "Alice", surname: "Awesome"},
      {id: 2, name: "Bob", surname: "Builder"},
      {id: 3, name: "Carlos", surname: "Cool"},
    ])

    repository.create("Dana", "Daring")
    expect(repository.allNames()).toStrictEqual([
      {id: 1, name: "Alice", surname: "Awesome"},
      {id: 2, name: "Bob", surname: "Builder"},
      {id: 3, name: "Carlos", surname: "Cool"},
      {id: 4, name: "Dana", surname: "Daring"},
    ])

    repository.update(2, "Edna", "Excellent")
    expect(repository.allNames()).toStrictEqual([
      {id: 1, name: "Alice", surname: "Awesome"},
      {id: 2, name: "Edna", surname: "Excellent"},
      {id: 3, name: "Carlos", surname: "Cool"},
      {id: 4, name: "Dana", surname: "Daring"},
    ])

    repository.delete(3)
    expect(repository.allNames()).toStrictEqual([
      {id: 1, name: "Alice", surname: "Awesome"},
      {id: 2, name: "Edna", surname: "Excellent"},
      {id: 4, name: "Dana", surname: "Daring"},
    ])
  })
})

import LocalPersonsRepository from "@/app/crud/LocalPersonsRepository";

describe('PersonsRepository', () => {
  let repository: LocalPersonsRepository;

  beforeEach(() => {
    repository = new LocalPersonsRepository();
  })

  it('performs CRUD operations on persons', async () => {
    expect(await repository.getAll()).toStrictEqual([]);

    await repository.create("Alice", "Awesome")
    expect(await repository.getAll()).toStrictEqual([
      {id: 1, name: "Alice", surname: "Awesome"},
    ])

    await repository.create("Bob", "Builder")
    expect(await repository.getAll()).toStrictEqual([
      {id: 1, name: "Alice", surname: "Awesome"},
      {id: 2, name: "Bob", surname: "Builder"},
    ])

    await repository.create("Carlos", "Cool")
    expect(await repository.getAll()).toStrictEqual([
      {id: 1, name: "Alice", surname: "Awesome"},
      {id: 2, name: "Bob", surname: "Builder"},
      {id: 3, name: "Carlos", surname: "Cool"},
    ])

    await repository.create("Dana", "Daring")
    expect(await repository.getAll()).toStrictEqual([
      {id: 1, name: "Alice", surname: "Awesome"},
      {id: 2, name: "Bob", surname: "Builder"},
      {id: 3, name: "Carlos", surname: "Cool"},
      {id: 4, name: "Dana", surname: "Daring"},
    ])

    await repository.update(2, "Edna", "Excellent")
    expect(await repository.getAll()).toStrictEqual([
      {id: 1, name: "Alice", surname: "Awesome"},
      {id: 2, name: "Edna", surname: "Excellent"},
      {id: 3, name: "Carlos", surname: "Cool"},
      {id: 4, name: "Dana", surname: "Daring"},
    ])

    await repository.delete(3)
    expect(await repository.getAll()).toStrictEqual([
      {id: 1, name: "Alice", surname: "Awesome"},
      {id: 2, name: "Edna", surname: "Excellent"},
      {id: 4, name: "Dana", surname: "Daring"},
    ])
  })
})

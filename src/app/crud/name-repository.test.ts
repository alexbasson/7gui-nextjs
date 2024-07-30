import NameRepository from "@/app/crud/name-repository";

describe('NameRepository', () => {
  let repository: NameRepository;

  beforeEach(() => {
    repository = new NameRepository();
  })

  it('performs CRUD operations on names', () => {
    expect(repository.allNames()).toStrictEqual([]);

    repository.create("Alice", "Awesome")
    expect(repository.allNames()).toStrictEqual([
      {first: "Alice", last: "Awesome"},
    ])

    repository.create("Bob", "Builder")
    expect(repository.allNames()).toStrictEqual([
      {first: "Alice", last: "Awesome"},
      {first: "Bob", last: "Builder"},
    ])

    repository.create("Carlos", "Cool")
    expect(repository.allNames()).toStrictEqual([
      {first: "Alice", last: "Awesome"},
      {first: "Bob", last: "Builder"},
      {first: "Carlos", last: "Cool"},
    ])

    repository.create("Dana", "Daring")
    expect(repository.allNames()).toStrictEqual([
      {first: "Alice", last: "Awesome"},
      {first: "Bob", last: "Builder"},
      {first: "Carlos", last: "Cool"},
      {first: "Dana", last: "Daring"},
    ])

    repository.update({first: "Bob", last: "Builder"}, "Edna", "Excellent")
    expect(repository.allNames()).toStrictEqual([
      {first: "Alice", last: "Awesome"},
      {first: "Edna", last: "Excellent"},
      {first: "Carlos", last: "Cool"},
      {first: "Dana", last: "Daring"},
    ])

    repository.delete({first: "Carlos", last: "Cool"})
    expect(repository.allNames()).toStrictEqual([
      {first: "Alice", last: "Awesome"},
      {first: "Edna", last: "Excellent"},
      {first: "Dana", last: "Daring"},
    ])
  })
})

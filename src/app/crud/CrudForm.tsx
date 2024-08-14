'use client'

import {MouseEvent, useState} from "react";
import {Person} from "@/app/crud/Person";
import {PersonsRepository} from "@/app/crud/PersonsRepository";

type CrudFormProps = {
  repository: PersonsRepository,
}

export default function CrudForm({ repository }: CrudFormProps) {
  const [persons, setPersons] = useState<Person[]>([])
  const [name, setName] = useState<string>('');
  const [surname, setSurname] = useState<string>('');

  const [selectedId, setSelectedId] = useState(-1);
  const [filter, setFilter] = useState<string>('');

  const outOfRange = (index: number) => {
    return index < 0 || index > persons.length - 1;
  }

  const handleCreate = async (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault()

    if (name.length > 0 && surname.length > 0) {
      await repository.create(name, surname)
      setSelectedId(-1)
      setName('')
      setSurname('')
      setPersons(await repository.getAll())
    }
  }

  const handleUpdate = async (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault()

    if (outOfRange(selectedId)) {
      return
    }

    if (name.length > 0 && surname.length > 0) {
      await repository.update(selectedId, name, surname)
      setName('')
      setSurname('')
      setPersons(await repository.getAll())
    }
  }

  const handleDelete = async (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault()

    if (outOfRange(selectedId)) {
      return
    }

    await repository.delete(selectedId)
    setName('')
    setSurname('')
    setSelectedId(-1)
    setPersons(await repository.getAll())
  }

  const bySurname = (person: Person): boolean => {
    return filter === '' || person.surname.toLowerCase().includes(filter.toLowerCase())
  }

  return (
    <form className={'p-4 bg-gray-200'}>
      <div className={'mb-4'}>
        <label htmlFor="filter" className={'mr-4'}>Filter prefix:</label>
        <input id="filter" value={filter} onChange={event => setFilter(event.target.value)} />
      </div>

      <div className='grid grid-cols-2 gap-4'>
        <div className={'m-0'} style={{height: '100px'}}>
          <ul className={'h-4/5 list-none bg-white overflow-y-scroll'}>
            {
              persons
                .filter(bySurname)
                .map((person) => (
                  <li key={person.id}
                      value={person.id}
                      data-testid='person'
                      onClick={event => setSelectedId(event.currentTarget.value)}
                      className={`px-2 ${selectedId === person.id ? 'bg-blue-500 text-white' : ''}`}
                  >
                    {person.name} {person.surname}
                  </li>
                ))
            }
          </ul>
        </div>

        <div>
          <div className={'flex justify-end mb-4'}>
            <label htmlFor="name" className={'mr-8'}>Name:</label>
            <input id="name" value={name} onChange={event => setName(event.target.value)} />
          </div>

          <div className={'flex justify-end'}>
            <label htmlFor="surname" className={'mr-8'}>Surname:</label>
            <input id="surname" value={surname} onChange={event => setSurname(event.target.value)} />
          </div>
        </div>

        <div className={'flex justify-between'}>
          <button className='bg-blue-500 text-white rounded px-4 py-2' onClick={handleCreate}>Create</button>
          <button className='bg-blue-500 text-white rounded px-4 py-2' onClick={handleUpdate} disabled={outOfRange(selectedId)}>Update</button>
          <button className='bg-blue-500 text-white rounded px-4 py-2' onClick={handleDelete} disabled={outOfRange(selectedId)}>Delete</button>
        </div>
      </div>
    </form>
  )
}

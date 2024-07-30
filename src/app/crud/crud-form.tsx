'use client'

import './crud-form.css';
import {MouseEvent, useState} from "react";
import {Name} from "@/app/crud/name";
import NameRepository from "@/app/crud/name-repository";

const repository = new NameRepository();

export default function CrudForm() {
  const [names, setNames] = useState<Name[]>(repository.allNames())
  const [firstName, setFirstName] = useState<string>('');
  const [lastName, setLastName] = useState<string>('');

  const [selectedIndex, setSelectedIndex] = useState(-1);
  const [filter, setFilter] = useState<string>('');

  const outOfRange = (index: number) => {
    return index < 0 || index > names.length - 1;
  }

  const handleCreate = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault()

    if (firstName.length > 0 && lastName.length > 0) {
      setNames(repository.create(firstName, lastName))
      setSelectedIndex(-1)
      setFirstName('')
      setLastName('')
    }
  }

  const handleUpdate = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault()

    if (outOfRange(selectedIndex)) {
      return
    }

    if (firstName.length > 0 && lastName.length > 0) {
      setNames(repository.update(names[selectedIndex], firstName, lastName))
      setFirstName('')
      setLastName('')
    }
  }

  const handleDelete = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault()

    if (outOfRange(selectedIndex)) {
      return
    }

    setNames(repository.delete(names[selectedIndex]))
    setFirstName('')
    setLastName('')
    setSelectedIndex(-1)
  }

  return (
    <form className={'form'}>
      <div className={'mb-8'}>
        <label htmlFor="filter" className={'mr-8'}>Filter prefix:</label>
        <input name="filter" value={filter} onChange={event => setFilter(event.target.value)} />
      </div>

      <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr'}}>
        <div className={'m-0'} style={{height: '100px'}}>
          <ul className={'ul'}>
            {
              names
                .filter((name) => (filter === '' || name.last.includes(filter)))
                .map((name, index) => (
                  <li key={index}
                      value={index}
                      onClick={event => setSelectedIndex(event.currentTarget.value)}
                      className={`p-4 ${selectedIndex === index ? 'selected' : ''}`}
                  >
                    {name.first} {name.last}
                  </li>
                ))
            }
          </ul>
        </div>

        <div>
          <div className={'flex jc-end'}>
            <label htmlFor="firstName" className={'mr-8'}>First: </label>
            <input name="firstName" value={firstName} onChange={event => setFirstName(event.target.value)} />
          </div>

          <div className={'flex jc-end'}>
            <label htmlFor="lastName" className={'mr-8'}>Last: </label>
            <input name="lastName" value={lastName} onChange={event => setLastName(event.target.value)} />
          </div>
        </div>

        <div className={'flex jc-space-between'}>
          <button onClick={handleCreate}>Create</button>
          <button onClick={handleUpdate} disabled={outOfRange(selectedIndex)}>Update</button>
          <button onClick={handleDelete} disabled={outOfRange(selectedIndex)}>Delete</button>
        </div>
      </div>
    </form>
  )
}

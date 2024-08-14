import CrudForm from "@/app/crud/CrudForm";
import LocalPersonsRepository from "@/app/crud/LocalPersonsRepository";
import {fireEvent, render, screen} from "@testing-library/react";
import {act} from "react";

describe('CrudForm', () => {
  let nameInput: HTMLInputElement;
  let surnameInput: HTMLInputElement;
  let createButton: HTMLButtonElement;
  let updateButton: HTMLButtonElement;
  let deleteButton: HTMLButtonElement;
  let filterInput: HTMLInputElement;

  beforeEach(() => {
    render(<CrudForm repository={new LocalPersonsRepository()} />)

    nameInput = screen.getByLabelText('Name:')
    surnameInput = screen.getByLabelText('Surname:')
    // personsList = screen.getAllByTestId('person')
    createButton = screen.getByText('Create')
    updateButton = screen.getByText('Update')
    deleteButton = screen.getByText('Delete')
    filterInput = screen.getByLabelText('Filter prefix:')
  })

  describe('on initialization', () => {
    it('sets the initial values of the form elements', () => {
      expect(nameInput.value).toBe('')
      expect(surnameInput.value).toBe('')
      // expect(personsList).toBeEmptyDOMElement()
      expect(filterInput.value).toBe('')
    })
  })

  describe('creating persons', () => {
    it('adds the persons to the list', async () => {
      await createPerson('Alice', 'Awesome')
      expect(screen.getAllByTestId('person').length).toBe(1)
      expect(personListItemAtIndex(0).textContent).toBe('Alice Awesome')

      await createPerson('Bob', 'Builder')
      expect(screen.getAllByTestId('person').length).toBe(2)
      expect(personListItemAtIndex(0).textContent).toBe('Alice Awesome')
      expect(personListItemAtIndex(1).textContent).toBe('Bob Builder')

      await createPerson('Clara', 'Creative')
      expect(screen.getAllByTestId('person').length).toBe(3)
      expect(personListItemAtIndex(0).textContent).toBe('Alice Awesome')
      expect(personListItemAtIndex(1).textContent).toBe('Bob Builder')
      expect(personListItemAtIndex(2).textContent).toBe('Clara Creative')
    })
  })

  describe('updating persons', () => {
    it('updates the selected person', async () => {
      await createPerson('Alice', 'Awesome')
      await createPerson('Bob', 'Builder')
      await createPerson('Clara', 'Creative')

      expect(screen.getAllByTestId('person').length).toBe(3)
      expect(personListItemAtIndex(0).textContent).toBe('Alice Awesome')
      expect(personListItemAtIndex(1).textContent).toBe('Bob Builder')
      expect(personListItemAtIndex(2).textContent).toBe('Clara Creative')

      fireEvent.click(personListItemAtIndex(1))

      fireEvent.change(nameInput, {target: {value: 'Barb'}})
      fireEvent.change(surnameInput, {target: {value: 'Busy'}})

      await act(async () => await fireEvent.click(updateButton))
      expect(nameInput.value).toBe('')
      expect(surnameInput.value).toBe('')

      expect(personListItemAtIndex(0).textContent).toBe('Alice Awesome')
      expect(personListItemAtIndex(1).textContent).toBe('Barb Busy')
      expect(personListItemAtIndex(2).textContent).toBe('Clara Creative')
    })
  })

  describe('deleting persons', () => {
    it('removes the selected person from the list', async () => {
      await createPerson('Alice', 'Awesome')
      await createPerson('Bob', 'Builder')
      await createPerson('Clara', 'Creative')

      expect(screen.getAllByTestId('person').length).toBe(3)
      expect(personListItemAtIndex(0).textContent).toBe('Alice Awesome')
      expect(personListItemAtIndex(1).textContent).toBe('Bob Builder')
      expect(personListItemAtIndex(2).textContent).toBe('Clara Creative')

      fireEvent.click(personListItemAtIndex(1))

      await act(async () => await fireEvent.click(deleteButton))

      expect(screen.getAllByTestId('person').length).toBe(2)
      expect(personListItemAtIndex(0).textContent).toBe('Alice Awesome')
      expect(personListItemAtIndex(1).textContent).toBe('Clara Creative')
    })
  })

  describe('filtering the persons list',  () => {
    it('displays only the persons who match the filter prefix', async () => {
      await createPerson('Alice', 'Awesome')
      await createPerson('Bob', 'Builder')
      await createPerson('Clara', 'Creative')
      await createPerson('Barb', 'Busy')

      expect(screen.getAllByTestId('person').length).toBe(4)
      expect(personListItemAtIndex(0).textContent).toBe('Alice Awesome')
      expect(personListItemAtIndex(1).textContent).toBe('Bob Builder')
      expect(personListItemAtIndex(2).textContent).toBe('Clara Creative')
      expect(personListItemAtIndex(3).textContent).toBe('Barb Busy')

      fireEvent.change(filterInput, {target: {value: 'bu'}})

      expect(screen.getAllByTestId('person').length).toBe(2)
      expect(personListItemAtIndex(0).textContent).toBe('Bob Builder')
      expect(personListItemAtIndex(1).textContent).toBe('Barb Busy')
    })
  })

  const createPerson = async (name: string, surname: string) => {
    fireEvent.change(nameInput, {target: {value: name}})
    fireEvent.change(surnameInput, {target: {value: surname}})

    await act(async () => await fireEvent.click(createButton))

    expect(nameInput.value).toBe('')
    expect(surnameInput.value).toBe('')
  }

  const personListItemAtIndex = (index: number): HTMLLIElement => {
    return (screen.getAllByTestId('person'))[index] as HTMLLIElement
  }
})

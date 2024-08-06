import {fireEvent, render, screen} from "@testing-library/react";
import FlightBooker from "@/app/flight-booker/flight-booker";

describe('FlightBooker', () => {
  let dropdown: HTMLSelectElement;
  let departureDateTextField: HTMLInputElement;
  let returnDateTextField: HTMLInputElement;
  let submitButton: HTMLButtonElement;
  let message: HTMLElement | null;

  beforeEach(() => {
    render(<FlightBooker />)

    dropdown = screen.getByTestId('flight-type')
    departureDateTextField = screen.getByTestId('departure-date')
    returnDateTextField = screen.getByTestId('return-date')
    submitButton = screen.getByTestId('submit')
    message = screen.queryByTestId('message')
  })

  describe('initial render', () => {
    it('has options for one-way and return flights', () => {
      expect(dropdown.options.length).toBe(2)
      expect(dropdown.options.item(0)?.value).toEqual('one-way')
      expect(dropdown.options.item(0)?.text).toEqual('one-way flight')
      expect(dropdown.options.item(1)?.value).toEqual('return')
      expect(dropdown.options.item(1)?.text).toEqual('return flight')
    })

    it('selects one-way flight by default', () => {
      expect(dropdown.value).toBe('one-way')
    })

    it('sets the default departure date to today', () => {
      const today = new Date()
      const dateString = `${today.getMonth()}/${today.getDate()}/${today.getFullYear()}`
      expect(departureDateTextField.value).toBe(dateString)
    })

    it('sets the default return date to today', () => {
      const today = new Date()
      const dateString = `${today.getMonth()}/${today.getDate()}/${today.getFullYear()}`
      expect(returnDateTextField.value).toBe(dateString)
    })

    it('does not display a message', () => {
      expect(message).not.toBeInTheDocument()
    })
  })

  describe('when the flight type is "one-way"', () => {
    beforeEach(() => {
      fireEvent.change(dropdown, { target: { value: 'one-way' } })
    })

    it('disables the return date text field', () => {
      expect(returnDateTextField).toBeDisabled()
    })

    describe('when the form is valid', () => {
      beforeEach(() => {
        fireEvent.change(departureDateTextField, { target: { value: '07/25/2024' } })
      })

      it('enables the submit button', () => {
        expect(submitButton).toBeEnabled()
      })

      describe('when submitting the form', () => {
        it('displays a message', () => {
          fireEvent.click(submitButton)

          message = screen.getByTestId('message')
          expect(message).toBeInTheDocument()
          expect(message?.textContent).toBe("You have booked a one-way flight on 07/25/2024.")
        })
      })
    })

    describe('when the form is invalid', () => {
      beforeEach(async () => {
        await fireEvent.change(departureDateTextField, { target: { value: 'not a valid date' } })
      })

      it('disables the submit button', () => {
        expect(submitButton).toBeDisabled()
      })

      it('colors the text field red', () => {
        expect(departureDateTextField).toHaveClass('bg-red-500')
      })
    })
  })

  describe('when the flight type is "return"', () => {
    beforeEach(() => {
      fireEvent.change(dropdown, { target: { value: 'return' } })
    })

    it('enables the return date text field', () => {
      expect(returnDateTextField).toBeEnabled()
    })

    describe('when the date is invalid', () => {
      beforeEach(() => {
        fireEvent.change(returnDateTextField, { target: { value: 'not a valid date' } })
      })

      it('disables the submit button', () => {
        expect(submitButton).toBeDisabled()
      })

      it('colors the text field red', () => {
        expect(returnDateTextField).toHaveClass('bg-red-500')
      })
    })

    describe('when the return date occurs strictly before the start date', () => {
      beforeEach(() => {
        fireEvent.change(departureDateTextField, { target: { value: '07/25/2024' } })
        fireEvent.change(returnDateTextField, { target: { value: '07/24/2024' } })
      })

      it('disables the submit button', () => {
        expect(submitButton).toBeDisabled()
      })
    })
  })
})

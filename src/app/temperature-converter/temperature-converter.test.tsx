import {fireEvent, render, screen} from "@testing-library/react";
import TemperatureConverter from "@/app/temperature-converter/temperature-converter";

describe('TemperatureConverter', () => {
  beforeEach(() => {
    render(<TemperatureConverter />)
  })

  describe('on initial render', () => {
    let celsiusTextField: HTMLInputElement
    let fahrenheitTextField: HTMLInputElement

    beforeEach(() => {
      celsiusTextField = screen.getByTestId('celsius')
      fahrenheitTextField = screen.getByTestId('fahrenheit')
    })

    it('has no text in the text fields', () => {
      expect(celsiusTextField.value).toBe('')
      expect(fahrenheitTextField.value).toBe('')
    })

    describe('the celsius field', () => {
      describe('when an invalid temperature is entered', () => {
        it('does not change the values of the fields', () => {
          fireEvent.change(celsiusTextField, {target: {value: 'zero'}})

          expect(fahrenheitTextField.value).toBe('');
          expect(celsiusTextField.value).toBe('');
        })
      })

      describe('when a valid temperature is entered', () => {
        it('updates the fahrenheit field with the correct temperature', () => {
          fireEvent.change(celsiusTextField, {target: {value: '0'}})

          expect(fahrenheitTextField.value).toBe('32');

          fireEvent.change(celsiusTextField, {target: {value: '100'}})

          expect(fahrenheitTextField.value).toBe('212');
        })
      })
    })

    describe('the fahrenheit field', () => {
      describe('when an invalid temperature is entered', () => {
        it('does not change the values of the fields', () => {
          fireEvent.change(fahrenheitTextField, {target: {value: 'zero'}})

          expect(fahrenheitTextField.value).toBe('');
          expect(celsiusTextField.value).toBe('');
        })
      })

      describe('when a valid temperature is entered', () => {
        it('updates the celsius field with the correct temperature', () => {
          fireEvent.change(fahrenheitTextField, {target: {value: '32'}})

          expect(celsiusTextField.value).toBe('0');

          fireEvent.change(fahrenheitTextField, {target: {value: '212'}})

          expect(celsiusTextField.value).toBe('100');
        })
      })
    })
  })
})

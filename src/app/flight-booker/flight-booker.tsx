'use client'

import {ChangeEvent, FormEvent, useState} from "react";

type FlightType = "one-way" | "return"
type FlightTypeOption = {
  flightType: FlightType,
  displayValue: string,
}

export default function FlightBooker() {
  const flightTypeOptions: FlightTypeOption[] = [
    {
      flightType: "one-way",
      displayValue: "one-way flight",
    },
    {
      flightType: "return",
      displayValue: "return flight",
    },
  ]
  const validDateRegex = new RegExp("\\d{1,2}\\/\\d{1,2}\\/\\d{4}")

  const today = (): string => {
    const date = new Date()
    return `${date.getMonth()}/${date.getDate()}/${date.getFullYear()}`
  }

  const [flightType, setFlightType] = useState<FlightType>('one-way')
  const [departureDate, setDepartureDate] = useState<string>(today());
  const [returnDate, setReturnDate] = useState<string>(today());
  const [returnDateEnabled, setReturnDateEnabled] = useState<boolean>(false)
  const [displayMessage, setDisplayMessage] = useState<boolean>(false)
  const [submitEnabled, setSubmitEnabled] = useState<boolean>(true)
  const [departureDateValid, setDepartureDateValid] = useState<boolean>(validDateRegex.test(departureDate))
  const [returnDateValid, setReturnDateValid] = useState<boolean>(validDateRegex.test(returnDate))

  const handleFlightTypeChange = (event: ChangeEvent<HTMLSelectElement>) => {
    event.preventDefault()

    const inputValue = event.target.options[event.target.selectedIndex].value as FlightType ?? 'one-way'
    setFlightType(inputValue)
    setReturnDateEnabled(inputValue === 'return')
  }

  const handleDepartureDateChange = (event: ChangeEvent<HTMLInputElement>) => {
    event.preventDefault()
    const input = event.target.value

    setDepartureDate(input)
    setDepartureDateValid(validDateRegex.test(input))
    setSubmitEnabled(validDateRegex.test(input))
  }

  const handleReturnDateChange = (event: ChangeEvent<HTMLInputElement>) => {
    event.preventDefault()
    const input = event.target.value

    setReturnDate(input)
    const inputIsValidDate = validDateRegex.test(input)
    setReturnDateValid(inputIsValidDate)

    const returnDateIsValid = inputIsValidDate && returnDateIsAtOrAfterDepartureDate()
    setSubmitEnabled(returnDateIsValid)
  }

  const dateToInt = (date: string): number => {
    const [month, day, year] = date.split('/')
    return parseInt(year + month + day) ?? 0
  }

  const returnDateIsAtOrAfterDepartureDate = (): boolean => {
    return dateToInt(departureDate) <= dateToInt(returnDate);
  }

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    setDisplayMessage(true)
  }

  const message = () => {
    const flightTypeDisplayValue = flightTypeOptions.find((option) => option.flightType === flightType)?.displayValue ?? ''
    return `You have booked a ${flightTypeDisplayValue} on ${departureDate}.`
  }

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <select
          value={flightType}
          onChange={handleFlightTypeChange}
          data-testid="flight-type"
        >
          {
            flightTypeOptions.map((option) => <option key={option.flightType} value={option.flightType}>{option.displayValue}</option>)
          }
        </select>
      </div>

      <div>
        <input
          value={departureDate}
          onChange={handleDepartureDateChange}
          style={{background: `${departureDateValid ? 'none' : 'red'}`}}
          data-testid='departure-date'
        />
      </div>

      <div>
        <input
          value={returnDate}
          onChange={handleReturnDateChange}
          style={{background: `${returnDateValid ? 'none' : 'red'}`}}
          disabled={!returnDateEnabled}
          data-testid='return-date'
        />
      </div>

      <div>
        <button type='submit' disabled={!submitEnabled} data-testid='submit'>Submit</button>
      </div>

      <div>
        { displayMessage ? <p data-testid='message'>{message()}</p> : <></> }
      </div>
    </form>
  )
}

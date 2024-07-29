'use client'

import {ChangeEvent, FormEvent, useState} from "react";

type FlightType = "one-way" | "return"
type FlightTypeOption = {
  flightType: FlightType,
  displayValue: string,
}

export default function FlightBooker() {
  const dateIsValid = (date: string): boolean => {
    const validDateRegex = new RegExp("\\d{1,2}\\/\\d{1,2}\\/\\d{4}")
    return validDateRegex.test(date)
  }

  const dateToInt = (date: string): number => {
    const [month, day, year] = date.split('/')
    return parseInt(year + month + day) ?? 0
  }

  const returnDateIsAtOrAfterDepartureDate = (returnDateInput: string): boolean => {
    return dateIsValid(returnDateInput) && dateToInt(departureDate) <= dateToInt(returnDate);
  }

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

  const today = (): string => {
    const date = new Date()
    return `${date.getMonth()}/${date.getDate()}/${date.getFullYear()}`
  }

  const [flightType, setFlightType] = useState<FlightType>('one-way')
  const [departureDate, setDepartureDate] = useState<string>(today());
  const [returnDate, setReturnDate] = useState<string>(today());
  const [displayMessage, setDisplayMessage] = useState<boolean>(false)
  const [submitEnabled, setSubmitEnabled] = useState<boolean>(true)

  const handleFlightTypeChange = (event: ChangeEvent<HTMLSelectElement>) => {
    event.preventDefault()

    const input = event.target.options[event.target.selectedIndex].value as FlightType ?? 'one-way'
    setFlightType(input)
  }

  const handleDepartureDateChange = (event: ChangeEvent<HTMLInputElement>) => {
    event.preventDefault()
    const input = event.target.value

    setDepartureDate(input)
    setSubmitEnabled(dateIsValid(input))
  }

  const handleReturnDateChange = (event: ChangeEvent<HTMLInputElement>) => {
    event.preventDefault()
    const input = event.target.value

    setReturnDate(input)
    setSubmitEnabled(returnDateIsAtOrAfterDepartureDate(input))
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
          style={{background: `${dateIsValid(departureDate) ? 'none' : 'red'}`}}
          data-testid='departure-date'
        />
      </div>

      <div>
        <input
          value={returnDate}
          onChange={handleReturnDateChange}
          style={{background: `${dateIsValid(returnDate) ? 'none' : 'red'}`}}
          disabled={flightType === 'one-way'}
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

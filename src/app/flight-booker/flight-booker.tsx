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
    <form className='w-2/12 bg-gray-200 p-4' onSubmit={handleSubmit}>
      <div>
        <select
          value={flightType}
          onChange={handleFlightTypeChange}
          className='w-full p-2 mb-4'
          data-testid="flight-type"
        >
          {
            flightTypeOptions.map((option) => <option key={option.flightType} value={option.flightType}>{option.displayValue}</option>)
          }
        </select>
      </div>

      <div className='flex justify-between'>
        <label htmlFor='departure'>Departure date:</label>
        <input
          name='departure'
          value={departureDate}
          onChange={handleDepartureDateChange}
          className={`${dateIsValid(departureDate) ? 'bg-white' : 'bg-red-500'} p-2 text-gray-900 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500}`}
          data-testid='departure-date'
        />
      </div>

      <div className='flex justify-between mb-4'>
        <label htmlFor='return'>Return date:</label>
        <input
          name='return'
          value={returnDate}
          onChange={handleReturnDateChange}
          className={`${dateIsValid(returnDate) ? 'bg-white' : 'bg-red-500'} disabled:bg-slate-300 p-2 text-gray-900 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500}`}
          disabled={flightType === 'one-way'}
          data-testid='return-date'
        />
      </div>

      <div>
        <button type='submit' disabled={!submitEnabled} className='bg-blue-500 text-white w-full px-4 py-2 rounded' data-testid='submit'>Submit</button>
      </div>

      <div>
        { displayMessage ? <p data-testid='message'>{message()}</p> : <></> }
      </div>
    </form>
  )
}

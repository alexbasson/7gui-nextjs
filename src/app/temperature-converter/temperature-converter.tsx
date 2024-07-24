'use client'

import {ChangeEvent, useState} from "react";

const celsiusToFahrenheit = (celsius: number) => celsius * (9.0 / 5.0) + 32.0;
const fahrenheitToCelsius = (fahrenheit: number) => (fahrenheit - 32.0) * (5.0 / 9.0)

export default function TemperatureConverter() {
  const [celsius, setCelsius] = useState('');
  const [fahrenheit, setFahrenheit] = useState('');

  const onCelsiusChange = (event: ChangeEvent<HTMLInputElement>) => {
    handleChange(event, (temp) => {
      setCelsius(`${temp}`)
      setFahrenheit(`${(celsiusToFahrenheit(temp))}`)
    })
  }

  const onFahrenheitChange = (event: ChangeEvent<HTMLInputElement>) => {
    handleChange(event, (temp) => {
      setFahrenheit(`${temp}`)
      setCelsius(`${(fahrenheitToCelsius(temp))}`)
    })
  }

  const handleChange = (event: ChangeEvent<HTMLInputElement>, changeHandler: (input: number) => void) => {
    event.preventDefault()
    const input = event.target.value;
    if (input === '') {
      resetFields()
      return
    }

    const inputTemp = parseFloat(input)
    if (isNaN(inputTemp)) { return }

    changeHandler(inputTemp)
  }

  const resetFields = () => {
    setCelsius('')
    setFahrenheit('')
  }

  return (
    <div>
      <div className={"mb-4"}>
        <label htmlFor="celsius">celsius</label>
        <input
          id="celsius"
          value={celsius}
          onChange={onCelsiusChange}
          className="block w-full p-4 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-base focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          data-testid='celsius'
        />
      </div>

      <div>
        <label htmlFor="fahrenheit">fahrenheit</label>
        <input
          id="fahrenheit"
          value={fahrenheit}
          onChange={onFahrenheitChange}
          className="block w-full p-4 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-base focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          data-testid='fahrenheit'
        />
      </div>
    </div>
  )
}

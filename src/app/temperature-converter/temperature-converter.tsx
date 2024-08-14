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
    <div className='card'>
      <div className='flex justify-between align-middle'>
        <div>
          <input
            id="celsius"
            value={celsius}
            onChange={onCelsiusChange}
            className="p-2 text-gray-900 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
            data-testid='celsius'
          />
          <label className='ml-2' htmlFor="celsius">celsius</label>
        </div>

        <div>
          <input
            id="fahrenheit"
            value={fahrenheit}
            onChange={onFahrenheitChange}
            className="p-2 text-gray-900 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
            data-testid='fahrenheit'
          />
          <label className='ml-2' htmlFor="fahrenheit">fahrenheit</label>
        </div>
      </div>
    </div>
  )
}

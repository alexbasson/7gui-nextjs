'use client'

import {ChangeEvent, useState} from "react";

export default function Timer() {
  const interval = 10

  const startTimer = (): number => {
    setTimeout(() => {
      if(elapsedTime < duration) {
        setElapsedTime(elapsedTime + interval)
      }
    }, interval)
    return 0
  }

  const [elapsedTime, setElapsedTime] = useState(startTimer())
  const [duration, setDuration] = useState(50000)

  const handleDurationChange = (event: ChangeEvent<HTMLInputElement>) => {
    event.preventDefault()

    setDuration(parseInt(event.target.value) ?? 50000)
  }

  const handleReset = () => {
    setElapsedTime(0)
  }

  const formatTime = (time: number): string => {
    return (time / 1000).toFixed(1)
  }

  return (
    <div className='w-1/12 bg-gray-200 p-4'>
      <div className='mb-4'>
        <progress className='bg-blue-500 w-full h-8' value={elapsedTime / duration}></progress>
      </div>

      <div className='mb-4'>
        <p>Duration: {formatTime(duration)} s</p>
        <p>Elapsed time: {formatTime(elapsedTime)} s</p>
      </div>

      <div className='mb-4'>
        <input className='w-full' value={duration} onChange={handleDurationChange} type='range' min='0' max='100000'/>
      </div>

      <div>
      <button className='bg-blue-500 text-white w-full rounded px-4 py-2' onClick={handleReset}>Reset</button>
      </div>
    </div>
  )
}

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
    <div>
      <progress value={elapsedTime / duration} style={{height: '30px'}}></progress>

      <div>
        <p>Duration: {formatTime(duration)} s</p>
        <p>Elapsed time: {formatTime(elapsedTime)} s</p>
      </div>

      <div>
        <input value={duration} onChange={handleDurationChange} type='range' min='0' max='100000'/>
      </div>

      <div>
      <button onClick={handleReset}>Reset</button>
      </div>
    </div>
  )
}

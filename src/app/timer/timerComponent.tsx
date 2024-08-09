'use client'

import {ChangeEvent, useState} from "react";
import { Timer } from '@/lib/timer'

type TimerProps = {
  timer: Timer,
  interval: number,
  defaultDuration: number,
}

export default function TimerComponent({ timer, interval, defaultDuration }: TimerProps) {
  const [elapsedTime, setElapsedTime] = useState<number>(0)
  const [duration, setDuration] = useState<number>(defaultDuration)

  const startTimer = () => {
    timer.setTimeout(() => {
      if (elapsedTime < duration) {
        setElapsedTime(elapsedTime + interval)
      }
    }, interval)
  }

  startTimer()

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
    <div className='w-1/2 bg-gray-200 p-4'>
      <div className='mb-4'>
        <progress data-testid='progress-bar' className='bg-blue-500 w-full h-8' value={elapsedTime / duration}></progress>
      </div>

      <div className='mb-4'>
        <p data-testid='duration'>Duration: {formatTime(duration)}s</p>
        <p data-testid='elapsed-time'>Elapsed time: {formatTime(elapsedTime)}s</p>
      </div>

      <div className='mb-4'>
        <input data-testid='slider' className='w-full' value={duration} onChange={handleDurationChange} type='range' min='0' max='60000'/>
      </div>

      <div>
        <button className='bg-blue-500 text-white w-full rounded px-4 py-2' onClick={handleReset}>Reset</button>
      </div>
    </div>
  )
}

'use client'

import {useState} from "react";

export default function Counter() {
  const [count, setCount] = useState(0);

  const handleClick = () => {
    setCount(count + 1);
  }

  return (
    <div className='w-1/12 bg-gray-200 p-4'>
      <div>
        <p className='mb-4' data-testid="label">Count: {count}</p>
      </div>

      <div>
        <button className='bg-blue-500 text-white w-full rounded px-4 py-2' onClick={handleClick}>Count</button>
      </div>
    </div>
  )
}

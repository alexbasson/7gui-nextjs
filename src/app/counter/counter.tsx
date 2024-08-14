'use client'

import {useState} from "react";

export default function Counter() {
  const [count, setCount] = useState(0);

  const handleClick = () => {
    setCount(count + 1);
  }

  return (
    <div className='w-1/2 card'>
      <div>
        <p className='mb-4' data-testid="label">Count: {count}</p>
      </div>

      <div>
        <button className='w-full btn' onClick={handleClick}>Count</button>
      </div>
    </div>
  )
}

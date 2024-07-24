'use client'

import {useState} from "react";

export default function Counter() {
  const [count, setCount] = useState(0);

  const handleClick = () => {
    setCount(count + 1);
  }

  return (
    <div>
      <p data-testid="label">{count}</p>

      <button onClick={handleClick}>Count</button>
    </div>
  )
}

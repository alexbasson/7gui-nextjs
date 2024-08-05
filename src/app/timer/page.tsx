'use client'

import TimerComponent from "@/app/timer/timerComponent";
import { RealTimer} from "@/lib/timer";

export default function Page() {
  const timer = new RealTimer()

  return (
    <div>
      <TimerComponent timer={timer} interval={10} defaultDuration={30000} />
    </div>
  )
}

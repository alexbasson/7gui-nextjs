import {render, screen, fireEvent} from '@testing-library/react';
import TimerComponent from "@/app/timer/timerComponent";
import {Timer} from "@/lib/timer";
import {act} from "react";

describe('TimerComponent', () => {
  let mockTimer: MockTimer
  const defaultDuration = 1000
  const interval = 100

  let progressBar: HTMLProgressElement
  let durationLabel: HTMLElement
  let elapsedLabel: HTMLElement
  let durationSlider: HTMLInputElement
  let resetButton: HTMLButtonElement

  beforeEach(() => {
    mockTimer = new MockTimer()

    render(<TimerComponent timer={mockTimer} interval={interval} defaultDuration={defaultDuration} />);

    progressBar = screen.getByTestId('progress-bar')
    durationLabel = screen.getByTestId('duration')
    elapsedLabel = screen.getByTestId('elapsed-time')
    durationSlider = screen.getByTestId("slider")
    resetButton = screen.getByRole('button')
  })

  describe('upon initialization', () => {
    it('sets the initial duration to the defaultDuration seconds', () => {
      expect(durationLabel.innerHTML).toContain('1.0s')
      const sliderAttributes = durationSlider.attributes
      expect(sliderAttributes.getNamedItem('min')?.value).toBe('0')
      expect(sliderAttributes.getNamedItem('max')?.value).toBe('60000')
      expect(durationSlider.value).toEqual(`${defaultDuration}`)
    })

    it('sets the elapsed time to zero', () => {
      expect(elapsedLabel.innerHTML).toContain('0.0s')
    })

    it("sets the progress bar's width to 0%", () => {
      expect(progressBar.value).toBe(0)
    })
  })

  describe('when the timer increments the interval', () => {
    it('updates the elapsed time', async () => {
      await mockTimer.tickInterval(10)

      expect(elapsedLabel.innerHTML).toContain('1.0s')
    })

    it('updates the progress bar', async () => {
      await mockTimer.tickInterval(2)
      expect(progressBar.value).toBe(0.2)

      await mockTimer.tickInterval(4)
      expect(progressBar.value).toBe(0.6)

      await mockTimer.tickInterval(3)
      expect(progressBar.value).toBe(0.9)

      await mockTimer.tickInterval(1)
      expect(progressBar.value).toBe(1)
    })
  })

  describe('when the elapsed time reaches the set duration', () => {
    it('stops updating the elapsed time', async () => {
      expect(progressBar.value).toBe(0)

      await mockTimer.tickInterval(5)
      expect(progressBar.value).toBe(0.5)

      await mockTimer.tickInterval(5)
      expect(progressBar.value).toBe(1)

      await mockTimer.tickInterval(1)
      expect(progressBar.value).toBe(1)
    })
  })

  describe('when the user changes the duration slider', () => {
    beforeEach(async () => {
      await mockTimer.tickInterval(5)
      expect(progressBar.value).toBe(0.5)
      expect(elapsedLabel.innerHTML).toContain('0.5s')
    })

    it('updates the duration label', async () => {
      await fireEvent.change(durationSlider, {target: {value: '5000' }})

      expect(durationLabel.innerHTML).toContain('5.0s')
    })

    it('updates the progress bar', async () => {
      await fireEvent.change(durationSlider, {target: {value: '5000' }})

      expect(progressBar.value).toBe(0.1)
    })
  })

  describe("when the user clicks the 'reset' button", () => {
    beforeEach(async () => {
      await mockTimer.tickInterval(5)
      expect(progressBar.value).toBe(0.5)
      expect(elapsedLabel.innerHTML).toContain('0.5s')

      await fireEvent.click(resetButton)
    })

    it('resets the elapsed time to zero', () => {
      expect(elapsedLabel.innerHTML).toContain('0.0s')
    })

    it('resets the progress bar', () => {
      expect(progressBar.value).toBe(0)
    })
  })
})

class MockTimer implements Timer {
  public handler: Function = () => {}

  setInterval(handler: Function, timeout?: number): number {
    this.handler = handler
    return 0
  }

  setTimeout(handler: Function, timeout?: number): number {
    this.handler = handler
    return 0
  };

  tickInterval(times: number = 1): Promise<void> {
    return new Promise<void>(async (resolve) => {
      for (let i = 0; i < times; i++) {
        await act (async () => this.handler())
      }
      resolve()
    })
  }
}

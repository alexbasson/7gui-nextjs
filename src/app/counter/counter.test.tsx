import {fireEvent, render, screen} from "@testing-library/react";
import Counter from "@/app/counter/counter";

describe('Counter', () => {
  beforeEach(() => {
    render(<Counter />)
  })

  describe('when the button is clicked', () => {
    it('increments the counter', () => {
      const label = screen.getByTestId('label')
      expect(label.textContent).toContain('0')

      const button = screen.getByText('Count')
      fireEvent.click(button);

      expect(label.textContent).toContain('1')
    })
  })
})

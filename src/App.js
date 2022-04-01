import logo from './logo.svg'
import './App.css'
import { useState } from 'react'

export const replaceCamelWithSpace = (colorName) => {
  return colorName.replace(/\B([A-Z])\B/g, ' $1')
}

function App() {
  const [buttonColor, setButtonColor] = useState('MediumVioletRed')
  const newButtonColor =
    buttonColor === 'MediumVioletRed' ? 'MidnightBlue' : 'MediumVioletRed'
  const [isChecked, setIsChecked] = useState(false)
  return (
    <div>
      <button
        style={{ backgroundColor: isChecked ? 'gray' : buttonColor }}
        onClick={() => setButtonColor(newButtonColor)}
        disabled={isChecked}
      >
        Change to {replaceCamelWithSpace(newButtonColor)}
      </button>
      <input
        type='checkbox'
        id='disable-button-checkbox'
        aria-checked={isChecked}
        defaultChecked={isChecked}
        onChange={(event) => setIsChecked(event.target.checked)}
      />
      <label htmlFor='disable-button-checkbox'>Disable button</label>
    </div>
  )
}

export default App

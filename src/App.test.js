import { render, screen, fireEvent } from '@testing-library/react'
import App from './App'
import { replaceCamelWithSpace } from './App'

test('button has correct initial color', () => {
  render(<App />)

  // find an element with a role of button and text of 'Change to blue'
  const colorButton = screen.getByRole('button', {
    name: 'Change to Midnight Blue',
  })

  //expect the background color to be red
  expect(colorButton).toHaveStyle({ backgroundColor: 'MediumVioletRed' })

  //click button
  fireEvent.click(colorButton)

  //expect the background color to be blue
  expect(colorButton).toHaveStyle({ backgroundColor: 'MidnightBlue' })

  //expect the button text to be 'Change to red'
  expect(colorButton.textContent).toBe('Change to Medium Violet Red')
})

test('initial conditions', () => {
  render(<App />)
  // check that the button starts out enabled
  const colorButton = screen.getByRole('button', {
    name: 'Change to Midnight Blue',
  })
  expect(colorButton).toBeEnabled()

  //check that the checkbox starts our unchecked
  const checkbox = screen.getByRole('checkbox')
  expect(checkbox).not.toBeChecked()
})

test('checkbox toggles button disable state', () => {
  render(<App />)

  const checkbox = screen.getByRole('checkbox', {
    name: 'Disable button',
  })
  fireEvent.click(checkbox)

  const colorButton = screen.getByRole('button', {
    name: 'Change to Midnight Blue',
  })

  //check if the button gets disabled when the checkbox is clicked
  expect(colorButton).toBeDisabled()

  fireEvent.click(checkbox)
  expect(colorButton).toBeEnabled()
})

test('change color to gray when disabled', () => {
  // disable the button
  render(<App />)
  const colorButton = screen.getByRole('button', {
    name: 'Change to Midnight Blue',
  })
  const checkbox = screen.getByRole('checkbox', { name: 'Disable button' })

  fireEvent.click(checkbox)
  //check the button is grey when disabled
  expect(colorButton).toHaveStyle({ backgroundColor: 'gray' })

  //check if the color is red when the button is enabled
  fireEvent.click(checkbox)
  expect(colorButton).toHaveStyle({ backgroundColor: 'MediumVioletRed' })

  //check if the color changed when button is clicked
  fireEvent.click(colorButton)
  expect(colorButton).toHaveStyle({ backgroundColor: 'MidnightBlue' })

  //check if the button gets disabled and color is gray
  fireEvent.click(checkbox)
  expect(colorButton).toHaveStyle({ backgroundColor: 'gray' })

  fireEvent.click(checkbox)
  expect(colorButton).toHaveStyle({ backgroundColor: 'MidnightBlue' })
})

describe('spaces before camel-case capital letter', () => {
  test('works for no inner capital letters', () => {
    expect(replaceCamelWithSpace('Red')).toBe('Red')
  })

  test('works for one inner capital letter', () => {
    expect(replaceCamelWithSpace('MidnightBlue')).toBe('Midnight Blue')
  })

  test('works for multiple inner capital letters', () => {
    expect(replaceCamelWithSpace('MediumVioletRed')).toBe('Medium Violet Red')
  })
})

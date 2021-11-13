import React from 'react'
// -----------------------------------------------------------------------------
import { Container, MinusButton, PlusButton, Input, NumberIcon } from './styles'

export default function NumberInput({ numberInputValue, setNumberInputValue }) {
  function handleMinus() {
    if (numberInputValue === 0) {
      return
    }
    else {
      let minus = parseInt(numberInputValue) - 1
      setNumberInputValue(minus)
    }

  }

  function handlePlus() {
    if (numberInputValue === 10) {
      return
    }
    else {
      let plus = parseInt(numberInputValue) + 1
      setNumberInputValue(plus)
    }
  }
  // ---------------------------------------------------------------------------
  return (
    <Container>
      <MinusButton onPress={handleMinus}>
        <NumberIcon name="minus-circle"/>
      </MinusButton>
      <Input
        value={numberInputValue}
        onChangeText={setNumberInputValue}

      >{numberInputValue}</Input>
      <PlusButton onPress={handlePlus}>
        <NumberIcon name="plus-circle"/>
      </PlusButton>
    </Container>
  )
}

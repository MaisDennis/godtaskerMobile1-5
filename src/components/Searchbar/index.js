import React from 'react'
import { Container, SearchBarTextInput } from './styles';

export default function SearchBar({ data }) {
  // console.log(data)

  return (
    <Container>
      <SearchBarTextInput
        placeholder='Search'
      />
    </Container>
  )
}

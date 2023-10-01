import React from 'react'
import { Container, Row } from 'reactstrap'
import "../../styles/common-section.css"
const Commonsection = ({title}) => {
  return (
    <div className='common__section'>
      <Container className='text-center'>
        <h1>{title}</h1>
      </Container>
    </div>
  )
}

export default Commonsection

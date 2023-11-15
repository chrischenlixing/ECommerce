import React from 'react'
import {Col, Row, Container} from 'react-bootstrap'

function Footer() {
  return (
    <footer>
        <Container>
            <Row>
                <Col className='text-center py-3'>Copyright &copy; ProShop</Col>
            </Row>
        </Container>
    </footer>
  )
}

export default Footer
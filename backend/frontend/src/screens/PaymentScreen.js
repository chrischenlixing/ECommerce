
import React, { useState, useEffect } from "react";
import { Link, redirect } from "react-router-dom";
import { Form, Button, Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { register } from "../actions/userActions";
import FormContainer from "../components/FormContainer";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import {saveShippingAddress} from '../actions/cartActions'
import CheckoutSteps from "../components/CheckoutSteps";
import {savePaymentMethod} from '../actions/cartActions'

function PaymentScreen() {

    const cart = useSelector(state => state.cart)
    const {shippingAddress} = cart

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const [paymentMethod, setPaymentMethods] = useState('PayPal')

    if (!shippingAddress.address){
        navigate('/shipping')
    }

    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(savePaymentMethod(paymentMethod))
        navigate('/placeorder')
    }

  return (
    <FormContainer>
        <CheckoutSteps step1 step2 step3 /> 

        <Form onSubmit = {submitHandler}>
            <Form.Group>
                <Form.Label as = 'legend'>
                    Select Method
                </Form.Label>
                <Col>
                <Form.Check type = 'radio' label ='PayPal or Credit Card' id ='paypal' name = 'paymentMethod' checked onChange={(e) => setPaymentMethods(e.target.value)}>

                </Form.Check>
                </Col>
            </Form.Group>
            <Button type="submit" variant="primary">
                Continue
            </Button>
        </Form>
    </FormContainer>
  )
}

export default PaymentScreen
import React, { useState, useEffect } from "react";
import { Link, NavigationType, redirect } from "react-router-dom";
import {
  Form,
  Button,
  Row,
  Col,
  Image,
  Card,
  ListGroup,
} from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { register } from "../actions/userActions";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import { saveShippingAddress } from "../actions/cartActions";
import CheckoutSteps from "../components/CheckoutSteps";
import Message from "../components/Message";
import {createOrder} from '../actions/orderActions'
import { ORDER_CREATE_RESET } from "../constants/orderConstants";

function PlaceOrderScreen() {

  const orderCreate = useSelector(state => state.orderCreate) 
  const {order,error, success} = orderCreate

  const cart = useSelector((state) => state.cart);

  cart.itemsPrice = cart.cartItems.reduce((acc,item) => acc + item.price * item.qty, 0).toFixed(2)
  cart.shippingPrice = (cart.itemsPrice > 100 ? 0: 10).toFixed(2)
  cart.taxPrice = Number((0.082) * cart.itemsPrice).toFixed(2)
  cart.totalPrice = (Number(cart.itemsPrice) + Number(cart.shippingPrice) + Number(cart.taxPrice)).toFixed(2)

  const dispatch = useDispatch()
  const placeOrder = () => {
    dispatch(createOrder({
        orderItems : cart.cartItems,
        shippingAddress : cart.shippingAddress,
        paymentMethod : cart.paymentMethod,
        itemsPrice : cart.itemsPrice,
        shippingPrice : cart.shippingPrice,
        taxPrice : cart.taxPrice,
        totalPrice : cart.totalPrice
    }))
  }

  const navigate = useNavigate()

  useEffect(() => {
    if (!cart.paymentMethod) {
      navigate('/payment');
    }
  
    if (success) {
      navigate(`/order/${order._id}`);
      dispatch({ type: ORDER_CREATE_RESET })
    }
  }, [cart.paymentMethod, navigate, success, order, dispatch]);

  return (
    <div>
      <CheckoutSteps step1 step2 step3 step4></CheckoutSteps>
      <Row>
        <Col md={8}>
          <ListGroup variant="flush">
            <ListGroup.Item>
              <h2>Shipping</h2>
              <p>
                <strong>Shipping: </strong>
                {cart.shippingAddress.address}, {cart.shippingAddress.city}{" "}
                {cart.shippingAddress.postalCode},{" "}
                {cart.shippingAddress.country},
              </p>
            </ListGroup.Item>
        </ListGroup>
          <ListGroup variant="flush">
            <ListGroup.Item>
              <h2>Payment Method</h2>
              <p>{cart.paymentMethod}</p>
            </ListGroup.Item>
        </ListGroup>
        <ListGroup>
          <ListGroup.Item>
            <h2>Order Items</h2>
            {cart.cartItems.length === 0 ? (
              <Message variant="info">Your cart is empty</Message>
            ) : (
              <ListGroup variant="flush">
                {cart.cartItems.map((item,index) => (
                    <ListGroup.Item key ={index}>
                        <Row>
                            <Col md = {1}>
                            <Image src={item.image} alt = {item.name} fluid rounded/>
                            </Col>
                            <Col>
                            <Link to =  {`/product/${item.product}`}> {item.name} </Link>
                            </Col>
                            <Col md = {4}>
                                {item.qty} * $ {item.price} = $ {(item.qty * item.price).toFixed(2)}
                            </Col>
                        </Row>
                    </ListGroup.Item>
                ))}
              </ListGroup>
            )}
          </ListGroup.Item>
          </ListGroup>
          </Col>
          <Col md = {4}>
            <Card>
                <ListGroup variant="flush">
                    <ListGroup.Item>
                        <h2>Order Summary</h2>
                    </ListGroup.Item>
                    <ListGroup.Item>
                        <Row>
                            <Col>Items:</Col>
                            <Col>${cart.itemsPrice}</Col>
                        </Row>
                    </ListGroup.Item>
                    <ListGroup.Item>
                        <Row>
                            <Col>Shipping:</Col>
                            <Col>${cart.shippingPrice}</Col>
                        </Row>
                    </ListGroup.Item>
                    <ListGroup.Item>
                        <Row>
                            <Col>Tax:</Col>
                            <Col>${cart.taxPrice}</Col>
                        </Row>
                    </ListGroup.Item>
                    <ListGroup.Item>
                        <Row>
                            <Col>Total:</Col>
                            <Col>${cart.totalPrice}</Col>
                        </Row>
                    </ListGroup.Item>

                    <ListGroup.Item>
                        {error && <Message variant ='danger'>{error}</Message>}
                    </ListGroup.Item>

                    <ListGroup.Item>
                        <Button type = 'button' className="btn-block" disabled = {cart.cartItems === 0} onClick={placeOrder}>
                            Place Order
                        </Button>
                    </ListGroup.Item>
                </ListGroup>
            </Card>
          </Col>
      </Row>
    </div>
  );
}

export default PlaceOrderScreen;

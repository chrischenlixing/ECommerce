import React, {useState,useEffect} from 'react'
import {Link, useParams} from 'react-router-dom'
import {Row,Col,Image,ListGroup,Button,Card, ListGroupItem} from 'react-bootstrap'
import Rating from '../components/Rating'
import Loader from '../components/Loader'
import Message from '../components/Message'
import { useDispatch,useSelector } from "react-redux";
import {listProductDetails} from '../actions/productActions'


function ProductScreen({match}) {

    const { id } = useParams(); 

    const dispatch = useDispatch();
    const productList = useSelector((state) => state.productDetails);
    const { product, loading, error } = productList;

    useEffect(() => {
        dispatch(listProductDetails(id)); 
    }, [dispatch, id]); 


  return (
    <div>
        <Link to='/' className = 'btn btn-light my-3'>Go Back</Link>
        {loading? 
            <Loader/>
            : error 
            ? <Message variant={'danger'}>{error}</Message>
            :(
            <Row>
            <Col md={6}>
                <Image src={product.image} alt={product.name} fluid/>
            </Col>

            <Col md={3}>
                <ListGroup variant = "flush">

                    <ListGroup.Item>
                        <h3>{product.name}</h3>
                    </ListGroup.Item>

                    <ListGroup.Item>
                        <Rating value = {product.rating} text={`${product.numReviews} reviews`} color={'#f8e825'}></Rating>
                    </ListGroup.Item>

                    <ListGroup.Item>
                       Price: ${product.price}
                    </ListGroup.Item>

                    <ListGroup.Item>
                        Description: {product.description}
                    </ListGroup.Item>

                </ListGroup>
            </Col>

            <Col md={3}>
                <Card>
                    <ListGroup variant='flush'>
                        <ListGroup.Item>
                            <Row>
                                <Col>Price: </Col>
                                <Col><strong>${product.price}</strong> </Col>
                            </Row>
                        </ListGroup.Item>

                        <ListGroup.Item>
                            <Row>
                                <Col>Status: </Col>
                                <Col> {product.countInStock > 0 ? 'In Stock' : 'Out of Stock'} </Col>
                            </Row>
                        </ListGroup.Item>


                        <ListGroup.Item>
                            <Button className='btn-block' disabled= {product.countInStock===0} type='button'>Add to Cart</Button>
                        </ListGroup.Item>

                    </ListGroup>
                </Card>
            </Col>
        </Row>
            )
        }
 
    </div>
  )
}

export default ProductScreen
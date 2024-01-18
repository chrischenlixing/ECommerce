import React, {useEffect} from "react";
import { useDispatch,useSelector } from "react-redux";
import {Row,Col} from 'react-bootstrap'
import Product from '../components/Product'
import Loader from '../components/Loader'
import Message from '../components/Message'
import {listProducts} from '../actions/productActions'
import { useLocation } from "react-router-dom";
import Paginate from "../components/Paginate";
import ProductCarousel from "../components/ProductCarousel";


function HomeScreen() {

    const dispatch = useDispatch()
    const productList = useSelector(state => state.productList)
    const {products,loading,error,pages} = productList

    const location = useLocation()
    const keyword = new URLSearchParams(location.search).get('keyword')
    const page = new URLSearchParams(location.search).get('page')

    useEffect(()=>{
        dispatch(listProducts(keyword,page))
    },[dispatch, keyword, page])


return <div>
    {!keyword && <ProductCarousel/>}
      <h1>Latest Products</h1>
      {loading ? <Loader/>
          : error ? <Message variant='danger'>{error}</Message> 
          :
          <div>
            <Row>
              {products.map(product => (
                  <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                    <Product product={product} />
                  </Col>
              ))}
            </Row>
 
            <Paginate page={page} pages={pages} />
 
          </div>
      }
      
  </div>;
}

export default HomeScreen
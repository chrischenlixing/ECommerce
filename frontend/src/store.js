import {configureStore,combineReducers} from '@reduxjs/toolkit'
import thunk from 'redux-thunk'

import {productListReducers,productDetailsReducer, productDeleteReducer,
    productCreateReducer,
    productUpdateReducer,} from './reducers/productReducers'
import { cartReducer } from './reducers/cartReducer' 
import {userLoginReducers, userRegisterReducers,userDetailsReducers, userUpdateProfileReducers, userUpdateReducer, userDeleteReducer, userListReducer } from './reducers/userReducers'
import { orderCreateReducers, orderDetailsReducer, orderPayReducer,orderListMyReducer,orderListReducer,orderDeliverReducer } from './reducers/orderReducer'

const reducer = combineReducers({
    productList: productListReducers,
    productDetails: productDetailsReducer,
    productDelete: productDeleteReducer,
    productCreate: productCreateReducer,
    productUpdate: productUpdateReducer,
    
    cart : cartReducer,

    userLogin: userLoginReducers,
    userRegister:userRegisterReducers,
    userDetails:userDetailsReducers,
    userUpdateProfile: userUpdateProfileReducers,
    userList: userListReducer,
    userDelete: userDeleteReducer,
    userUpdate: userUpdateReducer,

    orderCreate :orderCreateReducers,
    orderDetails: orderDetailsReducer,
    orderPay : orderPayReducer,
    orderListMy: orderListMyReducer,
    orderList: orderListReducer,
    orderDeliver: orderDeliverReducer,
})

const cartItemsFromStorage = localStorage.getItem('cartItems') ?
    JSON.parse(localStorage.getItem('cartItems')) : []

const userInfoFromStorage = localStorage.getItem('userInfo') ?
    JSON.parse(localStorage.getItem('userInfo')) : null


const shippingAddressFromStorage = localStorage.getItem('shippingAddress') ?
    JSON.parse(localStorage.getItem('shippingAddress')) : {}

const initialState = {
    cart:{cartItems : cartItemsFromStorage, shippingAddress: shippingAddressFromStorage},
    userLogin:{userInfo : userInfoFromStorage},
}
const middleware = [thunk]

const store = configureStore({reducer: reducer,
    preloadedState: initialState,
    middleware: middleware,})

export default store
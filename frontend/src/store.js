import {configureStore,combineReducers} from '@reduxjs/toolkit'
import thunk from 'redux-thunk'

import {productListReducers,productDetailsReducer} from './reducers/productReducers'
import { cartReducer } from './reducers/cartReducer' 
import {userLoginReducers, userRegisterReducers,userDetailsReducers, userUpdateProfileReducers} from './reducers/userReducers'

const reducer = combineReducers({
    productList: productListReducers,
    productDetails: productDetailsReducer,
    cart : cartReducer,
    userLogin: userLoginReducers,
    userRegister:userRegisterReducers,
    userDetails:userDetailsReducers,
    userUpdateProfile: userUpdateProfileReducers
})

const cartItemsFromStorage = localStorage.getItem('cartItems') ?
    JSON.parse(localStorage.getItem('cartItems')) : []

const userInfoFromStorage = localStorage.getItem('userInfo') ?
    JSON.parse(localStorage.getItem('userInfo')) : null

const initialState = {
    cart:{cartItems : cartItemsFromStorage},
    userLogin:{userInfo : userInfoFromStorage}
}
const middleware = [thunk]

const store = configureStore({reducer: reducer,
    preloadedState: initialState,
    middleware: middleware,})

export default store
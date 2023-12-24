import {configureStore,combineReducers,applyMiddleware} from '@reduxjs/toolkit'
import thunk from 'redux-thunk'
import {composeWithDevTools} from 'redux-devtools-extension'
import {productListReducers,productDetailsReducer} from './reducers/productReducers'
import { cartReducer } from './reducers/cartReducer' 

const reducer = combineReducers({
    productList: productListReducers,
    productDetails: productDetailsReducer,
    cart : cartReducer,
})

const cartItemsFromStorage = localStorage.getItem('cartItems') ?
    JSON.parse(localStorage.getItem('cartItems')) : []

const initialState = {
    cart:{cartItems : cartItemsFromStorage}
}
const middleware = [thunk]

const store = configureStore({reducer: reducer,
    preloadedState: initialState,
    middleware: middleware,})

export default store
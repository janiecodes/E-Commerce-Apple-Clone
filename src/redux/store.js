import {createStore, applyMiddleware, combineReducers} from 'redux'
import promiseMiddleware from 'redux-promise-middleware'
import userReducer from './userReducer'
import cartReducer from './cartReducer'

const rootReducer = combineReducers({
    cart: cartReducer,
    user: userReducer
})

export default createStore(rootReducer, applyMiddleware(promiseMiddleware))
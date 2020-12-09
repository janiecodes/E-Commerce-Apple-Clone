import axios from 'axios';

const initialState = {
    cart_id: '',
    cart: []
}

const GET_CART = "GET_CART";

export function getCart(){
    const cart = axios.get('/api/cart/me')
    .then(cart => cart.data)
    return {
        type: GET_CART,
        payload: cart
    }
}

export default function reducer(state = initialState, action) {
    switch(action.type){
        case GET_CART + '_PENDING':
            return {...state}
        case GET_CART + '_FULFILLED': 
            return {...state, cart_id: action.payload.cart_id, cart: action.payload}
        case GET_CART + '_REJECTED':
            return initialState
        default:
            return state;
    }
}
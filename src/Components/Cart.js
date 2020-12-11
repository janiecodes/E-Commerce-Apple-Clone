
import {connect} from 'react-redux';
import {useEffect, useState} from "react";
import {getCart} from '../redux/cartReducer'
import axios from 'axios'
import CartItem from './CartItem'
import { loadStripe } from '@stripe/stripe-js';
const stripePromise = loadStripe('pk_test_51Hu6saEuoNMZwXdg2IHpYwpNq2nWbQytc2XpNbbzTgMOxQMVziy2UJAY2Mnr9j9jmFmyLRyXmT145oQHNX3W669c00P23o2TAW')


const Cart = (props) => {

    // const [quantity, setQuantity] = useState(1)
    const [cart, setCart] = useState([])
    // const [toggle, setToggle] = useState(false)
    const [cartTotal, setCartTotal] = useState(0)
    
    const total = () => {
        let totalVal = 0; 
        for (let i = 0; i < props.cart.cart.length; i ++){
            totalVal += props.cart.cart[i].product_price * props.cart.cart[i].quantity
        }
        setCartTotal(totalVal)  
    }
        const handleClick = async (event) => {
            // Get Stripe.js instance
            const stripe = await stripePromise;
        
            // Call your backend to create the Checkout Session
            const response = await fetch('/api/checkout', { method: 'POST' });
        
            const session = await response.json();
        
            // When the customer clicks on the button, redirect them to Checkout.
            const result = await stripe.redirectToCheckout({
              sessionId: session.id,
            });
        
            if (result.error) {
              // If `redirectToCheckout` fails due to a browser or network
              // error, display the localized error message to your customer
              // using `result.error.message`.
            }
          };

    const editQuantity = async (product_id, quantity) => {
            console.log(quantity)
            console.log(product_id)
        try {
            await axios.put(`/api/cart/product/${product_id}`, {quantity}
        )
        props.getCart()
        } catch(error){
            console.log(error)
        }
    }

    const deleteProduct = async (productId) => {
        try {
        const cart = await axios.delete(`/api/cart/product/${productId}`)
        setCart(cart.data)
        props.getCart()
        }catch(error){
            console.log(error)
        }
    }

    useEffect(() => {
        props.getCart()
        total()
    }, [JSON.stringify(props.cart.cart)])

    const mappedCart = props.cart.cart.map((product) => {
        return <CartItem 
                // key={product.product_id} 
                product={product}
                deleteProduct={deleteProduct}
                editQuantity={editQuantity}
                />
    })

    
    return (
        <div className='cart-component'>
            <h1 className='cart-review-text'>Review your bag.</h1>
            <h4 className='cart-return-text'>Free delivery and free returns.</h4>
            <ul style={{listStyle:'none'}}>{mappedCart}</ul>
            <div className='cart-total'>
                <div className='cart-total-text'>Total:</div> 
                <div className='cart-total-number'> ${cartTotal}</div>
            </div>
            <div className="stripeCheckout">
                  <button className="stripeCheckout-button" onClick={handleClick} role='link'>Checkout</button>
            </div>

        </div>
    )
}

const mapStateToProps = (state) => state;
export default connect(mapStateToProps, {getCart})(Cart)



// {toggle ? 
//     <ul style={{listStyle:'none'}}>
//     {[...Array(3).keys()].map(quantity => (
//       <li className='edit-quantity-dropdown' key={`input: ${quantity}`}>
//         <input type="button" value={quantity + 1} onClick={() => editQuantity(product.product_id)} className="dropdown-item" />
//       </li>
//     ))}
//     </ul>
// : null }

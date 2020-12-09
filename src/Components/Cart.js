
import {connect} from 'react-redux';
import {useEffect, useState} from "react";
import {getCart} from '../redux/cartReducer'
import axios from 'axios'
import CartItem from './CartItem'
import {Link} from 'react-router-dom';
import StripeCheckout from 'react-stripe-checkout';
import OrderComplete from './OrderComplete'



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

    // function quantityDropdown(){
    //     setToggle(!toggle)
    // }

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
        console.log("DELETE")
    }

    useEffect(() => {
        console.log('HIT')
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

    const onToken = (token) => {
        console.log(token);
        console.log(props.cartTotal)
        token.card = void 0;
        axios.post('/api/checkout', { token, price: (props.cartTotal)})
        .then(response => {
          alert('Transaction Successful')
        }).catch( (err)=> console.log(err))
      }
    // const mappedCart = props.cart.cart.map((product, index) => {
    //     return (
            
    //     <div className='cart-product-info'>
    
    //         <h1 key={product.product_name}>{product.product_name}</h1> 
    //         <h2>{product.product_color}</h2>
    //         <div className='quantity-dropdown'>
    //             <button onClick={quantityDropdown} className='dropdown-btn' type='button'>{product.quantity}</button>
    //             {toggle ? 
    //             <ul style={{listStyle:'none'}}>
    //             {[...Array(3).keys()].map(quantity => (
    //               <li className='edit-quantity-dropdown' key={`input: ${quantity}`}>
    //                 <input type="button" value={quantity + 1} onClick={() => editQuantity(product.product_id)} className="dropdown-item" />
    //               </li>
    //             ))}
    //             </ul>
    //             : null }
    //         </div>
            
            

    //         <h2>{product.product_price}</h2>
    //         <button onClick={() => deleteProduct(product.product_id)}>Remove</button>
    //     </div>
    //     )
    
    // })

    // const total = mappedCart.reduce((a,b) => ({product.product_price: a.product.product_price + b.product.product_price}))

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
                  <Link to={'/ordercomplete'}><StripeCheckout
                    description={ "Apple Clone Demonstration" }
                    token={onToken}
                    stripeKey={ process.env.REACT_APP_PUB_KEY}
                    amount={(props.cartTotal)}
                  /></Link>
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

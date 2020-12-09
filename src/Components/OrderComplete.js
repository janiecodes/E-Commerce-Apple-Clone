import {Link} from 'react-router-dom';
const OrderComplete = (props) => {
    return (
        <section className='order-complete-component'>
            <h1>Thank you for shopping at Apple!</h1>
            <p>
               Thanks for your order! Please expect your item(s) to arrive in 7-10 business days.
            </p>
            <div><Link to={'/sms'}>For SMS updates, click here.</Link></div>
        </section>
    )
}

export default OrderComplete;
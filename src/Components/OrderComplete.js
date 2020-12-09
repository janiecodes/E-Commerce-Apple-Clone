import {Link} from 'react-router-dom';
const OrderComplete = (props) => {
    return (
        <section>
            <h1>Thank you for your order!</h1>
            <p>
                We appreciate your business!
            </p>
            <Link to={'/sms'}>Send SMS Confirmation</Link>
        </section>
    )
}

export default OrderComplete;
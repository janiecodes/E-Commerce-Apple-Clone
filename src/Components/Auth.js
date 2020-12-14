import {useState} from "react";
import {Link} from 'react-router-dom';
import {getUser} from '../redux/userReducer'
import {connect} from 'react-redux'
import axios from 'axios'
import { useHistory } from "react-router-dom";

const Auth = ({getUser}) => {
    const [state, setState] = useState({
        email: '',
        password: ''
    })

    const history = useHistory();

    const loginUser = async (e) => {
        e.preventDefault()
        const {
            email,
            password,
        } = state;

    try {
        const user = await axios.post(`auth/login`, {email, password})
        getUser(user.data)
        history.push('/')
    }catch(error){
        console.log(error)
    }
    }
    const changeHandler = e => setState({...state, [e.target.name]: e.target.value})
    return(
        <div className='auth-component'>
            <h1 className='auth-title'>Please sign in.</h1>
            
            <form className='auth-sign-in' onSubmit={(e) => loginUser(e)}>
            <input
            className='auth-input-email'
            placeholder='Apple ID'
            name='email'
            onChange={(e) => changeHandler(e)}
            />
            <input
            className='auth-input-password'
            placeholder='Password'
            input type='password'
            name='password'
            onChange={(e) => changeHandler(e)}
            />
            <section>
                <p className='auth-text'>Your Apple ID is the email address you use to sign in to iTunes, the App Store, and iCloud.</p>
            </section>
            <Link to={'/'}><button className='auth-sign-in-button' type='submit'>Sign In</button></Link>
            </form>
            <p className='auth-text-forgot'>Forgot your Apple ID or password?</p>
            <Link className='auth-registration-link' to={'/register'}>Don't have an Apple Id? Create one now.</Link>
            <div className='auth-bottom-text'>
            <p>Need some help? Chat now or call 1-800-MY-APPLE</p>
            </div>
    </div>
    )

}


const mapStateToProps = (state) => state;
export default connect(mapStateToProps, { getUser })(Auth);



//button to login - componentDidMount
// useEffect(() => {
//     props.loginUser()
// }, [])
import { useState } from "react";
import { getUser} from "../redux/userReducer";
import axios from "axios";
import { useHistory } from "react-router-dom";
import {connect} from 'react-redux'
import {Link} from 'react-router-dom';

const Register = ({getUser}) => {
  const [state, setState] = useState({
      firstName: '', 
      lastName: '', 
      country: '', 
      birthday: '', 
      email: '', 
      password: '', 
      phoneNumber: ''
})
  const history = useHistory();

  const registerUser = async (e) => {
    e.preventDefault();
    console.log('HELLO REGISTERED')
    const {
      firstName,
      lastName,
      country,
      birthday,
      email,
      password,
      phoneNumber,
    } = state;

    
    try {
      const user = await axios.post(`/auth/register`, {
        firstName,
        lastName,
        country,
        birthday,
        email,
        password,
        phoneNumber,
      });
      getUser(user.data);
      history.push("/");
    } catch (error) {
      console.log(error);
    }
  };

  const changeHandler = e => setState({...state, [e.target.name]: e.target.value})

  return (
    <div>
      <div className="register-nav-bar">
        <div className="register-nav-bar-left">
          <h3> Apple ID</h3>
        </div>
        <div className="register-nav-bar-right">
          <h6>Sign In</h6>
          <h6>Create Your Apple ID</h6>
          <h6>FAQ</h6>
        </div>
      </div>
      <div className="register-header">
        <h1 className="register-header-text">Create Your Apple ID</h1>
      </div>
      <form onSubmit={(e) => registerUser(e)}>
        <div className="register-form-text">
          <p>One Apple ID is all you need to access all Apple services.</p>
          <Link className='link-to-auth' to={'/auth' }><p>Already have an Apple ID?</p></Link>
        </div>
        <div className="register-name-input">
          <input
          className="register-first-name"
            placeholder="First name"
            onChange={(e) => changeHandler(e)}
            name='firstName'
          />
          <input
          className="register-last-name"
            placeholder="Last name"
            onChange={(e) => changeHandler(e)}
            name="lastName"
          />
        </div>
        <div className="register-country-input">
          <p className='register-country-title'>COUNTRY/REGION</p>
          <input
          className="register-USA-input"
            placeholder="United States"
            onChange={(e) => changeHandler(e)}
            name="country"
          />
          <input
          className="register-birthday-input"
            placeholder="Birthday"
            onChange={(e) => changeHandler(e)}
            name='birthday'
          />
        </div>
        <div className="register-email-password-input">
          <input
          className="register-email-input"
            placeholder="name@example.com"
            onChange={(e) => changeHandler(e)}
            name='email'
          />
          <input
          className="register-password-input"
            placeholder="Password"
            input type='password'
            onChange={(e) => changeHandler(e)}
            name='password'
          />
        </div>
        <div className="register-phone-number">
          <input
          className="register-phone-input"
            placeholder="Phone number"
            type="number"
            onChange={(e) => changeHandler(e)}
            name='phoneNumber'
          />
        </div>
        <p className='register-text'>
          Be sure to enter a phone number you can always access. It will be used
          to verify your identity any time you sign in on a new device or web
          browser. Messaging or data rates may apply.
        </p>
        <div className="register-checkbox">
          <p>Verify with:</p>
          <input className="checkbox-text-message" type="radio" />
          <p>Text message</p>
          <input className="checkbox-phone-number" type="radio" />
          <p>Phone call</p>
        </div>
        <div className='register-button-continue'>
        <button className='register-button' type='submit'>Continue</button>
        </div>
      </form>
    </div>
  );
};

const mapStateToProps = (state) => state;
export default connect(mapStateToProps, { getUser })(Register);

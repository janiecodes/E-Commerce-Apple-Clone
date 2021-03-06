import React, { useState } from 'react';
import axios from 'axios'
import { withRouter } from 'react-router-dom';


function SMS() {
  let [name, setName] = useState('')
  let [phoneNumber, setNumber] = useState('')
  let [message, setMessage] = useState('')

  async function send() {
    let res = axios.post('/api/sendSMS', { name, phoneNumber, message })
    await alert(`${name}, thank you for your order with Apple`)
    setName('')
    setNumber('')
    setMessage('')
  }

  return (
    <div style={styles.body}>
      <div style={styles.form}>
        <h1>Apple SMS Notification</h1>
        <input 
          style={styles.nameInput} 
          onChange={(e) => setName(e.target.value)} 
          type='text'
          placeholder='Full Name'
           />
           <input 
          style={styles.phoneNumber} 
          onChange={(e) => setNumber(e.target.value)} 
          type='text'
          placeholder='Phone Number'
           />
        {/* <input
          style={styles.message} 
          onChange={(e) => setMessage(e.target.value)}
          placeholder='Message'
          ></input> */}
        <button 
          style={styles.button} 
          onClick={() => send()}>Send</button>
      </div>
    </div>
  );
}

export default SMS;

const styles = {
  body: {
    background: 'white',
    height: '100vh',
    overflow: 'hidden',
    display:'flex',
    alignItems:'center',
    justifyContent:'center'
  },
  form: {
    display: 'flex',
    color: 'white',
    fontSize: 20,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    height: 500,
    background: 'lightgrey',
    width: 500,
    borderRadius:4,
    boxShadow:'2px 1px 3px 1px black',
    fontFamily:'SF Pro Text,SF Pro Icons,AOS Icons,Helvetica Neue,Helvetica,Arial,sans-serif',
  },
  nameInput: {
    height: 40,
    fontSize: 35,
    width: 350,
    border: '1px solid black',
    outline: 'none',
    fontFamily:'SF Pro Text,SF Pro Icons,AOS Icons,Helvetica Neue,Helvetica,Arial,sans-serif',
  },

  phoneNumber: {
    height: 40,
    fontSize: 35,
    width: 350,
    border: '1px solid black',
    outline: 'none',
    fontFamily:'SF Pro Text,SF Pro Icons,AOS Icons,Helvetica Neue,Helvetica,Arial,sans-serif',
  },

  message: {
    minWidth: 350,
    maxWidth: 350,
    minHeight: 300,
    maxHeight: 300,
    border: '1px solid black',
    fontSize: 35,
    outline: 'none'
  },
  button: {
    height: 45,
    width: 200,
    borderRadius:4,
    background:'#0070c9',
    color: 'white',
    fontSize: 25,
    textAlign: 'center',
    outline: 'none',
    fontFamily:'SF Pro Text,SF Pro Icons,AOS Icons,Helvetica Neue,Helvetica,Arial,sans-serif',
  }
}

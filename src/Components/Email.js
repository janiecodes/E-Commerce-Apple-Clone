import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';

class Email extends Component {
  constructor() {
    super()
    this.state = {
      name: '',
      email: '',
      title: '',
      message: '',
      image:''
    }
  }

  handleInput = (e) => {
    const { value, name } = e.target
    this.setState({ [name]: value })
  }

  handleSend = () => {
    const { name, email, message, title} = this.state
    axios.post('/api/email', { name, email, message, title}).then(res => {
      this.setState({
        name: '',
        email: '',
        title: '',
        message: '',
      })
    })
  }

  render() {
    const { name, email, message, title} = this.state
    return (
      <div style={styles.body}>
        <div style={styles.form}>
          <h1 style={styles.header}>Email Apple Support</h1>
          <input style={styles.input} placeholder='Title' type="text" name='title' value={title} onChange={this.handleInput} />
          <input style={styles.input} placeholder='Full Name' type="text" name='name' value={name} onChange={this.handleInput} />
          <input style={styles.input} placeholder='Email' type="text" name='email' value={email} onChange={this.handleInput} />
          <input style={styles.input} placeholder='Message' type="text" name='message' value={message} onChange={this.handleInput} />
         <button style={styles.button} onClick={this.handleSend}>Send</button>
        </div>
      </div>
    )
  }
}

export default Email;

const styles = {
  body:{
    background:'white',
    height:'100vh',
    display:'flex',
    alignItems:'center',
    justifyContent:'center'
  },
  form:{
    display:'flex',
    flexDirection:'column',
    background:'lightgrey',
    width:500,
    alignItems:'center',
    height:500,
    justifyContent:'space-evenly',
    borderRadius:4,
    boxShadow:'2px 1px 3px 1px black',
    fontFamily:'SF Pro Text,SF Pro Icons,AOS Icons,Helvetica Neue,Helvetica,Arial,sans-serif',
  },
  header:{
    fontSize:60,
    fontFamily: 'SF Pro Text,SF Pro Icons,AOS Icons,Helvetica Neue,Helvetica,Arial,sans-serif',
    margin:0,
    color:'white',
    letterSpacing:'0.07em',
    fontWeight:'bold',
    textAlign: 'center'
  },
  input:{
    width:450,
    height:50,
    fontSize:35,
    outline:'none',
    fontFamily:'SF Pro Text,SF Pro Icons,AOS Icons,Helvetica Neue,Helvetica,Arial,sans-serif',
  },
  button:{
    width:200,
    height:45,
    borderRadius:4,
    background:'#0070c9',
    fontSize:35,
    fontWeight:'bold',
    letterSpacing:'0.07em',
    fontFamily:'SF Pro Text,SF Pro Icons,AOS Icons,Helvetica Neue,Helvetica,Arial,sans-serif',
    color:'white',
  }
}
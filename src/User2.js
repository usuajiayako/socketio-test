import React, { Component } from 'react';
import io from "socket.io-client";

const socket = io.connect("http://localhost:3000")

class User2 extends Component {

  state = { 
    chat: [],
    user: "user2",
    message: "",
   }
 
  componentDidMount = () => {
    socket.on('message', ({ message, user }) => {
      console.log("after socket on...", message, user)
      if (this.state.chat[0] !== { message, user })
      this.setState({ chat:[{ message, user }, ...this.state.chat]})
    })
  }

  handleChange = (event) => {
    console.log("in handleChange...", event.target.value)
    this.setState({message: event.target.value})
  }

  handleSubmit = (event) => {
    event.preventDefault();
    console.log("handle submit...", this.state.message)
    socket.emit("message", { message: this.state.message, user: this.state.user })
    this.setState({ message: "" })
  }

  
  render() { 
    console.log("render...", this.state.chat)
    return (
      <div>
      <div className="chat-display2">
        {this.state.chat.map(({message, user}) =>
          <p>{`${message} sentfrom: ${user}`}</p>
        )}
      </div>
      <form onSubmit={this.handleSubmit}>
      <input type="text" onChange={this.handleChange} value={this.state.message}></input>
      <button type="submit">send</button>
      </form>
      </div> 
     );
  }
}
 
export default User2;
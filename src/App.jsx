import React, {Component} from 'react';
import MessageList from './MessageList.jsx';
import ChatBar from './ChatBar.jsx';
const uuidv4 = require('uuid/v4');

function assignRandomColor() {
  const colors = ["#4286f4", "#e541f4", "#f44141", "#67f441"];
  return colors[Math.floor(Math.random() * 3)];
}

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      messages: [],
      currentUser: "New User",
      currentUserColor: assignRandomColor(),
      connection: "",
      numUsers: 0
    }
    this.addMessage = this.addMessage.bind(this);
    this.changeName = this.changeName.bind(this);
  }

  addMessage(message) {
    let newMessage = {
      type: "postMessage",
      content: message.content,
      username: message.userName,
      currentUserColor: message.currentUserColor,
      id: uuidv4()
    }

    let newMessages = this.state.messages.concat(newMessage);
    this.setState({
      messages: newMessages
    });
    this.state.connection.send(JSON.stringify(newMessage));
  }

  addNotification(oldName, newName) {
    let newNotification = {
      type: "postNotification",
      content: `${oldName} changed their name to ${newName}`,
      id: uuidv4()
    }

    this.setState((prevState) => {
      return {messages: prevState.messages.concat(newNotification)}
    });
    this.state.connection.send(JSON.stringify(newNotification));
  }

  changeName(newName) {
    let oldName = this.state.currentUser;
    this.addNotification(oldName, newName);
    this.setState({
      currentUser: newName
    });
  }

  componentDidMount() {
    var newSocket = new WebSocket("ws://localhost:3001");
    this.setState({
      connection: newSocket
    });
  }

  render() {
    if(this.state.connection) {
      this.state.connection.onmessage = event => {
          let data = JSON.parse(event.data);
          this.setState((currentState) => {
            if(typeof data !== "number") {
              return {messages: currentState.messages.concat(data)}; 
            } else {
              return {numUsers: Number(event.data)}; 
            }
          });
      }
    }
    return (
      <div>
        <nav className="navbar">
          <a href="/" className="navbar-brand">Chatty</a>
          <span className="numUsers">{this.state.numUsers} users online</span>
        </nav>
        <MessageList messages={this.state.messages} currentUser={this.state.currentUser} currentUserColor={this.state.currentUserColor}/>
        <ChatBar currentUser={this.state.currentUser} currentUserColor={this.state.currentUserColor} addMessage={this.addMessage} changeName={this.changeName}/>
      </div>
    );
  }
}
export default App;

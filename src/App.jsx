import React, {Component} from 'react';
import MessageList from './MessageList.jsx';
import ChatBar from './ChatBar.jsx';
const uuidv4 = require('uuid/v4');

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      messages: [],
      currentUser: "New User",
      connection: ""
    }
    this.addMessage = this.addMessage.bind(this);
    this.changeName = this.changeName.bind(this);
  }

  addMessage(message) {
    let newMessage = {
      type: "postMessage",
      content: message.content,
      username: message.userName,
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
    console.log("Connected to the server");
    console.log("componentDidMount <App />");
    setTimeout(() => {
      console.log("Simulating incoming message");
      // Add a new message to the list of messages in the data store
      const newMessage = {type: "incomingMessage",id: 7, username: "Michelle", content: "Hello there!"};
      const messages = this.state.messages.concat(newMessage)
      // Update the state of the app component.
      // Calling setState will trigger a call to render() in App and all child components.
      this.setState({messages: messages})
    }, 3000);
  }

  render() {
    if(this.state.connection) {
      this.state.connection.onmessage = event => {
        let data = JSON.parse(event.data);
        this.setState((currentState) => {
          return {messages: currentState.messages.concat(data)}; 
        });
      }
    }
    return (
      <div>
        <nav className="navbar">
          <a href="/" className="navbar-brand">Chatty</a>
        </nav>
        <MessageList messages={this.state.messages}/>
        <ChatBar currentUser={this.state.currentUser} addMessage={this.addMessage} changeName={this.changeName}/>
      </div>
    );
  }
}
export default App;

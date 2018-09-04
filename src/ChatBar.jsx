import React, {Component} from 'react';

class ChatBar extends Component {
  render() {
    const onChange = (event) => {
      let newName = event.target.value;
      this.props.changeName(newName);
    }

    const onEnter = (event) => {
      if(event.key === 'Enter'){
        const newMessage = {content: event.target.value, userName: this.props.currentUser};
        this.props.addMessage(newMessage);
        event.target.value = "";
      }
    }
    return (
      <footer className="chatbar">
        <input className="chatbar-username" placeholder="Enter your name here" onChange={onChange}/>
        <input className="chatbar-message" placeholder="Type a message and hit ENTER" onKeyPress={onEnter}/>
      </footer>
    );
  }
}
export default ChatBar;

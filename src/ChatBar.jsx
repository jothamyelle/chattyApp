import React, {Component} from 'react';

class ChatBar extends Component {
  render() {
    const onEnter = (event) => {
      if(event.key === 'Enter'){
        const newMessage = {content: event.target.value, userName: this.props.currentUser};
        this.props.addMessage(newMessage);
        event.target.value = "";
      }
    }
    return (
      <footer className="chatbar">
        <input className="chatbar-username" placeholder={this.props.currentUser} />
        <input className="chatbar-message" placeholder="Type a message and hit ENTER" onKeyPress={onEnter}/>
      </footer>
    );
  }
}
export default ChatBar;

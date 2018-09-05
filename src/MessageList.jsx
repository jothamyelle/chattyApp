import React, {Component} from 'react';
import Message from './Message.jsx';

class MessageList extends Component {
  render() {
    let userMessages = this.props.messages.map(message => <Message key={message.id} messageInfo={message} currentUser={this.props.currentUser} currentUserColor={this.props.currentUserColor}/>);
    return (
      <main className="messages">
        {userMessages}
      </main>
    );
  }
}
export default MessageList;

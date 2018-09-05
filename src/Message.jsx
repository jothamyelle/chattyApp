import React, {Component} from 'react';
const uuidv4 = require('uuid/v4');


class Message extends Component {
  render() {
    let messageInfo = this.props.messageInfo;
    let htmlToDisplay = "";
    if (messageInfo.type && messageInfo.type.includes("Notification")) {
      htmlToDisplay = 
      <div id={messageInfo.id} className="notification">
        <span className="notification-content">{messageInfo.content}</span>
      </div>;
    } else {
      htmlToDisplay = 
      <div id={messageInfo.id} className="message">
        <span className="message-username">{messageInfo.username}</span>
        <span className="message-content">{messageInfo.content}</span>
      </div>;
    }

    return(htmlToDisplay);
  }
}
export default Message;

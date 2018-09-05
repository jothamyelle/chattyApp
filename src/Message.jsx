import React, {Component} from 'react';
const uuidv4 = require('uuid/v4');


class Message extends Component {
  render() {
    let messageInfo = this.props.messageInfo;
    let userColor = this.props.currentUserColor;
    let nameColor = {};
    if(messageInfo.username === this.props.currentUser) {
       nameColor = {color: userColor};
    } else {
      nameColor = {color: messageInfo.currentUserColor};
    }
    let imgOrText = "";
    if(messageInfo.content.toLowerCase().includes(".png") || messageInfo.content.toLowerCase().includes(".gif") || messageInfo.content.toLowerCase().includes(".jpg")) {
      let imgAndTextArray = messageInfo.content.split(" ");
      let imgURL = imgAndTextArray.map((item) => {
        if(item.toLowerCase().includes(".png") || item.toLowerCase().includes(".gif") || item.toLowerCase().includes(".jpg")) {
          return item;
        }
      });
      imgURL = imgURL.join('');
      let actualContent = imgAndTextArray.map((item) => {
        if(!(item.toLowerCase().includes(".png") || item.toLowerCase().includes(".gif") || item.toLowerCase().includes(".jpg"))) {
          return item + " ";
        }
      });
      imgOrText = (<span className="message-content"><span>{actualContent}</span><br/><img src={imgURL} className="message-content img-content"/></span>);
    } else {
      imgOrText = (<span className="message-content">{messageInfo.content}</span>);
    }

    let htmlToDisplay = "";
    if (messageInfo.type && messageInfo.type.includes("Notification")) {
      htmlToDisplay = 
      <div id={messageInfo.id} className="notification">
        <span className="notification-content">{messageInfo.content}</span>
      </div>;
    } else {
      htmlToDisplay = 
      <div id={messageInfo.id} className="message">
        <span className="message-username" style={nameColor}>{messageInfo.username}</span>
        {imgOrText}
      </div>;
    }

    return(htmlToDisplay);
  }
}
export default Message;

import React, {Component} from 'react';
const uuidv4 = require('uuid/v4');

const Message = ({messageInfo} = props) => (
      <div id={uuidv4()} className="message">
        <span className="message-username">{messageInfo.username}</span>
        <span className="message-content">{messageInfo.content}</span>
      </div>
    );
export default Message;

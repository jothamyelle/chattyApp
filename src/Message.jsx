import React, {Component} from 'react';

const Message = ({messageInfo} = props) => (
      <div className="message">
        <span className="message-username">{messageInfo.username}</span>
        <span className="message-content">{messageInfo.content}</span>
      </div>
    );
export default Message;

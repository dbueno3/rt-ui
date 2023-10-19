import React, { useState } from "react";

const ChatFooter = ({ socket }) => {
    const [message, setMessage] = useState("");
    const name = sessionStorage.getItem("userName");
    const handleSendMessage = (e) => {
        e.preventDefault();

        if(message.trim()){
            const messageObj = {
                name: name,
                message: message
            };
            // socket.emit('/communications/send', messageObj);
            const eventName = '/communications/send';
            socket.emit(eventName, {message: message, name: name });
            console.log(messageObj);
            setMessage('');
        } else {
            console.log("WE Got clipped");
        }
    };

    return (
        <div className='chat__footer'>
            <form className='form' onSubmit={handleSendMessage}>
                <input 
                    type="text" 
                    placeholder='Write message' 
                    className='message'
                    value={message}
                    onChange={e => setMessage(e.target.value)}
                />
                <button type="submit" className="sendBtn">
                    SEND 
                </button>
            </form>
        </div>
    );
};

export default ChatFooter;

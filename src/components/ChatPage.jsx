import React, { useEffect, useState, useRef } from 'react';
import ChatBar from './ChatBar';
import ChatBody from './ChatBody';
import ChatFooter from './ChatFooter';

const ChatPage = ({socket}) => {
    const [messages, setMessages] = useState([]);
    const [typingStatus, setTypingStatus] = useState("");
    const lastMessageRef = useRef(null);

    useEffect(() => {
        const handleNewMessage = (message) => {
            setMessages((currentMessages) => [...currentMessages, message]);
        };
        
        // Listen for the "/communications/send" event from the server
        socket.on('/communications/send', handleNewMessage);

        return () => socket.off('/communications/send', handleNewMessage);
    }, [socket]); 

    useEffect(() => {
        socket.on('/communications/typing', (message) => setTypingStatus(message));

        // TODO create a backend route to handle the typing status
        return () => socket.off('/communications/typing');
    }, [socket]);

    useEffect(() => {
        lastMessageRef.current.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);
    

    return (
        <div className="chat">
            <ChatBar socket={socket}/>
            <div className='chat__main'>
                <ChatBody messages={messages} typingStatus={typingStatus} lastMessageRef={lastMessageRef}/>
                <ChatFooter socket={socket} />
            </div>
            
        </div>
    )
}


export default ChatPage;
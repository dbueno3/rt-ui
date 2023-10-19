import React, { useEffect, useState, useRef } from 'react';
import ChatBar from './ChatBar';
import ChatBody from './ChatBody';
import ChatFooter from './ChatFooter';

const ChatPage = ({socket}) => {
    const [messages, setMessages] = useState([]);
    const [typingStatus, setTypingStatus] = useState("");
    const lastMessageRef = useRef(null);

    useEffect(() => {
        // Define the function within the useEffect so it has access to the setMessages function 
        // without causing a re-run of the effect when messages state updates.
        const handleNewMessage = (message) => {
            setMessages((currentMessages) => [...currentMessages, message]);
        };
        
        // Listen for the "/communications/send" event from the server and handle with the function defined above
        socket.on('/communications/send', handleNewMessage);

        // Return a cleanup function to stop listening to the event when the component unmounts 
        // or when the effect is run again (to prevent memory leaks).
        return () => socket.off('/communications/send', handleNewMessage);
    }, [socket]); // Only re-run effect if socket object changes

    useEffect(() => {
        socket.on('/communications/typing', (message) => setTypingStatus(message));
        // Don’t forget to clean up this effect as well
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
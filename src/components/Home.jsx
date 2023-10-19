import React from "react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Home = ({ socket }) => {
    const navigate = useNavigate();
    const [userName, setUserName] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        localStorage.setItem("username", userName);
        socket.emit("newUser", {userName, socketID: socket.id});
        navigate("/chat");
    }
    // This useEffect is `fetching` the echo endpoint from communications controller 
    // useEffect((socket)=>{
    //     socket.on('/communication/echo', (data) =>{
    //         console.log("COMMUNICATIONS IS BEING HIT WITH REACT", data)
    //     });
    //     return () => {
    //         socket.off('/communication/echo')
    //     }
    // }, [socket])

    return  (
    <form className='home__container' onSubmit={handleSubmit}>
        <h2 className='home__header'>Sign in to Open Chat</h2>
        <label htmlFor="username">Username</label>
        <input type="text" 
        minLength={6} 
        name="username" 
        id='username'
        className='username__input' 
        value={userName} 
        onChange={e => setUserName(e.target.value)}
        />
        <button className='home__cta'>SIGN IN</button>
    </form>    
    )
}

export default Home;
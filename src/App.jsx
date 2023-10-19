import { io } from "socket.io-client";
import {BrowserRouter, Routes, Route} from "react-router-dom"
import Home from "./components/Home";
import ChatPage from "./components/ChatPage";


// @Justin -> read below: 
//ADDing the link for socket Io since Alan doesnt want us to instal socket.io-client
// https://cdn.socket.io/4.7.2/socket.io.esm.min.js 
// https://socket.io/how-to/use-with-react

const socket = io.connect("http://localhost:3001");

function App() { 
    return (
        <BrowserRouter>
        <div>
            <Routes>
                <Route path="/" element={<Home socket={socket} />} />
                <Route path="/chat" element={<ChatPage socket={socket} />} />
            </Routes>
        </div>
        </BrowserRouter>
    );
} 

export default App;
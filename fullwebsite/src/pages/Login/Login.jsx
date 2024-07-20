import React, { useContext, useState } from "react";
import Usercontext from "../../context/Usercontext";
function Login(){
    const [email, setEmail] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const {setUser}=useContext(Usercontext);
    const handleLogin = (e) => {
        e.preventDefault();
        setUser({username, email, password});
        console.log({username, email, password});
    }
    const handleSignup = () => {
        window.open("/signup","_blank");}
    return(
        <div>
            <h1>login</h1>
            <input type="email" placeholder="email" onChange={(e) => setEmail(e.target.value)} />
            <input type="text" placeholder="username" onChange={(e) => setUsername(e.target.value)} />
            <input type="password" placeholder="password" onChange={(e) => setPassword(e.target.value)} />
            <button onClick={handleLogin}>login</button>
            <button onClick={handleSignup}>Create a new account</button>
        </div>
    );
}
export default Login;
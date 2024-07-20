import React, { useContext, useState } from "react";
import axios from "axios";
import Usercontext from "../../context/Usercontext";

function Signup() {
    const [email, setEmail] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    // const [dob, setDob] = useState("");
    const { setUser } = useContext(Usercontext);

    const handleSignup = async (e) => {
        e.preventDefault();
        const userData = { name: username, email, password };

        try {
            const response = await axios.post('http://localhost:3000/user/signup', userData,{withCredentials:true});
            setUser(response.data); // Assuming the response contains user data
            console.log("Signup successful", response.data);
        } catch (error) {
            console.error("Error during signup:", error.response?.data || error.message);
        }
    };

    return (
        <div>
            <h1>SignUp</h1>
            <form onSubmit={handleSignup}>
                <input type="email" placeholder="email" onChange={(e) => setEmail(e.target.value)} required />
                <input type="text" placeholder="Full Name" onChange={(e) => setUsername(e.target.value)} required />
                <input type="password" placeholder="password" onChange={(e) => setPassword(e.target.value)} required />
                {/* <input type="date" placeholder="Date of Birth" onChange={(e) => setDob(e.target.value)} required /> */}
                <button type="submit">Signup</button>
            </form>
        </div>
    );
}

export default Signup;

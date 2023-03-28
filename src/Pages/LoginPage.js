import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth"

const LoginPage = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("")
    const navigate = useNavigate();

    const handleLogin = async() => {
        try{
            await signInWithEmailAndPassword(getAuth(), email, password)
            navigate('/articles')
        }
        catch(e){
            console.log(">>>>>Error", e.message);
        }
    }

    return(
        <>
            <h1>Log In</h1>
            <input placeholder="Your email" value={email} onChange={(e)=>{setEmail(e.target.value)}}/>
            <input placeholder="Your Password" type="password" value={password} onChange={(e)=>{setPassword(e.target.value)}}/>
            <button onClick={handleLogin}>Log In</button>
            <Link to="/create-account">Don't have an account? Create one</Link>
        </>
    )
}

export default LoginPage
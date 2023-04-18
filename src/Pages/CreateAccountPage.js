import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import axios from "axios";
import { useDispatch } from 'react-redux';

const CreateAccountPage = () => {
    const [name, setName] = useState("")
    const [phoneNumber, setPhoneNumber] = useState("")
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleCreateAccount = async() => {
        try{
            if(password!==confirmPassword){
                console.log("Password and Confirm Password doesnt match")
                return;
            }
            
            await createUserWithEmailAndPassword(getAuth(), email, password)
            await axios.put(`http://localhost:3020/user/create-account`, {name, phoneNumber, email, password})
            const user  = await axios.post(`http://localhost:3020/user/login`, {email, password})
            dispatch({ type: 'SET_USER', payload: user.data });
            navigate('/')
        }

        catch(e){
            console.log(e.message)
        }
        
    }

    return(
        <>
            <h1>Create Account</h1>
            <input placeholder="Your Name" value={name} onChange={(e)=>{setName(e.target.value)}}/>
            <input placeholder="Your Phone Number" value={phoneNumber} onChange={(e)=>{setPhoneNumber(e.target.value)}}/>
            <input placeholder="Your email" value={email} onChange={(e)=>{setEmail(e.target.value)}}/>
            <input placeholder="Your Password" type="password" value={password} onChange={(e)=>{setPassword(e.target.value)}}/>
            <input placeholder="Confirm Password" type="password" value={confirmPassword} onChange={(e)=>{setConfirmPassword(e.target.value)}}/>
            <button onClick={handleCreateAccount}>Create Account</button>
            <Link to="/login">Already have an account? Login</Link>
        </>
    )
}

export default CreateAccountPage
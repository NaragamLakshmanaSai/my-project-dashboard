import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";

const CreateAccountPage = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    const navigate = useNavigate();

    const handleCreateAccount = async() => {
        try{
            if(password!==confirmPassword){
                console.log("Password and Confirm Password doesnt match")
                return;
            }
            
            await createUserWithEmailAndPassword(getAuth(), email, password)
            navigate('/articles')
        }

        catch(e){
            console.log(e.message)
        }
        
    }

    return(
        <>
            <h1>Create Account</h1>
            <input placeholder="Your email" value={email} onChange={(e)=>{setEmail(e.target.value)}}/>
            <input placeholder="Your Password" type="password" value={password} onChange={(e)=>{setPassword(e.target.value)}}/>
            <input placeholder="Confirm Password" type="password" value={confirmPassword} onChange={(e)=>{setConfirmPassword(e.target.value)}}/>
            <button onClick={handleCreateAccount}>Create Account</button>
            <Link to="/login">Already have an account? Login</Link>
        </>
    )
}

export default CreateAccountPage
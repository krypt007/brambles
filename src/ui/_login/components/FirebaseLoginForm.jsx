import { useState } from "react";
import { auth } from "../../../lib/firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { Link, useNavigate } from "react-router-dom";

const FirebaseLoginForm = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [notice, setNotice] = useState("");

    const loginWithUsernameAndPassword = async (e) => {
        e.preventDefault();

        try {
            await signInWithEmailAndPassword(auth, email, password);
            navigate("/dashboard");
        } catch {
            setNotice("You entered a wrong username or password.");
        }
    }

    return(
        <div className="flex justify-center items-center h-screen max-w-screen-md ">
            <div className = "border-brown-400 bg-[#303030] py-4 px-4 rounded-md">
                <div className = "row justify-content-center">
                    <form className = "col-md-4 mt-3 pt-3 pb-3">
                        { "" !== notice &&
                            <div className = "alert alert-warning" role = "alert">
                                { notice }    
                            </div>
                        }                  
                        <div className = "flex flex-col mb-3">
                            <input type = "email" className = "text-sm px-4 py-2 rounded-md" id = "exampleInputEmail1" aria-describedby = "emailHelp" placeholder = "name@example.com" value = { email } onChange = { (e) => setEmail(e.target.value) }></input>
                            <label htmlFor = "exampleInputEmail1" className = "text-sm px-4 py-2">Email address</label>
                        </div>
                        <div className = "flex flex-col mb-3">
                            <input type = "password" className = "text-sm px-4 py-2 rounded-md" id = "exampleInputPassword1" placeholder = "Password" value = { password } onChange = { (e) => setPassword(e.target.value) }></input>
                            <label htmlFor = "exampleInputPassword1" className = "text-sm px-4 py-2">Password</label>
                        </div>
                        <div className = "d-grid">
                            <button type = "submit" className = "btn btn-primary py-2 px-4 border-lime-100" onClick = {(e) => loginWithUsernameAndPassword(e)}>Submit</button>
                        </div>
                        <div className = "mt-3 text-center">
                            <span>Need to sign up for an account? <Link to = "./signup">Click here.</Link></span>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default FirebaseLoginForm
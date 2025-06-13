import { useState } from "react";
import Button from "./Button";

function Login() {

    const[email, setEmail] = useState("");
    const[password, setPassword] = useState("");
    const[errorField, setErrorField] = useState<null | true>(null)

    const handleEmailChange = (e : React.ChangeEvent<HTMLInputElement>) =>{
        e.preventDefault();
        const value = e.target.value;
        setEmail(value);
    }

    const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) =>{
        e.preventDefault();
        const value = e.target.value;
        setPassword(value);
    }

    const handleSubmit = () =>{
        event?.preventDefault();
        if(password == "" || email == ""){
            setErrorField(true);
        }
        else{
            setErrorField(false);
        }
    }

    return (
    <div className="min-h-[calc(100vh-80px)] flex items-center justify-center">
        <div className="border border-gray-200 p-10 rounded bg-blue-100">
            <form>
                    <input
                        name="email"
                        onChange={handleEmailChange}
                        value={email}
                        type="email" 
                        placeholder="Email" 
                        className="bg-white border border-gray-300 mb-2 rounded-md shadow-sm focus:border-indigo-200 px-2 py-2 w-full"
                    />
                    <input
                    onChange={handlePasswordChange} 
                        name="password"
                        type="password"
                        value={password}
                        placeholder="Password" 
                        className="bg-white border border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 px-2 py-2 w-full"
                    />
                    {errorField && <p className="text-red-400 flex justify-center mt-2">All fields are required</p>}
                    <div className="flex justify-center mt-2">
                        <Button primary rounded className="mt-2 flex justify-center" onClick={handleSubmit}>
                            Login
                        </Button>
                    </div>
            </form>
        </div>
    </div>
    );
};

export default Login;
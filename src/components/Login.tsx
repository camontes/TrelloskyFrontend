import { useState } from "react";
import Button from "./Button";
import Modal from "./Modal";
import CreateUser from "./CreateUser";
import {Uri} from "../utils/constants"
import { LuX } from "react-icons/lu";
import axios from "axios";

function Login() {

    const[email, setEmail] = useState("");
    const[password, setPassword] = useState("");
    const[errorField, setErrorField] = useState<null | boolean>(null)
    const[errorLogin, setErrorLogin] = useState({
        status:"",
        message:""
    })
    const[loadingLogin, setLoadingLogin] = useState(false);
    const[showModal, setShowModal] = useState(false);

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

    const login = async() => {
        try{
            setLoadingLogin(true);

            const user = {
                email, password
            }

            const response = await axios.get(Uri+"user/login", {
                params: user
            });

             setErrorLogin({
                ...errorLogin,
                status: "ok",
                message: response.data.message,
            });
        }
        catch(error){
            console.log(error);
            let msg = 'Error Unknown';

            if (axios.isAxiosError(error)) {
                msg = error.response?.data?.message || error.message;
            } else if (error instanceof Error) {
                msg = error.message;
            } else {
                msg = JSON.stringify(error);
            }

            setErrorLogin({
                ...errorLogin,
                status: "error",
                message: msg,
            });
        }
        finally{
            setLoadingLogin(false);
        }
    }

    const handleSubmit = async() =>{
        event?.preventDefault();
        if(password == "" || email == ""){
            setErrorField(true);
        }
        else{
            setErrorField(false);
            await login();
        }
    }

    const handleShowModal = () =>{
        setShowModal(!showModal);
    }

    const handleClose = () => {
        setShowModal(false);
    }

    const classLoginMessage = errorLogin.status == "error" ? "text-red-400" : "text-green-400";

    const actiosnBar = (
        <div className="flex justify-end gap-2">
            <LuX className="cursor-pointer" onClick={handleClose}/>
        </div>
    );
    const modal = <Modal onClose={handleClose} actionBar={actiosnBar}>
         <CreateUser />
        </Modal>;

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
                    <p className={`flex justify-center mt-2 ${classLoginMessage}`}>{errorLogin.message}</p>
                    <div className="flex justify-center mt-2">
                        <Button primary rounded className="mt-2 flex justify-center" onClick={handleSubmit} loading={loadingLogin}>
                            Login
                        </Button>
                    </div>
                    <div className="flex justify-center mt-5">
                        <h1 className="text-blue-600 cursor-pointer" onClick={handleShowModal}>Create Account</h1>
                    </div>
            </form>
        </div>
        {showModal && modal}
    </div>
    );
};

export default Login;
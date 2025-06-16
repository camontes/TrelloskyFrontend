import className from 'classnames';
import { useState, useRef } from "react";
import Button from "./Button";
import axios from "axios";
import {Uri} from "../utils/constants"

function CreateUser(){
    const fileInputRef = useRef<HTMLInputElement>(null);
    const[errorFields, setErrorFields] = useState<null | string>(null);
    const[loadindCreateUser, setLoadingCreateUser] = useState(false);
    const [messageCreateUser, setMessageCreateUser] = useState({
        status:"",
        message:""
    });
    const[form, setForm] = useState({
        name: "",
        email: "",
        image:"",
        password:"",
        confirmPassword:""

    });

    const classes = className(
        'block  w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 focus:outline-none',
        'focus:border-blue-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm',
        'file:font-semibold',
        'file:bg-blue-600 file:text-white hover:file:bg-blue-700'
      );

    const uploadImage = async(userId: string) => {
        const formData = new FormData();
        formData.append("file", form.image);

        axios.post(Uri + `user/upload-image/${userId}`, formData);
    }
    const createUser = async() => {
        try{

            setLoadingCreateUser(true);

            const user = {
                name: form.name,
                email: form.email,
                password: form.password
            };

            const response = await axios.post(Uri + "user",user);
            await uploadImage(response.data.data.id);

            // Upload image
            setMessageCreateUser(
                {
                    ...messageCreateUser,
                    status: response.data.status,
                    message: response.data.message
                }
            );

            setForm({
                ...form,
                name:"",
                email:"",
                password:"",
                image: "",
                confirmPassword:""
            })

            if (fileInputRef.current) {
                fileInputRef.current.value = "";
            }
        }
        catch(error){
            let msg = 'Error Unknown';

            if (axios.isAxiosError(error)) {
                msg = error.response?.data?.message || error.message;
            } else if (error instanceof Error) {
                msg = error.message;
            } else {
                msg = JSON.stringify(error);
            }

            setMessageCreateUser({
                ...messageCreateUser,
                status: "error",
                message: msg,
            });
        }
        finally{
            setLoadingCreateUser(false);
        }
    }


    const validateEmail = (value: string) => {
        // regular expression to validate email
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(value);
    };

    const handleChange = (e : React.ChangeEvent<HTMLInputElement>) =>{
        e.preventDefault();
        const name = e.target.name;
        const value = name != "image" ? e.target.value : e.target.files?.[0];
        setForm(
            {...form,
                [name]:value
            }
        )
    }

    const handleSubmit = async() =>{

        if(form.email == "" || form.name == "" || form.password == "" || form.confirmPassword == "" || form.image == ""){
            setErrorFields("all fields required");
        }

        else if(form.password != form.confirmPassword){
            setErrorFields("password not match")
        }
        else if(!validateEmail(form.email)){
            setErrorFields("it's not a email")
        }
        else{
            setErrorFields(null);
            await createUser();
        }
    }

    const classMessageCreateUser = messageCreateUser.status == "error" ? "text-red-400" : "text-green-400";
    return(
        <div className="flex flex-col items-center gap-4">
            <input
                onChange={handleChange}
                name="name"
                value={form.name}
                type="text"
                placeholder="Name"
                className="border border-gray-300 px-2 py-1 rounded w-full"
            />
            <input
                ref={fileInputRef}
                onChange={handleChange}
                name="image"
                type="file"
                placeholder="Upload Image"
                className={classes}
            />
            <input
                onChange={handleChange}
                value={form.email}
                type="email"
                name="email"
                placeholder="Email"
                className="border border-gray-300 px-2 py-1 rounded w-full"
            />
            <input
                onChange={handleChange}
                value={form.password}
                name="password"
                type="password"
                placeholder="Password"
                className="border border-gray-300 px-2 py-1 rounded w-full"
            />
            <input
                onChange={handleChange}
                 value={form.confirmPassword}
                name="confirmPassword"
                type="password"
                placeholder="Confirm Password"
                className="border border-gray-300 px-2 py-1 rounded w-full"
            />
            <p className="text-red-400 flex justify-center mt-2">{errorFields}</p>
            <p className={`flex justify-center mt-2 ${classMessageCreateUser}`}>{messageCreateUser.message}</p>
            <Button primary rounded onClick={handleSubmit} loading={loadindCreateUser}>
                Create
            </Button>
        </div>
    );
}

export default CreateUser;
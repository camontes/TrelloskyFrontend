import { useState } from "react";
import Button from "./Button";

function CreateUser(){
    const[errorFields, setErrorFields] = useState<null | string>(null);
    const[form, setForm] = useState({
        name: "",
        email: "",
        password:"",
        confirmPassword:""

    });

    const validateEmail = (value: string) => {
        // regular expression to validate email
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(value);
    };

    const handleChange = (e : React.ChangeEvent<HTMLInputElement>) =>{
        e.preventDefault();
        const name = e.target.name;
        const value = e.target.value;

        setForm({...form,[name]:value})
    }

    const handleSubmit = () =>{

        if(form.email == "" || form.name == "" || form.password == "" || form.confirmPassword == ""){
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
        }
    }

    return(
        <div className="flex flex-col items-center gap-4">
            <input
                onChange={handleChange}
                name="name"
                type="text"
                placeholder="Name"
                className="border border-gray-300 px-2 py-1 rounded w-full"
            />
            <input
                onChange={handleChange}
                type="email"
                name="email"
                placeholder="Email"
                className="border border-gray-300 px-2 py-1 rounded w-full"
            />
            <input
                onChange={handleChange}
                name="password"
                type="password"
                placeholder="Password"
                className="border border-gray-300 px-2 py-1 rounded w-full"
            />
            <input
                onChange={handleChange}
                name="confirmPassword"
                type="password"
                placeholder="Confirm Password"
                className="border border-gray-300 px-2 py-1 rounded w-full"
            />
            <p className="text-red-400 flex justify-center mt-2">{errorFields}</p>
            <Button primary rounded onClick={handleSubmit}>
                Create
            </Button>
        </div>
    );
}

export default CreateUser;
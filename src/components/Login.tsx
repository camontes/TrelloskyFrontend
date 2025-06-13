function Login() {

    return (
    <div className="min-h-screen flex items-center justify-center">
        <div className="border border-gray-200 p-10 rounded bg-blue-100">
            <form>
                    <input type="email" placeholder="Email" className="bg-white border border-gray-300 mb-2 rounded-md shadow-sm focus:border-indigo-500 px-2 py-2 w-full"/>
                    <input type="password" placeholder="Pasword" className="bg-white border border-gray-300 rounded-md shadow-sm focus:border-indigo-500 px-2 py-2 w-full"/>
            </form>
        </div>
    </div>
    );
};

export default Login;
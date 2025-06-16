import { useSelector } from "react-redux";
import type  { RootState } from "../store";
import Home from "../components/Home";


function HomePage (){
   const user = useSelector((state: RootState) => state.auth);
   console.log(user);
    return (
        <Home />
    )
}

export default HomePage;
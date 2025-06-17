import { useSelector } from "react-redux";
import { useEffect } from "react";
import type  { RootState } from "../store";
import { fetchProjects } from "../store";
import { useThunk } from "../hooks/use-thunk";
import Home from "../components/Home";


function HomePage (){
    const user = useSelector((state: RootState) => state.auth);
   const [doFetchProjects, isLoadingProjects, loadingProjectsError] = useThunk(fetchProjects);

   useEffect(() => {
    doFetchProjects(user);
  }, [doFetchProjects]);
    return (
        <Home />
    )
}

export default HomePage;
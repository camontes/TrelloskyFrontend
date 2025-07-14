import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import type  { RootState } from "../store";
import { fetchProjects } from "../store";
import { useThunk } from "../hooks/use-thunk";
import type { Project } from "../utils/interfaces/project";
import Loading from "./Loading";
import ProjectItem from "./ProjectItem";
import { useAuth } from "../hooks/useAuth";

function ProjectList(){
const navigate = useNavigate();

const user = useAuth();
const projects = useSelector((state: RootState) => state.projects).data;

const [doFetchProjects, isLoadingProjects, loadingProjectsError] = useThunk(fetchProjects);

useEffect(() => {
  if (!user || !user.token) {
    navigate("/");
  } else {
    doFetchProjects(user);
  }
}, [user, doFetchProjects, navigate]);

let content;

if(isLoadingProjects){
    content = <Loading />
}
else if(loadingProjectsError){
    content = <div>Error fetchind Projects......</div>
}
else{
    content = projects.map((p: Project) => {
        return <ProjectItem key={p.id} project={p}/>
    });
}

return (

    <div className="flex justify-center mt-10">
       <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 w-full max-w-6xl px-4">
        {content}
      </div>
    </div>
)
};

export default ProjectList;
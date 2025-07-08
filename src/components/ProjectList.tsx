import { useSelector } from "react-redux";
import { useEffect } from "react";
import type  { RootState } from "../store";
import { fetchProjects } from "../store";
import { useThunk } from "../hooks/use-thunk";
import type { Project } from "../utils/interfaces/project";
import Loading from "./Loading";
import ProjectItem from "./ProjectItem";

function ProjectList(){

const user = useSelector((state: RootState) => state.auth);
const projects = useSelector((state: RootState) => state.projects).data;

const [doFetchProjects, isLoadingProjects, loadingProjectsError] = useThunk(fetchProjects);

useEffect(() => {
doFetchProjects(user);
}, [doFetchProjects]);

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

    <>
     {content}
    </>
)
};

export default ProjectList;
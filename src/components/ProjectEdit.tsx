import { useState } from "react";
import Button from "./Button";
import type { Project } from "../utils/interfaces/project";
import { useAuth } from "../hooks/useAuth";
import { updateProject } from "../store/thunks/updateProject";
import { useThunk } from "../hooks/use-thunk";

interface ProjectEditProps{
    project: Project;
    handleCancel:() => void;
}

function ProjectEdit({project, handleCancel}: ProjectEditProps){
    const[projectName, setProjectName] = useState(project.name);
    const[doUpdateProject, isLoading, error] = useThunk(updateProject);

    const user = useAuth();

    const handleSubmit =  async() => {
        if(projectName != null || projectName != null){
            const obj = {
            id: project.id,
            auth: user,
            body:{
                name: projectName
            }
            }
            
            await doUpdateProject(obj);
            handleCancel();
        }
    }

    return(
        <>
            <div className="text-center">
                <input
                type="text"
                value={projectName}
                onChange={(e) => setProjectName(e.target.value)}
                className="text-center text-blue-900 font-bold text-xl bg-white px-2 py-1 rounded w-full"
            />
            </div>
            <div className="mt-4 flex justify-center gap-4">
            <Button loading={isLoading} primary onClick={handleSubmit}>
                 Guardar
            </Button>
            <Button loading={false} onClick={handleCancel} secondary>
                 Cancelar
            </Button>
            </div>
        </>
    );
}

export default ProjectEdit;
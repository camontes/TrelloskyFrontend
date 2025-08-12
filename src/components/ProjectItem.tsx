import { useState } from "react";
import type { Project } from "../utils/interfaces/project";
import ProjectEdit from "./ProjectEdit";
import Button from "./Button";
import { removeProject } from "../store/thunks/removeProject";
import { useThunk } from "../hooks/use-thunk";
import { useAuth } from "../hooks/useAuth";

interface ProjectItemProps {
  project: Project;
}

function ProjectItem({ project }: ProjectItemProps) {
  const [isEditing, setIsEditing] = useState(false);
  const[doRemoveProject, isLoadingRemove, errorRemove] = useThunk(removeProject);

  const user = useAuth();

  const handleCancel = () => {
    setIsEditing(false);
  };

  const switchIsEditing = (e: React.MouseEvent<HTMLButtonElement>) =>{
    e.stopPropagation();
    setIsEditing(true);
  }

  const handleRemove = async() => {
    const obj = {
      auth: user,
      id: project.id
    }
    await doRemoveProject(obj);
  }

  return (
    <div className="group relative bg-blue-100 shadow-lg rounded-xl p-5 transition-transform hover:scale-105">
      {
        isEditing ?(
          <ProjectEdit project={project} handleCancel={handleCancel}/>
        ):(
          <div className="text-center">
             <h2 className="text-xl font-bold text-blue-900">{project.name}</h2>
          </div>
        )
      }

      {/* Botones al hacer hover (solo si no está editando) */}
      {!isEditing && (
        <div className="absolute inset-0 flex justify-center items-center gap-4 opacity-0 group-hover:opacity-100 transition-opacity bg-blue-100 bg-opacity-80 rounded-xl z-10">
          <Button
            className="bg-green-500 text-white px-4 py-1 rounded hover:bg-green-600 z-20"
            onClick={switchIsEditing}
          >
            Editar
          </Button>
          <Button className="bg-red-500 text-white px-4 py-1 rounded hover:bg-red-600 z-20" loading = {isLoadingRemove} onClick={handleRemove}>
            Eliminar
          </Button>
        </div>
      )}
    </div>
  );
}

export default ProjectItem;
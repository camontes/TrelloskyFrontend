import { useState } from "react";
import type { Project } from "../utils/interfaces/project";

interface ProjectItemProps {
  project: Project;
}

function ProjectItem({ project }: ProjectItemProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedName, setEditedName] = useState(project.name);

  const handleSave = () => {
    // Aquí podrías enviar el valor actualizado
    console.log("Nuevo nombre:", editedName);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditedName(project.name);
    setIsEditing(false);
  };

  return (
    <div className="group relative bg-blue-100 shadow-lg rounded-xl p-5 transition-transform hover:scale-105 cursor-pointer">
      {/* Contenido principal */}
      <div className="text-center">
        {isEditing ? (
          <input
            type="text"
            value={editedName}
            onChange={(e) => setEditedName(e.target.value)}
            className="text-center text-blue-900 font-bold text-xl bg-white px-2 py-1 rounded w-full"
          />
        ) : (
          <h2 className="text-xl font-bold text-blue-900">{project.name}</h2>
        )}
      </div>

      {/* Botones al hacer hover (solo si no está editando) */}
      {!isEditing && (
        <div className="absolute inset-0 flex justify-center items-center gap-4 opacity-0 group-hover:opacity-100 transition-opacity bg-blue-100 bg-opacity-80 rounded-xl z-10">
          <button
            className="bg-green-500 text-white px-4 py-1 rounded hover:bg-green-600 z-20"
            onClick={(e) => {
              e.stopPropagation();
              setIsEditing(true);
            }}
          >
            Editar
          </button>
          <button className="bg-red-500 text-white px-4 py-1 rounded hover:bg-red-600 z-20">
            Eliminar
          </button>
        </div>
      )}

      {/* Botones de edición (Guardar / Cancelar) */}
      {isEditing && (
        <div className="mt-4 flex justify-center gap-4">
          <button
            className="bg-blue-600 text-white px-4 py-1 rounded hover:bg-blue-700"
            onClick={handleSave}
          >
            Guardar
          </button>
          <button
            className="bg-gray-400 text-white px-4 py-1 rounded hover:bg-gray-500"
            onClick={handleCancel}
          >
            Cancelar
          </button>
        </div>
      )}
    </div>
  );
}

export default ProjectItem;
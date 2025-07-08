import type { Project } from "../utils/interfaces/project";

interface ProjectItemProps {
  project: Project;
}

function ProjectItem ({project}: ProjectItemProps) {
    return(
        <div>
            {project.name}
        </div>
    )
}

export default ProjectItem;
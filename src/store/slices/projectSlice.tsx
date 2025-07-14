import { createSlice } from "@reduxjs/toolkit";
import type { Project } from "../../utils/interfaces/project";
import { fetchProjects } from "../thunks/fetchProjects";
import { updateProject } from "../thunks/updateProject";


interface ProjectsState {
  data: Project[];
}

const initialState: ProjectsState = {
  data: [],
};

const projectSlice = createSlice({
  name: 'projects',
  initialState,
  reducers: {
  },
  extraReducers: (builder) => {
    builder.addCase(fetchProjects.fulfilled, (state, action) =>{
        state.data = action.payload.data;
    })
    .addCase(updateProject.fulfilled, (state, action) => {
      const updated = action.payload;
      const index = state.data.findIndex(p => p.id === updated.data.id);
      if (index !== -1) {
        state.data[index] = updated.data;
      }
    });
  },
});


export const projectsReducer = projectSlice.reducer;
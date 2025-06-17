import { createSlice } from "@reduxjs/toolkit";
import type { Project } from "../../utils/interfaces/project";
import { fetchProjects } from "../thunks/fetchProjects";


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
        state.data.push(action.payload.data);
    })
  },
});


export const projectsReducer = projectSlice.reducer;
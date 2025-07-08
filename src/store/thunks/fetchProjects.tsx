import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { Uri } from "../../utils/constants";
import type { AuthState } from "../slices/authSlice";

const fetchProjects = createAsyncThunk('projects/fetch', async(auth : AuthState) => {

    const projects = await axios.get(Uri + "project/"+ auth.user?.id,{
         headers: {
            Authorization: auth.token,
        },
    })
    return projects.data;
});

export {fetchProjects};
import { createAsyncThunk } from "@reduxjs/toolkit";
import { useSelector } from "react-redux";
import type  { RootState } from "../../store";
import axios from "axios";
import { Uri } from "../../utils/constants";
import type { AuthState } from "../slices/authSlice";

const fetchProjects = createAsyncThunk('projects/fetch', async(auth : AuthState) => {

    const projects = await axios.get(Uri + "project/"+ auth.user?.id,{
         headers: {
            Authorization: auth.token,
        },
    })
    console.log(projects.data);
    return projects.data;
});

export {fetchProjects};
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { Uri } from "../../utils/constants";
import type { AuthState } from "../slices/authSlice";

interface RemoveProjectParams {
  auth: AuthState;
  id: string;
}


const removeProject = createAsyncThunk('projects/remove', async({auth, id} : RemoveProjectParams) => {

    const projects = await axios.delete(Uri + "project/"+ id,{
         headers: {
            Authorization: auth.token,
        },
    })
    return projects.data;
});

export {removeProject};
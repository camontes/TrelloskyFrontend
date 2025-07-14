import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { Uri } from "../../utils/constants";
import type { AuthState } from "../slices/authSlice";

// Define la forma del payload esperado
interface UpdateProjectParams {
  auth: AuthState;
  id: string;
  body: {
    name?: string;
  };
}

const updateProject = createAsyncThunk(
  'projects/update',
  async ({ auth, id, body }: UpdateProjectParams) => {
    const response = await axios.put(`${Uri}project/${id}`, body, {
       headers: {
            Authorization: auth.token,
        },
    });
    return response.data;
  }
);

export { updateProject };
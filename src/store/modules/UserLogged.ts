import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import api from "../../services/api";
import UserType from "../../types/UserType";

const initialState: userstate = {
  userLogged: { email: "", password: "", notes: [] },
};
interface userstate {
  userLogged: UserType;
}

interface taskCreate {
  title: string;
  description: string;
  email: string;
}

interface defaultTask {
  email: string;
  id: string;
}

interface taskUpdate {
  id: string;
  email: string;
  title: string;
  description: string;
}

interface userLogin {
  email: string;
  password: string;
}

interface userCreate {
  email: string;
  password: string;
  repassword: string;
}

export const userCreateAsyncThunk = createAsyncThunk(
  "userCreate",
  async ({ email, password, repassword }: userCreate) => {
    const response = await api.post("/users", {
      email,
      password,
      repassword,
    });
    return response.data;
  },
);

export const userLoginAsyncThunk = createAsyncThunk(
  "login",
  async ({ email, password }: userLogin) => {
    const response = await api.get(`users/login/${email}/${password}`, {});
    console.log(response);
    return response.data;
  },
);

export const taskCreateAsyncThunk = createAsyncThunk("task", async (newTask: taskCreate) => {
  const email = newTask.email;
  console.log(newTask);

  try {
    const response = await api.post(`/tasks/${email}`, {
      emailUser: newTask.email,
      title: newTask.title,
      description: newTask.description,
    });
    console.log(response);

    return response.data;
  } catch (error) {
    console.error("Erro ao criar tarefa:", error);
    throw error;
  }
});

export const getTaskAsyncThunk = createAsyncThunk("getTask", async (email: string) => {
  console.log(email);
  const response = await api.get(`/tasks/${email}`);
  return response.data;
});

export const taskDeleteAsyncThunk = createAsyncThunk(
  "taskDelete",
  async ({ email, id }: defaultTask) => {
    console.log(id);
    const response = await api.delete(`/tasks/${email}/${id}`);
    console.log(response.data);

    return response.data;
  },
);

export const taskUpdateAsyncThunk = createAsyncThunk(
  "taskUpdate",
  async ({ email, id, description, title }: taskUpdate) => {
    console.log(id);
    const response = await api.put(`/tasks/${email}/${id}`, {
      title,
      description,
    });
    return response.data;
  },
);

export const taskArchivedAsyncThunk = createAsyncThunk(
  "taskArchive",
  async ({ email, id }: defaultTask) => {
    console.log(id);
    const response = await api.put(`/tasks/${email}/${id}/archived`);
    return response.data;
  },
);

const userLogged = createSlice({
  name: "userLogged",
  initialState,
  extraReducers(builder) {
    builder.addCase(userLoginAsyncThunk.fulfilled, (state, action) => {
      state.userLogged.email = action.payload.email;
      state.userLogged.password = action.payload.password;
    });
    builder.addCase(taskCreateAsyncThunk.fulfilled, (state, action) => {
      state.userLogged.notes.push(action.payload);
    });
    builder.addCase(getTaskAsyncThunk.fulfilled, (state, action) => {
      state.userLogged.notes = action.payload;
    });
  },
  reducers: {
    logout: () => {
      return initialState;
    },
  },
});
export const { logout } = userLogged.actions;
export const userLoggedReducer = userLogged.reducer;

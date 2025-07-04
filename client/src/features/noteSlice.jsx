import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getToken, userId } from "../utils/common";
console.log(userId(),getToken());

export const getNotes = createAsyncThunk(
  "note/fetch",
  async (reqData, thunkApi) => {
    try {
      const data = await fetch(
        `http://localhost:3000/notes?userId=${userId()}`,
        {
          method: "GET",
          headers: {
            "content-type": "application/json",
            authorization: `Bearer ${getToken()}`,
          },
        }
      );
      console.log(data);
      if (!data.ok) {
        throw new Error("fail");
      }
      const result = await data.json();
      return result;
    } catch (e) {
      return thunkApi.rejectWithValue(e.message);
    }
  }
);

export const createNote = createAsyncThunk(
  "note/create",
  async (reqData, thunkApi) => {
    try {
      reqData.userId =userId();
      const data = await fetch(
        `http://localhost:3000/notes`,
        {
          method: "POST",
          headers: {
            "content-type": "application/json",
            authorization: `Bearer ${getToken()}`,
          },
          body: JSON.stringify(reqData),
        }
      );
      console.log(data);
      if (!data.ok) {
        throw new Error("fail");
      }
      const result = await data.json();
      thunkApi.dispatch(getNotes());
      return result;
    } catch (e) {
      return thunkApi.rejectWithValue(e.message);
    }
  }
);

export const updateNote = createAsyncThunk(
  "note/update",
  async (reqData, thunkApi) => {
    try {
      reqData.userId =userId();
      const data = await fetch(`http://localhost:3000/notes/${reqData.id}`, {
        method: "PUT",
        headers: {
          "content-type": "application/json",
          authorization: `Bearer ${getToken()}`,
        },
        body: JSON.stringify(reqData),
      });
      console.log(data);
      if (!data.ok) {
        throw new Error("fail");
      }
      const result = await data.json();
      return result;
    } catch (e) {
      return thunkApi.rejectWithValue(e.message);
    }
  }
);

export const deleteNote = createAsyncThunk(
  "note/delete",
  async (reqData, thunkApi) => {
    try {
      const data = await fetch(`http://localhost:3000/notes/${reqData}`, {
        method: "DELETE",
        headers: {
          "content-type": "application/json",
          authorization: `Bearer ${getToken()}`,
        },
      });
      console.log(data);
      if (!data.ok) {
        throw new Error("fail");
      }
      const result = reqData;
      return result;
    } catch (e) {
      return thunkApi.rejectWithValue(e.message);
    }
  }
);

export const getByNote = createAsyncThunk(
  "note/delete",
  async (reqData, thunkApi) => {
    try {
      const data = await fetch(`http://localhost:3000/notes/${reqData}`, {
        method: "GET",
        headers: {
          "content-type": "application/json",
          'authorization': `Bearer ${getToken()}`,
        },
      });
      console.log(data);
      if (!data.ok) {
        throw new Error("fail");
      }
      const result = await data.json();
      return result;
    } catch (e) {
      return thunkApi.rejectWithValue(e.message);
    }
  }
);

const noteSlice = createSlice({
  name: "notes",
  initialState: { data: [], error: "", loading: false },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getNotes.pending, (state) => {
        state.data = [];
        state.error = "";
        state.loading = true;
      })
      .addCase(getNotes.fulfilled, (state, action) => {
        state.data = action.payload.data;
        state.error = "";
        state.loading = false;
      })
      .addCase(getNotes.rejected, (state, action) => {
        state.data = [];
        state.error = action.payload.error;
        state.loading = true;
      })
      .addCase(createNote.pending, (state) => {
        state.error = "";
        state.loading = true;
      })
      .addCase(createNote.fulfilled, (state) => {
        state.error = "";
        state.loading = false;
      })
      .addCase(createNote.rejected, (state, action) => {
        state.loading = true;
        state.error = action.payload.error;
      })
      .addCase(deleteNote.pending, (state) => {
        state.error = "";
        state.loading = true;
      })
      .addCase(deleteNote.fulfilled, (state, action) => {
        state.error = "";
        state.data = state.data.filter((note) => note._id !== action.payload);
        state.loading = false;
      })
      .addCase(deleteNote.rejected, (state, action) => {
        state.loading = true;
        state.error = action.payload.error;
      })
      .addCase(updateNote.pending, (state) => {
        state.error = "";
        state.loading = true;
      })
      .addCase(updateNote.fulfilled, (state, action) => {
        let updateNote = action.payload;

        let newData = state.data.map((x) =>
          x._id === updateNote.data._id ? updateNote.data : x
        );

        state.error = "";
        state.data = newData;
        state.loading = false;
      })
      .addCase(updateNote.rejected, (state, action) => {
        state.loading = true;
        state.error = action.payload.error;
      });
  },
});

export default noteSlice.reducer;

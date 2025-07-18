import { createSlice ,createAsyncThunk} from "@reduxjs/toolkit";
import { BASE_URL } from "../utils/common";
const initialState={
    isLogin:false,
    token:'',
    user:'',
    error:''
}

export const authCheck =createAsyncThunk('auth/user',async(reqData,thunkApi)=>{
  try{

       const user = await fetch(`${BASE_URL}/users/login`,{
        method:'POST',
        credentials :'include',
        headers:{
            'Content-Type':'application/json'
        },
        body:JSON.stringify(reqData)
       })
       const result = await user.json();
       return result; 
  }catch(e){
     return thunkApi.rejectWithValue(e)
     
  }
})
export const register =createAsyncThunk('auth/user',async(reqData,thunkApi)=>{
  try{

       const user = await fetch(`${BASE_URL}/users/register`,{
        method:'POST',
        credentials :'include',
        headers:{
            'Content-Type':'application/json'
        },
        body:JSON.stringify(reqData)
       })
       const result = await user.json();
       return result; 
  }catch(e){
     return thunkApi.rejectWithValue(e)
     
  }
})
const authSlice =createSlice({
    name:'auth',
    initialState,
    reducers:{
      logOut :(state) =>{
        return state=initialState;
      }
    },
    extraReducers:(builder) =>{
        builder
        .addCase(authCheck.pending,(state)=>{
            state.error='';
            state.token='';
            state.isLogin=false;
            state.user ='';

        })
        .addCase(authCheck.fulfilled,(state,action)=>{
            state.error=action.payload.error;
            state.token=action.payload.token;
            state.isLogin=action.payload.success;
            state.user =action.payload.userDetails
        })
        .addCase(authCheck.rejected,(state,action)=>{
            state.error=action.payload.error || 'error';
            state.token='';
            state.isLogin=false;
            state.user =''
        })
    }
})
export const {logOut} =authSlice.actions
export default authSlice.reducer;   
import { createSlice ,createAsyncThunk} from "@reduxjs/toolkit";
const initialState={
    isLogin:false,
    token:'',
    user:'',
    error:''
}

export const authCheck =createAsyncThunk('auth/user',async(reqData,thunkApi)=>{
  try{

       const user = await fetch('http://localhost:3000/users/login',{
        method:'POST',
        headers:{
            'Content-Type':'application/json'
        },
        body:JSON.stringify(reqData)
       })
       const result = await user.json();
       return result; 
  }catch(e){
     console.log(e);
     return thunkApi.rejectWithValue(e)
     
  }
})
export const register =createAsyncThunk('auth/user',async(reqData,thunkApi)=>{
  try{

       const user = await fetch('http://localhost:3000/users/register',{
        method:'POST',
        headers:{
            'Content-Type':'application/json'
        },
        body:JSON.stringify(reqData)
       })
       const result = await user.json();
       return result; 
  }catch(e){
     console.log(e);
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
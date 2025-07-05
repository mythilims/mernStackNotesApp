export  const getToken = ()=>{
    return  localStorage.getItem('token');
}

export  const userId = ()=>{
    let user =localStorage.getItem('userDetails');
    return user? JSON.parse(user).id:''
}


export  const userDetails = ()=>{
    let user =localStorage.getItem('userDetails');
    return JSON.parse(user)
}

export const BASE_URL = import.meta.env.VITE_APP_API_URL;
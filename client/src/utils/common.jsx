export  const getToken = ()=>{
    return  localStorage.getItem('token');
}

export  const userId = ()=>{
    let user =localStorage.getItem('userDetails');
    return JSON.parse(user).id
}


export  const userDetails = ()=>{
    let user =localStorage.getItem('userDetails');
    return JSON.parse(user)
}
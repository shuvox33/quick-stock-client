import axiosSecure from "."

export const saveUser = async (email) =>{
    const currentUser = {
        email : email,
        role : 'guest',
        status: 'Varified'
    }

    const {data} = await axiosSecure.put(`/users/${email}`, currentUser)

    return data;
}

export const getToken =async email =>{
    const {data} = await axiosSecure.post(`/jwt`, {email})
    console.log("token recieved from server", data);
    return data;
}

export const clearCookie = async () =>{
    const {data} = await axiosSecure.get('/logout')
    return data;
}

export const updateRole = async(email, role) =>{
    const roleInfo={
        email,
        role
    }
    const {data} = await axiosSecure.put(`/user/update/${email}`, roleInfo)

    return data;
}

export const getRole = async(email)=>{
    const {data} = await axiosSecure.get(`/user/${email}`);
    return data.role;

}
export const getUserInfo = async(email)=>{
    const {data} = await axiosSecure.get(`/user-info/${email}`);
    return data;

}
